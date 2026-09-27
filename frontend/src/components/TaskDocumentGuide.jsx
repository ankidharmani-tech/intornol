import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  ZoomIn, 
  X, 
  ShieldCheck, 
  Download, 
  Building2, 
  Copy, 
  HelpCircle,
  Search,
  Filter,
  Eye,
  FileCheck2,
  Calendar,
  Layers
} from 'lucide-react';

export default function TaskDocumentGuide({ task, onOpenSpecimenModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeLightboxDoc, setActiveLightboxDoc] = useState(null);

  const docs = task?.documentsGuide || [];

  const categories = ['all', ...Array.from(new Set(docs.map(d => d.category)))];

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.authority.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Top Banner / Compliance Protocol */}
      <div className="card-3d rounded-2xl p-6 bg-gradient-to-r from-white via-slate-50 to-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase tracking-wider">
                Statutory Physical Verification Protocol
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {docs.length} Official Documents Mapped
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Required Documents & Official Specimens Guide
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Verify your physical paperwork against certified government specimens prior to visiting the Municipal Ward desk. Every document must satisfy exact watermark, unexpired timeline, and signature rules to avoid desk rejections.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 bg-slate-50 border border-slate-200/90 rounded-xl text-left shadow-sm">
              <div className="text-[11px] font-semibold text-slate-500">Readiness Check</div>
              <div className="text-sm font-bold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Desk Verified Specs</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-slate-50 border border-slate-200/90 rounded-xl text-left shadow-sm">
              <div className="text-[11px] font-semibold text-slate-500">Standard Rule</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                Original + 2 Copies
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search document name or authority..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-navy-900 text-white shadow-soft-sm scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat === 'all' ? 'All Documents' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocs.map((doc, idx) => (
          <div 
            key={doc.id || idx}
            className="card-3d-interactive rounded-2xl overflow-hidden flex flex-col transition-all duration-200 text-left group"
          >
            {/* Specimen Image Header */}
            <div 
              onClick={() => setActiveLightboxDoc(doc)}
              className="relative h-56 bg-slate-100 cursor-pointer overflow-hidden border-b border-slate-200/80 group-hover:opacity-95 transition-opacity"
            >
              <img 
                src={doc.specimenImage} 
                alt={`${doc.title} specimen`}
                className="w-full h-full object-contain p-2 bg-slate-50 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Top badges overlay */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-navy-900/90 text-white backdrop-blur-md shadow-md uppercase tracking-wide">
                  Official Specimen
                </span>
                <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-white/90 text-slate-700 backdrop-blur-md shadow-sm border border-slate-200">
                  {doc.category}
                </span>
              </div>

              {/* Hover prompt to zoom */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs backdrop-blur-[2px]">
                <ZoomIn className="w-5 h-5 text-amber-400" />
                <span>Click to Inspect Full-Size Specimen</span>
              </div>

              {/* Bottom right zoom button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxDoc(doc);
                }}
                className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/95 text-slate-700 hover:text-slate-900 shadow-md border border-slate-200 transition-transform hover:scale-110"
                title="Zoom Specimen"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Document Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Title & Authority */}
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-terracotta flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="truncate">{doc.authority}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-terracotta transition-colors">
                    {doc.title}
                  </h3>
                </div>

                {/* Requirements Checklist */}
                <div className="mt-3.5 space-y-2">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                    <span>Mandatory Verification Rules:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 pl-1">
                    {doc.keyPoints?.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Copies & Physical Desk Rule */}
                <div className="mt-4 p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-500 font-medium text-[11px]">
                    <span>Submission Format:</span>
                    <strong className="text-slate-900">{doc.copies}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 font-medium text-[11px]">
                    <span>Validity Window:</span>
                    <strong className="text-slate-900">{doc.validity}</strong>
                  </div>
                </div>

                {/* Highest Rejection Reason Caution Banner */}
                {doc.rejectionReason && (
                  <div className="mt-3.5 p-3 bg-rose-50/90 border border-rose-200 rounded-xl space-y-1 text-xs text-rose-900">
                    <div className="font-bold flex items-center gap-1.5 text-rose-800">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Frequent Counter Rejection Reason:</span>
                    </div>
                    <p className="text-[11px] text-rose-800 leading-relaxed pl-5">
                      {doc.rejectionReason}
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveLightboxDoc(doc)}
                  className="btn-3d-white flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 rounded-xl cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>Inspect Specimen</span>
                </button>

                {doc.portalUrl && (
                  <a
                    href={doc.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-3d-terracotta inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="card-3d p-12 text-center rounded-2xl space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Documents Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No document matches your search query "{searchTerm}". Try clearing search or selecting a different category.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
            className="btn-3d-white px-4 py-2 text-xs font-semibold rounded-xl"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Full-Screen Specimen Lightbox Modal */}
      {activeLightboxDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in-up">
          <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 card-3d animate-pop-in overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-amber-50/20 to-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-navy-900 text-white flex items-center justify-center shadow-sm">
                  <FileText className="w-5 h-5 text-brandYellow" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase tracking-wide">
                      Certified Specimen
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {activeLightboxDoc.authority}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {activeLightboxDoc.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveLightboxDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body - Two Column (Specimen Image + Verification Checklist) */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
              {/* Left Column: Big Image Display */}
              <div className="md:col-span-7 flex flex-col items-center justify-center bg-slate-100/70 rounded-2xl p-4 border border-slate-200">
                <img 
                  src={activeLightboxDoc.specimenImage} 
                  alt={activeLightboxDoc.title}
                  className="max-h-[60vh] object-contain rounded-xl shadow-lg border border-slate-200 bg-white"
                />
                <div className="text-[11px] text-slate-500 font-medium mt-3 flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-slate-400" />
                  <span>Physical Desk Sample Layout • Right-click or open in new tab to view full original</span>
                </div>
              </div>

              {/* Right Column: Physical Verification Desk Notes */}
              <div className="md:col-span-5 space-y-4 text-xs">
                {/* Desk Verification Checklist */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Physical Desk Verification Criteria</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {activeLightboxDoc.deskVerificationChecklist || 'Verifying officer checks for watermark, unexpired dates, and spelling consistency.'}
                  </p>
                </div>

                {/* Mandatory Points */}
                <div className="space-y-2">
                  <div className="font-bold text-slate-800">Key Audit Points:</div>
                  <ul className="space-y-2 text-slate-700">
                    {activeLightboxDoc.keyPoints?.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-soft-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Copies & Validity */}
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center text-amber-900">
                    <span>Copies Required:</span>
                    <strong>{activeLightboxDoc.copies}</strong>
                  </div>
                  <div className="flex justify-between items-center text-amber-900">
                    <span>Validity:</span>
                    <strong>{activeLightboxDoc.validity}</strong>
                  </div>
                </div>

                {/* Rejection Warning */}
                {activeLightboxDoc.rejectionReason && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-rose-800">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Rejection Warning:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {activeLightboxDoc.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveLightboxDoc(null)}
                className="btn-3d-white px-4 py-2 text-xs font-semibold"
              >
                Close Specimen
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={activeLightboxDoc.specimenImage}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="btn-3d-white flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Specimen</span>
                </a>
                {activeLightboxDoc.portalUrl && (
                  <a
                    href={activeLightboxDoc.portalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-3d-terracotta flex items-center gap-1.5 px-4 py-2 text-xs font-bold"
                  >
                    <span>Visit Authority Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
