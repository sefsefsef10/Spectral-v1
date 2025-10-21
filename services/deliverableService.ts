import { TrustPassport, RiskRegisterItem } from '../types';
import { runDeterministicVerification } from '../utils/dataGenerator';

const triggerDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const buildJsonPacket = (passport: TrustPassport) => {
  const packet = {
    passport: {
      id: passport.id,
      subject: passport.subject,
      status: passport.status,
      monitoringStatus: passport.monitoringStatus,
      overallCompliance: passport.overallCompliance,
      issued_at: passport.issued_at,
      expiration: passport.expiration,
      vendor_attestation: passport.vendor_attestation,
      spectral_signature: passport.spectral_signature,
    },
    verification: passport.verification,
    coverage_matrix: passport.coverage_matrix,
    risk_register: passport.risk_register,
    generated_at: new Date().toISOString(),
    generated_by: 'Spectral Verification Pipeline',
  };

  return JSON.stringify(packet, null, 2);
};

interface PdfSection {
  title: string;
  lines: string[];
}

const escapePdfText = (value: string) => value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

const buildContentStream = (documentTitle: string, sections: PdfSection[]): string => {
  const instructions: string[] = ['BT', '/F1 18 Tf', '72 760 Td', `(${escapePdfText(documentTitle)}) Tj`, '0 -26 Td', '/F1 12 Tf'];

  sections.forEach((section, index) => {
    instructions.push(`(${escapePdfText(section.title)}) Tj`, '0 -18 Td');
    section.lines.forEach(line => {
      instructions.push(`(${escapePdfText(line)}) Tj`, '0 -14 Td');
    });
    if (index < sections.length - 1) {
      instructions.push('0 -12 Td');
    }
  });

  instructions.push('ET');
  return instructions.join('\n');
};

const buildPdfDocument = (title: string, sections: PdfSection[]): Uint8Array => {
  const content = buildContentStream(title, sections);
  const header = '%PDF-1.4\n';
  const objects: string[] = [];

  objects.push('1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n');
  objects.push('2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n');
  objects.push('3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n');
  objects.push(`4 0 obj << /Length ${content.length} >> stream\n${content}\nendstream endobj\n`);
  objects.push('5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n');

  const offsets: number[] = [header.length];
  for (let i = 0; i < objects.length - 1; i++) {
    offsets.push(offsets[i] + objects[i].length);
  }

  const body = objects.join('');
  const startXref = header.length + body.length;

  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach(offset => {
    xref += `${offset.toString().padStart(10, '0')} 00000 n \n`;
  });

  const trailer = `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF`;
  const pdfString = header + body + xref + trailer;
  return new TextEncoder().encode(pdfString);
};

const formatRisk = (risk: RiskRegisterItem): string => {
  return `${risk.id} [${risk.severity.toUpperCase()}] ${risk.title} — ${risk.mitigation}`;
};

const buildPassportSections = (passport: TrustPassport): PdfSection[] => {
  const sections: PdfSection[] = [];

  sections.push({
    title: 'Verification Summary',
    lines: [
      `Status: ${passport.status.toUpperCase()} (Compliance ${passport.overallCompliance}%)`,
      `Issued: ${new Date(passport.issued_at).toLocaleString()} • Expires: ${new Date(passport.expiration).toLocaleDateString()}`,
      `Spectral Signature: ${passport.spectral_signature}`,
    ],
  });

  const metrics = passport.verification?.runs[0].metrics;
  if (metrics) {
    sections.push({
      title: 'Key Metrics',
      lines: [
        `PHI Leakage Rate: ${metrics.phi_leakage_rate}%`,
        `Hallucination Rate: ${metrics.hallucination_rate}%`,
        `Bias Parity Gap: ${metrics.bias_parity_gap}`,
        `Prompt Injection Resilience: ${metrics.prompt_injection_resilience}`,
        `Reliability Score: ${metrics.reliability_score}`,
      ],
    });
  }

  const coverage = passport.coverage_matrix ?? [];
  if (coverage.length > 0) {
    sections.push({
      title: 'Control Coverage',
      lines: coverage.slice(0, 6).map(item => `${item.control} — ${item.status.toUpperCase()}${item.gap ? ` (${item.gap})` : ''}`),
    });
  }

  const risks = passport.risk_register ?? [];
  if (risks.length > 0) {
    sections.push({
      title: 'Risk Register',
      lines: risks.map(formatRisk),
    });
  }

  return sections;
};

export const downloadPassportPacket = async (passport: TrustPassport, format: 'json' | 'pdf') => {
  if (format === 'json') {
    const json = buildJsonPacket(passport);
    const blob = new Blob([json], { type: 'application/json' });
    triggerDownload(blob, `${passport.id}-trust-passport.json`);
    return;
  }

  const enrichedPassport = (!passport.verification || !passport.coverage_matrix || !passport.risk_register)
    ? { ...passport, ...runDeterministicVerification(passport) }
    : passport;

  const pdfBytes = buildPdfDocument(
    `${enrichedPassport.subject.product} — ${enrichedPassport.subject.org}`,
    buildPassportSections(enrichedPassport),
  );
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  triggerDownload(blob, `${passport.id}-trust-passport.pdf`);
};

export const exportBoardSummaryPdf = async (passports: TrustPassport[]) => {
  if (!passports.length) return;

  const statusBreakdown = passports.reduce<Record<string, number>>((acc, passport) => {
    acc[passport.status] = (acc[passport.status] || 0) + 1;
    return acc;
  }, {});

  const topRisks = passports
    .flatMap(passport => passport.risk_register ?? [])
    .sort((a, b) => {
      const order: Record<RiskRegisterItem['severity'], number> = { critical: 4, high: 3, medium: 2, low: 1 };
      return order[b.severity] - order[a.severity];
    })
    .slice(0, 5)
    .map(formatRisk);

  const expiring = passports
    .filter(passport => new Date(passport.expiration) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000))
    .sort((a, b) => new Date(a.expiration).getTime() - new Date(b.expiration).getTime())
    .slice(0, 6)
    .map(passport => `${passport.subject.product} — ${new Date(passport.expiration).toLocaleDateString()}`);

  const sections: PdfSection[] = [
    {
      title: 'Portfolio Overview',
      lines: [
        `Models Tracked: ${passports.length}`,
        `Verified: ${statusBreakdown['verified'] || 0} • Under Review: ${statusBreakdown['under-review'] || 0} • Draft: ${statusBreakdown['draft'] || 0} • Expired: ${statusBreakdown['expired'] || 0}`,
      ],
    },
  ];

  if (topRisks.length > 0) {
    sections.push({ title: 'Top Portfolio Risks', lines: topRisks });
  }

  if (expiring.length > 0) {
    sections.push({ title: 'Expiring in Next 90 Days', lines: expiring });
  }

  const pdfBytes = buildPdfDocument('Spectral Portfolio Summary', sections);
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  triggerDownload(blob, 'spectral-portfolio-summary.pdf');
};

