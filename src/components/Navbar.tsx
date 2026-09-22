import React from 'react';
import { Shield, Eye, Users, ScanLine, Globe } from 'lucide-react';
import { Language } from '../i18n';

interface NavbarProps {
  currentTab: 'home' | 'scan' | 'community';
  onNavigate: (tab: 'home' | 'scan' | 'community') => void;
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  currentLang = 'en',
  onLanguageChange = () => {}
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          id="nav-brand-button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group text-left transition-opacity hover:opacity-90"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 via-slate-800 to-slate-950 border border-rose-500/40 text-rose-400 shadow-sm shadow-rose-950/50">
            <Shield className="w-5 h-5 text-rose-400" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-mono">
                BetYou<span className="text-rose-400">Pay</span>
              </span>
              <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                v3.8 Flash
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
              Consumer Payment Guard
            </p>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            id="nav-home-tab"
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              currentTab === 'home'
                ? 'bg-slate-800 text-white shadow-inner border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            Home
          </button>
          <button
            id="nav-scan-tab"
            onClick={() => onNavigate('scan')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              currentTab === 'scan'
                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <ScanLine className="w-3.5 h-3.5" />
            Scan
          </button>
          <button
            id="nav-community-tab"
            onClick={() => onNavigate('community')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              currentTab === 'community'
                ? 'bg-slate-800 text-white shadow-inner border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Community
          </button>
        </nav>

        {/* Right CTA & Language Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            <select
              id="language-selector"
              aria-label="Select language"
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs rounded-lg pl-7 pr-2.5 py-1.5 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all cursor-pointer appearance-none"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
              <option value="es">Español</option>
            </select>
          </div>

          <button
            id="nav-cta-scan"
            onClick={() => onNavigate('scan')}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-rose-600/20 active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            Scan Screenshot
          </button>
        </div>
      </div>
    </header>
  );
};
