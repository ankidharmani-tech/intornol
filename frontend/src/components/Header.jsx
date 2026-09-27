import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  Download, 
  User, 
  Languages,
  Check,
  Building
} from 'lucide-react';
import { CITIES } from '../data/mockData';

export default function Header({ 
  selectedCity, 
  setSelectedCity, 
  language, 
  setLanguage, 
  searchQuery, 
  setSearchQuery,
  onExportChecklist 
}) {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const languages = [
    { code: 'EN', label: 'EN' },
    { code: 'HI', label: 'हिंदी' },
    { code: 'MR', label: 'मराठी' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-soft-sm">
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
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900/10 focus:border-navy-900 transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Location Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{selectedCity.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          {cityDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
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

        {/* Language Selector */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-0.5 text-xs font-medium text-slate-600">
          {languages.map((lang, idx) => (
            <React.Fragment key={lang.code}>
              <button
                onClick={() => setLanguage(lang.code)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  language === lang.code
                    ? 'bg-white text-slate-900 font-bold shadow-soft-sm'
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
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-soft-sm transition-all active:scale-[0.98]"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export</span>
        </button>

        {/* User Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-medium shadow-soft-sm cursor-pointer hover:ring-2 hover:ring-slate-300 transition-all">
          <User className="w-4 h-4 text-slate-200" />
        </div>
      </div>
    </header>
  );
}
