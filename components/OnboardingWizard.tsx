import React, { useState, useContext } from 'react';
import { TrustPassport, CreationStep } from '../types';
import { AuditLogContext } from '../context/AuditLogContext';

interface OnboardingWizardProps {
  onClose: () => void;
  onSave: (data: Omit<TrustPassport, 'id' | 'creationStep'>) => void;
}

const InputField: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }> = ({ label, name, value, onChange, placeholder }) => (
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
                placeholder={placeholder}
            />
        </div>
    </div>
);

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onClose, onSave }) => {
    const [step, setStep] = useState<CreationStep>('product');
    const [formData, setFormData] = useState({
        org: 'My AI Company',
        product: 'Clinical Assistant',
        use_case: 'Radiology Report Summarization',
        provider: 'openai:gpt-4o-mini',
        version: new Date().toISOString().split('T')[0],
        customizations: 'System Prompts',
        environment: 'Production',
    });
    const { logAction } = useContext(AuditLogContext);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleNext = () => {
        if (step === 'product') setStep('model');
        else if (step === 'model') setStep('environment');
    };
    
    const handleBack = () => {
        if (step === 'environment') setStep('model');
        else if (step === 'model') setStep('product');
    };
    
    const handleSave = () => {
        const newProduct: Omit<TrustPassport, 'id' | 'creationStep'> = {
            passport_version: "0.1",
            issued_at: new Date().toISOString(),
            subject: {
                org: formData.org,
                product: formData.product,
                use_case: formData.use_case,
                model: {
                    provider: formData.provider,
                    version: formData.version,
                    customizations: formData.customizations.split(',').map(s => s.trim()),
                },
                environment: formData.environment,
            },
            status: 'draft',
            monitoringStatus: 'inactive',
            overallCompliance: 0,
            expiration: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
            policies: [],
        };
        onSave(newProduct);
        logAction('Product Created', `New product draft created: ${formData.product}`);
    };

    const renderStep = () => {
        switch(step) {
            case 'product':
                return (
                    <div className="space-y-4">
                        <InputField label="Organization Name" name="org" value={formData.org} onChange={handleChange} placeholder="e.g., AcmeAI" />
                        <InputField label="Product Name" name="product" value={formData.product} onChange={handleChange} placeholder="e.g., Acme Triage" />
                        <InputField label="Intended Use Case" name="use_case" value={formData.use_case} onChange={handleChange} placeholder="e.g., ER Intake Triage" />
                    </div>
                );
            case 'model':
                return (
                     <div className="space-y-4">
                        <InputField label="Provider / Base Model" name="provider" value={formData.provider} onChange={handleChange} placeholder="e.g., openai:gpt-4o-mini" />
                        <InputField label="Model Version" name="version" value={formData.version} onChange={handleChange} placeholder="e.g., 2025-09-15" />
                        <InputField label="Customizations (comma-separated)" name="customizations" value={formData.customizations} onChange={handleChange} placeholder="e.g., Fine-tuning, System Prompts" />
                    </div>
                );
            case 'environment':
                 return (
                     <div className="space-y-4">
                        <InputField label="Environment" name="environment" value={formData.environment} onChange={handleChange} placeholder="e.g., Production" />
                    </div>
                );
            default: return null;
        }
    }
    
    const stepTitles = {
        product: "Create a New Product",
        model: "Define Your Model",
        environment: "Specify the Environment"
    }

    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-slate-900">{stepTitles[step]}</h2>
                    <p className="text-sm text-slate-500 mt-1">Step {step === 'product' ? 1 : step === 'model' ? 2 : 3} of 3</p>
                </div>
                <div className="p-6">
                    {renderStep()}
                </div>
                <div className="p-4 bg-slate-50 rounded-b-lg flex justify-between items-center">
                    <button onClick={onClose} className="text-sm font-medium text-slate-600 hover:text-slate-800">Cancel</button>
                    <div className="flex gap-2">
                        {step !== 'product' && (
                            <button onClick={handleBack} className="bg-white hover:bg-slate-100 text-slate-700 font-medium py-2 px-4 border border-slate-300 rounded-lg shadow-sm">Back</button>
                        )}
                        {step !== 'environment' ? (
                            <button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm">Next</button>
                        ) : (
                            <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm">Save Product</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingWizard;
