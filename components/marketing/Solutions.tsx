import React, { useState } from 'react';
import { BriefcaseIcon, AcademicCapIcon, CheckCircleIcon } from '../Icon';

const Solutions: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'vendors' | 'systems'>('vendors');

    const vendorFeatures = [
        "Generate auditable evidence mapped to HIPAA, NIST, and ISO.",
        "Create a shareable Trust Page to accelerate sales cycles.",
        "Use the 'Verified by Spectral' badge to build market credibility.",
        "Continuously monitor models in production for drift and new risks.",
    ];

    const systemFeatures = [
        "Get a centralized inventory of all vendor AI models.",
        "Enforce portfolio-wide governance policies automatically.",
        "Receive board-ready reports on AI risk and compliance.",
        "Streamline procurement with standardized, defensible evidence.",
    ];

    return (
        <section id="solutions" className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">A Single Platform for Both Sides of the Table</h2>
                    <p className="mt-4 text-lg text-slate-600">Whether you're building the next generation of healthcare AI or deploying it, Spectral provides the proof you need to move forward, faster.</p>
                </div>

                <div className="mt-12 max-w-4xl mx-auto">
                    <div className="flex justify-center border-b border-slate-200">
                        <button
                            onClick={() => setActiveTab('vendors')}
                            className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold transition-colors ${activeTab === 'vendors' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            <BriefcaseIcon className="w-6 h-6" />
                            For AI Vendors
                        </button>
                        <button
                            onClick={() => setActiveTab('systems')}
                            className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold transition-colors ${activeTab === 'systems' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            <AcademicCapIcon className="w-6 h-6" />
                            For Health Systems
                        </button>
                    </div>

                    <div className="mt-10">
                        {activeTab === 'vendors' && (
                            <div className="grid md:grid-cols-2 gap-10 items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800">Win Deals Faster with Portable Trust</h3>
                                    <p className="mt-3 text-slate-600">Stop wasting months on security questionnaires. Generate a Trust Passport in minutes to prove your model's safety, compliance, and reliability from day one.</p>
                                    <ul className="mt-6 space-y-4">
                                        {vendorFeatures.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mr-3 mt-1" />
                                                <span className="text-slate-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-slate-100 p-8 rounded-lg">
                                     <img src="https://storage.googleapis.com/aistudio-ux-team-public/spectral/vendor_dashboard.png" alt="Vendor Dashboard" className="rounded-md shadow-xl ring-1 ring-slate-200" />
                                </div>
                            </div>
                        )}
                        {activeTab === 'systems' && (
                            <div className="grid md:grid-cols-2 gap-10 items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800">Adopt AI with Defensible Confidence</h3>
                                    <p className="mt-3 text-slate-600">Replace manual checklists with a live, auditable inventory of your AI portfolio. Set policies, monitor for risk, and report to your board with a single click.</p>
                                     <ul className="mt-6 space-y-4">
                                        {systemFeatures.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mr-3 mt-1" />
                                                <span className="text-slate-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-slate-100 p-8 rounded-lg">
                                    <img src="https://storage.googleapis.com/aistudio-ux-team-public/spectral/system_dashboard.png" alt="Health System Dashboard" className="rounded-md shadow-xl ring-1 ring-slate-200" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solutions;
