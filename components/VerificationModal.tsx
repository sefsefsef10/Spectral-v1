import React, { useState, useEffect } from 'react';
import { CheckCircleIcon } from './Icon';

interface VerificationModalProps {
  productName: string;
  onClose: () => void;
  onComplete: () => void;
}

const steps = [
  "Initializing verification run...",
  "Uploading evidence artifacts...",
  "Running PHI leakage scan...",
  "Analyzing for bias and fairness...",
  "Scoring for clinical reliability...",
  "Testing prompt injection resilience...",
  "Mapping results to HIPAA controls...",
  "Mapping results to NIST AI RMF...",
  "Generating coverage matrix...",
  "Finalizing Trust Passport...",
  "Verification complete!"
];

const VerificationModal: React.FC<VerificationModalProps> = ({ productName, onClose, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const progress = (currentStep / (steps.length - 1)) * 100;

    useEffect(() => {
        if (currentStep < steps.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 700); // Simulate time for each step
            return () => clearTimeout(timer);
        } else {
            const completeTimer = setTimeout(onComplete, 1500);
            return () => clearTimeout(completeTimer);
        }
    }, [currentStep, onComplete]);

    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-60 z-50 flex justify-center items-center" aria-modal="true">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4">
                <div className="p-6 text-center">
                     {progress < 100 ? (
                        <>
                            <h2 className="text-xl font-bold text-slate-900">Verifying {productName}</h2>
                            <p className="text-sm text-slate-500 mt-2">This may take a moment. Please don't close this window.</p>
                            <div className="mt-6 w-full bg-slate-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                            </div>
                            <p className="mt-4 text-sm text-slate-600 font-medium h-5">
                                {steps[currentStep]}
                            </p>
                        </>
                     ) : (
                        <div className="flex flex-col items-center">
                            <CheckCircleIcon className="h-16 w-16 text-green-500" />
                             <h2 className="text-xl font-bold text-slate-900 mt-4">Verification Successful!</h2>
                            <p className="text-sm text-slate-500 mt-2">Your Trust Passport for {productName} has been generated.</p>
                        </div>
                     )}
                </div>
            </div>
        </div>
    );
};

export default VerificationModal;
