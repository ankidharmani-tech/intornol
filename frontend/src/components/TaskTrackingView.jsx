import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  ShieldCheck, 
  Building2, 
  FileText, 
  ChevronRight, 
  Download, 
  Calendar, 
  AlertCircle,
  Copy,
  ExternalLink,
  Phone,
  MapPin,
  CheckCircle2,
  Package,
  Truck,
  FileCheck2,
  HelpCircle,
  Eye
} from 'lucide-react';
import { TASKS_DATA } from '../data/mockData';
import TaskDocumentGuide from './TaskDocumentGuide';

export default function TaskTrackingView({ 
  selectedTaskId = 'task_food_business', 
  onSelectTask, 
  onBackToDashboard 
}) {
  // Find current task across ongoing, upcoming, and completed
  const allTasks = [
    ...TASKS_DATA.ongoing,
    ...TASKS_DATA.upcoming,
    ...TASKS_DATA.completed
  ];
  const task = allTasks.find(t => t.id === selectedTaskId) || TASKS_DATA.ongoing[0];

  // Default selected step to the active step or the first step
  const activeStepIndex = task.timeline.findIndex(s => s.status === 'in_progress');
  const [selectedStepId, setSelectedStepId] = useState(
    activeStepIndex !== -1 ? task.timeline[activeStepIndex].id : task.timeline[0]?.id
  );
  const [copied, setCopied] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState('timeline');

  const selectedStep = task.timeline.find(s => s.id === selectedStepId) || task.timeline[0];

  const handleCopyId = () => {
    if (task.trackingId) {
      navigator.clipboard.writeText(task.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const completedCount = task.timeline.filter(s => s.status === 'completed').length;
  const totalCount = task.timeline.length;
  const remainingCount = totalCount - completedCount;

  return (
    <div className="space-y-6 pb-12 animate-fade-in-up">
      {/* Top Header & Breadcrumbs */}
      <div className="card-3d flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="btn-3d-white p-2 rounded-xl text-slate-600 hover:text-slate-900 cursor-pointer"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
              <span className="cursor-pointer hover:text-slate-700 transition-colors" onClick={onBackToDashboard}>Dashboard</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span>Tasks</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-slate-600 font-bold">{task.category}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              {task.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleCopyId}
            className="btn-3d-white flex items-center gap-1.5 px-3 py-1.5 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono">{copied ? 'Copied ID!' : task.trackingId}</span>
          </button>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold shadow-sm">
            {task.status}
          </span>
        </div>
      </div>

      {/* Task Views Switcher: Lifecycle Timeline vs Required Documents Guide */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 card-3d">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveViewTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeViewTab === 'timeline'
                ? 'btn-3d-slate text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${activeViewTab === 'timeline' ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>Milestone Timeline (Zigzag Pathway)</span>
          </button>

          <button
            onClick={() => setActiveViewTab('documents')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeViewTab === 'documents'
                ? 'btn-3d-terracotta text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Required Documents Guide</span>
            {task.documentsGuide && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                activeViewTab === 'documents' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900 border border-amber-200'
              }`}>
                {task.documentsGuide.length} Docs
              </span>
            )}
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium px-2 hidden sm:block">
          {activeViewTab === 'timeline' ? 'Tracking 5 execution milestones' : 'Inspecting official verified specimens'}
        </div>
      </div>

      {/* Amazon-Style Order Tracking & Shipping Overview Card */}
      <div className="card-3d rounded-2xl p-6 space-y-6">
        {/* Top Status & Estimated Delivery */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1">
              Service Delivery Guarantee
            </div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>Estimated Clearance: {task.estimatedCompletion}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Guaranteed under Maharashtra Right to Public Services Act (RTS Act 2015).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-left shadow-sm">
              <div className="text-xs font-semibold text-emerald-800">Steps Cleared</div>
              <div className="text-base font-bold text-emerald-900">{completedCount} of {totalCount} Completed</div>
            </div>
            <div className="px-3.5 py-2 bg-amber-50 border border-amber-200 rounded-xl text-left shadow-sm">
              <div className="text-xs font-semibold text-amber-800">Remaining</div>
              <div className="text-base font-bold text-amber-900">{remainingCount} Steps Left</div>
            </div>
          </div>
        </div>

        {/* Amazon-Style Delivery Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span>Overall Clearance Progress</span>
            <span className="font-bold text-terracotta">{task.progress}% Completed</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
            <div 
              className="bg-gradient-to-r from-terracotta to-brandYellow h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Amazon-Style Shipping / Desk Logistics Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="card-3d-interactive p-4 bg-gradient-to-b from-white to-slate-50/70 rounded-xl cursor-default">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1.5">
              <Building2 className="w-4 h-4 text-terracotta" />
              <span>Assigned Ward Desk</span>
            </div>
            <div className="text-sm font-bold text-slate-900">{task.deskLocation}</div>
            <div className="text-xs text-slate-500 mt-1">{task.department}</div>
          </div>

          <div className="card-3d-interactive p-4 bg-gradient-to-b from-white to-slate-50/70 rounded-xl cursor-default">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Verification Officer</span>
            </div>
            <div className="text-sm font-bold text-slate-900">{task.handlingOfficer}</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-700">{task.contactPhone}</span>
            </div>
          </div>

          <div className="card-3d-interactive p-4 bg-gradient-to-b from-white to-slate-50/70 rounded-xl cursor-default">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1.5">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Total Statutory Fee</span>
            </div>
            <div className="text-sm font-bold text-slate-900">{task.totalCost}</div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">Official Municipal Receipts Included</div>
          </div>
        </div>
      </div>

      {/* Conditional View: Document Guide OR Timeline */}
      {activeViewTab === 'documents' ? (
        <TaskDocumentGuide task={task} />
      ) : (
        <>
          {/* Selected Step Description Box (Always Interactive & Prominent) */}
          {selectedStep && (
            <div key={selectedStep.id} className="card-3d rounded-2xl p-6 animate-slide-down">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#fdf4f2] text-terracotta border border-terracotta/20 flex items-center justify-center font-bold text-sm shadow-soft-sm">
                {selectedStep.number}
              </span>
              <div>
                <span className="text-xs font-semibold text-slate-500">
                  Step {selectedStep.number} Details & Requirements
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {selectedStep.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                selectedStep.status === 'completed'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                  : selectedStep.status === 'in_progress'
                  ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm animate-pulse'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}>
                {selectedStep.statusLabel}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {selectedStep.date}
              </span>
            </div>
          </div>

          {/* Description Content */}
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-700 mb-1.5">
                Procedural Summary & Verification Note
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedStep.description}
              </p>
            </div>

            {/* Official Government Verification Source & Department Helpline Strip */}
            <div className="p-4 bg-slate-50/90 rounded-xl border border-slate-200/90 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Official Government Source & Contact Desk</span>
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-sm">
                  Official Government Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Official Portal Link */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-soft-sm flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-slate-500">Official Portal</div>
                    <div className="text-xs font-bold text-slate-900 truncate" title={selectedStep.govPortalName || selectedStep.authority}>
                      {selectedStep.govPortalName || selectedStep.authority}
                    </div>
                  </div>
                  {selectedStep.govLink && (
                    <a
                      href={selectedStep.govLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-3d-white inline-flex items-center gap-1.5 px-3 py-1.5 text-blue-700 text-xs font-semibold rounded-xl shrink-0 cursor-pointer"
                    >
                      <span>Visit Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Official Helpline / Contact Phone */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-soft-sm flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-slate-500">Department Helpline</div>
                    <div className="text-xs font-bold text-slate-900 truncate" title={selectedStep.phoneLabel || 'Official Department Desk'}>
                      {selectedStep.phoneLabel || 'Official Department Desk'}
                    </div>
                  </div>
                  {selectedStep.helplinePhone && (
                    <a
                      href={`tel:${selectedStep.helplinePhone.replace(/[^0-9+]/g, '')}`}
                      className="btn-3d-white inline-flex items-center gap-1.5 px-3 py-1.5 text-emerald-700 text-xs font-semibold rounded-xl shrink-0 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{selectedStep.helplinePhone}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mandatory Documents for this step */}
              <div className="card-3d-subtle p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-terracotta" />
                    <span>Mandatory Documents Required</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setActiveViewTab('documents')}
                    className="text-[11px] font-bold text-terracotta hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Guide</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <ul className="space-y-2">
                  {selectedStep.docsRequired?.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setActiveViewTab('documents')}
                  className="mt-3 w-full btn-3d-white flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold text-terracotta rounded-lg cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Specimen in Document Guide</span>
                </button>
              </div>

              {/* Statutory Fee & Authority Mandate */}
              <div className="card-3d-subtle p-4 rounded-xl space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-slate-600 mb-1">
                    Statutory Fee
                  </h4>
                  <div className="text-sm font-bold text-slate-900">{selectedStep.fee}</div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-600 mb-1">
                    Legal Mandate & Rule
                  </h4>
                  <div className="text-xs font-medium text-slate-600">{selectedStep.mandate}</div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-600 mb-1">
                    Inspection Remarks
                  </h4>
                  <div className="text-xs font-medium text-blue-700 bg-blue-50 p-2 rounded-lg border border-blue-200">
                    {selectedStep.verificationRemarks}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zigzag Timeline Title */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Lifecycle Timeline (Zigzag Pathway)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click on any timeline step to inspect its procedural description, required paperwork, and fees.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></span> Completed</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm animate-pulse"></span> In Progress</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Remaining</span>
        </div>
      </div>

      {/* Zigzag Timeline Container */}
      <div className="relative py-6">
        {/* Central Vertical Spine (Zigzag Axis on desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>
        
        {/* Mobile Vertical Spine (Left-aligned on mobile) */}
        <div className="md:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>

        <div className="space-y-8">
          {task.timeline.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            const isSelected = step.id === selectedStepId;
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in_progress';

            return (
              <div 
                key={step.id} 
                className="relative flex flex-col md:flex-row items-center"
              >
                {/* Center Node Badge (Desktop) */}
                <div 
                  onClick={() => setSelectedStepId(step.id)}
                  className={`hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full items-center justify-center font-bold text-xs shadow-md cursor-pointer transition-transform duration-200 hover:scale-125 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                      : isInProgress
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse shadow-blue-600/30'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : isInProgress ? (
                    <Clock className="w-5 h-5" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                {/* Mobile Node Badge */}
                <div 
                  onClick={() => setSelectedStepId(step.id)}
                  className={`md:hidden absolute left-5 -translate-x-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer transition-transform duration-200 hover:scale-115 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isInProgress
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : isInProgress ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                {/* Card Container - Zigzag: Left on even, Right on odd */}
                <div 
                  className={`w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 ${
                    isLeft ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'
                  }`}
                >
                  <div
                    onClick={() => setSelectedStepId(step.id)}
                    className={`card-3d-interactive p-5 rounded-2xl transition-all duration-200 cursor-pointer text-left ${
                      isSelected
                        ? 'border-2 border-slate-900 ring-4 ring-slate-900/10 shadow-3d-hover scale-[1.02]'
                        : 'hover:-translate-y-1.5 hover:shadow-3d-hover'
                    }`}
                  >
                    {/* Step Card Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-slate-500">
                        Step {step.number} • {step.date}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isInProgress
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {step.statusLabel}
                      </span>
                    </div>

                    {/* Step Card Title */}
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                      {step.title}
                    </h3>

                    {/* Step Card Summary */}
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">
                      {step.summary}
                    </p>

                    {/* Official Gov Link & Helpline Strip */}
                    <div className="pt-2.5 pb-2 border-t border-slate-100 space-y-1.5 text-xs">
                      {step.govLink && (
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-500 font-medium">Portal:</span>
                          <a
                            href={step.govLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 hover:text-blue-800 hover:underline max-w-[200px] truncate"
                            title={step.govPortalName || 'Official Portal'}
                          >
                            <span className="truncate">{step.govPortalName || 'Official Portal'}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>
                      )}

                      {step.helplinePhone && (
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-500 font-medium">Helpdesk:</span>
                          <a
                            href={`tel:${step.helplinePhone.replace(/[^0-9+]/g, '')}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                          >
                            <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{step.helplinePhone}</span>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Click prompt */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-bold">
                      <span className={isSelected ? 'text-slate-900' : 'text-slate-400'}>
                        {isSelected ? '✓ Currently Inspecting' : 'Click to inspect details'}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-slate-900' : 'text-slate-400'}`} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
        </>
      )}
    </div>
  );
}
