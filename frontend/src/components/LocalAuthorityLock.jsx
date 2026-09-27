import React from 'react';
import { 
  Building, 
  Map 
} from 'lucide-react';

export default function LocalAuthorityLock({ selectedCity, onSwitchJurisdiction }) {
  return (
    <div className="card-3d rounded-2xl p-5 relative overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Building className="w-3.5 h-3.5 text-terracotta" />
          <span className="text-xs font-semibold text-slate-600">
            Designated Ward Office
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono shadow-sm">
          Ward Active
        </span>
      </div>

      {/* Title & Department */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Thane Municipal Corporation
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Maharashtra Urban Local Body • District: Thane (400602)
        </p>
      </div>

      {/* Info List */}
      <div className="space-y-2.5 text-xs text-slate-600 mb-5 divide-y divide-slate-100">
        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-500 text-[11px]">Ward Assigned</span>
          <span className="font-bold text-slate-900 text-xs">W-04 (Pachpakhadi)</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-slate-500 text-[11px]">Health Inspector</span>
          <span className="font-bold text-slate-900 text-xs">Desk Room 108</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-slate-500 text-[11px]">Ward Office Hub</span>
          <span className="font-bold text-slate-900 text-xs">Chandanwadi Cross Rd</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-slate-500 text-[11px]">Working Hours</span>
          <span className="font-bold text-slate-900 text-xs">10:00 AM - 04:30 PM</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onSwitchJurisdiction}
        className="btn-3d-terracotta w-full flex items-center justify-center gap-2 py-2.5 px-4 font-bold text-xs rounded-xl cursor-pointer"
      >
        <Map className="w-3.5 h-3.5" />
        <span>Switch Jurisdiction / View Ward Map</span>
      </button>
    </div>
  );
}
