import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  FileCheck, 
  Download, 
  Building2, 
  Clock, 
  User, 
  Mail, 
  Check 
} from 'lucide-react';

export default function DailyReportModal({ isOpen, onClose, selectedCity }) {
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded uppercase tracking-wider">
              Citizen Desk Dispatch
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Daily Civic Case Summary Report
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {sent ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Daily Report Dispatched Successfully!
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Case summary metrics and desk readiness exports have been submitted to TMC Ward In-Charge and archived in local database.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold text-xs"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Target Ward Desk:</span>
                  <strong className="text-slate-900">{selectedCity.zone}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Applicant Inquiries Processed:</span>
                  <strong className="text-slate-900">18 Civic Pathways</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Document Readiness Ratio:</span>
                  <strong className="text-emerald-700 font-bold">83.3% Cleared</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Average Turnaround Promise:</span>
                  <strong className="text-slate-900">14.2 Days (Under RTS Cap)</strong>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Dispatch Recipient Email
                </label>
                <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    defaultValue="ward.officer@thanecity.gov.in"
                    className="bg-transparent text-xs text-slate-800 w-full focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setSent(true)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-brandYellow hover:bg-brandYellow-hover text-slate-950 font-bold rounded-xl text-xs shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm & Send Report</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
