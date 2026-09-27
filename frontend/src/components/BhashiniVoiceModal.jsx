import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  Volume2, 
  Play, 
  Square, 
  Radio, 
  Languages, 
  Sparkles, 
  Check 
} from 'lucide-react';

export default function BhashiniVoiceModal({ isOpen, onClose, onApplyVoiceQuery }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLang, setActiveLang] = useState('MR');
  const [transcript, setTranscript] = useState('मला ठाण्यात घरगुती खाद्यपदार्थ व्यवसाय सुरू करायचा आहे.');

  useEffect(() => {
    if (activeLang === 'MR') {
      setTranscript('मला ठाण्यात घरगुती खाद्यपदार्थ व्यवसाय सुरू करायचा आहे.');
    } else if (activeLang === 'HI') {
      setTranscript('मुझे ठाणे में घर पर खाने का व्यवसाय शुरू करना है।');
    } else {
      setTranscript('I want to start a home-based food business in Thane.');
    }
  }, [activeLang]);

  if (!isOpen) return null;

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
      }, 4000);
    }
  };

  const handleUseTranscript = () => {
    onApplyVoiceQuery(transcript);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-navy-900 text-white flex items-center justify-center">
              <Mic className="w-4 h-4 text-brandYellow" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded inline-block uppercase tracking-wider">
                BHASHINI AI SPEECH STACK
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Voice & Multilingual Audio
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Language selector */}
          <div className="flex items-center justify-center gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveLang('MR')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeLang === 'MR' ? 'bg-white text-slate-900 shadow-soft-sm' : 'text-slate-500'
              }`}
            >
              मराठी (Marathi)
            </button>
            <button
              onClick={() => setActiveLang('HI')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeLang === 'HI' ? 'bg-white text-slate-900 shadow-soft-sm' : 'text-slate-500'
              }`}
            >
              हिंदी (Hindi)
            </button>
            <button
              onClick={() => setActiveLang('EN')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeLang === 'EN' ? 'bg-white text-slate-900 shadow-soft-sm' : 'text-slate-500'
              }`}
            >
              English
            </button>
          </div>

          {/* Simulated Waveform & Recording */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-4">
            <div className="relative inline-block">
              <button
                onClick={toggleRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all shadow-lg ${
                  isRecording
                    ? 'bg-rose-600 ring-4 ring-rose-200 scale-105 animate-pulse'
                    : 'bg-navy-900 hover:bg-navy-800'
                }`}
              >
                <Mic className="w-7 h-7 text-brandYellow" />
              </button>
            </div>

            <div className="text-xs">
              <div className="font-bold text-slate-800">
                {isRecording ? 'Listening via Bhashini STT...' : 'Tap microphone to speak'}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Low-literacy speech recognition trained on 22 Indian regional dialects
              </div>
            </div>

            {/* Simulated Animated Waveform */}
            <div className="flex items-center justify-center gap-1 h-6">
              {[40, 70, 25, 90, 60, 85, 30, 95, 50, 80, 35, 75].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isRecording || isPlaying ? 'bg-amber-500' : 'bg-slate-300'
                  }`}
                  style={{
                    height: isRecording || isPlaying ? `${Math.max(20, height)}%` : '20%',
                    animationDuration: `${0.4 + (i % 5) * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Transcript Box */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase">
              <span>Bhashini Extracted Text</span>
              <button
                onClick={toggleAudio}
                className="text-amber-800 font-bold hover:underline flex items-center gap-1"
              >
                <Volume2 className="w-3 h-3" />
                <span>{isPlaying ? 'Playing Audio...' : 'Play Audio (TTS)'}</span>
              </button>
            </div>
            <p className="font-medium text-slate-800 text-xs sm:text-sm">
              "{transcript}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleUseTranscript}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-brandYellow hover:bg-brandYellow-hover text-slate-950 font-bold rounded-xl text-xs shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Use in Civic Navigator</span>
          </button>
        </div>
      </div>
    </div>
  );
}
