import React from 'react';

const TrustedBy: React.FC = () => {
    const logos = [
        { name: 'Providence Digital', src: 'https://storage.googleapis.com/aistudio-ux-team-public/spectral/logos/providence.svg' },
        { name: 'Northwell Health AI', src: 'https://storage.googleapis.com/aistudio-ux-team-public/spectral/logos/northwell.svg' },
        { name: 'CureAI', src: 'https://storage.googleapis.com/aistudio-ux-team-public/spectral/logos/cureai.svg' },
        { name: 'Vitality Health', src: 'https://storage.googleapis.com/aistudio-ux-team-public/spectral/logos/vitality.svg' },
        { name: 'Innovate Health', src: 'https://storage.googleapis.com/aistudio-ux-team-public/spectral/logos/innovate.svg' },
        { name: 'Aether Medical', src: 'https://storage.googleapis.com/aistudio-ux-team-public/spectral/logos/aether.svg' },
    ];

    return (
        <div className="bg-slate-50 py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Trusted by leaders in healthcare and AI
                </h2>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 justify-center items-center">
                    {logos.map(logo => (
                        <div key={logo.name} className="flex justify-center">
                            <img
                                className="h-8 opacity-60 filter grayscale transition hover:filter-none hover:opacity-100"
                                src={logo.src}
                                alt={logo.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustedBy;
