import React from 'react';
import MarketingHeader from './MarketingHeader';
import Hero from './Hero';
import TrustedBy from './TrustedBy';
import Solutions from './Solutions';
import Methodology from './Methodology';
import Pricing from './Pricing';
import Resources from './Resources';
import ROI from './ROI';
import MarketingFooter from './MarketingFooter';

interface MarketingSiteProps {
  onSignIn: () => void;
}

const MarketingSite: React.FC<MarketingSiteProps> = ({ onSignIn }) => {
  return (
    <div className="bg-white text-slate-800 antialiased">
      <MarketingHeader onSignIn={onSignIn} />
      <main>
        <Hero onSignIn={onSignIn} />
        <TrustedBy />
        <Solutions />
        <Methodology />
        <ROI />
        <Resources />
        <Pricing onSignIn={onSignIn} />
      </main>
      <MarketingFooter />
    </div>
  );
};

export default MarketingSite;