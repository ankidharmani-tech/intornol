import React from 'react';
import { 
  Sparkles, 
  Check, 
  ExternalLink, 
  IndianRupee, 
  ArrowRight, 
  Clock, 
  Building2 
} from 'lucide-react';

export default function NewSchemesView({ selectedCity }) {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-terracotta bg-[#fceee9] px-2 py-0.5 rounded">
              MATCHED TO PROFILE
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Profile UID #MH-THN-8812
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
              Home Food Unit
            </span>
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
              Rented Flat
            </span>
            <span className="text-[10px] font-semibold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
              Women Owned (Sole Prop)
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Personalized Capital & Subsidy Schemes
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1 max-w-3xl">
          Government financial grant programs matched against verified Thane food processing eligibility traits.
        </p>
      </div>

      {/* 3 Scheme Cards from Image 4 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: PMFME */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-[9px] font-mono font-bold text-slate-500">
                MoFPI + CENTRAL
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                96% Match
              </span>
            </div>

            <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">GOVT.</div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              PMFME Scheme
            </h3>
            <p className="text-[11px] text-slate-500 leading-snug mb-3">
              Pradhan Mantri Formalisation of Micro Food Processing Enterprises Scheme
            </p>

            {/* Benefit Box */}
            <div className="p-3 bg-blue-50/50 border border-blue-200/70 rounded-xl mb-3 text-xs">
              <div className="text-[9px] font-mono font-bold text-blue-800 uppercase">ELIGIBLE GRANT BENEFIT</div>
              <div className="font-bold text-slate-900 text-xs mt-0.5">35% Capital Subsidy</div>
              <div className="text-[10px] text-slate-600 mt-1 leading-snug">
                Up to ₹10 Lakhs ceiling + Seed capital grant of ₹40,000 for self-help group members for machinery & working equipment.
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 mb-4">
              <div className="flex items-start gap-1.5 text-[11px]">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <span>Individual micro-enterprises in Thane jurisdiction</span>
              </div>
              <div className="flex items-start gap-1.5 text-[11px]">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <span>Sole Proprietorship owned by Woman entrepreneur</span>
              </div>
              <div className="flex items-start gap-1.5 text-[11px]">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <span>Prepared packaged food / bakery & spices category</span>
              </div>
            </div>
          </div>

          <button className="w-full py-2.5 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs font-bold transition-all shadow-sm">
            Add PMFME Subsidy to Roadmap
          </button>
        </div>

        {/* Card 2: PMEGP */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-[9px] font-mono font-bold text-slate-500">
                MSME / KVIC
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                88% Match
              </span>
            </div>

            <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">KVIC</div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              PMEGP Scheme
            </h3>
            <p className="text-[11px] text-slate-500 leading-snug mb-3">
              Prime Minister's Employment Generation Programme
            </p>

            {/* Benefit Box */}
            <div className="p-3 bg-blue-50/50 border border-blue-200/70 rounded-xl mb-3 text-xs">
              <div className="text-[9px] font-mono font-bold text-blue-800 uppercase">ELIGIBLE GRANT BENEFIT</div>
              <div className="font-bold text-slate-900 text-xs mt-0.5">25% – 35% Margin Money</div>
              <div className="text-[10px] text-slate-600 mt-1 leading-snug">
                Government subsidy on project cost up to ₹50 Lakhs for manufacturing units. Urban woman rate applies at 35% subsidy rate.
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 mb-4">
              <div className="flex items-start gap-1.5 text-[11px]">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <span>Any individual above 18 years of age</span>
              </div>
              <div className="flex items-start gap-1.5 text-[11px]">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <span>Passed VIII standard minimum qualification</span>
              </div>
              <div className="flex items-start gap-1.5 text-[11px]">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <span>Special Category (Women: 35% in urban area)</span>
              </div>
            </div>
          </div>

          <button className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold transition-all">
            Add PMEGP to Checklist
          </button>
        </div>

        {/* Card 3: Stand-Up India */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-[9px] font-mono font-bold text-slate-500">
                DFS / MoF
              </span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                82% Match
              </span>
            </div>

            <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">COMMERCIAL CREDIT</div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Stand-Up India Scheme
            </h3>
            <p className="text-[11px] text-slate-500 leading-snug mb-3">
              Bank Credit Facilities for Women and SC/ST Entrepreneurs
            </p>

            {/* Benefit Box */}
            <div className="p-3 bg-blue-50/50 border border-blue-200/70 rounded-xl mb-3 text-xs">
              <div className="text-[9px] font-mono font-bold text-blue-800 uppercase">ELIGIBLE CREDIT LINE</div>
              <div className="font-bold text-slate-900 text-xs mt-0.5">₹10 Lakh to ₹1 Crore</div>
              <div className="text-[10px] text-slate-600 mt-1 leading-snug">
                Composite bank loan (term loan + working capital) covering up to 85% of project cost for non-farm commercial units.
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 mb-4">
              <div className="flex items-start gap-1.5 text-[11px]">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <span>Greenfield venture (first time commercial venture)</span>
              </div>
              <div className="flex items-start gap-1.5 text-[11px]">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <span>Woman sole proprietor holding 100% equity</span>
              </div>
              <div className="flex items-start gap-1.5 text-[11px]">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                <span>Borrower must not be in default to any bank / NBFC</span>
              </div>
            </div>
          </div>

          <button className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold transition-all">
            Inspect Eligibility Criteria
          </button>
        </div>
      </div>
    </div>
  );
}
