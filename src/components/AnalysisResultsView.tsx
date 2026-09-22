import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Eye, 
  CreditCard, 
  CheckSquare, 
  Square, 
  Share2, 
  RotateCcw, 
  ExternalLink,
  ChevronRight,
  Info,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
  Flag
} from 'lucide-react';
import type { AnalysisResult, RiskLevel } from '../types.js';

interface AnalysisResultsViewProps {
  result: AnalysisResult;
  onReset: () => void;
  onOpenReportModal: () => void;
}

export const AnalysisResultsView: React.FC<AnalysisResultsViewProps> = ({
  result,
  onReset,
  onOpenReportModal,
}) => {
  // Local state for interactive "Before You Pay" checklist
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleChecklist = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getRiskColors = (level: RiskLevel) => {
    switch (level) {
      case 'High':
        return {
          text: 'text-rose-400',
          bg: 'bg-rose-500/10 border-rose-500/30',
          border: 'border-rose-500/40',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          meter: 'bg-rose-500',
          ring: 'text-rose-500',
        };
      case 'Medium':
        return {
          text: 'text-amber-400',
          bg: 'bg-amber-500/10 border-amber-500/30',
          border: 'border-amber-500/40',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          meter: 'bg-amber-500',
          ring: 'text-amber-500',
        };
      case 'Low':
      default:
        return {
          text: 'text-emerald-400',
          bg: 'bg-emerald-500/10 border-emerald-500/30',
          border: 'border-emerald-500/40',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          meter: 'bg-emerald-500',
          ring: 'text-emerald-500',
        };
    }
  };

  const riskColors = getRiskColors(result.riskLevel);
  const allChecked = result.beforeYouPayChecklist.length > 0 &&
    result.beforeYouPayChecklist.every((_, idx) => checkedItems[idx]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Bar with Back Button & Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Scan another screenshot</span>
        </button>

        <div className="flex items-center gap-3">
          {result.websiteNameOrUrl && (
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              {result.websiteNameOrUrl}
            </span>
          )}
          <button
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
          >
            <Flag className="w-3.5 h-3.5 text-rose-400" />
            <span>Report This Design</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: RISK INDEX (0-100) */}
      <section className={`p-6 sm:p-8 rounded-2xl bg-slate-900/90 border ${riskColors.border} relative overflow-hidden`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider border ${riskColors.badge}`}>
                {result.riskLevel} Risk Level
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Mathematical Evaluation
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              BetYouPay Risk Index
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {result.riskExplanation}
            </p>
          </div>

          {/* Large Score Dial Card */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0 min-w-[170px]">
            <div className="relative flex items-center justify-center">
              <div className="text-center">
                <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${riskColors.text}`}>
                  {result.riskScore}
                </span>
                <span className="text-slate-500 font-mono text-sm">/100</span>
              </div>
            </div>
            {/* Visual Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full ${riskColors.meter} transition-all duration-500`}
                style={{ width: `${Math.max(4, result.riskScore)}%` }}
              />
            </div>
            <div className="flex justify-between w-full text-[10px] text-slate-500 mt-1 font-mono">
              <span>0 (Safe)</span>
              <span>100 (High)</span>
            </div>
          </div>
        </div>

        {/* Scoring Transparency Card */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Low Severity = 10 pts</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Medium Severity = 20 pts</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>High Severity = 30 pts</span>
          </div>
        </div>

        {/* Strict Mandatory Explanation */}
        <div className="mt-4 p-3 rounded-lg bg-slate-950/40 border border-slate-800/60 text-[11px] text-slate-400 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
          <span>
            This score reflects potential deceptive-design indicators detected in the submitted material. It is not a probability that the website is a scam.
          </span>
        </div>
      </section>

      {/* SECTION 2: "WHAT YOU MIGHT MISS" (IMPORTANT WOW FEATURE) */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 relative shadow-lg">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold">
            👀
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              What You Might Miss
            </h2>
            <p className="text-xs text-slate-400">
              High-priority checkout elements easily overlooked before payment
            </p>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {result.whatYouMightMiss.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm font-medium flex items-start gap-3"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TRUE COST SUMMARY ("💰 Cost Check") */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold">
              💰
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Cost Check
              </h2>
              <p className="text-xs text-slate-400">
                Visible pricing extraction and line-item breakdown
              </p>
            </div>
          </div>
        </div>

        {/* Price Breakdown Grid */}
        <div className="space-y-3 bg-slate-950/70 p-4 sm:p-5 rounded-xl border border-slate-800 mb-5">
          {/* Displayed Base Price */}
          <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-800/80">
            <span className="text-slate-300 font-medium">Displayed headline price</span>
            <span className="font-mono font-bold text-white">
              {result.costCheck.displayedPrice || 'Not clearly displayed'}
            </span>
          </div>

          {/* Visible Additional Fees */}
          {result.costCheck.visibleAdditionalFees.length > 0 && (
            <div className="space-y-1.5 py-1 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                + Visible additional fees
              </span>
              {result.costCheck.visibleAdditionalFees.map((fee, idx) => (
                <div key={idx} className="flex justify-between text-xs text-slate-300 pl-2">
                  <span>{fee.name}</span>
                  <span className="font-mono text-rose-300 font-medium">{fee.amount}</span>
                </div>
              ))}
            </div>
          )}

          {/* Visible Optional Add-ons */}
          {result.costCheck.visibleOptionalAddons.length > 0 && (
            <div className="space-y-1.5 py-1 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                + Visible optional add-ons
              </span>
              {result.costCheck.visibleOptionalAddons.map((addon, idx) => (
                <div key={idx} className="flex justify-between text-xs text-slate-300 pl-2">
                  <span className="flex items-center gap-1.5">
                    {addon.name}
                    {addon.isPreselected && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Pre-selected
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-amber-300 font-medium">{addon.amount}</span>
                </div>
              ))}
            </div>
          )}

          {/* Visible Recurring Charges */}
          {result.costCheck.visibleRecurringCharges.length > 0 && (
            <div className="space-y-1.5 py-1 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                + Visible recurring subscription charges
              </span>
              {result.costCheck.visibleRecurringCharges.map((rec, idx) => (
                <div key={idx} className="flex justify-between text-xs text-slate-300 pl-2">
                  <span>{rec.name} ({rec.frequency})</span>
                  <span className="font-mono text-purple-300 font-medium">{rec.amount}</span>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Line Summary Cards */}
          <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Potential first payment</span>
              <span className="text-lg font-mono font-bold text-white">
                {result.costCheck.potentialFirstPayment || 'Cannot be determined'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Potential recurring charge</span>
              <span className="text-lg font-mono font-bold text-rose-400">
                {result.costCheck.potentialRecurringCharge || 'None detected'}
              </span>
            </div>
          </div>
        </div>

        {/* Cost Note */}
        <p className="text-xs text-slate-400 italic">
          ℹ️ {result.costCheck.costCalculationNote}
        </p>
      </section>

      {/* SECTION 4: DETECTED ISSUES & DARK PATTERNS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Detected Issues &amp; Dark Patterns
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {result.detectedIssues.length} item{result.detectedIssues.length !== 1 ? 's' : ''} evaluated
          </span>
        </div>

        {result.detectedIssues.length === 0 ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <h3 className="font-bold text-emerald-200 text-base">
              No Significant Dark Pattern Detected
            </h3>
            <p className="text-xs sm:text-sm text-emerald-300/80 mt-1 max-w-md mx-auto">
              No significant dark pattern was detected from the information visible in this screenshot.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {result.detectedIssues.map((issue) => {
              const sevBadge = {
                High: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
                Medium: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                Low: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
              }[issue.severity];

              return (
                <div
                  key={issue.id}
                  className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-white text-base">
                      {issue.issueType}
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider border ${sevBadge}`}>
                      {issue.severity} Severity
                    </span>
                  </div>

                  {/* Screenshot Evidence */}
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs">
                    <span className="text-slate-500 font-semibold block mb-0.5">
                      Visible Evidence from Screenshot:
                    </span>
                    <span className="text-slate-300 font-mono italic">
                      &ldquo;{issue.evidence}&rdquo;
                    </span>
                  </div>

                  {/* Impact & Recommendation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-slate-400 font-semibold block mb-0.5">
                        Why this may concern you:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {issue.whyItConcernsUser}
                      </p>
                    </div>
                    <div>
                      <span className="text-emerald-400 font-semibold block mb-0.5">
                        Recommended Action:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {issue.recommendedAction}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 5: "BEFORE YOU PAY" PERSONALIZED CHECKLIST */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold">
              🧾
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Before You Pay
              </h2>
              <p className="text-xs text-slate-400">
                Actionable safety checklist generated specifically for this checkout
              </p>
            </div>
          </div>
          {allChecked && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              All items checked!
            </span>
          )}
        </div>

        <div className="space-y-2.5 mt-4">
          {result.beforeYouPayChecklist.map((item, index) => {
            const isChecked = !!checkedItems[index];
            return (
              <button
                key={index}
                type="button"
                onClick={() => toggleChecklist(index)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3 ${
                  isChecked
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-300'
                    : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 text-white'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'line-through text-slate-400' : ''}`}>
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: COMMUNITY REPORT CTA */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-base">
            Help protect fellow shoppers
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Submit this deceptive design finding to the BetYouPay Community Reports registry.
          </p>
        </div>
        <button
          onClick={onOpenReportModal}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold tracking-wide transition-all shadow-md shadow-rose-950 active:scale-95"
        >
          Report This Design &rarr;
        </button>
      </section>
    </div>
  );
};
