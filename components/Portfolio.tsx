import React from 'react';
import { TrustPassport } from '../types';
import PlatformHeader from './PlatformHeader';
import { ShieldCheckIcon, SignalIcon } from './Icon';

const PortfolioCard: React.FC<{ passport: TrustPassport; onSelect: () => void }> = ({ passport, onSelect }) => {
  const statusStyles = {
    verified: { text: 'text-green-600', bg: 'bg-green-100' },
    'under-review': { text: 'text-yellow-600', bg: 'bg-yellow-100' },
    expired: { text: 'text-red-600', bg: 'bg-red-100' },
    draft: { text: 'text-slate-600', bg: 'bg-slate-100' },
  };
  
  const currentStatus = statusStyles[passport.status];
  
  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-lg font-bold text-slate-800">{passport.subject.product}</h2>
                <p className="text-sm text-slate-500">{passport.subject.org}</p>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${currentStatus.bg} ${currentStatus.text}`}>
                <ShieldCheckIcon className="w-4 h-4" />
                <span>{passport.status.charAt(0).toUpperCase() + passport.status.slice(1).replace('-', ' ')}</span>
            </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-slate-500">Compliance</p>
                    <p className="font-semibold text-slate-700">{passport.overallCompliance || 'N/A'}%</p>
                </div>
                <div>
                    <p className="text-slate-500">Monitoring</p>
                    <p className={`font-semibold flex items-center gap-1.5 ${passport.monitoringStatus === 'active' ? 'text-blue-600' : 'text-slate-500'}`}>
                       <SignalIcon className="w-4 h-4" />
                       {passport.monitoringStatus === 'active' ? 'Active' : 'Inactive'}
                    </p>
                </div>
                 <div>
                    <p className="text-slate-500">Use Case</p>
                    <p className="font-semibold text-slate-700 truncate">{passport.subject.use_case}</p>
                </div>
                 <div>
                    <p className="text-slate-500">Expires</p>
                    <p className="font-semibold text-slate-700">{new Date(passport.expiration).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

interface PortfolioProps {
    passports: TrustPassport[] | null;
    loading: boolean;
    error: string | null;
    onSelectPassport: (passport: TrustPassport) => void;
    onNewProduct: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ passports, loading, error, onSelectPassport, onNewProduct }) => {

  if (loading || !passports) {
    return (
        <div>
            <PlatformHeader title="AI Trust Portfolio" description="An inventory of all third-party AI models and their associated Trust Passports." />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/2 mb-6"></div>
                        <div className="h-px bg-slate-200 w-full mb-4"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="h-4 bg-slate-200 rounded w-2/3 mb-1"></div>
                                <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                            </div>
                             <div>
                                <div className="h-4 bg-slate-200 rounded w-2/3 mb-1"></div>
                                <div className="h-5 bg-slate-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
  }

  if (error) {
    return <div className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>;
  }

  return (
    <div>
        <div className="flex justify-between items-center">
            <PlatformHeader title="AI Trust Portfolio" description="An inventory of all third-party AI models and their associated Trust Passports." />
            <button
                onClick={onNewProduct}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create New Product
            </button>
        </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {passports.map(passport => (
          <PortfolioCard key={passport.id} passport={passport} onSelect={() => onSelectPassport(passport)} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;