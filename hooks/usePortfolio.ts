import { useState, useEffect, useCallback } from 'react';
import { TrustPassport } from '../types';
import { generateVerificationData } from '../utils/dataGenerator';
import { initialPortfolioData } from './initialData';

const LOCAL_STORAGE_KEY = 'spectral_portfolio_data';

export const usePortfolio = () => {
  const [passports, setPassports] = useState<TrustPassport[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const timer = setTimeout(() => {
      try {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
          setPassports(JSON.parse(storedData));
        } else {
          // Initialize with mock data if nothing is in localStorage
          setPassports(initialPortfolioData);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialPortfolioData));
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load data from local storage.");
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const updateLocalStorage = (updatedPassports: TrustPassport[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPassports));
  };
  
  const addPassport = (passportData: Omit<TrustPassport, 'id' | 'creationStep'>) => {
    const newPassport: TrustPassport = {
      ...passportData,
      id: `prod_${passportData.subject.product.toLowerCase().replace(/\s/g, '_')}_${Date.now()}`,
      creationStep: 'complete',
    };
    
    setPassports(prev => {
        const newPassports = [newPassport, ...(prev || [])];
        updateLocalStorage(newPassports);
        return newPassports;
    });
  };

  const updatePassport = useCallback((passportId: string, updates: Partial<TrustPassport>) => {
    setPassports(prev => {
        if (!prev) return null;
        const newPassports = prev.map(p => {
            if (p.id === passportId) {
                // If verification is being added
                if(updates.status === 'verified' && !updates.verification) {
                    const verificationData = generateVerificationData();
                    return { ...p, ...updates, ...verificationData };
                }
                return { ...p, ...updates };
            }
            return p;
        });
        updateLocalStorage(newPassports);
        return newPassports;
    });
  }, []);

  return { passports, loading, error, addPassport, updatePassport };
};
