import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  Download, 
  User, 
  Check,
  Bell,
  Sparkles,
  ExternalLink,
  IndianRupee,
  CheckCircle2,
  X,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { CITIES } from '../data/mockData';

const SCHEME_NOTIFICATIONS = [
  {
    id: 'pmfme',
    title: 'PM Formalisation of Micro Food Processing (PMFME)',
    ministry: 'MoFPI • Central Sector',
    match: '96% Match',
    benefit: '35% Credit-Linked Capital Subsidy (Up to ₹10 Lakhs)',
    eligibility: 'For home-based micro food units with FSSAI registration',
    url: 'https://pmfme.mofpi.gov.in/',
    isNew: true,
    time: '2h ago'
  },
  {
    id: 'annapurna',
    title: 'Annapurna Scheme for Women Food Entrepreneurs',
    ministry: 'Bharatiya Mahila Bank / SBI',
    match: '94% Match',
    benefit: 'Zero-Collateral Kitchen Equipment Loan (Up to ₹50,000)',
    eligibility: 'Women proprietors establishing catering or packaged food units',
    url: 'https://sbi.co.in',
    isNew: true,
    time: '1d ago'
  },
  {
    id: 'pmegp',
    title: "Prime Minister's Employment Generation Programme (PMEGP)",
    ministry: 'MSME • KVIC',
    match: '89% Match',
    benefit: '25% - 35% Margin Money Subsidy (Up to ₹25 Lakhs)',
    eligibility: 'New micro-enterprises in food processing and manufacturing',
    url: 'https://www.kviconline.gov.in/pmegpeportal/',
    isNew: false,
    time: '3d ago'
  }
];

export default function Header({ 
  selectedCity, 
  setSelectedCity, 
  language, 
  setLanguage, 
  searchQuery, 
  setSearchQuery,
  onExportChecklist,
  currentUser,
  onLogout,
  onSwitchRole
}) {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [schemes, setSchemes] = useState(SCHEME_NOTIFICATIONS);
  const notificationRef = useRef(null);
  const cityRef = useRef(null);
  const userMenuRef = useRef(null);

  const unreadCount = schemes.filter(s => s.isNew).length;

  const markAllRead = () => {
    setSchemes(prev => prev.map(s => ({ ...s, isNew: false })));
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setCityDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'EN', label: 'EN' },
    { code: 'HI', label: 'हिंदी' },
    { code: 'MR', label: 'मराठी' },
  ];

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-md transition-all">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks, services, citizen schemes... (e.g. Start food business in Thane)"
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900/10 focus:border-navy-900 focus:bg-white focus:shadow-md transition-all duration-200 shadow-inner"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Location Dropdown */}
        <div className="relative" ref={cityRef}>
          <button
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            className="btn-3d-white flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{selectedCity.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          {cityDropdownOpen && (
            <div className="card-3d absolute right-0 mt-2 w-64 rounded-xl py-1.5 z-50 animate-fade-in-up">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Municipal Jurisdiction
              </div>
              {CITIES.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCity(city);
                    setCityDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    selectedCity.id === city.id ? 'bg-amber-50/60 text-slate-900 font-semibold' : 'text-slate-600'
                  }`}
                >
                  <div>
                    <div className="font-medium text-slate-800">{city.name}</div>
                    <div className="text-[10px] text-slate-400">{city.authority}</div>
                  </div>
                  {selectedCity.id === city.id && <Check className="w-4 h-4 text-amber-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Schemes & Announcements Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="View new government schemes"
            className="btn-3d-white relative p-2 text-slate-700 cursor-pointer"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-rose-600 text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Popover Dropdown */}
          {notificationsOpen && (
            <div className="card-3d absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl py-3 z-50 animate-fade-in-up">
              <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">New Schemes & Grants</h4>
                    <p className="text-[10px] text-slate-500">Matched to your civic profile</p>
                  </div>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-terracotta hover:underline font-semibold cursor-pointer"
                  >
                    Mark read
                  </button>
                )}
              </div>

              {/* Scheme Items List */}
              <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto px-1">
                {schemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className={`p-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-default my-1 ${
                      scheme.isNew ? 'bg-amber-50/30 border border-amber-200/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold text-slate-500">{scheme.ministry}</span>
                        {scheme.isNew && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-sm animate-pulse"></span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full shrink-0 shadow-sm">
                        {scheme.match}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      {scheme.title}
                    </h5>

                    <div className="mt-1.5 p-2 bg-slate-50 border border-slate-200/80 rounded-lg text-[11px] text-slate-700 shadow-inner">
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        <IndianRupee className="w-3 h-3 text-terracotta shrink-0" />
                        <span>{scheme.benefit}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {scheme.eligibility}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-[10px] text-slate-400">{scheme.time}</span>
                      <a
                        href={scheme.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-3d-white inline-flex items-center gap-1 px-2.5 py-1 text-terracotta text-xs font-semibold rounded-lg cursor-pointer"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 px-4 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Alerts auto-refresh on gazette updates</span>
                <span className="font-medium text-slate-600">3 schemes available</span>
              </div>
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-0.5 text-xs font-medium text-slate-600 shadow-inner">
          {languages.map((lang, idx) => (
            <React.Fragment key={lang.code}>
              <button
                onClick={() => setLanguage(lang.code)}
                className={`px-2 py-1 rounded-lg transition-all duration-150 ${
                  language === lang.code
                    ? 'bg-white text-slate-900 font-bold shadow-soft-sm scale-105'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {lang.label}
              </button>
              {idx < languages.length - 1 && <span className="text-slate-300">|</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Export Button */}
        <button
          onClick={onExportChecklist}
          className="btn-3d-white flex items-center gap-1.5 px-3 py-1.5 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export</span>
        </button>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all ${
              currentUser?.role === 'admin'
                ? 'bg-navy-900 text-amber-400 ring-2 ring-amber-400/40'
                : 'bg-slate-900 text-white'
            }`}
            title="User Profile & Session"
          >
            {currentUser?.avatar || (currentUser?.role === 'admin' ? 'RS' : 'SJ')}
          </button>

          {userMenuOpen && (
            <div className="card-3d absolute right-0 mt-2 w-72 rounded-2xl py-3 px-4 z-50 animate-fade-in-up space-y-3">
              {/* Profile Overview */}
              <div className="pb-2.5 border-b border-slate-100 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm ${
                  currentUser?.role === 'admin' ? 'bg-navy-900 text-amber-400' : 'bg-slate-900 text-white'
                }`}>
                  {currentUser?.avatar || 'NM'}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {currentUser?.name || 'Citizen User'}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {currentUser?.email || 'citizen@thanecity.gov.in'}
                  </div>
                  <span className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider mt-1 ${
                    currentUser?.role === 'admin'
                      ? 'bg-blue-100 text-blue-900 border border-blue-200'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    {currentUser?.role === 'admin' ? 'Officer / Admin' : 'Verified Citizen'}
                  </span>
                </div>
              </div>

              {/* Department / Ward Context */}
              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[11px] text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">
                  {currentUser?.role === 'admin' ? 'Assigned Jurisdiction:' : 'Citizen Ward Desk:'}
                </div>
                <div className="text-slate-500">
                  {currentUser?.ward || 'Naupada - Kopri Ward #4, Thane'}
                </div>
              </div>

              {/* Switch Role Button */}
              <button
                onClick={() => {
                  onSwitchRole();
                  setUserMenuOpen(false);
                }}
                className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Switch to {currentUser?.role === 'admin' ? 'Citizen View' : 'Admin View'}</span>
                <span className="text-[10px] text-slate-500 font-normal">Toggle ➜</span>
              </button>

              {/* Sign Out Button */}
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  onLogout();
                }}
                className="w-full py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Portal</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
