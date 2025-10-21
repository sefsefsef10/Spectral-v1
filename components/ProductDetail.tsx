import React, { useState, useContext } from 'react';
// FIX: Removed PolicyCompliance type and non-existent View type from import to resolve conflicts and errors.
import { TrustPassport } from '../types';
import Summary from './Summary';
import VerificationDetails from './VerificationDetails';
import CoverageMatrix from './CoverageMatrix';
import RiskRegister from './RiskRegister';
import PolicyCompliance from './PolicyCompliance';
import ShareModal from './ShareModal';
import VerificationModal from './VerificationModal';
import { AuditLogContext } from '../context/AuditLogContext';
import { ShieldCheckIcon, DownloadIcon, CodeIcon, BeakerIcon, ShareIcon, SignalIcon } from './Icon';

interface ProductDetailProps {
  product: TrustPassport;
  onBack: () => void;
  onUpdate: (passportId: string, updates: Partial<TrustPassport>) => void;
}

const statusStyles = {
  verified: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', icon: <ShieldCheckIcon className="h-5 w-5 text-green-600" />, label: 'Verified' },
  'under-review': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', icon: <ShieldCheckIcon className="h-5 w-5 text-yellow-600" />, label: 'Under Review' },
  expired: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: <ShieldCheckIcon className="h-5 w-5 text-red-600" />, label: 'Expired' },
  draft: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', icon: <ShieldCheckIcon className="h-5 w-5 text-slate-600" />, label: 'Draft' },
};

const ProductHeader: React.FC<{ product: TrustPassport; onBack: () => void; onShare: () => void; onUpdate: (updates: Partial<TrustPassport>) => void; }> = ({ product, onBack, onShare, onUpdate }) => {
  const { logAction } = useContext(AuditLogContext);
  const currentStatus = statusStyles[product.status];
  
  const handleDownload = (type: 'json' | 'pdf') => {
    logAction(`Downloaded ${type.toUpperCase()} Packet`, `Product: ${product.subject.product}`);
    alert(`Downloading ${type.toUpperCase()} for ${product.subject.product}... (This is a demo)`);
  };

  const toggleSentinel = () => {
    const newStatus = product.monitoringStatus === 'active' ? 'inactive' : 'active';
    onUpdate({ monitoringStatus: newStatus });
    logAction(`Sentinel ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`, `Product: ${product.subject.product}`);
  };
  
  const handleApprove = () => {
    onUpdate({ status: 'verified', reviewNotes: 'Approved by CISO via manual review.' });
    logAction('Passport Approved', `Product: ${product.subject.product} moved from Under Review to Verified.`);
  }

  return (
    <header>
      <button onClick={onBack} className="text-sm font-medium text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        Back to Portfolio
      </button>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{product.subject.product}</h1>
          <p className="text-slate-500 mt-1">Trust Passport for <span className="font-semibold text-slate-600">{product.subject.org}</span></p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={toggleSentinel} className={`flex items-center gap-2 font-medium py-2 px-3 border rounded-lg shadow-sm transition-all text-sm ${
            product.monitoringStatus === 'active' 
            ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300'
          }`}>
            <SignalIcon className={`w-5 h-5 ${product.monitoringStatus === 'active' ? 'text-blue-500' : 'text-slate-400'}`}/> 
            {product.monitoringStatus === 'active' ? 'Sentinel Active' : 'Activate Sentinel'}
          </button>
          
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full border ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}>
            {currentStatus.icon}
            <span className="font-semibold text-sm">{currentStatus.label}</span>
          </div>

          {product.status === 'under-review' && (
            <button onClick={handleApprove} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-lg shadow-sm transition-all text-sm">
                Approve Passport
            </button>
          )}

          <button onClick={onShare} disabled={product.status === 'draft'} className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-medium py-2 px-3 border border-slate-300 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <ShareIcon className="w-5 h-5" /> Share
          </button>
          <button onClick={() => handleDownload('pdf')} disabled={product.status === 'draft'} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <DownloadIcon className="w-5 h-5" /> PDF Packet
          </button>
        </div>
      </div>
    </header>
  );
};

const EmptyState: React.FC<{ onVerify: () => void }> = ({ onVerify }) => (
    <div className="text-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl p-12 mt-8">
        <div className="mx-auto bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
            <BeakerIcon className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-800">Ready for Verification</h3>
        <p className="mt-2 text-sm text-slate-500">
            Your product is set up. The next step is to upload your test results to generate the Trust Passport.
        </p>
        <button
            type="button"
            className="mt-6 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
            onClick={onVerify}
        >
            Run First Verification
        </button>
    </div>
);


const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onUpdate }) => {
  type View = 'summary' | 'verification' | 'coverage' | 'risks' | 'policies';
  const [activeView, setActiveView] = useState<View>('summary');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const { logAction } = useContext(AuditLogContext);

  const handleVerificationComplete = () => {
    onUpdate(product.id, { status: 'verified' });
    setIsVerificationModalOpen(false);
    logAction('Verification Complete', `Product: ${product.subject.product}`);
  };

  const hasVerificationData = product.status !== 'draft';

  const renderContent = () => {
    if (!hasVerificationData) return <EmptyState onVerify={() => setIsVerificationModalOpen(true)} />;
    
    switch (activeView) {
      case 'summary': return <Summary passport={product} />;
      case 'verification': return product.verification ? <VerificationDetails verification={product.verification} /> : null;
      case 'coverage': return product.coverage_matrix ? <CoverageMatrix matrix={product.coverage_matrix} /> : null;
      case 'risks': return product.risk_register ? <RiskRegister risks={product.risk_register} /> : null;
      case 'policies': return product.policies ? <PolicyCompliance policies={product.policies} /> : null;
      default: return <Summary passport={product} />;
    }
  };

  const navItems: { id: View, label: string }[] = [
      { id: 'summary', label: 'Summary' },
      { id: 'verification', label: 'Verification Details' },
      { id: 'coverage', label: 'Compliance Coverage' },
      { id: 'risks', label: 'Risk Register' },
      { id: 'policies', label: 'Policy Status'}
  ];

  return (
    <div>
        <ProductHeader product={product} onBack={onBack} onShare={() => setIsShareModalOpen(true)} onUpdate={(updates) => onUpdate(product.id, updates)} />
        {hasVerificationData && (
            <div className="border-b border-slate-200 mt-6">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {navItems.map(item => (
                         <button
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeView === item.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                         >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        )}
        <div className="mt-8">
            {renderContent()}
        </div>
        {isShareModalOpen && (
            <ShareModal passport={product} onClose={() => setIsShareModalOpen(false)} />
        )}
        {isVerificationModalOpen && (
            <VerificationModal
                productName={product.subject.product}
                onClose={() => setIsVerificationModalOpen(false)}
                onComplete={handleVerificationComplete}
            />
        )}
    </div>
  );
};

export default ProductDetail;