import React from 'react';
import { DocumentTextIcon } from '../Icon';

const MarketingFooter: React.FC = () => {
    return (
        <footer className="bg-slate-800 text-slate-300">
            <div className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex items-center">
                            <DocumentTextIcon className="h-8 w-8 text-blue-400" />
                            <span className="ml-2 text-2xl font-bold text-white">Spectral</span>
                        </div>
                        <p className="mt-4 text-slate-400 max-w-sm">The Trust Layer for Healthcare AI. Providing the proof you need to move forward, faster.</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-100 tracking-wider uppercase">Solutions</h4>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#solutions" className="hover:text-white transition-colors">For AI Vendors</a></li>
                            <li><a href="#solutions" className="hover:text-white transition-colors">For Health Systems</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-100 tracking-wider uppercase">Resources</h4>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#resources" className="hover:text-white transition-colors">RFP Insert</a></li>
                            <li><a href="#resources" className="hover:text-white transition-colors">Open Schema</a></li>
                             <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-100 tracking-wider uppercase">Company</h4>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-slate-700 text-center text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} Spectral Technologies, Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default MarketingFooter;
