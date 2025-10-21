import React from 'react';
import { ServerIcon, BeakerIcon, DocumentTextIcon, CheckCircleIcon } from '../Icon';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-800">{title}</h3>
        <p className="mt-2 text-slate-600">{children}</p>
    </div>
);


const Methodology: React.FC = () => {
    return (
        <section id="methodology" className="py-20 md:py-28 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">How We Turn Evidence Into Assurance</h2>
                    <p className="mt-4 text-lg text-slate-600">Our platform combines automated testing with best-practice governance to create a Trust Passport that is both rigorous and easy to understand.</p>
                </div>

                <div className="mt-16 grid md:grid-cols-3 gap-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-300 hidden md:block"></div>
                     <div className="absolute top-1/2 left-0 w-full flex justify-around hidden md:flex">
                        <div className="bg-slate-50 px-4">
                            <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                        </div>
                        <div className="bg-slate-50 px-4">
                            <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                        </div>
                    </div>

                    <div className="text-center z-10 bg-slate-50 p-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-blue-600 bg-white text-blue-600 text-2xl font-bold">1</div>
                        <h3 className="mt-4 text-xl font-bold text-slate-800">Ingest & Verify</h3>
                        <p className="mt-2 text-slate-600">Connect your existing testing suites (like Promptfoo or Giskard) or use our generic runner to upload model evaluation results. We hash and timestamp all evidence for an immutable audit trail.</p>
                    </div>
                     <div className="text-center z-10 bg-slate-50 p-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-blue-600 bg-white text-blue-600 text-2xl font-bold">2</div>
                        <h3 className="mt-4 text-xl font-bold text-slate-800">Analyze & Map</h3>
                        <p className="mt-2 text-slate-600">Our healthcare-native test packs run checks for PHI leakage, bias, hallucination, and more. The results are automatically mapped against key controls from HIPAA, NIST AI RMF, and other standards.</p>
                    </div>
                     <div className="text-center z-10 bg-slate-50 p-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-blue-600 bg-white text-blue-600 text-2xl font-bold">3</div>
                        <h3 className="mt-4 text-xl font-bold text-slate-800">Report & Share</h3>
                        <p className="mt-2 text-slate-600">Generate the final Trust Passport: a portable, auditable packet with a shareable Trust Page. Use it to unblock procurement, build partner confidence, and prove your commitment to responsible AI.</p>
                    </div>
                </div>
                 <div className="mt-20 text-center max-w-3xl mx-auto">
                     <h3 className="text-2xl font-bold text-slate-900">Governed by Our Rubric Council</h3>
                     <p className="mt-3 text-slate-600">
                         To ensure our testing methodologies remain neutral, defensible, and up-to-date, all Spectral test packs and mapping rules are versioned and maintained by our internal Rubric Council, composed of clinical, security, and compliance experts.
                     </p>
                 </div>
            </div>
        </section>
    );
};

export default Methodology;
