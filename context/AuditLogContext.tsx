import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { AuditLogEntry, AuditLogContextType } from '../types';

export const AuditLogContext = createContext<AuditLogContextType>({
  logs: [],
  logAction: () => {},
});

export const AuditLogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  const logAction = useCallback((action: string, details: string) => {
    const newLogEntry: AuditLogEntry = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: 'CISO (demo)', // Static user for demo purposes
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
