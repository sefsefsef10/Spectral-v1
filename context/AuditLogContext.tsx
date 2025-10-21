import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { AuditLogEntry, AuditLogContextType } from '../types';

const STORAGE_KEY = 'spectral_audit_log';

const loadLogs = (): AuditLogEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as AuditLogEntry[]) : [];
  } catch (error) {
    console.warn('Failed to parse audit log from storage', error);
    return [];
  }
};

export const AuditLogContext = createContext<AuditLogContextType>({
  logs: [],
  logAction: () => {},
});

export const AuditLogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  useEffect(() => {
    setLogs(loadLogs());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch (error) {
      console.warn('Failed to persist audit log', error);
    }
  }, [logs]);

  const logAction = useCallback((action: string, details: string) => {
    const newLogEntry: AuditLogEntry = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: 'CISO (demo)',
      action,
      details,
    };
    setLogs(prevLogs => [newLogEntry, ...prevLogs]);
  }, []);

  return (
    <AuditLogContext.Provider value={{ logs, logAction }}>
      {children}
    </AuditLogContext.Provider>
  );
};

