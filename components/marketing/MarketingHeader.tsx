import React from 'react';
import { DocumentTextIcon, ArrowRightIcon } from '../Icon';

interface MarketingHeaderProps {
    onSignIn: () => void;
}

const MarketingHeader: React.FC<MarketingHeaderProps> = ({ onSignIn }) => {
    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                        <span className="ml-2 text-2xl font-bold text-slate-800">Spectral</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
                        <a href="#solutions" className="hover:text-blue-600 transition-colors">Solutions</a>
                        <a href="#methodology" className="hover:text-blue-600 transition-colors">How It Works</a>
                        <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
                        <a href="#resources" className="hover:text-blue-600 transition-colors">Resources</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={onSignIn}
                            className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                            Sign In
                        </button>
                        <button 
                            onClick={onSignIn}
                            className="bg-blue-600 text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm">
                            Get Started Free
                            <ArrowRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default MarketingHeader;
