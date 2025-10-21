import { useState, useEffect, useCallback } from 'react';
import { Policy, TrustPassport } from '../types';
import * as yaml from 'js-yaml';

const POLICIES_STORAGE_KEY = 'spectral_policies_data';
const PORTFOLIO_STORAGE_KEY = 'spectral_portfolio_data';


const initialPolicyData: Policy[] = [
  {
    id: 'pol_cds_reliability_01',
    name: 'Clinical Decision Support Reliability',
    description: 'Ensures all CDS models meet a minimum reliability and performance threshold before deployment.',
    rules: `
# This policy applies to models with the 'clinical decision support' use case.
target:
  use_case: 'Clinical Decision Support for Radiology'
requirements:
  - metric: reliability_score
    threshold: 95
    condition: '>='
  - metric: hallucination_rate
    threshold: 1.0
    condition: '<='
    `,
    status: 'active',
    modelsApplied: 0,
  },
  {
    id: 'pol_phi_leakage_01',
    name: 'Zero-Tolerance PHI Leakage',
    description: 'Strictly prohibits any level of PHI leakage for all models handling patient data.',
     rules: `
# Applies to all models in production environments.
target:
  environment: 'Production'
requirements:
  - metric: phi_leakage_rate
    threshold: 0.0
    condition: '=='
    `,
    status: 'active',
    modelsApplied: 0,
  },
];

const checkCompliance = (passport: TrustPassport, policy: Policy): 'compliant' | 'non-compliant' | 'not-applicable' => {
    if (passport.status === 'draft' || !passport.verification) return 'not-applicable';

    try {
        const parsedRules = yaml.load(policy.rules) as any;
        if (!parsedRules || !parsedRules.target) return 'not-applicable';

        // Check target match
        let targetMatch = true;
        if (parsedRules.target.use_case && passport.subject.use_case !== parsedRules.target.use_case) {
            targetMatch = false;
        }
        if (parsedRules.target.environment && passport.subject.environment !== parsedRules.target.environment) {
            targetMatch = false;
        }

        if (!targetMatch) return 'not-applicable';

        // Check requirements
        for (const req of parsedRules.requirements) {
            const metricValue = (passport.verification.runs[0].metrics as any)[req.metric];
            if (metricValue === undefined) return 'non-compliant'; // Metric not found

            switch (req.condition) {
                case '>=': if (!(metricValue >= req.threshold)) return 'non-compliant'; break;
                case '<=': if (!(metricValue <= req.threshold)) return 'non-compliant'; break;
                case '==': if (!(metricValue == req.threshold)) return 'non-compliant'; break;
                default: return 'non-compliant'; // Invalid condition
            }
        }

        return 'compliant';

    } catch (e) {
        console.error("Error parsing policy YAML:", e);
        return 'not-applicable';
    }
}

export const usePolicies = () => {
  const [policies, setPolicies] = useState<Policy[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const applyPoliciesToPortfolio = useCallback((currentPolicies: Policy[]) => {
      const portfolioData = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (!portfolioData) return;

      const passports: TrustPassport[] = JSON.parse(portfolioData);
      const activePolicies = currentPolicies.filter(p => p.status === 'active');
      
      let modelsAppliedCounts = Object.fromEntries(currentPolicies.map(p => [p.id, 0]));

      const updatedPassports = passports.map(passport => {
          const policyStatuses = activePolicies.map(policy => {
              const complianceStatus = checkCompliance(passport, policy);
              if (complianceStatus !== 'not-applicable') {
                modelsAppliedCounts[policy.id]++;
              }
              return { policyId: policy.id, policyName: policy.name, status: complianceStatus };
          });
          return { ...passport, policies: policyStatuses };
      });
      
      const updatedPolicies = currentPolicies.map(p => ({ ...p, modelsApplied: modelsAppliedCounts[p.id] || 0 }));

      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(updatedPassports));
      localStorage.setItem(POLICIES_STORAGE_KEY, JSON.stringify(updatedPolicies));
      
      // Force a refresh for other components that might be listening to portfolio changes.
      window.dispatchEvent(new Event('storage'));
      
      return updatedPolicies;
  }, []);
  
  
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedData = localStorage.getItem(POLICIES_STORAGE_KEY);
        let currentPolicies;
        if (storedData) {
          currentPolicies = JSON.parse(storedData);
        } else {
          currentPolicies = initialPolicyData;
        }
        const updatedPolicies = applyPoliciesToPortfolio(currentPolicies);
        setPolicies(updatedPolicies || currentPolicies);
        setLoading(false);
      } catch (err) {
        setError("Failed to load policy data.");
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [applyPoliciesToPortfolio]);

  const updateLocalStorage = (updatedPolicies: Policy[]) => {
    const policiesWithAppliedCount = applyPoliciesToPortfolio(updatedPolicies);
    setPolicies(policiesWithAppliedCount || updatedPolicies);
  };

  const addPolicy = (policy: Omit<Policy, 'id' | 'modelsApplied'>) => {
    const newPolicy: Policy = {
        ...policy,
        id: `pol_${policy.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
        modelsApplied: 0,
    };
    setPolicies(prev => {
        const newPolicies = [newPolicy, ...(prev || [])];
        updateLocalStorage(newPolicies);
        return newPolicies;
    });
  };

  return { policies, loading, error, addPolicy };
};
