import React, { useState } from 'react';
import { Policy } from '../types';

interface PolicyEditorProps {
  onClose: () => void;
  onSave: (data: Omit<Policy, 'id' | 'modelsApplied'>) => void;
}

const InputField: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, name, value, onChange }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1">
            <input
                type="text"
                name={name}
                id={name}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md"
                value={value}
                onChange={onChange}
            />
        </div>
    </div>
);

const TextAreaField: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, rows?: number }> = ({ label, name, value, onChange, rows = 8 }) => (
     <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="mt-1">
            <textarea
                name={name}
                id={name}
                rows={rows}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md font-mono text-xs"
                value={value}
                onChange={onChange}
                placeholder={`# Policy rules in YAML format
target:
  use_case: 'clinical-decision-support'
requirements:
  - metric: reliability_score
    threshold: 95
    condition: '>='`}
            />
        </div>
    </div>
)

const PolicyEditor: React.FC<PolicyEditorProps> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        rules: '',
        status: 'draft' as 'draft' | 'active',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-slate-900">Create New Policy</h2>
                    <p className="text-sm text-slate-500 mt-1">Define a new governance policy to apply to your AI models.</p>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-4">
                       <InputField label="Policy Name" name="name" value={formData.name} onChange={handleChange} />
                       <InputField label="Description" name="description" value={formData.description} onChange={handleChange} />
                       <TextAreaField label="Policy Rules (YAML)" name="rules" value={formData.rules} onChange={handleChange} />
                       <div>
                            <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                            <select
                                id="status"
                                name="status"
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="draft">Draft</option>
                                <option value="active">Active</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-b-lg flex justify-end items-center gap-2">
                    <button onClick={onClose} className="bg-white hover:bg-slate-100 text-slate-700 font-medium py-2 px-4 border border-slate-300 rounded-lg shadow-sm">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm">Save Policy</button>
                </div>
            </div>
        </div>
    );
};

export default PolicyEditor;
