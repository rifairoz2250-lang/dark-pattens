import React, { useState, useEffect } from 'react';
import { ShieldAlert, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

export const LoadingState: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Sending image to server-side AI for visual parsing...',
    'Scanning checkout layout, line items, and footnotes...',
    'Detecting pre-selected add-ons and recurring renewal terms...',
    'Checking for artificial urgency timers and low-contrast copy...',
    'Synthesizing BetYouPay Risk Index and True Cost Check...',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      {/* Radar Scan Visual */}
      <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-rose-500/20 animate-ping opacity-75" />
        <div className="absolute inset-2 rounded-full border border-rose-500/30 animate-pulse" />
        <div className="relative w-20 h-20 rounded-2xl bg-slate-900 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-xl shadow-rose-950/60">
          <ShieldAlert className="w-10 h-10 animate-bounce" />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
        <Sparkles className="w-3.5 h-3.5 animate-spin" />
        <span>Gemini 3.8 Flash Analysis in Progress</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
        Scanning Checkout for Hidden Traps
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto mb-8">
        Analyzing every pixel, price tag, checkbox, and cancellation disclosure visible in your screenshot.
      </p>

      {/* Progress Steps */}
      <div className="space-y-2.5 max-w-md mx-auto text-left bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        {steps.map((text, idx) => {
          const isDone = idx < stepIndex;
          const isCurrent = idx === stepIndex;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
                isCurrent ? 'text-white font-semibold' : isDone ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-rose-400 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
              )}
              <span className="truncate">{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
