import { TrustPassport } from '../types';

export const initialPortfolioData: TrustPassport[] = [
  {
    "id": "prod_acme_triage_01",
    "monitoringStatus": "active",
    "overallCompliance": 92,
    "passport_version": "1.0",
    "issued_at": "2025-10-21T12:00:00Z",
    "spectral_signature": "base64-ed25519-mock-signature-string",
    "vendor_attestation": { "signer": "ciso@acmeai.com", "role": "CISO", "timestamp": "2025-10-21T11:55:00Z" },
    "subject": {
      "org": "AcmeAI",
      "product": "Acme Triage",
      "model": { "provider": "openai:gpt-4o-mini", "version": "2025-09-15", "customizations": ["System Prompts", "Tooling"] },
      "environment": "Production",
      "use_case": "ER Intake Triage"
    },
    "verification": {
      "frameworks": ["HIPAA", "NIST AI RMF", "ISO/IEC 42001"],
      "runs": [{
        "run_id": "run_123", "started_at": "2025-10-20T09:00:00Z", "finished_at": "2025-10-20T09:03:00Z", "evidence": ["s3://..."],
        "metrics": { "phi_leakage_rate": 0.1, "hallucination_rate": 1.8, "bias_parity_gap": 0.04, "prompt_injection_resilience": 82, "reliability_score": 91 }
      }]
    },
    "coverage_matrix": [
      { "control": "HIPAA-164.312(a)(2)(i)", "status": "met", "evidence": ["run_123:phi_leakage_test"] },
      { "control": "NIST-AI-RMF-GOVERN-5", "status": "partial", "gap": "Requires human-in-the-loop workflow docs.", "evidence": ["run_123:bias_parity_test"] },
    ],
    "risk_register": [
      { "id": "R-017", "title": "Prompt Injection", "severity": "medium", "mitigation": "System prompt hardening implemented." },
    ],
    "expiration": "2026-01-20T00:00:00Z",
    "status": "verified",
    "creationStep": "complete",
    "policies": []
  },
  {
    "id": "prod_healthco_cx_agent_01",
    "monitoringStatus": "inactive",
    "overallCompliance": 75,
    "passport_version": "0.9",
    "issued_at": "2025-09-15T10:00:00Z",
    "spectral_signature": "base64-ed25519-mock-signature-string-2",
    "vendor_attestation": { "signer": "compliance@healthco.ai", "role": "Compliance Lead", "timestamp": "2025-09-15T09:45:00Z" },
    "subject": {
      "org": "HealthCo AI",
      "product": "Patient CX Agent",
      "model": { "provider": "anthropic:claude-3-sonnet", "version": "2025-08-01", "customizations": ["Fine-tuning"] },
      "environment": "Production",
      "use_case": "Post-discharge patient follow-up"
    },
    "verification": {
      "frameworks": ["HIPAA", "NIST AI RMF"],
      "runs": [{
        "run_id": "run_456", "started_at": "2025-09-14T11:00:00Z", "finished_at": "2025-09-14T11:05:00Z", "evidence": ["s3://..."],
        "metrics": { "phi_leakage_rate": 0.3, "hallucination_rate": 3.1, "bias_parity_gap": 0.08, "prompt_injection_resilience": 70, "reliability_score": 85 }
      }]
    },
    "coverage_matrix": [
       { "control": "HIPAA-164.312(b)", "status": "met", "evidence": ["run_456:access_control_tests"] },
       { "control": "NIST-AI-RMF-MAP-2", "status": "partial", "gap": "Hallucination rate exceeds policy threshold.", "evidence": ["run_456:hallucination_test"] },
    ],
    "risk_register": [
      { "id": "R-025", "title": "Elevated Hallucination Rate", "severity": "high", "mitigation": "Additional fine-tuning and retrieval-augmented generation (RAG) implementation planned." },
    ],
    "expiration": "2025-12-15T00:00:00Z",
    "status": "under-review",
    "creationStep": "complete",
    "policies": []
  },
  {
    "id": "prod_radvision_dx_01",
    "monitoringStatus": "active",
    "overallCompliance": 88,
    "passport_version": "1.1",
    "issued_at": "2025-07-01T14:00:00Z",
    "spectral_signature": "base64-ed25519-mock-signature-string-3",
    "vendor_attestation": { "signer": "cto@radvision.com", "role": "CTO", "timestamp": "2025-07-01T13:50:00Z" },
    "subject": {
      "org": "RadVision",
      "product": "Radiology DX",
      "model": { "provider": "google:gemini-2.5-pro", "version": "2025-06-20", "customizations": ["Domain-specific fine-tuning"] },
      "environment": "Production",
      "use_case": "Clinical Decision Support for Radiology"
    },
    "verification": {
      "frameworks": ["HIPAA", "FDA-DG"],
      "runs": [{
        "run_id": "run_789", "started_at": "2025-06-30T16:00:00Z", "finished_at": "2025-06-30T16:10:00Z", "evidence": ["s3://..."],
        "metrics": { "phi_leakage_rate": 0.0, "hallucination_rate": 0.5, "bias_parity_gap": 0.02, "prompt_injection_resilience": 95, "reliability_score": 96 }
      }]
    },
    "coverage_matrix": [
       { "control": "FDA-DG-2.1", "status": "met", "evidence": ["run_789:clinical_validation_suite"] },
    ],
    "risk_register": [
      { "id": "R-009", "title": "Model Version Staleness", "severity": "low", "mitigation": "Quarterly re-verification schedule is in place." },
    ],
    "expiration": "2025-09-30T00:00:00Z",
    "status": "expired",
    "creationStep": "complete",
    "policies": []
  },
];
