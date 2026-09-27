import React, { useState } from 'react';
import { 
  Check, 
  AlertTriangle, 
  ExternalLink, 
  Volume2, 
  Printer, 
  QrCode, 
  User, 
  Zap, 
  Stamp, 
  FileText, 
  Download,
  Eye,
  MapPin,
  Clock,
  Building2,
  Navigation,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';

export default function DocumentGuideView({ selectedCity, onOpenVoiceModal }) {
  const [docStatus, setDocStatus] = useState({
    aadhaar: true,
    electricity: true,
    rent: false,
    kitchen: false
  });

  const toggle = (key) => {
    setDocStatus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const verifiedCount = Object.values(docStatus).filter(Boolean).length;
  const progressPercent = Math.round((verifiedCount / 4) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
              DESK VERIFICATION PRE-CHECK
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[11px] text-slate-500 font-medium">
              Thane Municipal Jurisdiction (TMC / FDA Zone 4)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenVoiceModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors shadow-soft-sm"
            >
              <Volume2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Listen in Marathi / मराठी ऐका</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold rounded-xl shadow-soft-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Verification Checklist</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
          Citizen Document Verification Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed mb-6">
          Compare your physical paper documents with the official specimens below before visiting the Ward Seva Kendra. Specially adapted visual references for Thane district home-kitchen micro-enterprises.
        </p>

        {/* Ready to File Status Banner */}
        <div className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-navy-950 text-white flex items-center justify-center shrink-0">
                <FileCheck2 className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Ready to File Status: <span className="text-slate-900">{verifiedCount} / 4 Verified</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  2 core identity records confirmed • 2 pending premises NOC & premise photograph
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-36 sm:w-56 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-terracotta h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-slate-700 min-w-8">{progressPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2x2 Grid matching reference image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Aadhaar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 font-mono">
                MANDATORY IDENTITY PROOF
              </span>
              <button
                type="button"
                onClick={() => toggle('aadhaar')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  docStatus.aadhaar
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center ${docStatus.aadhaar ? 'bg-blue-600 text-white' : 'border border-slate-400'}`}>
                  {docStatus.aadhaar && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{docStatus.aadhaar ? 'I Have This' : 'Pending'}</span>
              </button>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-3">
              1. Aadhaar Card (Applicant)
            </h3>

            {/* Aadhaar Card Graphic Simulation */}
            <div className="bg-[#f0f6fa]/60 rounded-xl p-3.5 border border-slate-200 mb-3 shadow-inner">
              <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b border-slate-200">
                <div className="text-[10px] font-bold text-slate-600 tracking-wider">
                  GOVERNMENT OF INDIA • भारत सरकार
                </div>
                <div className="text-[9px] font-bold text-terracotta tracking-widest font-mono">
                  MERA AADHAAR
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-16 bg-slate-200 rounded-lg flex flex-col items-center justify-center border border-slate-300 text-slate-500">
                  <User className="w-7 h-7 text-slate-400 mb-0.5" />
                  <span className="font-mono text-[8px] font-bold">PHOTO</span>
                </div>

                <div className="space-y-1 flex-1 text-xs">
                  <div>
                    <div className="text-[8px] text-slate-400 uppercase font-mono leading-none">FULL LEGAL NAME</div>
                    <div className="font-bold text-slate-900 text-xs">SURESH M. JADHAV</div>
                  </div>
                  <div>
                    <div className="text-[8px] text-slate-400 uppercase font-mono leading-none">DOB / जन्म तारीख</div>
                    <div className="font-semibold text-slate-700 text-[11px]">14/08/1984</div>
                  </div>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="font-mono font-bold text-slate-800 text-[11px]">XXXX XXXX 4892</span>
                    <span className="text-[8px] bg-slate-200 text-slate-600 px-1 py-0.2 rounded font-mono">Masked</span>
                  </div>
                </div>

                <div className="w-12 h-12 bg-white rounded-lg border border-slate-300 flex flex-col items-center justify-center p-1 shrink-0">
                  <QrCode className="w-7 h-7 text-slate-800" />
                  <span className="text-[7px] font-mono text-emerald-700 font-bold mt-0.5">VALID QR</span>
                </div>
              </div>
            </div>

            {/* Checklist points */}
            <div className="space-y-1.5 text-xs text-slate-600 mb-3">
              <div className="flex items-start gap-1.5">
                <span className="text-slate-400">✓</span>
                <span>Carry original plastic PVC Aadhaar card or high-res color e-Aadhaar printout.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-slate-400">✓</span>
                <span>Name spelling must match electricity bill & bank passbook exactly.</span>
              </div>
            </div>

            {/* Rejection Alert */}
            <div className="bg-[#fdf4f2] border border-[#f8d5ce] rounded-xl p-2.5 text-[11px] text-rose-900 flex items-start gap-2 mb-3 leading-snug">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">COMMON REJECTION: </strong>
                Scratched/blurred QR codes or mismatch with bank account name (e.g., Suresh vs. Sureshrao).
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
            <a
              href="https://myaadhaar.uidai.gov.in"
              target="_blank"
              rel="noreferrer"
              className="text-terracotta hover:underline font-semibold flex items-center gap-1"
            >
              <span>Download e-Aadhaar via UIDAI portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-400 font-medium">Step 1 of 4</span>
          </div>
        </div>

        {/* Card 2: Electricity Bill */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 font-mono">
                VALID ADDRESS PROOF
              </span>
              <button
                type="button"
                onClick={() => toggle('electricity')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  docStatus.electricity
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center ${docStatus.electricity ? 'bg-blue-600 text-white' : 'border border-slate-400'}`}>
                  {docStatus.electricity && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{docStatus.electricity ? 'I Have This' : 'Pending'}</span>
              </button>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-3">
              2. Electricity Bill (MSEDCL / Mahavitaran)
            </h3>

            {/* Bill Graphic Simulation */}
            <div className="bg-[#f0f6fa]/60 rounded-xl p-3.5 border border-slate-200 mb-3 shadow-inner">
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-200">
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-bold text-slate-800 tracking-wider">
                    MAHAVITARAN (MSEDCL)
                  </span>
                </div>
                <span className="text-[8px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full font-mono">
                  PAID RECEIPT STAMP
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[8px] text-slate-400 uppercase font-mono">CONSUMER NO.</div>
                    <div className="font-bold text-slate-900 font-mono text-[11px]">015629841203</div>
                  </div>
                  <div>
                    <div className="text-[8px] text-slate-400 uppercase font-mono">BILLING MONTH</div>
                    <div className="font-semibold text-slate-700 text-[11px]">Jan 2025 (&lt; 90 Days)</div>
                  </div>
                </div>
                <div>
                  <div className="text-[8px] text-slate-400 uppercase font-mono">PREMISES ADDRESS</div>
                  <div className="text-[11px] text-slate-700 font-medium truncate">
                    Flat 304, Shivneri CHS, Ram Maruti Rd, Naupada, Thane (W)...
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist points */}
            <div className="space-y-1.5 text-xs text-slate-600 mb-3">
              <div className="flex items-start gap-1.5">
                <span className="text-slate-400">✓</span>
                <span>Must be issued within the last 90 days with clear consumer & billing cycle dates.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-slate-400">✓</span>
                <span>Must include proof of payment (online transaction reference or paid cash stamp).</span>
              </div>
            </div>

            {/* Rejection Alert */}
            <div className="bg-[#fdf4f2] border border-[#f8d5ce] rounded-xl p-2.5 text-[11px] text-rose-900 flex items-start gap-2 mb-3 leading-snug">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">COMMON REJECTION: </strong>
                Bills older than 3 months or blurry thermal paper prints where address characters have faded.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
            <a
              href="https://wss.mahadiscom.in"
              target="_blank"
              rel="noreferrer"
              className="text-terracotta hover:underline font-semibold flex items-center gap-1"
            >
              <span>Get MSEDCL duplicate bill copy online</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-400 font-medium">Step 2 of 4</span>
          </div>
        </div>

        {/* Card 3: Rent Agreement */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 font-mono">
                PREMISES OWNERSHIP PROOF
              </span>
              <button
                type="button"
                onClick={() => toggle('rent')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  docStatus.rent
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center ${docStatus.rent ? 'bg-blue-600 text-white' : 'border border-slate-400'}`}>
                  {docStatus.rent && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{docStatus.rent ? 'I Have This' : 'Pending'}</span>
              </button>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-3">
              3. Registered Rent Agreement + NOC
            </h3>

            {/* Rent Agreement Graphic Simulation */}
            <div className="bg-[#f0f6fa]/60 rounded-xl p-3.5 border border-slate-200 mb-3 shadow-inner">
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-200">
                <div className="flex items-center gap-1">
                  <Stamp className="w-3 h-3 text-slate-700" />
                  <span className="text-[10px] font-bold text-slate-800 tracking-wider">
                    GOVT OF MAHARASHTRA E-STAMP
                  </span>
                </div>
                <span className="text-[8px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full font-mono">
                  IGR SUB-REGISTRAR
                </span>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                <div className="font-bold text-slate-800 text-[10px] mb-1">
                  Mandatory Commercial/Cottage Rider (Clause 7):
                </div>
                <div className="text-[10px] text-slate-600 italic leading-relaxed">
                  "The Licensor hereby confirms no objection to the Licensee conducting low-scale domestic home food/cloud-kitchen activities compliant with Thane Municipal Food Safety Norms."
                </div>
              </div>
            </div>

            {/* Checklist points */}
            <div className="space-y-1.5 text-xs text-slate-600 mb-3">
              <div className="flex items-start gap-1.5">
                <span className="text-slate-400">✓</span>
                <span>Must have minimum 6 months remaining validity at the date of application.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-slate-400">✓</span>
                <span>Landlord NOC must mention applicant's Aadhaar and full flat address.</span>
              </div>
            </div>

            {/* Rejection Alert */}
            <div className="bg-[#fdf4f2] border border-[#f8d5ce] rounded-xl p-2.5 text-[11px] text-rose-900 flex items-start gap-2 mb-3 leading-snug">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">COMMON REJECTION: </strong>
                Unnotarized plain paper agreements without Government e-Registration Stamp or expired validity periods.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
            <button className="text-terracotta hover:underline font-semibold flex items-center gap-1">
              <span>Download 1-Page Landlord NOC Draft (Word/PDF)</span>
              <Download className="w-3 h-3" />
            </button>
            <span className="text-slate-400 font-medium">Step 3 of 4</span>
          </div>
        </div>

        {/* Card 4: Kitchen & Prep Area Photo */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 font-mono">
                PHYSICAL INSPECTION SPEC
              </span>
              <button
                type="button"
                onClick={() => toggle('kitchen')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  docStatus.kitchen
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center ${docStatus.kitchen ? 'bg-blue-600 text-white' : 'border border-slate-400'}`}>
                  {docStatus.kitchen && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{docStatus.kitchen ? 'I Have This' : 'Pending'}</span>
              </button>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-3">
              4. Kitchen & Prep Area Photo
            </h3>

            {/* Kitchen Photo Graphic Simulation */}
            <div className="bg-slate-100 rounded-xl p-2 border border-slate-200 mb-3 relative overflow-hidden">
              <div className="aspect-[16/8] bg-slate-300 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-300">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-slate-600/30 flex flex-col justify-end p-2.5">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/90 text-slate-900 flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 stroke-[3] text-emerald-600" />
                      Exhaust Fan Visible
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/90 text-slate-900 flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 stroke-[3] text-emerald-600" />
                      1kg Dry Extinguisher
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/90 text-slate-900 flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 stroke-[3] text-emerald-600" />
                      Clean Slabs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist points */}
            <div className="space-y-1.5 text-xs text-slate-600 mb-3">
              <div className="flex items-start gap-1.5">
                <span className="text-slate-400">✓</span>
                <span>Provide two 4x6 inch color glossy photo prints showing wide kitchen layout.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-slate-400">✓</span>
                <span>Preparation surface, storage containers, and water source must be well visible.</span>
              </div>
            </div>

            {/* Rejection Alert */}
            <div className="bg-[#fdf4f2] border border-[#f8d5ce] rounded-xl p-2.5 text-[11px] text-rose-900 flex items-start gap-2 mb-3 leading-snug">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">COMMON REJECTION: </strong>
                Dark/dim photos, domestic clutter, pets in the frame, or absence of kitchen exhaust airflow.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
            <button className="text-terracotta hover:underline font-semibold flex items-center gap-1">
              <span>View 3 Good vs. Bad Photo Examples</span>
              <Eye className="w-3 h-3" />
            </button>
            <span className="text-slate-400 font-medium">Step 4 of 4</span>
          </div>
        </div>
      </div>

      {/* Bottom 3 Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <User className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              UIDAI e-Aadhaar Portal
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Retrieve password-protected PDF directly using registered mobile OTP.
            </p>
          </div>
          <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1">
            <span>Open UIDAI Portal</span>
            <span>→</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Mahavitaran Bill Copy
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Instant download of latest electricity statement using your 12-digit consumer number.
            </p>
          </div>
          <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1">
            <span>Fetch MSEDCL Bill</span>
            <Download className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-[#111827] text-white rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                WALK-IN HELP CENTER
              </span>
              <Building2 className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              Aaple Sarkar Seva Kendra
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Naupada Ward Office, Room 106, Chandanwadi Cross Rd, Thane (W)
            </p>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Hours: Mon-Sat: 10:00 AM - 4:30 PM</span>
            </div>
          </div>
          <button className="w-full py-2.5 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 mt-4 shadow-sm">
            <Navigation className="w-3.5 h-3.5" />
            <span>Locate Ward Center</span>
          </button>
        </div>
      </div>
    </div>
  );
}
