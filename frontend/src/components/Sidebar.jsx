import React from 'react';
import { 
  LayoutDashboard, 
  FileCheck, 
  Sparkles, 
  CheckSquare, 
  Landmark, 
  Settings, 
  Send, 
  Clock, 
  MoreVertical,
  UserCheck
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenDailyReport, pendingCount = 14 }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'documentGuide', label: 'Document Guide', icon: FileCheck, badge: '4 Ready', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'newSchemes', label: 'New Schemes', icon: Sparkles, badge: 'New', badgeColor: 'bg-rose-100 text-rose-700 border-rose-200' },
    { id: 'adminQueue', label: 'Admin Queue', icon: CheckSquare, badge: `${pendingCount}`, badgeColor: 'bg-slate-100 text-slate-700 border-slate-200' },
    { id: 'jurisdiction', label: 'Jurisdiction', icon: Landmark, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 min-h-screen p-4 select-none">
      <div>
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-2 py-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-navy-950 text-white flex items-center justify-center shadow-sm">
            <Landmark className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-[16px] tracking-tight leading-none">Nagrik Marg</div>
            <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-1">
              CIVIC NAVIGATOR
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="px-2 mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            OPERATIONAL CORE
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#dce9f4] text-slate-900 shadow-soft-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-slate-100 text-slate-600'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        {/* Daily Report Card */}
        <div className="bg-[#f0f6fa]/70 rounded-2xl p-3.5 border border-slate-200/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-900">Done for day?</span>
            <Clock className="w-3.5 h-3.5 text-terracotta" />
          </div>
          <p className="text-[11px] text-slate-500 leading-snug mb-3">
            Review verified procedures and dispatch end-of-day digest.
          </p>
          <button
            onClick={onOpenDailyReport}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
          >
            <Send className="w-3 h-3 fill-current" />
            <span>Send daily report</span>
          </button>
        </div>

        {/* User Profile Bar */}
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-navy-950 text-white flex items-center justify-center font-medium text-xs shadow-sm">
              <span className="font-semibold text-white">#4</span>
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900 leading-none mb-1">Citizen Desk #4</div>
              <div className="text-[10px] text-slate-400 font-medium">Admin / Navigator</div>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
