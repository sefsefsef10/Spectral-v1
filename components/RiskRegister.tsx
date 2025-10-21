import React from 'react';
import { RiskRegisterItem } from '../types';

interface RiskRegisterProps {
  risks?: RiskRegisterItem[];
}

const severityStyles = {
  low: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    label: 'Low',
  },
  medium: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    label: 'Medium',
  },
  high: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    label: 'High',
  },
  critical: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Critical',
  },
};

const RiskRegister: React.FC<RiskRegisterProps> = ({ risks }) => {
  if (!risks || risks.length === 0) {
    return <div className="text-center text-slate-500">No risk register data available.</div>;
  }

  return (
    <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Risk Register</h2>
        <p className="text-slate-500 mb-6">Identified risks and their corresponding mitigation strategies.</p>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Risk ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Severity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Mitigation Plan
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {risks.map((risk, index) => {
                        const currentSeverity = severityStyles[risk.severity];
                        return (
                            <tr key={index} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-mono text-slate-500">{risk.id}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-slate-900">{risk.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${currentSeverity.bg} ${currentSeverity.text}`}>
                                        {currentSeverity.label}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-slate-600">{risk.mitigation}</div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default RiskRegister;
