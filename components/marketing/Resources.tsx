import React from 'react';
// FIX: Import DocumentTextIcon
import { DownloadIcon, BookOpenIcon, CodeIcon, DocumentTextIcon } from '../Icon';

const ResourceCard: React.FC<{ icon: React.ReactNode; title: string; description: string, cta: string }> = ({ icon, title, description, cta }) => (
    <div className="bg-slate-100 p-8 rounded-xl border border-slate-200">
        <div className="text-blue-600">{icon}</div>
        <h3 className="mt-4 text-xl font-bold text-slate-800">{title}</h3>
        <p className="mt-2 text-slate-600 h-24">{description}</p>
        <button className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-2">
            {cta}
            <DownloadIcon className="w-4 h-4" />
        </button>
    </div>
);

const Resources: React.FC = () => {
    return (
        <section id="resources" className="py-20 md:py-28 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Create the Standard, Together</h2>
                    <p className="mt-4 text-lg text-slate-600">We're committed to building an open ecosystem for AI trust. Use our resources to streamline your procurement process and contribute to the standard.</p>
                </div>
                <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <ResourceCard 
                        icon={<BookOpenIcon className="w-8 h-8"/>}
                        title="The RFP Insert"
                        description="Our Buyer Advisory Council's copy-paste-ready language for requiring a Trust Passport in your next AI procurement RFP."
                        cta="Download the PDF"
                    />
                     <ResourceCard 
                        icon={<CodeIcon className="w-8 h-8"/>}
                        title="Open Trust Passport Schema"
                        description="Review the v1.0 schema on GitHub. We believe in transparency and community contributions to build a lasting standard."
                        cta="View on GitHub"
                    />
                     <ResourceCard 
                        icon={<DocumentTextIcon className="w-8 h-8"/>}
                        title="Mapping Whitepaper"
                        description="A detailed guide on how our engine maps common model behaviors to specific controls in HIPAA, NIST AI RMF, and ISO/IEC 42001."
                        cta="Read the Whitepaper"
                    />
                </div>
            </div>
        </section>
    );
};

export default Resources;