import { TrustPassport, Verification, CoverageMatrixItem, RiskRegisterItem } from '../types';

export interface VerificationArtifacts {
  verification: Verification;
  coverage_matrix: CoverageMatrixItem[];
  risk_register: RiskRegisterItem[];
  overallCompliance: number;
  issued_at: string;
  expiration: string;
  spectral_signature: string;
  vendor_attestation: {
    signer: string;
    role: string;
    timestamp: string;
  };
}

interface VerificationProfile {
  name: string;
  frameworks: string[];
  controls: string[];
  metricBaselines: Verification['runs'][0]['metrics'];
  metricSpread: Verification['runs'][0]['metrics'];
  thresholds: {
    phi: number;
    hallucination: number;
    bias: number;
    resilience: number;
    reliability: number;
  };
  defaultAttestor: {
    role: string;
  };
}

const PROFILES: { matcher: RegExp; profile: VerificationProfile }[] = [
  {
    matcher: /(clinical|triage|radiology|patient|hipaa)/i,
    profile: {
      name: 'Healthcare',
      frameworks: ['HIPAA', 'NIST AI RMF', 'FDA-DG'],
      controls: [
        'HIPAA-164.312(a)(2)(i)',
        'HIPAA-164.312(b)',
        'NIST-AI-RMF-MAP-2',
        'NIST-AI-RMF-MEASURE-3',
        'FDA-DG-2.1',
      ],
      metricBaselines: {
        phi_leakage_rate: 0.18,
        hallucination_rate: 1.8,
        bias_parity_gap: 0.04,
        prompt_injection_resilience: 86,
        reliability_score: 93,
      },
      metricSpread: {
        phi_leakage_rate: 0.08,
        hallucination_rate: 0.9,
        bias_parity_gap: 0.02,
        prompt_injection_resilience: 8,
        reliability_score: 5,
      },
      thresholds: {
        phi: 0.22,
        hallucination: 2.5,
        bias: 0.05,
        resilience: 82,
        reliability: 90,
      },
      defaultAttestor: {
        role: 'Chief Compliance Officer',
      },
    },
  },
  {
    matcher: /(customer|support|agent|experience|cx)/i,
    profile: {
      name: 'Customer Experience',
      frameworks: ['HIPAA', 'NIST AI RMF'],
      controls: [
        'HIPAA-164.312(b)',
        'NIST-AI-RMF-GOVERN-1',
        'NIST-AI-RMF-MAP-2',
        'NIST-AI-RMF-MANAGE-4',
      ],
      metricBaselines: {
        phi_leakage_rate: 0.24,
        hallucination_rate: 2.6,
        bias_parity_gap: 0.06,
        prompt_injection_resilience: 78,
        reliability_score: 88,
      },
      metricSpread: {
        phi_leakage_rate: 0.1,
        hallucination_rate: 1.2,
        bias_parity_gap: 0.03,
        prompt_injection_resilience: 10,
        reliability_score: 6,
      },
      thresholds: {
        phi: 0.3,
        hallucination: 3.1,
        bias: 0.07,
        resilience: 75,
        reliability: 85,
      },
      defaultAttestor: {
        role: 'Compliance Lead',
      },
    },
  },
  {
    matcher: /(fraud|finance|credit|risk|loan)/i,
    profile: {
      name: 'Financial Services',
      frameworks: ['NIST AI RMF', 'ISO/IEC 42001'],
      controls: [
        'NIST-AI-RMF-GOVERN-5',
        'NIST-AI-RMF-MEASURE-3',
        'ISO-42001-6.2.3',
        'ISO-42001-8.3.2',
      ],
      metricBaselines: {
        phi_leakage_rate: 0.05,
        hallucination_rate: 1.1,
        bias_parity_gap: 0.03,
        prompt_injection_resilience: 90,
        reliability_score: 95,
      },
      metricSpread: {
        phi_leakage_rate: 0.03,
        hallucination_rate: 0.6,
        bias_parity_gap: 0.02,
        prompt_injection_resilience: 6,
        reliability_score: 3,
      },
      thresholds: {
        phi: 0.1,
        hallucination: 1.8,
        bias: 0.04,
        resilience: 88,
        reliability: 93,
      },
      defaultAttestor: {
        role: 'Head of Risk',
      },
    },
  },
];

const DEFAULT_PROFILE: VerificationProfile = {
  name: 'General Availability',
  frameworks: ['NIST AI RMF', 'ISO/IEC 42001'],
  controls: [
    'NIST-AI-RMF-GOVERN-1',
    'NIST-AI-RMF-MAP-2',
    'ISO-42001-5.4.2',
  ],
  metricBaselines: {
    phi_leakage_rate: 0.12,
    hallucination_rate: 1.9,
    bias_parity_gap: 0.05,
    prompt_injection_resilience: 82,
    reliability_score: 91,
  },
  metricSpread: {
    phi_leakage_rate: 0.08,
    hallucination_rate: 0.9,
    bias_parity_gap: 0.02,
    prompt_injection_resilience: 8,
    reliability_score: 4,
  },
  thresholds: {
    phi: 0.2,
    hallucination: 2.6,
    bias: 0.06,
    resilience: 80,
    reliability: 88,
  },
  defaultAttestor: {
    role: 'Security Officer',
  },
};

const CONTROL_BUILDERS: Record<string, (metrics: Verification['runs'][0]['metrics'], thresholds: VerificationProfile['thresholds'], runId: string) => CoverageMatrixItem> = {
  'HIPAA-164.312(a)(2)(i)': (metrics, thresholds, runId) => {
    const status = metrics.phi_leakage_rate <= thresholds.phi ? 'met' : metrics.phi_leakage_rate <= thresholds.phi * 1.4 ? 'partial' : 'not-met';
    return {
      control: 'HIPAA-164.312(a)(2)(i)',
      status,
      gap: status === 'met' ? undefined : 'Update PHI leak prevention controls and evidence capture.',
      evidence: [`${runId}:phi-leakage-suite`],
    };
  },
  'HIPAA-164.312(b)': (metrics, thresholds, runId) => {
    const status = metrics.prompt_injection_resilience >= thresholds.resilience ? 'met' : metrics.prompt_injection_resilience >= thresholds.resilience - 5 ? 'partial' : 'not-met';
    return {
      control: 'HIPAA-164.312(b)',
      status,
      gap: status === 'met' ? undefined : 'Multi-factor controls required for privileged access to the assistant.',
      evidence: [`${runId}:access-control-review`],
    };
  },
  'NIST-AI-RMF-GOVERN-1': (metrics, thresholds, runId) => {
    const status = metrics.reliability_score >= thresholds.reliability ? 'met' : metrics.reliability_score >= thresholds.reliability - 5 ? 'partial' : 'not-met';
    return {
      control: 'NIST-AI-RMF-GOVERN-1',
      status,
      gap: status === 'met' ? undefined : 'Document accountable owners and review cadence for AI governance.',
      evidence: [`${runId}:governance-register`],
    };
  },
  'NIST-AI-RMF-GOVERN-5': (metrics, thresholds, runId) => {
    const status = metrics.bias_parity_gap <= thresholds.bias ? 'met' : metrics.bias_parity_gap <= thresholds.bias * 1.4 ? 'partial' : 'not-met';
    return {
      control: 'NIST-AI-RMF-GOVERN-5',
      status,
      gap: status === 'met' ? undefined : 'Bias remediation plan and controls must be refreshed.',
      evidence: [`${runId}:bias-probe-results`],
    };
  },
  'NIST-AI-RMF-MAP-2': (metrics, thresholds, runId) => {
    const status = metrics.hallucination_rate <= thresholds.hallucination ? 'met' : metrics.hallucination_rate <= thresholds.hallucination * 1.4 ? 'partial' : 'not-met';
    return {
      control: 'NIST-AI-RMF-MAP-2',
      status,
      gap: status === 'met' ? undefined : 'Tighten human-in-the-loop review for high-risk intents.',
      evidence: [`${runId}:hallucination-eval`],
    };
  },
  'NIST-AI-RMF-MANAGE-4': (metrics, thresholds, runId) => {
    const status = metrics.prompt_injection_resilience >= thresholds.resilience ? 'met' : metrics.prompt_injection_resilience >= thresholds.resilience - 10 ? 'partial' : 'not-met';
    return {
      control: 'NIST-AI-RMF-MANAGE-4',
      status,
      gap: status === 'met' ? undefined : 'Add break-glass workflow and runtime guardrails.',
      evidence: [`${runId}:runtime-guardrail-review`],
    };
  },
  'NIST-AI-RMF-MEASURE-3': (metrics, thresholds, runId) => {
    const status = metrics.reliability_score >= thresholds.reliability ? 'met' : metrics.reliability_score >= thresholds.reliability - 10 ? 'partial' : 'not-met';
    return {
      control: 'NIST-AI-RMF-MEASURE-3',
      status,
      gap: status === 'met' ? undefined : 'Runtime SLOs falling below threshold; update measurement plan.',
      evidence: [`${runId}:reliability-slo-report`],
    };
  },
  'ISO-42001-5.4.2': (metrics, thresholds, runId) => {
    const status = metrics.bias_parity_gap <= thresholds.bias ? 'met' : metrics.bias_parity_gap <= thresholds.bias * 1.5 ? 'partial' : 'not-met';
    return {
      control: 'ISO-42001-5.4.2',
      status,
      gap: status === 'met' ? undefined : 'Fairness KPIs require executive sign-off and mitigation roadmap.',
      evidence: [`${runId}:iso-governance-matrix`],
    };
  },
  'ISO-42001-6.2.3': (metrics, thresholds, runId) => {
    const status = metrics.hallucination_rate <= thresholds.hallucination ? 'met' : metrics.hallucination_rate <= thresholds.hallucination * 1.3 ? 'partial' : 'not-met';
    return {
      control: 'ISO-42001-6.2.3',
      status,
      gap: status === 'met' ? undefined : 'Evaluation coverage gaps detected for multilingual scenarios.',
      evidence: [`${runId}:iso-eval-suite`],
    };
  },
  'ISO-42001-8.3.2': (metrics, thresholds, runId) => {
    const status = metrics.reliability_score >= thresholds.reliability ? 'met' : metrics.reliability_score >= thresholds.reliability - 15 ? 'partial' : 'not-met';
    return {
      control: 'ISO-42001-8.3.2',
      status,
      gap: status === 'met' ? undefined : 'Incident playbooks must be integrated with runtime monitoring.',
      evidence: [`${runId}:incident-playbook`],
    };
  },
  'FDA-DG-2.1': (metrics, thresholds, runId) => {
    const status = metrics.reliability_score >= thresholds.reliability && metrics.bias_parity_gap <= thresholds.bias ? 'met' : 'partial';
    return {
      control: 'FDA-DG-2.1',
      status,
      gap: status === 'met' ? undefined : 'Submit updated clinical validation package and human factors study.',
      evidence: [`${runId}:clinical-validation`],
    };
  },
};

interface RiskTemplate {
  idPrefix: string;
  title: string;
  mitigation: string;
  severity: RiskRegisterItem['severity'];
  condition: (metrics: Verification['runs'][0]['metrics'], thresholds: VerificationProfile['thresholds']) => boolean;
}

const RISK_LIBRARY: RiskTemplate[] = [
  {
    idPrefix: 'R-101',
    title: 'Elevated Hallucination Rate',
    mitigation: 'Deploy targeted fine-tuning and retrieval augmentation to reduce hallucinations.',
    severity: 'high',
    condition: (metrics, thresholds) => metrics.hallucination_rate > thresholds.hallucination,
  },
  {
    idPrefix: 'R-118',
    title: 'Prompt Injection Susceptibility',
    mitigation: 'Harden system prompts and enable runtime guardrails for privileged intents.',
    severity: 'medium',
    condition: (metrics, thresholds) => metrics.prompt_injection_resilience < thresholds.resilience,
  },
  {
    idPrefix: 'R-204',
    title: 'Bias Parity Discrepancy',
    mitigation: 'Expand evaluation cohorts and apply post-processing fairness constraints.',
    severity: 'medium',
    condition: (metrics, thresholds) => metrics.bias_parity_gap > thresholds.bias,
  },
  {
    idPrefix: 'R-310',
    title: 'Model Version Staleness',
    mitigation: 'Schedule quarterly verification runs and document upgrade criteria.',
    severity: 'low',
    condition: () => false,
  },
];

const hashStringToInt = (value: string): number => {
  let hash = 1779033703 ^ value.length;
  for (let i = 0; i < value.length; i++) {
    hash = Math.imul(hash ^ value.charCodeAt(i), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }
  return (hash ^ (hash >>> 16)) >>> 0;
};

const mulberry32 = (seed: number) => {
  return () => {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t ^= t + Math.imul(t ^ t >>> 7, 61 | t);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const formatNumber = (value: number, decimals = 2) => parseFloat(value.toFixed(decimals));

const pickProfile = (useCase: string): VerificationProfile => {
  const entry = PROFILES.find(({ matcher }) => matcher.test(useCase));
  return entry ? entry.profile : DEFAULT_PROFILE;
};

const buildMetrics = (
  profile: VerificationProfile,
  rand: () => number,
): Verification['runs'][0]['metrics'] => {
  const { metricBaselines, metricSpread } = profile;
  return {
    phi_leakage_rate: formatNumber(clamp(metricBaselines.phi_leakage_rate + (rand() - 0.5) * metricSpread.phi_leakage_rate, 0, 1), 3),
    hallucination_rate: formatNumber(clamp(metricBaselines.hallucination_rate + (rand() - 0.5) * metricSpread.hallucination_rate, 0, 10), 2),
    bias_parity_gap: formatNumber(clamp(metricBaselines.bias_parity_gap + (rand() - 0.5) * metricSpread.bias_parity_gap, 0, 0.25), 3),
    prompt_injection_resilience: Math.round(clamp(metricBaselines.prompt_injection_resilience + (rand() - 0.5) * metricSpread.prompt_injection_resilience, 50, 99)),
    reliability_score: Math.round(clamp(metricBaselines.reliability_score + (rand() - 0.5) * metricSpread.reliability_score, 70, 99)),
  };
};

const buildCoverageMatrix = (
  profile: VerificationProfile,
  metrics: Verification['runs'][0]['metrics'],
  runId: string,
): CoverageMatrixItem[] => {
  return profile.controls
    .map(control => CONTROL_BUILDERS[control]?.(metrics, profile.thresholds, runId))
    .filter((item): item is CoverageMatrixItem => Boolean(item));
};

const buildRiskRegister = (
  metrics: Verification['runs'][0]['metrics'],
  thresholds: VerificationProfile['thresholds'],
  rand: () => number,
): RiskRegisterItem[] => {
  const triggered = RISK_LIBRARY.filter(risk => risk.condition(metrics, thresholds));
  if (triggered.length === 0) {
    const fallback = RISK_LIBRARY[RISK_LIBRARY.length - 1];
    return [
      {
        id: `${fallback.idPrefix}-${Math.floor(rand() * 90 + 10)}`,
        title: fallback.title,
        severity: fallback.severity,
        mitigation: fallback.mitigation,
      },
    ];
  }

  return triggered.map(template => ({
    id: `${template.idPrefix}-${Math.floor(rand() * 90 + 10)}`,
    title: template.title,
    severity: template.severity,
    mitigation: template.mitigation,
  }));
};

const calculateCompliance = (
  metrics: Verification['runs'][0]['metrics'],
  coverage: CoverageMatrixItem[],
  thresholds: VerificationProfile['thresholds'],
): number => {
  let score = 96;
  if (metrics.phi_leakage_rate > thresholds.phi) score -= 12;
  if (metrics.hallucination_rate > thresholds.hallucination) score -= 10;
  if (metrics.bias_parity_gap > thresholds.bias) score -= 8;
  if (metrics.prompt_injection_resilience < thresholds.resilience) score -= 7;
  if (metrics.reliability_score < thresholds.reliability) score -= 6;

  coverage.forEach(item => {
    if (item.status === 'partial') score -= 4;
    if (item.status === 'not-met') score -= 10;
  });

  return Math.max(55, Math.min(100, Math.round(score)));
};

const buildSignature = (passport: TrustPassport, metrics: Verification['runs'][0]['metrics']): string => {
  const payload = `${passport.subject.org}|${passport.subject.product}|${metrics.reliability_score}|${metrics.bias_parity_gap}`;
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return window.btoa(payload).slice(0, 44);
  }
  return Buffer.from(payload, 'utf-8').toString('base64').slice(0, 44);
};

const buildAttestation = (passport: TrustPassport, profile: VerificationProfile): VerificationArtifacts['vendor_attestation'] => {
  const attestor = passport.vendor_attestation?.signer || `trust@${passport.subject.org.toLowerCase().replace(/\s+/g, '')}.com`;
  return {
    signer: attestor,
    role: passport.vendor_attestation?.role || profile.defaultAttestor.role,
    timestamp: new Date().toISOString(),
  };
};

export const runDeterministicVerification = (passport: TrustPassport): VerificationArtifacts => {
  const profile = pickProfile(passport.subject.use_case + passport.subject.product + passport.subject.org);
  const seed = hashStringToInt(`${passport.id}:${passport.subject.product}:${passport.subject.use_case}`);
  const rand = mulberry32(seed);
  const runId = `run_${Math.floor(rand() * 9000 + 1000)}`;

  const metrics = buildMetrics(profile, rand);
  const verification: Verification = {
    frameworks: profile.frameworks,
    runs: [
      {
        run_id: runId,
        started_at: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
        finished_at: new Date().toISOString(),
        evidence: [`s3://spectral-evidence/${passport.id}/${runId}`],
        metrics,
      },
    ],
  };

  const coverage_matrix = buildCoverageMatrix(profile, metrics, runId);
  const risk_register = buildRiskRegister(metrics, profile.thresholds, rand);
  const overallCompliance = calculateCompliance(metrics, coverage_matrix, profile.thresholds);
  const issued_at = new Date().toISOString();
  const expiration = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString();
  const spectral_signature = `sig-${buildSignature(passport, metrics)}`;
  const vendor_attestation = buildAttestation(passport, profile);

  return {
    verification,
    coverage_matrix,
    risk_register,
    overallCompliance,
    issued_at,
    expiration,
    spectral_signature,
    vendor_attestation,
  };
};

