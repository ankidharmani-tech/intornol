import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Landmark, 
  Clock, 
  Sparkles, 
  Layers, 
  GitBranch, 
  ShieldAlert 
} from 'lucide-react';

export default function JurisdictionView({ selectedCity, setSelectedCity }) {
  const [activeCityTab, setActiveCityTab] = useState('thane');
  const [simulatingReeval, setSimulatingReeval] = useState(false);

  const handleTestReeval = () => {
    setSimulatingReeval(true);
    setTimeout(() => setSimulatingReeval(false), 1200);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Jurisdiction & Profile Sensitivity Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl mb-4">
          Observe how Nagrik Marg dynamically recalculates procedural DAG nodes, statutory fee schedules, and ward counter points when jurisdiction or applicant profile changes.
        </p>

        {/* City Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCityTab('thane')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              activeCityTab === 'thane'
                ? 'bg-rose-50 border-rose-200 text-slate-900 font-bold shadow-soft-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-terracotta"></span>
            <span>Thane (TMC, Maharashtra)</span>
            <span className="text-[9px] bg-terracotta text-white px-1.5 py-0.2 rounded font-mono">ACTIVE</span>
          </button>

          <button
            onClick={() => setActiveCityTab('pune')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              activeCityTab === 'pune'
                ? 'bg-rose-50 border-rose-200 text-slate-900 font-bold shadow-soft-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Pune (PMC, Maharashtra)</span>
          </button>

          <button
            onClick={() => setActiveCityTab('delhi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              activeCityTab === 'delhi'
                ? 'bg-rose-50 border-rose-200 text-slate-900 font-bold shadow-soft-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>South Delhi (MCD, NCT)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left License Card + Right State Machine Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): TMC Municipal Trade & Storage License */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card space-y-5">
          {/* Header & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy-950 text-white flex items-center justify-center">
                <Building2 className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  DAG NODE ID: #TMC-TRD-2026-MH
                </span>
                <span className="text-slate-300 mx-1.5">•</span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-mono">
                  Hybrid (Online Form + Desk Verification)
                </span>
              </div>
            </div>

            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">
              Gazette Verified
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            TMC Municipal Trade & Storage License
          </h2>

          {/* 3 Metric Stat Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[9px] uppercase font-mono text-slate-400 font-bold">Statutory Fee</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">₹500 / annum</div>
              <div className="text-[10px] text-slate-500">Class IV Home Kitchen (under 100 sq ft)</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[9px] uppercase font-mono text-slate-400 font-bold">Processing SLA</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">15 Days (RTS Act)</div>
              <div className="text-[10px] text-slate-500">Maharashtra Guaranteed Citizen Delivery</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[9px] uppercase font-mono text-slate-400 font-bold">Competent Desk</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">Pachpakhadi Ward Office #4</div>
              <div className="text-[10px] text-slate-500">Zone 1 Civic Facilitation Hub</div>
            </div>
          </div>

          {/* Active DAG Prerequisite Sequence */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                Active DAG Prerequisite Sequence
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                4 Sequence Nodes • Dynamic Topology (Topologically Sorted)
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Node 1 */}
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#fceee9] text-terracotta font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-900">
                      Society NOC Form C (Co-op Housing Bylaw 2014)
                    </span>
                    <span className="text-[9px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded font-mono">
                      MANDATORY
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Required specifically for Thane Residential Micro Units. Authorizes non-disruptive commercial kitchen operation without parking or trade nuisance.
                  </p>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    ✓ Form C-3 Uploaded • Secretary Signature Verified
                  </div>
                </div>
              </div>

              {/* Node 2 */}
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-900">
                      Property Tax Dues Cleared (TMC Assessment UID)
                    </span>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-mono">
                      AUTO-LINKED
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    TMC 15-digit Assessment UID: <code className="text-slate-700 font-mono">THN-04-88319-01</code> clearance validation confirmed for current FY 2024-25.
                  </p>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    Municipal ERP Synchronized: Zero Outstanding
                  </div>
                </div>
              </div>

              {/* Node 3 */}
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-900">
                      FSSAI Basic Registration (12L Micro Unit)
                    </span>
                    <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded font-mono">
                      PREREQUISITE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Prerequisite central food authority license code for culinary processing turnover &lt; ₹12 Lakhs. Linked via FoSCoS portal token.
                  </p>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    License #21524019000861 • Active
                  </div>
                </div>
              </div>

              {/* Node 4 */}
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-900">
                      Sanitary Inspector Physical Site Verification
                    </span>
                    <span className="text-[9px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded font-mono">
                      PENDING DESK
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    In-person kitchen verification round post application docket submittal. Health officer evaluates grease disposal, LPG safety, and potable water intake.
                  </p>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    Scheduled within 7 days of docket acceptance
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Source info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span>Sourced directly from Maharashtra Right to Public Services Act (RTS Portal 2024)</span>
            <button className="text-terracotta hover:underline font-semibold flex items-center gap-1">
              <span>Inspect Statutory Circular</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Column (4 cols): Dependency Engine Card */}
        <div className="lg:col-span-4 bg-white text-slate-800 rounded-2xl p-5 border border-slate-200/90 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Dependency Rule Engine
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
              Online
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Graph Re-evaluation Engine
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Guarantees deterministic dependency order. Recalculates DAG nodes in &lt;14ms whenever municipal jurisdiction or applicant profile pivots.
          </p>

          {/* Visual Topology Diagram */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 my-3">
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>DAG TRAVERSAL: TOPOLINE</span>
              <span className="text-emerald-700 font-bold">OPTIMAL</span>
            </div>

            {/* Simulated Node graph */}
            <div className="flex items-center justify-between py-3 px-2 relative">
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0">
                <div className={`h-full bg-emerald-500 transition-all duration-700 ${simulatingReeval ? 'w-full' : 'w-3/4'}`}></div>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                  ✓
                </div>
                <span className="text-[8px] text-slate-500 mt-1 font-mono">Jurisdiction</span>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                  ✓
                </div>
                <span className="text-[8px] text-slate-500 mt-1 font-mono">Profile</span>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                  ✓
                </div>
                <span className="text-[8px] text-slate-500 mt-1 font-mono">Bylaws</span>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                  ●
                </div>
                <span className="text-[8px] text-slate-500 mt-1 font-mono">Dispatch Node</span>
              </div>
            </div>
          </div>

          {/* Metrics Table */}
          <div className="space-y-2 text-xs divide-y divide-slate-100 pt-1">
            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-500 text-[11px]">Active Prerequisite Nodes</span>
              <span className="font-bold text-slate-900 font-mono">7 Active</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 text-[11px]">Cyclic Dependency Check</span>
              <span className="font-bold text-emerald-700 font-mono">0 cycles (Optimal)</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 text-[11px]">Verification Protocol</span>
              <span className="font-bold text-slate-800 font-mono">Aadhaar Bio-Auth</span>
            </div>
          </div>

          <button
            onClick={handleTestReeval}
            disabled={simulatingReeval}
            className="w-full py-2.5 px-3 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs font-bold transition-all mt-4 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <GitBranch className={`w-3.5 h-3.5 ${simulatingReeval ? 'animate-spin' : ''}`} />
            <span>{simulatingReeval ? 'Traversing Graph Nodes...' : 'Test Re-evaluation Routine'}</span>
          </button>
          <div className="text-[10px] text-slate-400 text-center">
            Simulates dynamic topology update in real-time
          </div>
        </div>
      </div>

      {/* Section 2: Personalized Capital & Subsidy Schemes */}
      <div className="space-y-4">
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

          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Personalized Capital & Subsidy Schemes
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed mt-1">
            Government financial grant programs matched against verified Thane food processing eligibility traits.
          </p>
        </div>

        {/* 3 Scheme Cards */}
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

      {/* Section 3: Honest About Gaps & Out-of-Scope Proof */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              100% GAZETTE VERIFIED
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              Zero-Hallucination Policy PSWB02
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            ● Guardrail Interceptor: Active
          </span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Honest About Gaps & Out-of-Scope Proof
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed mt-1 max-w-3xl">
            Unlike generic LLMs that synthesize plausible-sounding fiction, Nagrik Marg enforces strict statutory boundary checks. When municipal jurisdiction runs out of statutory scope, the system explicitly halts and routes to authorized central export authorities.
          </p>
        </div>

        {/* Live Query Simulation Box */}
        <div className="bg-[#f8fafc] rounded-xl p-3.5 border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase">
            <span>CITIZEN LIVE QUERY SIMULATION</span>
            <span>Out-of-Scope Test Case</span>
          </div>
          <p className="text-xs text-slate-800 font-medium italic">
            "I want to export fresh Alphonso mango pulp to Munich, Germany directly from my Thane home kitchen. What municipal permit do I need from TMC?"
          </p>
        </div>

        {/* Intercept Alert Box */}
        <div className="bg-[#fdf4f2] border border-[#f8d5ce] rounded-xl p-4 text-xs text-rose-950 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-rose-900">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Insufficient Official Coverage in Local Knowledge Graph</span>
            </div>
            <span className="text-[9px] font-mono font-bold bg-rose-200/80 text-rose-800 px-2 py-0.5 rounded">
              HALLUCINATION GUARD BLOCKED
            </span>
          </div>

          <p className="text-[11px] leading-relaxed text-rose-900/90">
            Nagrik Marg refuses to fabricate municipal export certifications. The Thane Municipal Corporation (TMC) governs domestic public health and local trade licenses under the MMC Act 1949, but <strong className="font-semibold text-rose-950">does not possess jurisdiction over international export phytosanitary documentation or European Union food safety quarantine clearing</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-rose-200">
            <a
              href="https://dgft.gov.in"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/80 hover:bg-white rounded-lg border border-rose-200 text-[11px] font-medium text-slate-800 flex items-center justify-between transition-colors"
            >
              <span>DGFT IEC Portal (Import-Export Code)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="https://apeda.gov.in"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/80 hover:bg-white rounded-lg border border-rose-200 text-[11px] font-medium text-slate-800 flex items-center justify-between transition-colors"
            >
              <span>APEDA Plant Export & Packhouse Registry</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
