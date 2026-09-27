import React, { useState } from 'react';
import { 
  CheckSquare, 
  ExternalLink, 
  Check, 
  X, 
  Edit3, 
  RefreshCw, 
  Database, 
  AlertTriangle, 
  Building2, 
  Utensils, 
  FileCode, 
  ShieldCheck, 
  Clock, 
  Network, 
  CheckCircle2, 
  Pause,
  Search,
  Filter
} from 'lucide-react';

export default function AdminQueueView({ onApproveItem }) {
  const [activeFilter, setActiveFilter] = useState('pending');
  const [toastMessage, setToastMessage] = useState(null);
  const [isCrawling, setIsCrawling] = useState(false);
  const [committedList, setCommittedList] = useState([
    {
      id: 'svc_birth_cert_thane',
      service: 'Birth Certificate Issuance (Rule 7)',
      authority: 'TMC Health Directorate',
      time: 'Today, 14:22',
      status: 'Active In Graph',
      operator: 'AUTO_PARSER'
    },
    {
      id: 'noc_fire_thane_v2',
      service: 'Commercial Fire Safety No-Objection',
      authority: 'Thane Fire Prevention Wing',
      time: 'Today, 11:05',
      status: 'Active In Graph',
      operator: 'admin_04 (HITL)'
    },
    {
      id: 'sh_water_conn_res',
      service: 'Domestic Metered Water Connection',
      authority: 'Water Supply & Drainage Dept',
      time: 'Yesterday, 19:40',
      status: 'Needs Verification',
      operator: 'AUTO_PARSER'
    },
    {
      id: 'fssai_mod_cert_24',
      service: 'Modification of Existing Food License',
      authority: 'Central Licensing Authority',
      time: 'Yesterday, 16:15',
      status: 'Active In Graph',
      operator: 'admin_01 (HITL)'
    }
  ]);

  const handleAction = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
    if (onApproveItem) onApproveItem();
  };

  const handleRescan = () => {
    setIsCrawling(true);
    setTimeout(() => {
      setIsCrawling(false);
      setToastMessage('Web crawlers completed: 3 portals queried, 0 changes detected.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in-up">
      {/* Top Banner */}
      <div className="card-3d rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              Government Gazette Review & Verification Queue
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRescan}
              disabled={isCrawling}
              className="btn-3d-white flex items-center gap-1.5 px-3 py-1.5 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isCrawling ? 'animate-spin' : ''}`} />
              <span>{isCrawling ? 'Crawling...' : 'Rescan Crawlers'}</span>
            </button>
            <button
              onClick={() => handleAction('Batch approved 3 high confidence nodes to Neo4j.')}
              className="btn-3d-terracotta flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Batch Approve High Confidence (&gt;90%)</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
          Gov Data Verification & Ingestion Queue
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl mb-6">
          Human-in-the-loop audit protocol. Validate scraped civic procedures, map unstructured RTI notices into deterministic task trees, and commit approved nodes to the ForThePeople civic knowledge graph.
        </p>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="card-3d-interactive p-3.5 bg-gradient-to-b from-white to-slate-50/70 rounded-xl cursor-default">
            <div className="text-[11px] font-semibold text-slate-500">
              Pending Review
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">14</div>
            <div className="text-[10px] text-slate-500 mt-1">Requires schema & touchpoint sign-off</div>
          </div>

          <div className="card-3d-interactive p-3.5 bg-gradient-to-b from-white to-slate-50/70 rounded-xl cursor-default">
            <div className="text-[11px] font-semibold text-slate-500">
              Committed Nodes
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
              <span>182</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">+11 today</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Live deterministic nodes in graph</div>
          </div>

          <div className="card-3d-interactive p-3.5 bg-gradient-to-b from-white to-slate-50/70 rounded-xl cursor-default">
            <div className="text-[11px] font-semibold text-slate-500">
              Parser Accuracy
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
              <span>98.4%</span>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded-full border border-blue-200">LLM Benchmark</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Synthesized confidence on regulatory text</div>
          </div>

          <div className="card-3d-interactive p-3.5 bg-gradient-to-b from-white to-slate-50/70 rounded-xl cursor-default">
            <div className="text-[11px] font-semibold text-slate-500">
              Portals Monitored
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">3</div>
            <div className="text-[10px] text-slate-500 mt-1">ServicePlus • MahaOnline • FoSCoS</div>
          </div>
        </div>

        {toastMessage && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-medium animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Main Grid: Queue on Left, Topology + Trail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Queue Items */}
        <div className="lg:col-span-8 space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-white rounded-xl border border-slate-200 shadow-soft-sm">
            <div className="flex items-center gap-2">
              <select className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none">
                <option>Maharashtra &gt; Thane TMC</option>
                <option>Maharashtra &gt; Pune PMC</option>
              </select>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveFilter('pending')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeFilter === 'pending'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Pending (3)
                </button>
                <button
                  onClick={() => setActiveFilter('auto')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeFilter === 'auto'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Auto-Parsed (9)
                </button>
                <button
                  onClick={() => setActiveFilter('flagged')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeFilter === 'flagged'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Flagged (2)
                </button>
              </div>
            </div>

            <span className="text-[11px] text-slate-500 font-medium">
              Sort: Confidence (Asc) ▾
            </span>
          </div>

          {/* Queue Item 1: Municipal Trade License */}
          <div className="card-3d-interactive rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                  <Building2 className="w-4 h-4 text-terracotta" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Municipal Trade License (Health & Food)
                  </h3>
                  <div className="text-[11px] text-slate-400 font-medium flex items-center gap-2">
                    <span className="font-bold text-slate-600">OFFLINE</span>
                    <span>•</span>
                    <span>Authority: PIO, TMC Health Dept</span>
                    <span>•</span>
                    <span>Form Class: Schedule VII (Health)</span>
                    <span>•</span>
                    <span>SLA: 15 Days</span>
                    <span>•</span>
                    <span>Statutory Fee: ₹500</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-center">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 font-mono">
                  87% AI Conf
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 font-mono">
                  Ward Office No. 4
                </span>
              </div>
            </div>

            {/* Side-by-Side Diff Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Left Box: OCR Marathi */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-400 mb-1.5">
                    <span>RAW SCRAPED GAZETTE (OCR MARATHI)</span>
                    <span className="text-slate-500">tmc_gazette_p42.pdf</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed font-sans italic bg-white p-2.5 rounded-lg border border-slate-200">
                    "ठाणे महानगरपालिका कार्यक्षेत्रात अन्न व पेय पदार्थ विक्री व्यवसाय सुरू करण्यासाठी आरोग्य विभागाचा परवाना अनिवार्य आहे. अर्जासोबत अग्निशमन ना-हरकत प्रमाणपत्र आणि मालमत्ता कर पावती जोडणे बंधनकारक राहील. शुल्क रु. ५००/- प्रदान पावती क्र. ४ मध्ये जमा करावे."
                  </p>
                </div>
                <div className="text-[10px] text-slate-500 mt-2 font-mono">
                  Detected anchors: <span className="font-semibold text-slate-700">आरोग्य विभाग (Health)</span>, <span className="font-semibold text-slate-700">अग्निशमन NOC</span>, <span className="font-semibold text-slate-700">मालमत्ता कर पावती (Tax Receipt)</span>
                </div>
              </div>

              {/* Right Box: Normalized Task Schema JSON */}
              <div className="p-3 bg-slate-50 text-slate-800 rounded-xl border border-slate-200 font-mono text-[10px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 mb-1.5">
                    <span className="text-slate-600 font-semibold">NORMALIZED TASK SCHEMA NODE</span>
                    <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">DAG_STRUCT_VALID</span>
                  </div>
                  <pre className="text-emerald-800 leading-tight overflow-x-auto p-1 font-semibold">
{`{
  "node_id": "tmc_trade_food_v1",
  "jurisdiction_id": "in_mh_thane_tmc",
  "requires_preceding_nodes": [
    "noc_fire_thane",
    "property_tax_paid"
  ],
  "statutory_fee_inr": 500,
  "service_type": "physical_desk",
  "sla_working_days": 15
}`}
                  </pre>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between border-t border-slate-800 pt-1">
                  <span>Edge validation: Pre-requisites mapped (2/2)</span>
                  <span className="text-emerald-400 font-bold">✓ Connected</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleAction('Node rejected. Re-crawling OCR feed...')}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 text-rose-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors"
              >
                ✕ Reject / Rescrape
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAction('Opening Schema Rule Editor...')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  Edit Schema Rules
                </button>
                <button
                  onClick={() => handleAction('Node tmc_trade_food_v1 committed to Neo4j graph.')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Approve & Commit to Graph</span>
                </button>
              </div>
            </div>
          </div>

          {/* Queue Item 2: FSSAI Basic Food Registration */}
          <div className="card-3d-interactive rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                  <Utensils className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    FSSAI Basic Food Registration (Form A)
                  </h3>
                  <div className="text-[11px] text-slate-400 font-medium flex items-center gap-2">
                    <span className="font-bold text-blue-600">ONLINE API</span>
                    <span>•</span>
                    <span>Authority: Food Safety and Standards Authority</span>
                    <span>•</span>
                    <span>SLA: 7 Days</span>
                    <span>•</span>
                    <span>Statutory Fee: ₹100 / Year</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-center">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                  92% AI Conf
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                  Rule Validated
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800">Deterministic mapping: </span>
                <span>FoSCoS portal payload aligns with central FSS Act 2006 schedule.</span>
              </div>
              <code className="text-[10px] text-slate-500 font-mono">schema_v2_fssai.json</code>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => handleAction('Inspecting JSON AST node representation')}
                className="text-terracotta hover:underline font-semibold text-xs flex items-center gap-1 cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Inspect JSON AST</span>
              </button>

              <button
                onClick={() => handleAction('FSSAI Form A node published live.')}
                className="btn-3d-terracotta flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Approve & Publish</span>
              </button>
            </div>
          </div>

          {/* Queue Item 3: PMFME Flagged */}
          <div className="card-3d-interactive rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    PM Formalisation of Micro Food Processing (PMFME)
                  </h3>
                  <div className="text-[11px] text-slate-400 font-medium flex items-center gap-2">
                    <span className="font-bold text-amber-700">HYBRID</span>
                    <span>•</span>
                    <span>Authority: MoFPI / Maharashtra SLAC</span>
                    <span>•</span>
                    <span className="text-rose-700 font-semibold">Discrepancy: Turnover Ceiling Ambiguity</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-center">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 font-mono">
                  78% AI Conf
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200 font-mono">
                  Flagged by Auditor
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#fdf4f2] border border-[#f8d5ce] rounded-xl text-xs text-rose-950 space-y-1">
              <div className="font-bold text-rose-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Discrepancy Flag: Turnover Ceiling Ambiguity detected</span>
              </div>
              <p className="text-[11px] text-rose-900/90 leading-relaxed">
                Local State Directorate circular specifies ₹50 Lakh cap, whereas central SNA guideline states ₹1 Crore cap for cluster eligibility. Requires manual admin tag resolution to prevent misleading eligibility outputs.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => handleAction('Item discarded from queue.')}
                className="text-slate-500 hover:text-slate-800 text-xs font-semibold"
              >
                Discard Item
              </button>

              <button
                onClick={() => handleAction('Normalized and committed PMFME node.')}
                className="btn-3d-terracotta flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Normalize & Approve</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Graph Topology + Crawler Audit + Guardrail */}
        <div className="lg:col-span-4 space-y-5">
          {/* Graph Topology Card */}
          <div className="card-3d rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                Graph Topology
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Structural verification of civic dependency nodes across jurisdictions. Cyclical checks prevent infinite requisition loops.
            </p>

            {/* Subgraph Diagram Simulation */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 shadow-inner relative">
              <div className="text-[10px] text-slate-500 font-medium flex justify-between mb-2">
                <span>Dependency Flow</span>
                <span>DAG Level: L3 Leaf</span>
              </div>

              <div className="flex items-center justify-around py-3">
                <div className="w-9 h-9 rounded-full border border-blue-300 bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-700 shadow-sm hover:scale-110 transition-transform cursor-pointer">
                  NOC
                </div>
                <span className="text-slate-400 text-xs">→</span>
                <div className="w-9 h-9 rounded-full border border-amber-300 bg-amber-50 flex items-center justify-center text-[10px] font-bold text-amber-700 shadow-sm hover:scale-110 transition-transform cursor-pointer">
                  TAX
                </div>
                <span className="text-slate-400 text-xs">→</span>
                <div className="w-10 h-10 rounded-full border-2 border-terracotta bg-terracotta/10 flex items-center justify-center text-[10px] font-bold text-terracotta shadow-md hover:scale-110 transition-transform cursor-pointer">
                  TRADE
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs divide-y divide-slate-100 pt-1">
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 text-[11px]">Dependency Integrity</span>
                <span className="font-bold text-slate-800">99.1% Connected</span>
              </div>
              <div className="flex items-center justify-between pt-1.5">
                <span className="text-slate-500 text-[11px]">Cyclical Dependencies</span>
                <span className="font-bold text-emerald-600">0 cycles</span>
              </div>
              <div className="text-[10px] text-slate-400 pt-1.5 leading-snug">
                Cluster balance: Thane TMC (48 nodes), FSSAI / FoSCoS (62 nodes), Pune Municipal Corp (72 nodes).
              </div>
            </div>
          </div>

          {/* Live Crawler Audit Trail */}
          <div className="card-3d rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">
                Live Crawler Audit Trail
              </h4>
              <button className="text-[10px] text-slate-400 hover:text-slate-600 font-mono flex items-center gap-1 cursor-pointer">
                <Pause className="w-2.5 h-2.5" />
                <span>Pause</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1 shadow-sm"></span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[10px] text-slate-800">AUTO_COMMIT_GRAPH</span>
                    <span className="text-[10px] text-slate-400">12m ago</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    svc_birth_cert_thane (schema valid, deterministic rule matched)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1 shadow-sm"></span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[10px] text-slate-800">DIFF_PARSE_WARN</span>
                    <span className="text-[10px] text-slate-400">48m ago</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Fee mismatch in PMFME circular • Sent to HITL review queue
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1 shadow-sm"></span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[10px] text-slate-800">SCRAPE_SUCCESS</span>
                    <span className="text-[10px] text-slate-400">2h ago</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    foscos.fssai.gov.in (Extracted 14 regulatory advisories)
                  </p>
                </div>
              </div>
            </div>

            <button className="text-terracotta hover:underline font-semibold text-xs pt-1 block cursor-pointer">
              View Detailed System Logs →
            </button>
          </div>

          {/* Ingestion Policy Guardrail */}
          <div className="card-3d rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <h4 className="text-xs font-bold text-slate-900">
                Ingestion Policy Guardrail
              </h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              By approving a node, you certify that statutory fees conform to official gazette schedules. Unverified fees propagate to citizen calculators within 3 minutes.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
              <span>Audit Operator: admin_04@forthepeople.gov.in</span>
              <button className="text-terracotta hover:underline font-semibold cursor-pointer">Export Log</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Table: Recent Automated Commits */}
      <div className="card-3d rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Recent Automated Commits
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Nodes automatically ingested through verified schema pipelines in the last 24 hours.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter commit history..."
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-48 sm:w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                <th className="py-2.5 px-3">NODE ID</th>
                <th className="py-2.5 px-3">SCHEME / SERVICE</th>
                <th className="py-2.5 px-3">AUTHORITY</th>
                <th className="py-2.5 px-3">INGESTION TIME</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3">OPERATOR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {committedList.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-800 text-[11px]">
                    {row.id}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {row.service}
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {row.authority}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                    {row.time}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        row.status === 'Active In Graph'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {row.status === 'Active In Graph' ? '✓ ' : ''}{row.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600 text-[11px]">
                    {row.operator}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>Showing 4 of 182 graph committed nodes</span>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <button className="px-2 py-1 rounded hover:bg-slate-100">Prev</button>
            <button className="px-2 py-1 rounded bg-slate-800 text-white font-bold">1</button>
            <button className="px-2 py-1 rounded hover:bg-slate-100">2</button>
            <button className="px-2 py-1 rounded hover:bg-slate-100">3</button>
            <button className="px-2 py-1 rounded hover:bg-slate-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
