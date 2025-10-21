import React, { useState, useContext } from 'react';
import { Policy } from '../types';
import { usePolicies } from '../hooks/usePolicies';
import PlatformHeader from './PlatformHeader';
import PolicyEditor from './PolicyEditor';
import { ScaleIcon } from './Icon';
import { AuditLogContext } from '../context/AuditLogContext';

const PolicyCard: React.FC<{ policy: Policy }> = ({ policy }) => {
    const statusStyles = {
        active: { text: 'text-green-700', bg: 'bg-green-100', label: 'Active' },
        draft: { text: 'text-slate-600', bg: 'bg-slate-100', label: 'Draft' },
    };
    const currentStatus = statusStyles[policy.status];

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <h2 className="text-lg font-bold text-slate-800">{policy.name}</h2>
                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${currentStatus.bg} ${currentStatus.text}`}>
                        {currentStatus.label}
                    </span>
                </div>
                <p className="text-sm text-slate-500 mt-2 h-10">{policy.description}</p>
                 <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Models Applied</span>
                        <span className="font-semibold text-slate-700">{policy.modelsApplied}</span>
                    </div>
                 </div>
            </div>
        </div>
    )
}

const Policies: React.FC = () => {
    const { policies, loading, error, addPolicy } = usePolicies();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const { logAction } = useContext(AuditLogContext);

    const handleSavePolicy = (newPolicyData: Omit<Policy, 'id' | 'modelsApplied'>) => {
        addPolicy(newPolicyData);
        logAction('Policy Created', `New policy draft created: ${newPolicyData.name}`);
    }
    
    const renderContent = () => {
        if (loading || !policies) {
            return (
                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 h-48">
                            <div className="h-5 bg-slate-200 rounded w-3/4 mb-3"></div>
                            <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                             <div className="h-4 bg-slate-200 rounded w-5/6 mb-6"></div>
                            <div className="h-px bg-slate-200 w-full mb-4"></div>
                            <div className="flex justify-between">
                                 <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                                 <div className="h-5 bg-slate-200 rounded w-1/6"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
        
        if (error) {
            return <div className="text-red-500 bg-red-100 p-4 rounded-lg mt-8">{error}</div>;
        }
        
        if (policies.length === 0) {
            return (
                <div className="text-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl p-12 mt-8">
                    <div className="mx-auto bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
                        <ScaleIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-800">No Policies Defined</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Get started by creating your first governance policy.
                    </p>
                </div>
            )
        }

        return (
             <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {policies.map(policy => (
                    <PolicyCard key={policy.id} policy={policy} />
                ))}
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <PlatformHeader title="Governance Policies" description="Define, manage, and enforce AI governance policies across your entire vendor portfolio." />
                 <button
                    onClick={() => setIsEditorOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create New Policy
                </button>
            </div>
            
            {renderContent()}
            
            {isEditorOpen && (
                <PolicyEditor onClose={() => setIsEditorOpen(false)} onSave={handleSavePolicy} />
            )}
        </div>
    );
};

export default Policies;
