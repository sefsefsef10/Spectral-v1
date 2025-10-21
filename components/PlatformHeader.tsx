import React from 'react';

interface PlatformHeaderProps {
  title: string;
  description: string;
}

const PlatformHeader: React.FC<PlatformHeaderProps> = ({ title, description }) => {
  return (
    <header>
      <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
      <p className="text-slate-500 mt-1">{description}</p>
    </header>
  );
};

export default PlatformHeader;
