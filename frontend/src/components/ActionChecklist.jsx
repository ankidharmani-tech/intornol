import React, { useState } from 'react';
import { 
  Check, 
  ShieldCheck, 
  ExternalLink, 
  FileText 
} from 'lucide-react';

export default function ActionChecklist({ onInspectDocument }) {
  const [items, setItems] = useState([
    {
      id: 'item_1',
      title: 'FSSAI Certificate Printout',
      desc: 'Signed copy with QR code visible',
      checked: true,
    },
    {
      id: 'item_2',
      title: 'Registered Rent / Ownership Proof',
      desc: 'Electricity bill or registered leave & license',
      checked: true,
    },
    {
      id: 'item_3',
      title: 'Society / Landlord NOC',
      desc: 'Pending signature from secretary',
      checked: false,
    },
    {
      id: 'item_4',
      title: 'Kitchen Photo & Fire Safety Prep',
      desc: '1kg ABC dry-powder fire extinguisher photo',
      checked: false,
    },
    {
      id: 'item_5',
      title: '₹500 Statutory Fee (Cash or Ward DD)',
      desc: 'Exact change preferred at Counter 4',
      checked: false,
    },
  ]);

  const toggleCheck = (id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    );
  };

  const completedCount = items.filter((i) => i.checked).length;

  return (
    <div className="space-y-6">
      {/* Physical Desk Checklist Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card">
        {/* Header with counter */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <span className="text-terracotta">≈</span>
            <span>Physical Desk Checklist</span>
          </h3>
          <span className="text-[10px] font-bold text-terracotta bg-[#fceee9] px-2 py-0.5 rounded-full border border-terracotta/20 font-mono">
            {completedCount} of {items.length} Ready
          </span>
        </div>

        <p className="text-[11px] text-slate-400 mb-4 leading-snug">
          Collect these mandatory physical verification records before reporting to Room 108.
        </p>

        {/* Checklist Items */}
        <div className="space-y-2 mb-4">
          {items.map((item) => {
            const isChecked = item.checked;
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isChecked
                    ? 'bg-blue-50/40 border-blue-200/80'
                    : 'bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div
                  className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all ${
                    isChecked
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 leading-none mb-1">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium leading-tight">
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Generate Dossier Button */}
        <button
          onClick={() => onInspectDocument('Generated Physical Dossier Bundle')}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-terracotta hover:bg-terracotta-hover text-white font-bold text-xs rounded-xl shadow-soft-sm transition-all active:scale-[0.98] cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Generate Document Dossier Bundle</span>
        </button>
      </div>

      {/* Right to Public Services Act (MH) Card */}
      <div className="bg-[#f0f6fa] rounded-2xl p-5 border border-slate-200/80 shadow-soft-sm space-y-2.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-terracotta" />
          <h4 className="text-xs font-bold text-slate-900">
            Right to Public Services Act (MH)
          </h4>
        </div>

        <p className="text-[11px] text-slate-600 leading-relaxed">
          Under Maharashtra RTS Act 2015, TMC Health Desk must dispose or issue statutory objection within 15 calendar days. Auto-escalation triggers on Day 16 to Municipal Deputy Commissioner.
        </p>

        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
          <span className="text-slate-500 font-medium">Escalation Officer: <strong className="text-slate-800 font-bold">Dr. R. Patil</strong></span>
          <button className="text-terracotta hover:underline font-semibold flex items-center gap-0.5">
            <span>View Escrow Rules</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
