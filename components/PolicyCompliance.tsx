import React from 'react';
import { PolicyCompliance as PolicyComplianceType } from '../types';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from './Icon';

interface PolicyComplianceProps {
  policies?: PolicyComplianceType[];
}

const statusStyles = {
  compliant: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
    label: 'Compliant',
  },
  'non-compliant': {
    bg: 'bg-red-50',
    text: 'text-red-700',
    icon: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
    label: 'Non-Compliant',
  },
  'not-applicable': {
    bg: 'bg-slate-50',
    text: 'text-slate-500',
    icon: <InformationCircleIcon className="h-5 w-5 text-slate-400" />,
    label: 'Not Applicable',
  },
};


const PolicyCompliance: React.FC<PolicyComplianceProps> = ({ policies }) => {
  const applicablePolicies = policies?.filter(p => p.status !== 'not-applicable');

  if (!applicablePolicies || applicablePolicies.length === 0) {
    return (
        <div className="text-center p-12 bg-slate-50 rounded-lg">
            <h3 className="text-lg font-medium text-slate-700">No Active Policies Apply</h3>
            <p className="text-sm text-slate-500 mt-2">This model does not currently match the targeting criteria for any active governance policies.</p>
        </div>
    );
  }
  
  return (
    <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Policy Compliance Status</h2>
        <p className="text-slate-500 mb-6">Status of this Trust Passport against your organization's active governance policies.</p>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                           Policy Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Compliance Status
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {applicablePolicies.map((policy, index) => {
                        const currentStatus = statusStyles[policy.status];
                        return (
                            <tr key={index} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-slate-900">{policy.policyName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentStatus.bg} ${currentStatus.text}`}>
                                        {currentStatus.icon}
                                        <span className="ml-2">{currentStatus.label}</span>
                                    </span>
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

export default PolicyCompliance;
