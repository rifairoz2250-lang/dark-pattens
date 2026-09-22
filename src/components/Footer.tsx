import React from 'react';
import { Shield, HelpCircle, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-400">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-slate-300 font-mono">BetYouPay</span>
            <span className="mx-2">&bull;</span>
            <span>&ldquo;See the trap. Know the cost. Choose before you pay.&rdquo;</span>
          </div>
        </div>

        <div className="max-w-xl text-center md:text-right text-[11px] text-slate-400/90 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> BetYouPay provides AI-assisted analysis for awareness and does not determine whether a business is fraudulent.
            AI evaluations are grounded exclusively on visible design elements and user-provided inputs.
          </p>
        </div>
      </div>
    </footer>
  );
};
