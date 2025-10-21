import React from 'react';
import { CheckCircleIcon, ArrowRightIcon } from '../Icon';

interface PricingProps {
    onSignIn: () => void;
}

const PricingCard: React.FC<{ plan: string, price: string, audience: string, features: string[], cta: string, isFeatured?: boolean, onCtaClick: () => void }> = ({ plan, price, audience, features, cta, isFeatured, onCtaClick }) => (
    <div className={`rounded-xl border ${isFeatured ? 'border-blue-600' : 'border-slate-200'} p-8 flex flex-col`}>
        <h3 className="text-lg font-semibold text-slate-800">{plan}</h3>
        <p className="text-sm text-slate-500 mt-1">{audience}</p>
        <div className="mt-4 text-4xl font-extrabold text-slate-900">{price}</div>
        <p className="text-sm text-slate-500 mt-1">{plan === 'Verified' ? '/ mo' : ''}</p>
        <ul className="mt-8 space-y-4 text-slate-600 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mr-3 mt-0.5" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <button
            onClick={onCtaClick}
            className={`mt-8 w-full font-semibold py-3 px-6 rounded-lg transition-all ${isFeatured ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
            {cta}
        </button>
    </div>
);


const Pricing: React.FC<PricingProps> = ({ onSignIn }) => {
    return (
        <section id="pricing" className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Plans for Every Stage of the AI Journey</h2>
                    <p className="mt-4 text-lg text-slate-600">Start for free, scale with your needs, and establish enterprise-grade trust. All plans start with a 14-day free trial.</p>
                </div>
                <div className="mt-16 grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <PricingCard
                        plan="Verified"
                        price="$299"
                        audience="For early-stage startups"
                        features={[
                            "Up to 2 models",
                            "20 evaluations / mo",
                            "Public Trust Page & Badge",
                            "Email Support"
                        ]}
                        cta="Get Started Free"
                        onCtaClick={onSignIn}
                    />
                    <PricingCard
                        plan="Deep Assurance"
                        price="$35k+"
                        audience="For scaling enterprise vendors"
                        features={[
                            "Unlimited evaluations",
                            "PDF Audit Packet Generator",
                            "Custom Frameworks & Policies",
                            "Priority Support & BAA"
                        ]}
                        cta="Contact Sales"
                        isFeatured
                        onCtaClick={() => alert("Redirecting to sales contact form.")}
                    />
                     <PricingCard
                        plan="Watchtower"
                        price="Custom"
                        audience="For health systems"
                        features={[
                            "Portfolio-wide Inventory",
                            "Policy Enforcement",
                            "Board-Ready Reporting",
                            "Dedicated CSM"
                        ]}
                        cta="Request a Demo"
                        onCtaClick={() => alert("Redirecting to demo request form.")}
                    />
                </div>
            </div>
        </section>
    );
};

export default Pricing;
