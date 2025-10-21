import { TrustPassport } from '../types';
import { PRD_TEXT } from './prd';

const stripMarkdown = (value: string) =>
  value
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const toSentence = (value: string) => {
  const cleaned = stripMarkdown(value);
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

const formatMetrics = (passport: TrustPassport): string[] => {
  const metrics = passport.verification?.runs?.[0]?.metrics;
  if (!metrics) return [];

  return [
    `PHI leakage rate: ${metrics.phi_leakage_rate}%`,
    `Hallucination rate: ${metrics.hallucination_rate}%`,
    `Bias parity gap: ${metrics.bias_parity_gap}`,
    `Prompt injection resilience: ${metrics.prompt_injection_resilience}`,
    `Reliability score: ${metrics.reliability_score}`,
  ];
};

const formatCoverage = (passport: TrustPassport): string[] => {
  if (!passport.coverage_matrix?.length) return [];
  return passport.coverage_matrix.slice(0, 4).map(control => {
    const base = `${control.control} — ${control.status.toUpperCase()}`;
    return control.gap ? `${base}. ${control.gap}` : base;
  });
};

const formatRisks = (passport: TrustPassport): string[] => {
  if (!passport.risk_register?.length) return [];
  return passport.risk_register.map(risk =>
    `${risk.title} (${risk.severity.toUpperCase()}): ${risk.mitigation}`,
  );
};

const buildList = (items: string[]) => {
  if (!items.length) return '';
  const listItems = items.map(item => `<li>${toSentence(item)}</li>`).join('');
  return `<ul>${listItems}</ul>`;
};

export const generatePassportSummary = async (passport: TrustPassport): Promise<string> => {
  const { subject, verification, overallCompliance } = passport;
  const frameworks = verification?.frameworks?.join(', ') || 'No mapped frameworks yet';
  const overview = `Spectral verified ${subject.product} for ${subject.org} to support ${subject.use_case}.`;
  const complianceLine = `Current compliance score: ${overallCompliance ?? 'N/A'}%.`;

  const metricsSection = formatMetrics(passport);
  const coverageSection = formatCoverage(passport);
  const riskSection = formatRisks(passport);

  return [
    '<h3>Overview</h3>',
    `<p>${toSentence(overview)} ${toSentence(complianceLine)} This passport references ${frameworks}.</p>`,
    metricsSection.length
      ? '<h3>Verification Metrics</h3>' + buildList(metricsSection)
      : '',
    coverageSection.length
      ? '<h3>Control Coverage Highlights</h3>' + buildList(coverageSection)
      : '',
    riskSection.length
      ? '<h3>Key Risks & Mitigations</h3>' + buildList(riskSection)
      : '',
  ]
    .filter(Boolean)
    .join('');
};

const featureLines = PRD_TEXT.split('\n');

const findFeatureSection = (featureName: string) => {
  const lower = featureName.toLowerCase();
  const headingIndex = featureLines.findIndex(line => line.toLowerCase().includes(lower));
  if (headingIndex === -1) return null;

  const lines: string[] = [];
  for (let i = headingIndex + 1; i < featureLines.length; i++) {
    const line = featureLines[i];
    if (!line.trim() && lines.length) break;
    if (/^#+\s/.test(line) && lines.length) break;
    if (/^#+\s/.test(line) && !lines.length) continue;
    lines.push(line);
  }

  return lines;
};

const splitSectionContent = (section: string[]) => {
  const bullets: string[] = [];
  const paragraphs: string[] = [];

  section.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;
    if (/^[-*]/.test(trimmed)) {
      bullets.push(trimmed.replace(/^[-*]\s*/, ''));
    } else if (/^\*\s{2,}/.test(line)) {
      bullets.push(trimmed.replace(/^\*\s*/, ''));
    } else {
      paragraphs.push(trimmed);
    }
  });

  return { bullets, paragraphs };
};

export const generateFeatureSummary = async (featureName: string): Promise<string> => {
  const section = findFeatureSection(featureName);
  if (!section) {
    return `<h3>${featureName}</h3><p>We are still drafting the detailed requirements for ${featureName}. Expect updates as the Spectral team progresses on this capability.</p>`;
  }

  const { bullets, paragraphs } = splitSectionContent(section);
  const intro = paragraphs.length
    ? `<p>${paragraphs.map(toSentence).join(' ')}</p>`
    : `<p>${featureName} is planned as part of the Spectral roadmap. Stay tuned for more details.</p>`;

  const bulletList = bullets.length ? buildList(bullets) : '';

  return `<h3>${featureName}</h3>${intro}${bulletList}`;
};
