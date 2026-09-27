import React from 'react';
import { 
  X, 
  Check, 
  AlertTriangle, 
  ExternalLink, 
  Download, 
  FileText, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export default function DocumentPreviewModal({ documentTitle, isOpen, onClose }) {
  if (!isOpen || !documentTitle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 card-3d animate-pop-in overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-amber-50/20 to-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-navy-900 text-white flex items-center justify-center shadow-sm">
              <FileText className="w-4 h-4 text-brandYellow" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                DOCUMENT SPECIFICATION
              </div>
              <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                {documentTitle}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-slate-600">
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1 shadow-sm">
            <div className="font-bold text-amber-900 text-xs">Physical Verification Criteria:</div>
            <p className="text-amber-800 leading-relaxed text-[11px]">
              The verifying clerk at the Municipal Ward desk checks for physical watermark, unexpired dates (less than 90 days), and absolute consistency across applicant name spellings.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-slate-900">Desk Checklist Points:</div>
            <ul className="space-y-1.5 text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Original physical document + 2 self-attested photocopies</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>QR code on UIDAI or e-Stamp must scan and verify live</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Address matches property tax / electricity billing zone</span>
              </li>
            </ul>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-rose-800 space-y-1 shadow-sm">
            <div className="font-bold text-rose-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Highest Rejection Reason</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Name initials mismatch (e.g. "S. M. Jadhav" instead of expanded "Suresh Mohan Jadhav") on bank passbook vs municipal challan.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="btn-3d-white px-4 py-2 text-xs"
          >
            Close
          </button>
          <a
            href="https://services.india.gov.in"
            target="_blank"
            rel="noreferrer"
            className="btn-3d-terracotta flex items-center gap-1.5 px-4 py-2 text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Official Blank Spec</span>
          </a>
        </div>
      </div>
    </div>
  );
}
