import React, { useState } from 'react';
import { TrustPassport } from '../types';
import { generatePassportSummary } from '../services/geminiService';
import { SparklesIcon } from './Icon';

interface SummaryProps {
    passport: TrustPassport;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
        <div className="space-y-3">{children}</div>
    </div>
);

const InfoItem: React.FC<{ label: string; value: string | React.ReactNode }> = ({ label, value }) => (
    <div className="flex justify-between items-start text-sm">
        <p className="text-slate-500">{label}</p>
        <p className="text-slate-700 font-medium text-right">{value}</p>
    </div>
);

const AiSummary: React.FC<{ passport: TrustPassport }> = ({ passport }) => {
    const [summary, setSummary] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateSummary = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await generatePassportSummary(passport);
            setSummary(result);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    // Check if API_KEY is missing
    if (!process.env.API_KEY) {
        return (
             <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-6">
                <h4 className="font-semibold text-amber-800">Gemini AI Summary Disabled</h4>
                <p className="text-sm text-amber-700 mt-1">Please set the `API_KEY` environment variable to enable this feature.</p>
            </div>
        )
    }

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">AI-Generated Executive Summary</h3>
            {!summary && !isLoading && (
                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <SparklesIcon className="w-8 h-8 text-blue-600"/>
                    </div>
                    <p className="mt-4 text-slate-600">Get a quick, AI-powered overview of this Trust Passport.</p>
                    <button
                        onClick={handleGenerateSummary}
                        disabled={isLoading}
                        className="mt-4 bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-all shadow-sm disabled:bg-slate-400"
                    >
                        Generate Summary
                    </button>
                 </div>
            )}
            {isLoading && (
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                </div>
            )}
            {error && <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>}
            {summary && (
                <div
                    className="prose prose-sm max-w-none bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
                    dangerouslySetInnerHTML={{ __html: summary }}
                />
            )}
        </div>
    );
};


const Summary: React.FC<SummaryProps> = ({ passport }) => {
    const { subject, vendor_attestation, issued_at, expiration } = passport;

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <InfoCard title="Model Details">
                    <InfoItem label="Product" value={subject.product} />
                    <InfoItem label="Provider / Base Model" value={subject.model.provider} />
                    <InfoItem label="Model Version" value={subject.model.version} />
                    <InfoItem label="Environment" value={subject.environment} />
                </InfoCard>

                <InfoCard title="Scope & Use Case">
                    <InfoItem label="Organization" value={subject.org} />
                    <InfoItem label="Intended Use Case" value={subject.use_case} />
                    <InfoItem label="Customizations" value={
                        <ul className="text-right">
                           {subject.model.customizations.map(c => <li key={c}>{c}</li>)}
                        </ul>
                    } />
                </InfoCard>

                <InfoCard title="Attestation & Validity">
                    <InfoItem label="Issued On" value={new Date(issued_at).toLocaleDateString()} />
                    <InfoItem label="Expires On" value={new Date(expiration).toLocaleDateString()} />
                    <InfoItem label="Signed By" value={vendor_attestation?.signer || 'N/A'} />
                    <InfoItem label="Signer Role" value={vendor_attestation?.role || 'N/A'} />
                </InfoCard>
            </div>
            <AiSummary passport={passport} />
        </div>
    );
};

export default Summary;
