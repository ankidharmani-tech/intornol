import React, { useState } from 'react';
import { 
  X, 
  Check, 
  HelpCircle, 
  Sparkles, 
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CLARIFYING_QUESTIONS } from '../data/mockData';

export default function ClarifyingModal({ isOpen, onClose, onApplyProfile }) {
  const [answers, setAnswers] = useState({
    premises_type: 'home',
    ownership_type: 'rented',
    food_category: 'packaged_snacks',
    turnover: 'under_12L'
  });

  if (!isOpen) return null;

  const handleSelect = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleApply = () => {
    onApplyProfile(answers);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider">
                Task-First Personalization
              </span>
              <span className="text-xs text-slate-400 font-mono">4 Profile Parameters</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Clarifying Questions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalizes your statutory roadmap by pruning irrelevant requirements.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Questions list */}
        <div className="p-6 overflow-y-auto space-y-5">
          {CLARIFYING_QUESTIONS.map((q, idx) => (
            <div key={q.id} className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-navy-900 text-white flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                <span>{q.question}</span>
              </label>

              <div className="grid grid-cols-1 gap-2">
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect(q.id, opt.id)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-50/80 border-amber-400 text-slate-900 font-semibold ring-1 ring-amber-400/40 shadow-soft-sm'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-amber-600 bg-amber-500 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span>{opt.label}</span>
                      </div>
                      {opt.recommended && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-normal">
                          Detected Default
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            Rules dynamically evaluated via graph traversal
          </div>
          <button
            onClick={handleApply}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-brandYellow hover:bg-brandYellow-hover text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <span>Update Roadmap Pathway</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
