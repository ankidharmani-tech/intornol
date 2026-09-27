import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import QuerySection from './components/QuerySection';
import TargetRoadmap from './components/TargetRoadmap';
import LocalAuthorityLock from './components/LocalAuthorityLock';
import ActionChecklist from './components/ActionChecklist';
import DocumentGuideView from './components/DocumentGuideView';
import NewSchemesView from './components/NewSchemesView';
import AdminQueueView from './components/AdminQueueView';
import JurisdictionView from './components/JurisdictionView';
import TaskTrackingView from './components/TaskTrackingView';
import ClarifyingModal from './components/ClarifyingModal';
import DocumentPreviewModal from './components/DocumentPreviewModal';
import DailyReportModal from './components/DailyReportModal';
import BhashiniVoiceModal from './components/BhashiniVoiceModal';
import LoginPage, { DEMO_USERS } from './components/LoginPage';
import { ShieldAlert } from 'lucide-react';
import { CITIES } from './data/mockData';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null); // null = renders LoginPage
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCity, setSelectedCity] = useState(CITIES[0]); // Default: Thane, MH
  const [language, setLanguage] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const [civicQuery, setCivicQuery] = useState('');
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [pendingQueueCount, setPendingQueueCount] = useState(14);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('task_food_business');

  // Modals state
  const [isClarifyOpen, setIsClarifyOpen] = useState(false);
  const [previewDocTitle, setPreviewDocTitle] = useState(null);
  const [isDailyReportOpen, setIsDailyReportOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Logged out of civic portal successfully.');
  };

  const handleSwitchRole = () => {
    if (currentUser?.role === 'admin') {
      setCurrentUser(DEMO_USERS.citizen);
      setActiveTab('dashboard');
      showToast('Switched to Citizen Workspace (Suresh Jadhav). Admin Queue hidden.');
    } else {
      setCurrentUser(DEMO_USERS.admin);
      setActiveTab('adminQueue');
      showToast('Switched to Municipal Officer Workspace (Dr. Shinde). Admin Queue unlocked.');
    }
  };

  const handleSynthesize = (customQuery) => {
    const q = customQuery || civicQuery || 'I want to start a home-based food business in Thane';
    showToast(`Loading procedure roadmap for: "${q.slice(0, 38)}..."`);
  };

  const handleApplyProfile = (answers) => {
    setIsPersonalized(true);
    showToast('Applicant profile applied: 4 dynamic graph pruning rules evaluated.');
  };

  const handleExportChecklist = () => {
    showToast('Generating official municipal document verification checklist PDF...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleDownloadForm = (step) => {
    showToast(`Downloading pre-filled statutory form for: ${step.title}`);
  };

  // Render dedicated Login Page if no user is signed in
  if (!currentUser) {
    return (
      <LoginPage 
        onLogin={(user) => {
          setCurrentUser(user);
          if (user.role === 'admin') {
            setActiveTab('adminQueue');
            showToast(`Signed in as ${user.name} (Officer). Admin Queue unlocked.`);
          } else {
            setActiveTab('dashboard');
            showToast(`Signed in as ${user.name} (Citizen). Citizen Task Navigator active.`);
          }
        }} 
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f4f6f8] text-slate-800 font-sans">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDailyReport={() => setIsDailyReportOpen(true)}
        pendingCount={pendingQueueCount}
        selectedTaskId={selectedTaskId}
        onSelectTask={(id) => {
          setSelectedTaskId(id);
          setActiveTab('taskTracking');
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          language={language}
          setLanguage={setLanguage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onExportChecklist={handleExportChecklist}
          currentUser={currentUser}
          onLogout={handleLogout}
          onSwitchRole={handleSwitchRole}
        />

        {/* Dynamic Notification Toast */}
        {notification && (
          <div className="fixed top-20 right-8 z-50 bg-white text-slate-800 border border-slate-200/90 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs animate-in slide-in-from-top-3">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-ping"></span>
            <span className="font-medium">{notification}</span>
          </div>
        )}

        {/* View Switcher based on Sidebar Navigation */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <>
              {/* Query Section */}
              <QuerySection
                query={civicQuery}
                setQuery={setCivicQuery}
                selectedCity={selectedCity}
                onSynthesize={handleSynthesize}
                onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
                onOpenClarifyModal={() => setIsClarifyOpen(true)}
                isPersonalized={isPersonalized}
              />

              {/* Main Content Grid: 2 Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Active Target Roadmap (8 cols on large screens) */}
                <div className="lg:col-span-7 xl:col-span-8">
                  <TargetRoadmap
                    selectedCity={selectedCity}
                    onInspectDocument={(docTitle) => setPreviewDocTitle(docTitle)}
                    onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
                    onDownloadForm={handleDownloadForm}
                    isDetailsExpanded={isDetailsExpanded}
                    setIsDetailsExpanded={setIsDetailsExpanded}
                    onOpenTaskTracking={(taskId) => {
                      setSelectedTaskId(taskId);
                      setActiveTab('taskTracking');
                    }}
                  />
                </div>

                {/* Right Column: Physical Desk Checklist (beside task when expanded) + Local Authority Lock (5 cols) */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                  {isDetailsExpanded && (
                    <div className="animate-slide-left-to-right">
                      <ActionChecklist
                        onInspectDocument={(docTitle) => setPreviewDocTitle(docTitle)}
                      />
                    </div>
                  )}

                  <LocalAuthorityLock
                    selectedCity={selectedCity}
                    onBookSlot={(city) =>
                      showToast(`Verification desk slot locked at ${city.authority} (Counter 6)`)
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* Dedicated Task Tracking View with Amazon-style shipping details & Zigzag Timeline */}
          {activeTab === 'taskTracking' && (
            <TaskTrackingView
              selectedTaskId={selectedTaskId}
              onSelectTask={(id) => setSelectedTaskId(id)}
              onBackToDashboard={() => setActiveTab('dashboard')}
            />
          )}

          {/* NOTE: Document Guide is hidden per user request; kept commented for future activation */}
          {/*
          {activeTab === 'documentGuide' && (
            <DocumentGuideView
              selectedCity={selectedCity}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            />
          )}
          */}

          {/* NOTE: New Schemes page removed per user request and moved to Header notification bell */}
          {/*
          {activeTab === 'newSchemes' && (
            <NewSchemesView selectedCity={selectedCity} />
          )}
          */}

          {activeTab === 'adminQueue' && (
            currentUser?.role === 'admin' ? (
              <AdminQueueView
                onApproveItem={() => setPendingQueueCount((c) => Math.max(0, c - 1))}
              />
            ) : (
              <div className="card-3d p-8 text-center max-w-lg mx-auto rounded-3xl space-y-4 my-12 bg-white">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Restricted Administrative Area</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The Admin Queue is restricted to verified municipal desk officers. It is not accessible in the citizen user section.
                </p>
                <button
                  onClick={handleSwitchRole}
                  className="btn-3d-slate px-5 py-2.5 text-xs font-bold"
                >
                  Sign In as Municipal Officer
                </button>
              </div>
            )
          )}

          {/* NOTE: Jurisdiction page is hidden per user request; kept commented for future activation */}
          {/*
          {activeTab === 'jurisdiction' && (
            <JurisdictionView
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          )}
          */}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center max-w-xl mx-auto shadow-card mt-8">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Municipal Navigator Preferences</h2>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Configure default state jurisdictions, Bhashini dialect accents (Varhadi, Ahirani, Deshi Marathi), and API endpoints for Neo4j AuraDB graph syncing.
              </p>
              <div className="inline-block px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold rounded-lg">
                Nagrik Marg v2.4 (Production Ready)
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <ClarifyingModal
        isOpen={isClarifyOpen}
        onClose={() => setIsClarifyOpen(false)}
        onApplyProfile={handleApplyProfile}
      />

      <DocumentPreviewModal
        documentTitle={previewDocTitle}
        isOpen={!!previewDocTitle}
        onClose={() => setPreviewDocTitle(null)}
      />

      <DailyReportModal
        isOpen={isDailyReportOpen}
        onClose={() => setIsDailyReportOpen(false)}
        selectedCity={selectedCity}
      />

      <BhashiniVoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onApplyVoiceQuery={(text) => {
          setCivicQuery(text);
          handleSynthesize(text);
        }}
      />
    </div>
  );
}
