import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight, 
  Building2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  FileCheck2,
  CheckSquare,
  KeyRound,
  ShieldAlert
} from 'lucide-react';

export const DEMO_USERS = {
  citizen: {
    id: 'user_citizen_01',
    name: 'Suresh Mohan Jadhav',
    email: 'suresh.jadhav@gmail.com',
    role: 'citizen',
    designation: 'Citizen / Small Business Applicant',
    ward: 'Naupada - Kopri Ward #4, Thane',
    avatar: 'SJ'
  },
  admin: {
    id: 'user_admin_01',
    name: 'Dr. R. K. Shinde',
    email: 'admin.tmc@thanecity.gov.in',
    role: 'admin',
    designation: 'Assistant Municipal Commissioner & PIO',
    ward: 'TMC Naupada-Kopri Ward Office, Room 108',
    department: 'Health & Ward Licensing Authority',
    avatar: 'RS'
  }
};

export default function LoginPage({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState('citizen'); // 'citizen' | 'admin'
  const [email, setEmail] = useState(DEMO_USERS.citizen.email);
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
    setEmail(DEMO_USERS[role].email);
    setPassword('••••••••••');
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const user = DEMO_USERS[selectedRole];
      onLogin(user);
    }, 450);
  };

  const handleQuickLogin = (role) => {
    setSelectedRole(role);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(DEMO_USERS[role]);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top National / Civic Portal Banner */}
      <div className="max-w-md w-full mx-auto text-center space-y-2">
        
        <div className="flex items-center justify-center gap-2.5 pt-1">
          <div className="w-10 h-10 rounded-2xl bg-navy-900 text-white flex items-center justify-center shadow-3d-btn font-black text-sm tracking-tighter">
            FTP
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              ForThePeople
            </h1>
            <p className="text-[11px] font-bold text-terracotta tracking-widest uppercase mt-0.5 font-mono">
              BY THE PEOPLE
            </p>
          </div>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="max-w-lg w-full mx-auto my-6">
        <div className="card-3d rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-2xl relative">
          {/* Header Title */}
          <div className="text-center pb-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Portal Authentication
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select your role to access personalized citizen roadmaps or administrative verification queues.
            </p>
          </div>

          {/* Role Selector Tabs (Citizen vs Admin) */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 my-5">
            <button
              type="button"
              onClick={() => handleRoleTabChange('citizen')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'citizen'
                  ? 'bg-white text-slate-900 shadow-3d-sm scale-[1.02] border border-slate-200/90'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <User className={`w-4 h-4 ${selectedRole === 'citizen' ? 'text-terracotta' : 'text-slate-400'}`} />
              <span>Citizen Portal</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabChange('admin')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-navy-900 text-white shadow-3d-btn scale-[1.02]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${selectedRole === 'admin' ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>Admin / Officer</span>
            </button>
          </div>

          {/* Role Context Notification Box */}
          <div className={`p-3.5 rounded-xl border text-xs mb-5 transition-all ${
            selectedRole === 'admin'
              ? 'bg-navy-900/5 border-navy-900/20 text-navy-950'
              : 'bg-amber-50/70 border-amber-200 text-amber-900'
          }`}>
            {selectedRole === 'admin' ? (
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-navy-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Officer Verification Gateway</div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Grants exclusive access to the <strong>Admin Queue</strong>, Scraping Pipeline Health, Graph Mutation Commits, and Counter Fee Clearance controls.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-950">Citizen Task Navigator</div>
                  <p className="text-[11px] text-amber-900/90 mt-0.5 leading-relaxed">
                    Access your active civic roadmaps, Zigzag milestone tracker, and the verified Document Specimen Guide. <em>(Admin Queue is restricted to verified officers.)</em>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {selectedRole === 'admin' ? 'Officer Gov Email / Employee Code' : 'Citizen Email / Mobile Number'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  {selectedRole === 'admin' ? (
                    <Building2 className="w-4 h-4 text-slate-400" />
                  ) : (
                    <User className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all shadow-inner"
                  placeholder={selectedRole === 'admin' ? 'officer.id@thanecity.gov.in' : 'name@example.com'}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password / MPIN
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-terracotta hover:underline font-semibold">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all shadow-inner"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-terracotta border-slate-300 focus:ring-terracotta"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-[11px] text-slate-400">256-Bit SSL Encrypted</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedRole === 'admin'
                  ? 'btn-3d-slate text-white'
                  : 'btn-3d-terracotta text-white'
              }`}
            >
              <span>{isLoading ? 'Verifying Credentials...' : `Sign In to ${selectedRole === 'admin' ? 'Officer Portal' : 'Citizen Workspace'}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative px-3 bg-white text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              One-Click Instant Demo Login
            </span>
          </div>

          {/* 1-Click Role Login Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleQuickLogin('citizen')}
              className="card-3d-interactive p-3 rounded-xl border border-slate-200 text-left hover:border-amber-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded uppercase">
                  Citizen
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-amber-800 transition-all" />
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1.5">Suresh M. Jadhav</div>
              <div className="text-[10px] text-slate-500">Applicant • Food Business</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="card-3d-interactive p-3 rounded-xl border border-slate-200 text-left hover:border-blue-400 transition-all cursor-pointer group bg-slate-50/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded uppercase">
                  Admin Officer
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1.5">Dr. R. K. Shinde</div>
              <div className="text-[10px] text-slate-500">TMC Ward Assistant Comm.</div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Notices */}
      <div className="max-w-md w-full mx-auto text-center space-y-1 text-[11px] text-slate-400">
        <div className="flex items-center justify-center gap-3">
          <span>RTS Act Mandated</span>
          <span>•</span>
          <span>National Informatics Center Standards</span>
          <span>•</span>
          <span>TMC Ward #4</span>
        </div>
        <p className="text-[10px] text-slate-400">
          ForThePeople Civic Navigator © 2026. BY THE PEOPLE. All statutory procedural models ground on Maharashtra Government Gazettes.
        </p>
      </div>
    </div>
  );
}
