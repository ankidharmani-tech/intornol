import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  CheckSquare, 
  Landmark, 
  Settings, 
  Send, 
  Clock, 
  MoreVertical,
  ListTodo,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Hourglass,
  Calendar,
  LogOut
} from 'lucide-react';
import { TASKS_DATA } from '../data/mockData';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  onOpenDailyReport, 
  pendingCount = 14,
  selectedTaskId,
  onSelectTask,
  currentUser,
  onLogout,
  onSwitchRole
}) {
  const [isTasksOpen, setIsTasksOpen] = useState(true);
  const [isOngoingOpen, setIsOngoingOpen] = useState(true);
  const [isUpcomingOpen, setIsUpcomingOpen] = useState(false);
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);

  const ongoingCount = TASKS_DATA.ongoing.length;
  const upcomingCount = TASKS_DATA.upcoming.length;
  const completedCount = TASKS_DATA.completed.length;

  const handleTaskClick = (taskId) => {
    if (onSelectTask) {
      onSelectTask(taskId);
    }
    setActiveTab('taskTracking');
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 h-screen sticky top-0 p-4 select-none z-40">
      <div className="flex flex-col min-h-0">
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
        <nav className="space-y-1 overflow-y-auto pr-1 flex-1">
          {/* Dashboard Tab */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#dce9f4] text-slate-900 shadow-soft-sm font-bold scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:translate-x-1 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-slate-900' : 'text-slate-400'}`} />
              <span>Dashboard</span>
            </div>
          </button>

          {/* Tasks Accordion Group */}
          <div className="pt-1">
            <button
              onClick={() => setIsTasksOpen(!isTasksOpen)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                activeTab === 'taskTracking'
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ListTodo className="w-4 h-4 text-terracotta" />
                <span>Tasks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-mono">
                  {ongoingCount + upcomingCount}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isTasksOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Tasks Subcategories Accordion with Smooth Dropdown Animation */}
            <div className={`dropdown-collapse ${isTasksOpen ? 'open' : ''}`}>
              <div className="dropdown-collapse-inner pl-3 pr-1 pt-1 space-y-1">
                {/* 1. Ongoing Tasks Group */}
                <div>
                  <button
                    onClick={() => setIsOngoingOpen(!isOngoingOpen)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-100/70 transition-all cursor-pointer"
                  >
                    <span>Ongoing</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                        {ongoingCount}
                      </span>
                      <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOngoingOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Ongoing Tasks Dropdown List with Smooth Height Transition */}
                  <div className={`dropdown-collapse ${isOngoingOpen ? 'open' : ''}`}>
                    <div className="dropdown-collapse-inner pl-4 pr-1 py-1 space-y-0.5">
                      {TASKS_DATA.ongoing.map((task, idx) => {
                        const isTaskSelected = activeTab === 'taskTracking' && selectedTaskId === task.id;
                        return (
                          <button
                            key={task.id}
                            onClick={() => handleTaskClick(task.id)}
                            style={{ animationDelay: `${idx * 40}ms` }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150 leading-tight flex items-center justify-between gap-1.5 cursor-pointer ${
                              isTaskSelected
                                ? 'bg-[#dce9f4] text-slate-900 font-bold border-l-2 border-slate-800 pl-2 shadow-soft-sm'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:translate-x-0.5'
                            }`}
                          >
                            <span className="truncate">{task.shortTitle}</span>
                            <span className="text-[9px] font-mono text-slate-400 shrink-0">{task.progress}%</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. Upcoming Tasks Group */}
                <div>
                  <button
                    onClick={() => setIsUpcomingOpen(!isUpcomingOpen)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-100/70 transition-all cursor-pointer"
                  >
                    <span>Upcoming</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-mono">
                        {upcomingCount}
                      </span>
                      <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isUpcomingOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Upcoming Tasks Dropdown List with Smooth Height Transition */}
                  <div className={`dropdown-collapse ${isUpcomingOpen ? 'open' : ''}`}>
                    <div className="dropdown-collapse-inner pl-4 pr-1 py-1 space-y-0.5">
                      {TASKS_DATA.upcoming.map((task, idx) => {
                        const isTaskSelected = activeTab === 'taskTracking' && selectedTaskId === task.id;
                        return (
                          <button
                            key={task.id}
                            onClick={() => handleTaskClick(task.id)}
                            style={{ animationDelay: `${idx * 40}ms` }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150 leading-tight flex items-center justify-between gap-1.5 cursor-pointer ${
                              isTaskSelected
                                ? 'bg-[#dce9f4] text-slate-900 font-bold border-l-2 border-slate-800 pl-2 shadow-soft-sm'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:translate-x-0.5'
                            }`}
                          >
                            <span className="truncate">{task.shortTitle}</span>
                            <span className="text-[9px] font-mono text-slate-400 shrink-0">Queued</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 3. Completed Tasks Group */}
                <div>
                  <button
                    onClick={() => setIsCompletedOpen(!isCompletedOpen)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-100/70 transition-all cursor-pointer"
                  >
                    <span>Completed</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                        {completedCount}
                      </span>
                      <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isCompletedOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Completed Tasks Dropdown List with Smooth Height Transition */}
                  <div className={`dropdown-collapse ${isCompletedOpen ? 'open' : ''}`}>
                    <div className="dropdown-collapse-inner pl-4 pr-1 py-1 space-y-0.5">
                      {TASKS_DATA.completed.map((task, idx) => {
                        const isTaskSelected = activeTab === 'taskTracking' && selectedTaskId === task.id;
                        return (
                          <button
                            key={task.id}
                            onClick={() => handleTaskClick(task.id)}
                            style={{ animationDelay: `${idx * 40}ms` }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150 leading-tight flex items-center justify-between gap-1.5 cursor-pointer ${
                              isTaskSelected
                                ? 'bg-[#dce9f4] text-slate-900 font-bold border-l-2 border-slate-800 pl-2 shadow-soft-sm'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:translate-x-0.5'
                            }`}
                          >
                            <span className="truncate">{task.shortTitle}</span>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NOTE: New Schemes page removed per user request and moved to Header notification bell:
            "and, remove new schemes page also, and instead make a notification button or something like that, on the top bar, so that when new schemes arrives usr can check there.."
          */}
          {/*
          <button
            onClick={() => setActiveTab('newSchemes')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
              activeTab === 'newSchemes'
                ? 'bg-[#dce9f4] text-slate-900 shadow-soft-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className={`w-4 h-4 ${activeTab === 'newSchemes' ? 'text-slate-900' : 'text-slate-400'}`} />
              <span>New Schemes</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-rose-100 text-rose-700 border-rose-200">
              New
            </span>
          </button>
          */}

          {/* Admin Queue (strictly visible in Admin section only) */}
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setActiveTab('adminQueue')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'adminQueue'
                  ? 'bg-[#dce9f4] text-slate-900 shadow-soft-sm font-bold scale-[1.01]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:translate-x-1 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckSquare className={`w-4 h-4 ${activeTab === 'adminQueue' ? 'text-slate-900' : 'text-slate-400'}`} />
                <span>Admin Queue</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-100 text-slate-700 border-slate-200 font-mono shadow-sm">
                {pendingCount}
              </span>
            </button>
          )}

          {/* NOTE: Document Guide is removed per user request:
            "remove document guide as right now it looks like u have just one task ongoing and thats why u have durect tab for doc guide"
          */}
          {/*
          <button
            onClick={() => setActiveTab('documentGuide')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ...`}
          >
            ...
          </button>
          */}

          {/* NOTE: Jurisdiction page is commented out per user request:
            "and remove jurisdiction page, means dont remove permanantly, its just that, if we want we will put it, so comment it for now.."
          */}
          {/*
          <button
            onClick={() => setActiveTab('jurisdiction')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ...`}
          >
            ...
          </button>
          */}

          {/* Settings */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#dce9f4] text-slate-900 shadow-soft-sm font-bold scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:translate-x-1 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-slate-900' : 'text-slate-400'}`} />
              <span>Settings</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-3 pt-3 border-t border-slate-100 shrink-0">
        {/* Daily Report Card */}
        <div className="card-3d-interactive bg-gradient-to-b from-[#f0f6fa] to-white rounded-2xl p-3.5 border border-slate-200/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-900">Done for day?</span>
            <Clock className="w-3.5 h-3.5 text-terracotta" />
          </div>
          <p className="text-[11px] text-slate-500 leading-snug mb-3">
            Review verified procedures and dispatch end-of-day digest.
          </p>
          <button
            onClick={onOpenDailyReport}
            className="btn-3d-terracotta w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl cursor-pointer"
          >
            <Send className="w-3 h-3 fill-current" />
            <span>Send daily report</span>
          </button>
        </div>

        {/* User Profile Bar */}
        <div className="p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm shrink-0 ${
                currentUser?.role === 'admin' ? 'bg-navy-900 text-amber-400' : 'bg-slate-900 text-white'
              }`}>
                {currentUser?.avatar || (currentUser?.role === 'admin' ? 'RS' : 'SJ')}
              </div>
              <div className="text-left min-w-0">
                <div className="text-xs font-bold text-slate-900 leading-tight truncate">
                  {currentUser?.name || 'Citizen User'}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                    currentUser?.role === 'admin'
                      ? 'bg-blue-100 text-blue-900 border border-blue-200'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    {currentUser?.role === 'admin' ? 'TMC Admin' : 'Citizen'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
              title="Sign Out of Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Role Switcher */}
          <button
            onClick={onSwitchRole}
            className="w-full py-1.5 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Switch to {currentUser?.role === 'admin' ? 'Citizen View' : 'Admin View'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
