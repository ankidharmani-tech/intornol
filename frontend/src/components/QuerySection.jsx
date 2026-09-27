import React from 'react';
import { 
  Sparkles, 
  Mic, 
  GitBranch, 
  MapPin 
} from 'lucide-react';

export default function QuerySection({ 
  query, 
  setQuery, 
  onSynthesize, 
  onOpenVoiceModal 
}) {
  const quickIntents = [
    { label: '🍱 Home Food Business', query: 'I want to start a home-based food business in Thane' },
    { label: '☀️ Rooftop Solar Subsidy', query: 'Apply for residential rooftop solar net metering in Thane' },
    { label: '🏪 Shop & Establishment License', query: 'Register new retail shop under Gumasta in Thane' },
    { label: '💧 Water Connection Transfer', query: 'Transfer domestic water meter connection Thane Municipal' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft mb-6">
      {/* Top Header Tag & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
            MULTI-JURISDICTION SYNTHESIS ENGINE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
            AI Pathway v2.4
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200 font-mono">
            Validated Acts (MH)
          </span>
        </div>
      </div>

      {/* Main Title & Description */}
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1.5">
          Tell us what you want to achieve.
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl">
          Task-first civic navigation synthesizes your natural intent into an end-to-end multi-jurisdiction roadmap across municipal, state, and central authorities.
        </p>
      </div>

      {/* Large Input Box with Action Buttons */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 bg-slate-50/90 border border-slate-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-navy-900/10 focus-within:border-navy-900 focus-within:bg-white transition-all shadow-inner">
        <div className="flex items-center gap-2 flex-1 px-2">
          <Sparkles className="w-4 h-4 text-terracotta shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSynthesize()}
            placeholder="I want to start a home-based food business in Thane"
            className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none py-1.5 font-medium"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenVoiceModal}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors shadow-soft-sm active:scale-95"
          >
            <Mic className="w-3.5 h-3.5 text-rose-500" />
            <span>Bhashini Voice</span>
          </button>

          <button
            onClick={() => onSynthesize()}
            type="button"
            className="flex items-center gap-2 px-5 py-2 bg-terracotta hover:bg-terracotta-hover text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-95"
          >
            <GitBranch className="w-4 h-4 stroke-[2.2]" />
            <span>Synthesize Pathway</span>
          </button>
        </div>
      </div>

      {/* Quick Intent Chips */}
      <div className="flex items-center gap-2 mt-3.5 flex-wrap">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
          QUICK INTENT:
        </span>
        {quickIntents.map((intent, i) => (
          <button
            key={i}
            onClick={() => {
              setQuery(intent.query);
              onSynthesize(intent.query);
            }}
            className="px-3 py-1 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 border border-slate-200/90 rounded-full text-xs font-medium text-slate-700 transition-all active:scale-95"
          >
            {intent.label}
          </button>
        ))}
      </div>
    </div>
  );
}
