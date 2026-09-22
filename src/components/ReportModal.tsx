import React, { useState } from 'react';
import { X, Flag, Sparkles, CheckCircle2 } from 'lucide-react';
import type { RiskLevel, AnalysisResult } from '../types.js';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: {
    websiteName: string;
    category: string;
    reportedIssue: string;
    riskLevel: RiskLevel;
    aiSummary: string;
    userComment?: string;
  }) => void;
  initialData?: AnalysisResult | null;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  if (!isOpen) return null;

  const [websiteName, setWebsiteName] = useState(initialData?.websiteNameOrUrl || '');
  const [category, setCategory] = useState('E-Commerce & Retail');
  const [reportedIssue, setReportedIssue] = useState(
    initialData?.detectedIssues[0]?.issueType || 'Pre-selected optional add-ons'
  );
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(initialData?.riskLevel || 'Medium');
  const [aiSummary, setAiSummary] = useState(
    initialData?.summary || 'Potential deceptive design pattern detected in checkout workflow.'
  );
  const [userComment, setUserComment] = useState(initialData?.userConcern || '');

  const categories = [
    'E-Commerce & Retail',
    'Subscription & Streaming',
    'Travel & Hospitality',
    'Gym & Fitness',
    'Software & SaaS',
    'Other Web Service',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteName.trim()) {
      alert('Please enter a website name or URL');
      return;
    }

    onSubmit({
      websiteName: websiteName.trim(),
      category,
      reportedIssue: reportedIssue.trim(),
      riskLevel,
      aiSummary: aiSummary.trim(),
      userComment: userComment.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Report a Deceptive Design
              </h3>
              <p className="text-[11px] text-slate-400">
                Share this checkout pattern to help others stay vigilant
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Website Name or URL *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. streaminghub.com"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500/50"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Assessed Risk Level
              </label>
              <select
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500/50"
              >
                <option value="High">High Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="Low">Low Risk</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Reported Issue / Dark Pattern *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Pre-checked insurance, hidden renewal terms..."
              value={reportedIssue}
              onChange={(e) => setReportedIssue(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              AI Analysis Summary *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Summary of why this pattern is deceptive..."
              value={aiSummary}
              onChange={(e) => setAiSummary(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Your Personal Experience / Notes <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={2}
              placeholder="e.g. I was about to click pay when I realized my cart had $6 extra added."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500/50"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-950"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
