import React from 'react';
import { 
  Search, 
  Mic, 
  ArrowRight 
} from 'lucide-react';

export default function QuerySection({ 
  query, 
  setQuery, 
  onSynthesize, 
  onOpenVoiceModal 
}) {
  const suggestions = [
    { label: 'Home Food Business', query: 'I want to start a home-based food business in Thane' },
    { label: 'Rooftop Solar Subsidy', query: 'Apply for residential rooftop solar net metering in Thane' },
    { label: 'Shop & Establishment License', query: 'Register new retail shop under Gumasta in Thane' },
    { label: 'Water Connection Transfer', query: 'Transfer domestic water meter connection Thane Municipal' },
  ];

  const handleSearchSubmit = () => {
    onSynthesize(query || 'I want to start a home-based food business in Thane');
  };

  return (
    <div className="card-3d rounded-2xl p-6 mb-6 animate-fade-in-up">
      {/* Main Title & Description */}
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1.5">
          Find Required Permits & Clearances
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl">
          Search any civic procedure to see the step-by-step sequence of approvals, required documents, official fees, and municipal ward offices.
        </p>
      </div>

      {/* Large Input Box with Action Buttons */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 bg-slate-50/90 border border-slate-200/90 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-navy-900/10 focus-within:border-navy-900 focus-within:bg-white focus-within:shadow-md transition-all duration-200 shadow-inner">
        <div className="flex items-center gap-2 flex-1 px-2">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            placeholder="e.g. I want to start a home-based food business in Thane"
            className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none py-1.5 font-medium"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenVoiceModal}
            type="button"
            className="btn-3d-white flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>Bhashini Voice</span>
          </button>

          <button
            onClick={handleSearchSubmit}
            type="button"
            className="btn-3d-terracotta flex items-center gap-2 px-5 py-2 font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
          >
            <span>Find Procedure</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Suggestions Chips */}
      <div className="flex items-center gap-2 mt-3.5 flex-wrap">
        <span className="text-[11px] font-semibold text-slate-500">
          Suggestions:
        </span>
        {suggestions.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              setQuery(item.query);
              onSynthesize(item.query);
            }}
            className="px-3 py-1 bg-white hover:bg-slate-50 hover:border-slate-300 border border-slate-200/90 rounded-full text-xs font-medium text-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
