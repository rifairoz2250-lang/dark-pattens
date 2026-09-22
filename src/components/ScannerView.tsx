import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Sparkles, 
  AlertCircle, 
  X, 
  ExternalLink, 
  FileText,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { DEMO_SAMPLES } from '../demoData.js';
import type { DemoSample } from '../types.js';

interface ScannerViewProps {
  onAnalyze: (fileData: { base64Data: string; mimeType: string; previewUrl: string }, websiteUrl?: string, userConcern?: string) => void;
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
  initialSample?: DemoSample | null;
}

export const ScannerView: React.FC<ScannerViewProps> = ({
  onAnalyze,
  isLoading,
  error,
  onClearError,
  initialSample,
}) => {
  const [selectedImage, setSelectedImage] = useState<{
    base64Data: string;
    mimeType: string;
    previewUrl: string;
    fileName?: string;
  } | null>(() => {
    if (initialSample) {
      // Extract base64 from dataUrl if available
      const parts = initialSample.dataUrl.split(',');
      const mime = parts[0]?.match(/:(.*?);/)?.[1] || 'image/svg+xml';
      const base64 = parts[1] || '';
      return {
        base64Data: base64,
        mimeType: mime,
        previewUrl: initialSample.dataUrl,
        fileName: `${initialSample.name}.svg`,
      };
    }
    return null;
  });

  const [websiteUrl, setWebsiteUrl] = useState<string>(initialSample?.websiteUrl || '');
  const [userConcern, setUserConcern] = useState<string>(initialSample?.mockResult?.userConcern || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    onClearError();
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const base64Data = result.split(',')[1] || '';
      setSelectedImage({
        base64Data,
        mimeType: file.type,
        previewUrl: result,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sample: DemoSample) => {
    onClearError();
    const parts = sample.dataUrl.split(',');
    const mime = parts[0]?.match(/:(.*?);/)?.[1] || 'image/svg+xml';
    const base64 = parts[1] || '';
    setSelectedImage({
      base64Data: base64,
      mimeType: mime,
      previewUrl: sample.dataUrl,
      fileName: `${sample.name}.svg`,
    });
    setWebsiteUrl(sample.websiteUrl);
    setUserConcern(sample.mockResult?.userConcern || '');
  };

  const handleTriggerAnalysis = () => {
    if (!selectedImage) return;
    onAnalyze(
      {
        base64Data: selectedImage.base64Data,
        mimeType: selectedImage.mimeType,
        previewUrl: selectedImage.previewUrl,
      },
      websiteUrl.trim() || undefined,
      userConcern.trim() || undefined
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
          <span>Multimodal Payment Inspection</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Upload a checkout screenshot and we&apos;ll look for things you might miss.
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Upload an e-commerce checkout screen, subscription trial prompt, or airline booking summary.
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-rose-200">Analysis Error</h4>
            <p className="text-xs text-rose-300/90 mt-0.5">{error}</p>
          </div>
          <button
            onClick={onClearError}
            className="p-1 rounded-lg hover:bg-rose-500/20 text-rose-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Scanner Container */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Upload Zone or Preview */}
        {!selectedImage ? (
          <div
            id="dropzone-area"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-rose-500 bg-rose-500/5'
                : 'border-slate-700/80 hover:border-slate-500 bg-slate-950/40 hover:bg-slate-950/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Drag &amp; drop your checkout screenshot here
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto">
              Supports PNG, JPG, JPEG, WEBP. Desktop or mobile screenshots.
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700">
                <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                Browse from your device
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-slate-200">
                  Ready for AI Inspection
                </span>
                {selectedImage.fileName && (
                  <span className="text-xs text-slate-500 font-mono truncate max-w-xs">
                    ({selectedImage.fileName})
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Remove &amp; Choose Another
              </button>
            </div>

            <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden max-h-96 flex items-center justify-center p-3">
              <img
                src={selectedImage.previewUrl}
                alt="Checkout Screenshot"
                className="max-h-80 w-auto object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        )}

        {/* Demo Preset Selector */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Or Select A Ready-to-Test Sample Screenshot</span>
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {DEMO_SAMPLES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className={`p-2.5 rounded-lg text-left border transition-all text-xs flex flex-col justify-between ${
                  selectedImage?.previewUrl === sample.dataUrl
                    ? 'bg-rose-500/15 border-rose-500/50 text-white'
                    : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-semibold line-clamp-1">{sample.name.split('(')[0]}</span>
                <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">{sample.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Metadata Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
          <div>
            <label htmlFor="scanner-website-url" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Website Name or URL <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <input
                id="scanner-website-url"
                type="text"
                placeholder="e.g. streaminghub.com/checkout"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm placeholder:text-slate-600 focus:outline-none focus:border-rose-500/60 transition-colors"
              />
              <ExternalLink className="w-3.5 h-3.5 text-slate-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="scanner-user-concern" className="block text-xs font-semibold text-slate-300 mb-1.5">
              What are you concerned about? <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <input
              id="scanner-user-concern"
              type="text"
              placeholder="e.g. Am I being enrolled in a recurring subscription?"
              value={userConcern}
              onChange={(e) => setUserConcern(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm placeholder:text-slate-600 focus:outline-none focus:border-rose-500/60 transition-colors"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            id="scanner-analyze-btn"
            type="button"
            disabled={!selectedImage || isLoading}
            onClick={handleTriggerAnalysis}
            className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all ${
              !selectedImage || isLoading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950 hover:shadow-rose-600/25 active:scale-[0.99]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {isLoading ? 'Scanning with Gemini AI...' : 'Analyze with AI'}
          </button>
        </div>
      </div>
    </div>
  );
};
