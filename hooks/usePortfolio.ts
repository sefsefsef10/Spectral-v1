import { useState, useEffect, useCallback } from 'react';
import { TrustPassport } from '../types';
import { runDeterministicVerification } from '../utils/dataGenerator';
import { initialPortfolioData } from './initialData';

const LOCAL_STORAGE_KEY = 'spectral_portfolio_data';

const persist = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to persist portfolio data', error);
  }
};

const read = <T,>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : null;
  } catch (error) {
    console.warn('Failed to read portfolio data', error);
    return null;
  }
};

export const usePortfolio = () => {
  const [passports, setPassports] = useState<TrustPassport[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedData = read<TrustPassport[]>(LOCAL_STORAGE_KEY);
        if (storedData && storedData.length > 0) {
          setPassports(storedData);
        } else {
          setPassports(initialPortfolioData);
          persist(LOCAL_STORAGE_KEY, initialPortfolioData);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load data from local storage.');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const addPassport = (passportData: Omit<TrustPassport, 'id' | 'creationStep'>) => {
    const newPassport: TrustPassport = {
      ...passportData,
      id: `prod_${passportData.subject.product.toLowerCase().replace(/\s/g, '_')}_${Date.now()}`,
      creationStep: 'complete',
    };

    setPassports(prev => {
      const newPassports = [newPassport, ...(prev || [])];
      persist(LOCAL_STORAGE_KEY, newPassports);
      return newPassports;
    });
  };

  const updatePassport = useCallback((passportId: string, updates: Partial<TrustPassport>) => {
    setPassports(prev => {
      if (!prev) return null;

      const next = prev.map(passport => {
        if (passport.id !== passportId) {
          return passport;
        }

        const merged: TrustPassport = { ...passport, ...updates };

        const statusBecomesVerified = updates.status === 'verified' && (!passport.verification || !updates.verification);
        if (statusBecomesVerified) {
          const deterministic = runDeterministicVerification(merged);
          return {
            ...merged,
            ...deterministic,
            status: 'verified',
            monitoringStatus: merged.monitoringStatus === 'inactive' ? 'active' : merged.monitoringStatus,
          };
        }

        return merged;
      });

      persist(LOCAL_STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { passports, loading, error, addPassport, updatePassport };
};

