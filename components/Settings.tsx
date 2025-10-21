import React from 'react';
import PlatformHeader from './PlatformHeader';
import AuditLog from './AuditLog';

const Settings: React.FC = () => {
    return (
        <div>
            <PlatformHeader 
                title="Settings & Governance" 
                description="Manage your organization, users, and view the complete audit log." 
            />
            
            <div className="mt-8">
                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800">Audit Log</h2>
                        <p className="text-sm text-slate-500 mt-1">
                            A complete, immutable record of all actions taken within your Spectral workspace.
                        </p>
                    </div>
                    <div className="p-6">
                        <AuditLog />
                    </div>
                 </div>
            </div>

             <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800">Organization</h3>
                    <p className="text-sm text-slate-500 mt-2">Manage your organization's name, billing, and subscription details.</p>
                     <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800">Manage Organization (Coming Soon)</button>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800">User Management</h3>
                    <p className="text-sm text-slate-500 mt-2">Invite new team members and manage roles and permissions.</p>
                    <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800">Manage Users (Coming Soon)</button>
                 </div>
             </div>
        </div>
    );
};

export default Settings;
