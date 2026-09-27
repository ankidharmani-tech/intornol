import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Building, 
  Clock, 
  Map, 
  Lock 
} from 'lucide-react';

export default function LocalAuthorityLock({ selectedCity, onSwitchJurisdiction }) {
  return (
    <div className="bg-[#111827] text-white rounded-2xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest font-mono">
            AUTHORITY LOCK
          </span>
        </div>

        <span className="text-[10px] font-mono font-medium text-slate-400">
          Jurisdiction Bound
        </span>
      </div>

      {/* Title & Department */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white tracking-tight">
          Thane Municipal Corporation
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Maharashtra Urban Local Body • District: Thane (400602)
        </p>
      </div>

      {/* Info List */}
      <div className="space-y-2.5 text-xs text-slate-300 mb-5 divide-y divide-slate-800/80">
        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-400 text-[11px]">Ward Assigned</span>
          <span className="font-bold text-white text-xs">W-04 (Pachpakhadi)</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-slate-400 text-[11px]">Health Inspector</span>
          <span className="font-bold text-white text-xs">Desk Room 108</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-slate-400 text-[11px]">Ward Office Hub</span>
          <span className="font-bold text-white text-xs">Chandanwadi Cross Rd</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-slate-400 text-[11px]">Working Hours</span>
          <span className="font-bold text-white text-xs">10:00 AM - 04:30 PM</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onSwitchJurisdiction}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-terracotta hover:bg-terracotta-hover text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98]"
      >
        <Map className="w-3.5 h-3.5" />
        <span>Switch Jurisdiction / View Ward Map</span>
      </button>
    </div>
  );
}
