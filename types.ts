
export interface VerificationMetrics {
  phi_leakage_rate: number;
  hallucination_rate: number;
  bias_parity_gap: number;
  prompt_injection_resilience: number;
  reliability_score: number;
}

export interface VerificationRun {
  run_id: string;
  started_at: string;
  finished_at: string;
  evidence: string[];
  metrics: VerificationMetrics;
}

export interface Verification {
  frameworks: string[];
  runs: VerificationRun[];
}

export interface CoverageMatrixItem {
  control: string;
  status: 'met' | 'partial' | 'not-met';
  gap?: string;
  evidence: string[];
}

export interface RiskRegisterItem {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
}

export type CreationStep = 'product' | 'model' | 'environment' | 'complete';

export interface PolicyCompliance {
  policyId: string;
  policyName: string;
  status: 'compliant' | 'non-compliant' | 'not-applicable';
}

export interface TrustPassport {
  id: string;
  monitoringStatus: 'active' | 'inactive';
  overallCompliance: number;
  passport_version: string;
  issued_at: string;
  spectral_signature?: string;
  vendor_attestation?: {
    signer: string;
    role: string;
    timestamp: string;
  };
  subject: {
    org: string;
    product: string;
    model: {
      provider: string;
      version: string;
      customizations: string[];
    };
    environment: string;
    use_case: string;
  };
  verification?: Verification;
  coverage_matrix?: CoverageMatrixItem[];
  risk_register?: RiskRegisterItem[];
  expiration: string;
  status: 'verified' | 'under-review' | 'expired' | 'draft';
  creationStep: CreationStep;
  policies?: PolicyCompliance[];
  reviewNotes?: string;
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  rules: string; // YAML or JSON content
  status: 'active' | 'draft';
  modelsApplied: number;
}

export type AppView = 'portfolio' | 'productDetail' | 'policies' | 'reports' | 'monitoring' | 'settings';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string; // For now, a static user
  action: string;
  details: string;
}

export interface AuditLogContextType {
  logs: AuditLogEntry[];
  logAction: (action: string, details: string) => void;
}