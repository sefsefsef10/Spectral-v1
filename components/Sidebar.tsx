import React from 'react';
import { HomeIcon, ShieldExclamationIcon, ChartBarIcon, CogIcon, DocumentTextIcon, ScaleIcon } from './Icon';
import { AppView } from '../types';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isComingSoon?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick, isComingSoon }) => (
  <li
    onClick={onClick}
    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
      isActive
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-slate-200 hover:bg-slate-700 hover:text-white'
    }`}
  >
    <span className="mr-3">{icon}</span>
    {label}
    {isComingSoon && <span className="ml-auto text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">Soon</span>}
  </li>
);

interface SidebarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  return (
    <aside className="w-64 h-screen bg-slate-800 text-white flex flex-col sticky top-0">
      <div className="flex items-center justify-center p-6 border-b border-slate-700">
         <DocumentTextIcon className="h-8 w-8 text-blue-400 mr-2" />
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-slate-300">Spectral</span>
        </h1>
      </div>
      <nav className="flex-1 p-4">
        <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Watchtower</p>
        <ul className="space-y-2">
          <NavItem
            icon={<HomeIcon className="h-5 w-5" />}
            label="Portfolio"
            isActive={activeView === 'portfolio' || activeView === 'productDetail'}
            onClick={() => onNavigate('portfolio')}
          />
          <NavItem
            icon={<ScaleIcon className="h-5 w-5" />}
            label="Policies"
            isActive={activeView === 'policies'}
            onClick={() => onNavigate('policies')}
          />
           <NavItem
            icon={<ChartBarIcon className="h-5 w-5" />}
            label="Reports"
            isActive={activeView === 'reports'}
            onClick={() => onNavigate('reports')}
          />
        </ul>
        <p className="px-4 pt-6 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Sentinel</p>
        <ul className="space-y-2">
           <NavItem
            icon={<ShieldExclamationIcon className="h-5 w-5" />}
            label="Monitoring"
            isActive={activeView === 'monitoring'}
            onClick={() => onNavigate('monitoring')}
            isComingSoon
          />
        </ul>
      </nav>
      <div className="p-4 mt-auto border-t border-slate-700">
        <ul>
           <NavItem
              icon={<CogIcon className="h-5 w-5" />}
              label="Settings"
              isActive={activeView === 'settings'}
              onClick={() => onNavigate('settings')}
              isComingSoon
            />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;