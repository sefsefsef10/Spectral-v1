import React, { useState } from 'react';
import { generateFeatureSummary } from '../services/geminiService';
import { SparklesIcon } from './Icon';
import PlatformHeader from './PlatformHeader';

interface ComingSoonProps {
    featureName: string;
    featureDescription: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ featureName, featureDescription }) => {
    const [summary, setSummary] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateSummary = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateFeatureSummary(featureName);
            setSummary(result);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const isApiKeyMissing = !process.env.API_KEY;

    return (
        <div>
            <PlatformHeader title={`${featureName} is Coming Soon!`} description={featureDescription} />
            <div className="mt-8 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                <div className="max-w-2xl mx-auto text-center">
                     <div className="inline-block bg-blue-100 text-blue-600 p-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-slate-800">We're Building Something Great</h2>
                    <p className="mt-2 text-slate-600">
                        This part of the Spectral platform is under active development. Check back soon for updates!
                    </p>
                </div>
            </div>

            <div className="mt-6">
                {isApiKeyMissing ? (
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-6 text-center">
                        <h4 className="font-semibold text-amber-800">Gemini AI Summary Disabled</h4>
                        <p className="text-sm text-amber-700 mt-1">Set the `API_KEY` environment variable to get an AI-powered sneak peek.</p>
                    </div>
                ) : (
                    <>
                        {!summary && !isLoading && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col items-center text-center">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <SparklesIcon className="w-8 h-8 text-blue-600" />
                                </div>
                                <p className="mt-4 text-slate-600">Want a sneak peek? Let AI summarize this upcoming feature from our Product Roadmap.</p>
                                <button
                                    onClick={handleGenerateSummary}
                                    disabled={isLoading}
                                    className="mt-4 bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-all shadow-sm disabled:bg-slate-400"
                                >
                                    {isLoading ? 'Generating...' : `Tell Me About ${featureName}`}
                                </button>
                            </div>
                        )}
                        {isLoading && (
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse">
                                <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto mb-6"></div>
                                <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
                                <div className="h-4 bg-slate-200 rounded w-5/6 mb-4 mx-auto"></div>
                                <div className="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
                                <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
                                <div className="h-4 bg-slate-200 rounded w-full"></div>
                            </div>
                        )}
                        {error && <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>}
                        {summary && (
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                   <SparklesIcon className="w-6 h-6 text-blue-500" />
                                   AI-Generated Feature Preview
                                </h3>
                               <div
                                    className="prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: summary }}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ComingSoon;
