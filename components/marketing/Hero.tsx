import React from 'react';
import { ArrowRightIcon, CheckCircleIcon } from '../Icon';

interface HeroProps {
    onSignIn: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSignIn }) => {
    return (
        <section className="py-20 md:py-32 bg-slate-50">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">The Trust Layer for Healthcare AI</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">Turn Black-Box AI Into Portable Trust.</h1>
                    <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
                        Spectral is the neutral verification platform that helps AI vendors prove their models are safe, compliant, and reliable—and helps health systems adopt them with confidence.
                    </p>
                    <div className="mt-8 flex justify-center items-center gap-4">
                        <button
                            onClick={onSignIn}
                            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-md text-lg"
                        >
                            Create Your First Trust Passport
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="mt-6 flex justify-center items-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5"><CheckCircleIcon className="w-4 h-4 text-green-500" /> No credit card required</div>
                        <div className="flex items-center gap-1.5"><CheckCircleIcon className="w-4 h-4 text-green-500" /> Get started in minutes</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
