import { Verification, CoverageMatrixItem, RiskRegisterItem } from '../types';

const getRandomFloat = (min: number, max: number, decimals: number) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
};

const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const frameworks = ["HIPAA", "NIST AI RMF", "ISO/IEC 42001", "FDA-DG"];
const hipaaControls = ["HIPAA-164.308(a)(1)(i)", "HIPAA-164.312(a)(2)(i)", "HIPAA-164.312(b)"];
const nistControls = ["NIST-AI-RMF-GOVERN-1", "NIST-AI-RMF-MAP-2", "NIST-AI-RMF-MEASURE-3"];
const isoControls = ["ISO-42001-5.4.2", "ISO-42001-6.2.3"];
const fdaControls = ["FDA-DG-2.1", "FDA-DG-4.3"];

const riskTitles = [
    "Prompt Injection Susceptibility", "Elevated Hallucination Rate", "Potential PHI Leakage",
    "Model Version Staleness", "Bias Parity Discrepancy", "Lack of Data Lineage Docs"
];
const severities: RiskRegisterItem['severity'][] = ['low', 'medium', 'high', 'critical'];
const mitigations = [
    "System prompt hardening implemented.", "Additional fine-tuning and RAG planned.",
    "Enhanced output redaction layer.", "Quarterly re-verification schedule in place.",
    "Bias probe expansion and data augmentation.", "Documentation update scheduled for next sprint."
];

export const generateVerificationData = (): { verification: Verification; coverage_matrix: CoverageMatrixItem[]; risk_register: RiskRegisterItem[] } => {
    const runId = `run_${getRandomInt(1000, 9999)}`;
    
    // Generate Metrics
    const metrics = {
        phi_leakage_rate: getRandomFloat(0, 0.5, 2),
        hallucination_rate: getRandomFloat(0.5, 4, 1),
        bias_parity_gap: getRandomFloat(0.01, 0.09, 2),
        prompt_injection_resilience: getRandomInt(65, 98),
        reliability_score: getRandomInt(80, 99),
    };

    const verification: Verification = {
        frameworks: frameworks.slice(0, getRandomInt(2, 4)),
        runs: [{
            run_id: runId,
            started_at: new Date(Date.now() - 5 * 60000).toISOString(),
            finished_at: new Date().toISOString(),
            evidence: [`s3://evidence-store/${runId}`],
            metrics: metrics,
        }],
    };

    // Generate Coverage Matrix
    const coverage_matrix: CoverageMatrixItem[] = [];
    const sampleControls = [
        hipaaControls[getRandomInt(0, hipaaControls.length - 1)],
        nistControls[getRandomInt(0, nistControls.length - 1)],
        isoControls[getRandomInt(0, isoControls.length - 1)],
        fdaControls[getRandomInt(0, fdaControls.length - 1)],
    ];

    sampleControls.forEach(control => {
        const rand = Math.random();
        let status: CoverageMatrixItem['status'] = 'met';
        if (rand > 0.7) status = 'partial';
        if (rand > 0.9) status = 'not-met';
        
        coverage_matrix.push({
            control: control,
            status: status,
            evidence: [`${runId}:test-suite-${getRandomInt(1, 5)}`],
            gap: status === 'partial' ? 'Requires further documentation.' : undefined,
        });
    });

    // Generate Risk Register
    const risk_register: RiskRegisterItem[] = [];
    const numRisks = getRandomInt(1, 3);
    for (let i = 0; i < numRisks; i++) {
        const randIndex = getRandomInt(0, riskTitles.length - 1);
        risk_register.push({
            id: `R-${getRandomInt(10, 99)}`,
            title: riskTitles[randIndex],
            severity: severities[getRandomInt(0, severities.length - 1)],
            mitigation: mitigations[randIndex],
        });
    }

    return { verification, coverage_matrix, risk_register };
};
