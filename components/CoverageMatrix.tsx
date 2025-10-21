import React from 'react';
import { CoverageMatrixItem } from '../types';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from './Icon';

interface CoverageMatrixProps {
  matrix?: CoverageMatrixItem[];
}

const statusStyles = {
  met: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
    label: 'Met',
  },
  partial: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    icon: <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />,
    label: 'Partial',
  },
  'not-met': {
    bg: 'bg-red-50',
    text: 'text-red-700',
    icon: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
    label: 'Not Met',
  },
};

const CoverageMatrix: React.FC<CoverageMatrixProps> = ({ matrix }) => {
  if (!matrix || matrix.length === 0) {
    return <div className="text-center text-slate-500">No coverage matrix data available.</div>;
  }
  
  return (
    <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Compliance Coverage Matrix</h2>
        <p className="text-slate-500 mb-6">Mapping of verification results to healthcare compliance frameworks and standards.</p>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Control / Requirement
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Status
                        </th>
                         <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Notes / Gaps
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Evidence
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {matrix.map((item, index) => {
                        const currentStatus = statusStyles[item.status];
                        return (
                            <tr key={index} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-slate-900">{item.control.split('-')[0]}</div>
                                    <div className="text-sm text-slate-500">{item.control}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentStatus.bg} ${currentStatus.text}`}>
                                        {currentStatus.icon}
                                        <span className="ml-2">{currentStatus.label}</span>
                                    </span>
                                </td>
                                 <td className="px-6 py-4">
                                    <div className="text-sm text-slate-600">{item.gap || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                                    {item.evidence.join(', ')}
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

export default CoverageMatrix;
