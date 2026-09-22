import { TRANSLATIONS, Language } from "../i18n.js";
import React from 'react';
import { 
  ShieldAlert, 
  Eye, 
  Users, 
  AlertTriangle, 
  CreditCard, 
  Clock, 
  MousePointerClick, 
  Layers, 
  HelpCircle,
  FileCheck2,
  ChevronRight,
  Sparkles,
  Lock
} from 'lucide-react';
import { DEMO_SAMPLES } from '../demoData.js';
import type { DemoSample } from '../types.js';

interface HomeViewProps {
  currentLang?: Language;
  onStartScan: () => void;
  onViewCommunity: () => void;
  onSelectSample: (sample: DemoSample) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartScan,
  onViewCommunity,
  onSelectSample,
}) => {
  const threats = [
    {
      icon: Layers,
      title: 'Pre-Selected Add-ons',
      desc: 'Default-checked insurance, warranties, or premium expedited fees slipped into your cart.',
      color: 'text-amber-400',
      bg: 'bg-amber-400/10 border-amber-400/20',
    },
    {
      icon: CreditCard,
      title: 'Recurring Subscription Traps',
      desc: 'One-time purchases or free trials that silently bind you to periodic monthly renewals.',
      color: 'text-rose-400',
      bg: 'bg-rose-400/10 border-rose-400/20',
    },
    {
      icon: Eye,
      title: 'Hidden & Obscured Fees',
      desc: 'Surcharges, facility fees, or service tariffs buried in 8pt low-contrast gray footnotes.',
      color: 'text-orange-400',
      bg: 'bg-orange-400/10 border-orange-400/20',
    },
    {
      icon: MousePointerClick,
      title: 'Misleading Action Buttons',
      desc: 'Deceptive buttons where clicking "Continue" actually enrolls you into recurring billing.',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10 border-blue-400/20',
    },
    {
      icon: Clock,
      title: 'Urgency & Pressure Tactics',
      desc: 'Artificial countdown clocks and synthetic countdowns designed to rush your verification.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10 border-yellow-400/20',
    },
    {
      icon: FileCheck2,
      title: 'Hostage Cancellation Terms',
      desc: 'Complex in-person or certified postal mail cancellation hurdles hidden before purchase.',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10 border-purple-400/20',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Subtle glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Security badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 text-xs font-medium mb-6">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Consumer Cybersecurity &amp; Deceptive Design Detection</span>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-mono mb-4">
          BetYou<span className="text-rose-400">Pay</span>
        </h1>

        {/* Main Tagline */}
        <p className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight max-w-2xl mx-auto mb-4">
          &ldquo;Spot sneaky checkout tricks before you pay&rdquo;
        </p>

        {/* Short explanation */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
          BetYouPay uses AI to help you spot potentially deceptive checkout and subscription designs before you click Pay.
        </p>

        {/* Core Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <button
            id="home-hero-scan-btn"
            onClick={onStartScan}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-rose-950 hover:shadow-rose-600/25 active:scale-95"
          >
            <Eye className="w-4 h-4" />
            Scan a Screenshot
          </button>
          <button
            id="home-hero-community-btn"
            onClick={onViewCommunity}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm tracking-wide transition-all active:scale-95"
          >
            <Users className="w-4 h-4 text-slate-400" />
            Community Reports
          </button>
        </div>

        {/* Strict Mandatory Disclaimer */}
        <div className="max-w-2xl mx-auto p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 text-center flex items-center justify-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
          <span>
            <strong>Disclaimer:</strong> BetYouPay provides AI-assisted analysis for awareness and does not determine whether a business is fraudulent.
          </span>
        </div>
      </section>

      {/* Interactive Demo Test Drive (Hackathon Ready) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-1 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Hackathon Demonstration</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Test with Real Checkout Scenarios
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Don&apos;t have a checkout screenshot handy? Click any scenario to run a live analysis:
              </p>
            </div>
            <button
              id="home-custom-upload-btn"
              onClick={onStartScan}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
            >
              Upload custom screenshot <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEMO_SAMPLES.map((sample) => {
              const badgeColors = {
                High: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
                Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
                Low: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
              }[sample.expectedRisk];

              return (
                <button
                  key={sample.id}
                  id={`demo-sample-${sample.id}`}
                  onClick={() => onSelectSample(sample)}
                  className="group flex flex-col text-left p-4 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-900 mb-3 border border-slate-800 group-hover:border-slate-700">
                    <img
                      src={sample.dataUrl}
                      alt={sample.name}
                      className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${badgeColors}`}>
                        {sample.expectedRisk} Risk ({sample.expectedScore})
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-200 text-sm group-hover:text-white line-clamp-1">
                    {sample.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed flex-grow">
                    {sample.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-rose-400 font-semibold">
                    <span>Analyze This &rarr;</span>
                    <span className="text-[11px] text-slate-500 font-normal">{sample.category}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Threats We Detect */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            What BetYouPay Checks For
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Our multimodal AI scans checkout visual elements, pricing hierarchies, and contract footnotes for potential consumer hazards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {threats.map((threat, index) => {
            const Icon = threat.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${threat.bg} ${threat.color} mb-3.5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">
                  {threat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {threat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* The 5-Step Core Flow Explanation */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Consumer Protection Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              How BetYouPay translates complex visual checkout designs into objective safety insights:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold font-mono text-sm mx-auto mb-3">
                1
              </div>
              <h3 className="font-bold text-white text-sm mb-1">Visual Multimodal OCR</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extracts displayed prices, checkboxes, footnotes, countdowns, and button copy directly from your screenshot.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold font-mono text-sm mx-auto mb-3">
                2
              </div>
              <h3 className="font-bold text-white text-sm mb-1">Mathematical Risk Index</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aggregates detected issues into an objective 0–100 score based on severity (Low = 10, Medium = 20, High = 30).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold font-mono text-sm mx-auto mb-3">
                3
              </div>
              <h3 className="font-bold text-white text-sm mb-1">True Cost Check</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tallies mandatory fees, pre-checked add-ons, and recurring subscription dues so you know the real bottom line.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
