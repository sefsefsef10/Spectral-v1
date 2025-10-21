import React, { useState } from 'react';
import { TrustPassport } from '../types';
import { ClipboardCopyIcon, CheckCircleIcon, ShieldCheckIcon } from './Icon';

interface ShareModalProps {
  passport: TrustPassport;
  onClose: () => void;
}

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleCopy}
            className={`absolute top-2 right-2 p-1.5 rounded-md transition-colors ${copied ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
        >
            {copied ? <CheckCircleIcon className="w-5 h-5" /> : <ClipboardCopyIcon className="w-5 h-5" />}
        </button>
    );
};

const ShareModal: React.FC<ShareModalProps> = ({ passport, onClose }) => {
    const publicUrl = `https://trust.spectral.com/passport/${passport.id}`;
    const badgeSnippet = `<a href="${publicUrl}" target="_blank"><img src="https://trust.spectral.com/badge/${passport.id}/verified.svg" alt="Verified by Spectral" /></a>`;

    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-60 z-50 flex justify-center items-center" aria-modal="true" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Share Your Trust Passport</h2>
                        <p className="text-sm text-slate-500 mt-1">Provide this link to partners or embed the badge on your site.</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <label htmlFor="publicUrl" className="block text-sm font-medium text-slate-700 mb-1">Public Trust Page URL</label>
                        <div className="relative">
                            <input
                                id="publicUrl"
                                type="text"
                                readOnly
                                value={publicUrl}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md bg-slate-50"
                            />
                            <CopyButton textToCopy={publicUrl} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Embeddable Badge</label>
                        <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center">
                             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-300 shadow-sm">
                                <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
                                <span className="text-sm font-semibold text-slate-700">Verified by</span>
                                <span className="text-sm font-bold text-slate-800">Spectral</span>
                            </div>
                        </div>
                        <div className="relative mt-2">
                            <pre className="bg-slate-900 text-white rounded-md p-4 text-xs overflow-x-auto">
                                <code className="language-html">{badgeSnippet}</code>
                            </pre>
                            <CopyButton textToCopy={badgeSnippet} />
                        </div>
                    </div>
                </div>
                 <div className="p-4 bg-slate-50 rounded-b-lg flex justify-end">
                    <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm">Done</button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
