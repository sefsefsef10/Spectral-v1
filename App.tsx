import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Portfolio from './components/Portfolio';
import ProductDetail from './components/ProductDetail';
import OnboardingWizard from './components/OnboardingWizard';
import ComingSoon from './components/ComingSoon';
import Policies from './components/Policies';
import Reports from './components/Reports';
import Settings from './components/Settings';
import MarketingSite from './components/marketing/MarketingSite';
import { TrustPassport, AppView } from './types';
import { usePortfolio } from './hooks/usePortfolio';
import { AuditLogProvider } from './context/AuditLogContext';

const viewConfig = {
  monitoring: { title: "Sentinel Monitoring", description: "Continuously monitor live AI models for drift, anomalies, and new risks." },
};


function AppContent() {
  const { passports, loading, error, addPassport, updatePassport } = usePortfolio();
  const [currentView, setCurrentView] = useState<AppView>('portfolio');
  const [selectedPassport, setSelectedPassport] = useState<TrustPassport | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  const [showPlatform, setShowPlatform] = useState<boolean>(false);

  const handleSignIn = () => {
    setShowPlatform(true);
  };
  
  const handleNavigate = (view: AppView) => {
    setSelectedPassport(null); // Clear selection when navigating away
    setCurrentView(view);
  };

  const handleSelectPassport = (passport: TrustPassport) => {
    setSelectedPassport(passport);
    setCurrentView('productDetail');
  };

  const handleBackToPortfolio = () => {
    setSelectedPassport(null);
    setCurrentView('portfolio');
  };

  const handleOpenWizard = () => {
    setIsWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setIsWizardOpen(false);
  };

  const handleSaveNewProduct = (newProductData: Omit<TrustPassport, 'id' | 'creationStep'>) => {
    addPassport(newProductData);
    setIsWizardOpen(false);
    // Don't navigate automatically, let the user see it in the portfolio
    setCurrentView('portfolio');
  };

  const renderContent = () => {
    if (currentView === 'portfolio') {
       return (
          <Portfolio 
            passports={passports}
            loading={loading}
            error={error}
            onSelectPassport={handleSelectPassport} 
            onNewProduct={handleOpenWizard}
          />
       );
    }
    if (currentView === 'productDetail' && selectedPassport) {
      return <ProductDetail product={selectedPassport} onBack={handleBackToPortfolio} onUpdate={updatePassport} />;
    }
    if (currentView === 'policies') {
      return <Policies />;
    }
    if (currentView === 'reports') {
      return <Reports />;
    }
     if (currentView === 'settings') {
      return <Settings />;
    }
    
    const comingSoonInfo = viewConfig[currentView as keyof typeof viewConfig];
    if (comingSoonInfo) {
       return <ComingSoon featureName={comingSoonInfo.title} featureDescription={comingSoonInfo.description} />;
    }
    
    // Fallback to portfolio
    return (
      <Portfolio 
        passports={passports}
        loading={loading}
        error={error}
        onSelectPassport={handleSelectPassport} 
        onNewProduct={handleOpenWizard}
      />
    );
  };

  if (!showPlatform) {
    return <MarketingSite onSignIn={handleSignIn} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeView={currentView} onNavigate={handleNavigate} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
      {isWizardOpen && (
        <OnboardingWizard onClose={handleCloseWizard} onSave={handleSaveNewProduct} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuditLogProvider>
      <AppContent />
    </AuditLogProvider>
  )
}

export default App;
