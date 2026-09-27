import React from 'react';
import { 
  Check, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Download, 
  Eye, 
  ShieldCheck, 
  FileText, 
  Building2, 
  Award, 
  PiggyBank, 
  Briefcase, 
  ArrowRight,
  FolderOpen
} from 'lucide-react';

export default function TargetRoadmap({ 
  selectedCity, 
  onDownloadForm, 
  onInspectDocument 
}) {
  return (
    <div className="space-y-6">
      {/* Active Target Roadmap Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card">
        {/* Top Tag & Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            ACTIVE TARGET ROADMAP • ID: #TMC-MH-84920
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            Step 1 Complete
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1">
            Home-Based Food Business (FSSAI + TMC License)
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Dual-jurisdiction procedural pipeline connecting statutory Central food standard filing with Municipal Corporation ward registration.
          </p>
        </div>

        {/* JURISDICTION PIPELINE PROGRESS Stepper */}
        <div className="bg-[#f8fafc] rounded-2xl p-4 sm:p-5 border border-slate-200/90 mb-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              JURISDICTION PIPELINE PROGRESS
            </span>
            <span className="text-[10px] font-bold text-terracotta font-mono">
              50% Dispatched
            </span>
          </div>

          <div className="relative flex items-center justify-between">
            {/* Connecting line */}
            <div className="absolute left-6 right-6 top-4 h-0.5 bg-slate-200 -z-0">
              <div className="h-full bg-terracotta w-1/2"></div>
            </div>

            {/* Stepper Node 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-[11px] font-bold text-slate-900 mt-2">FSSAI Portal</span>
              <span className="text-[9px] text-slate-400 font-medium">(Central)</span>
            </div>

            {/* Stepper Node 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-600 flex items-center justify-center font-bold text-xs shadow-sm">
                <Building2 className="w-4 h-4 text-slate-600" />
              </div>
              <span className="text-[11px] font-bold text-slate-900 mt-2">TMC Ward Desk</span>
              <span className="text-[9px] text-slate-400 font-medium">(Urban Local Body)</span>
            </div>

            {/* Stepper Node 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 text-slate-300 flex items-center justify-center font-bold text-xs shadow-sm">
                <Award className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 mt-2">Final Joint Accreditation</span>
              <span className="text-[9px] text-slate-400 font-medium">(Authorized)</span>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/90">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1">
              PAID REGULATORY FEE
            </div>
            <div className="text-base font-bold text-slate-900">
              ₹100 <span className="text-xs font-normal text-slate-500">FSSAI Form A</span>
            </div>
            <div className="text-[10px] text-blue-700 font-semibold mt-1 flex items-center gap-1">
              <Check className="w-3 h-3 text-blue-600 stroke-[3]" />
              <span>Transaction Settled</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/90">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1">
              PENDING COUNTER FEE
            </div>
            <div className="text-base font-bold text-slate-900">
              ₹500 <span className="text-xs font-normal text-slate-500">TMC Statutory</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Payable at Ward Desk</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/90">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1">
              TARGET COMPLETION
            </div>
            <div className="text-base font-bold text-slate-900">
              15 <span className="text-xs font-normal text-slate-500">Working Days</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-slate-400" />
              <span>RTS Act Mandated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Procedural DAG: Sequential Execution */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-terracotta"></span>
              Procedural DAG: Sequential Execution
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              2 Phases • ₹600 Total Statutory Cost
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
            Synchronous Pipeline
          </span>
        </div>

        {/* Step 1 Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#fceee9] text-terracotta font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    FSSAI Basic Registration (Form A)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Central FoSCoS Portal • Ref: FSSAI-2025-88391
                  </p>
                </div>
                <span className="self-start sm:self-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  Verified & Issued
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Self-declaration under Schedule 4 Hygiene & Sanitary norms completed. Food Business Operator (FBO) category: Home Manufacturer (&lt; ₹12L turnover). Digital registration generated.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium">
                  QR Validated • Valid till: Oct 2026
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onInspectDocument('FSSAI Basic Registration (Form A)')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors shadow-soft-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => onDownloadForm({ title: 'FSSAI Certificate' })}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Certificate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-terracotta text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    TMC Municipal Trade & Health License
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Urban Local Body • Section 376 MMC Act
                  </p>
                </div>
                <span className="self-start sm:self-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  In-Person Desk Visit
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Physical verification and trade declaration at Pachpakhadi Ward Office. Requires physical dossier with FSSAI certificate printout and landlord NOC.
              </p>

              {/* Appointment Box */}
              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <Calendar className="w-4 h-4 text-terracotta" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">14 October, 11:30 AM</div>
                    <div className="text-[11px] text-slate-500">Health Inspector Desk, Room 108, Pachpakhadi Office</div>
                  </div>
                </div>

                <button
                  onClick={() => onInspectDocument('Physical Desk Checklist')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Checklist & Dossier</span>
                </button>
              </div>

              <div className="mt-3 pt-2 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Protected by Maharashtra Right to Public Services Act (RTSA)</span>
                <span className="text-emerald-700 font-semibold">Zero-Bribe Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 Card */}
        <div className="bg-white/80 rounded-2xl p-5 border border-slate-200/90 shadow-card">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Ward Sanitary Inspector Site Verification
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Conditional Dispatch (Only if kitchen volume &gt; 50 units/day)
                  </p>
                </div>
                <span className="self-start sm:self-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                  Upcoming
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Random audit triggered only if commercial gas cylinder utility exceeds domestic limits. Automatic waiver applied for cottage bakers and tiffin suppliers under ₹3L annual revenue.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 2 Schemes Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <PiggyBank className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                STATE SCHEME
              </span>
              <span className="text-[10px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200 ml-auto">
                35% Subsidy
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">
              PM-FME Scheme Maharashtra
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Capital credit-linked seed grant up to ₹40,000 for kitchen equipment upgrades.
            </p>
          </div>
          <button className="text-terracotta hover:underline font-bold text-xs mt-3 flex items-center gap-1">
            <span>Check eligibility criteria</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                CENTRAL MSME
              </span>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 ml-auto">
                Zero Fee
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">
              Udyam Registration Linkage
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Auto-sync your Thane Municipal Trade filing with MSME micro-enterprise registry.
            </p>
          </div>
          <button className="text-terracotta hover:underline font-bold text-xs mt-3 flex items-center gap-1">
            <span>Auto-generate Udyam ID</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
