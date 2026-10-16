import React, { useState } from 'react';
import {
  INITIAL_ACTIVITIES,
  INITIAL_CLIENT_REQUESTS,
  INITIAL_ENGAGEMENTS,
  INITIAL_TASKS,
} from './data/mockData';
import { ActivityItem, ClientRequest, Engagement, TaskItem } from './types';

// Landing / Sign In components
import { HeaderNav } from './components/HeaderNav';
import { LandingHero } from './components/LandingHero';
import { SignInCard } from './components/SignInCard';

// Dashboard components
import { ActiveEngagementsTable } from './components/ActiveEngagementsTable';
import { CreateNewModal } from './components/CreateNewModal';
import { DashboardHeader } from './components/DashboardHeader';
import { EngagementDetailsModal } from './components/EngagementDetailsModal';
import { FinanceSnapshotCard } from './components/FinanceSnapshotCard';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { OtherPagesView } from './components/OtherPagesView';
import { PendingRequestsCard } from './components/PendingRequestsCard';
import { QuickOverview } from './components/QuickOverview';
import { RecentActivityCard } from './components/RecentActivityCard';
import { Sidebar } from './components/Sidebar';
import { TeamMembersCard } from './components/TeamMembersCard';
import { TeamStatusCard } from './components/TeamStatusCard';
import { TeamUtilizationCard } from './components/TeamUtilizationCard';
import { TodaysTasksList } from './components/TodaysTasksList';
import { TopUtilityBar } from './components/TopUtilityBar';
import { AskISAAIModal } from './components/AskISAAIModal';
import { WorkspaceBanner } from './components/WorkspaceBanner';
import { TasksDeadlinesPage } from './pages/TasksDeadlinesPage';
import { StudentsArticleshipPage } from './pages/StudentsArticleshipPage';
import { ClientCRMPage } from './pages/ClientCRMPage';
import { EngagementsTeamsPage } from './pages/EngagementsTeamsPage';
import { WorkingPapersPage } from './pages/WorkingPapersPage';
import { PeopleStaffPage } from './pages/PeopleStaffPage';
import { ReviewSignoffsPage } from './pages/ReviewSignoffsPage';
import { DocumentVaultPage } from './pages/DocumentVaultPage';
import { ClientRequestsPage } from './pages/ClientRequestsPage';
import { OfficeFinancePage } from './pages/OfficeFinancePage';
import { SettingsPage } from './pages/SettingsPage';
import { TimesheetsPage } from './pages/TimesheetsPage';
import { ControlCenterPage } from './pages/ControlCenterPage';
import { RjscLegalPage } from './pages/RjscLegalPage';
import { TaxVatPage } from './pages/TaxVatPage';
import { OurTeamPage } from './pages/OurTeamPage';

export default function App() {
  // Check if standalone Control Center application is mounted (independent application)
  const isControlApp =
    typeof window !== 'undefined' &&
    (window.location.pathname.startsWith('/control') ||
      new URLSearchParams(window.location.search).get('app') === 'control');

  if (isControlApp) {
    return <ControlCenterPage onLogout={() => alert('Signed out of Control Center.')} />;
  }

  // Core Main Application Navigation / View state: 'signin' | 'dashboard'
  const [currentView, setCurrentView] = useState<'signin' | 'dashboard'>('dashboard');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Application Data States
  const [engagements, setEngagements] = useState<Engagement[]>(INITIAL_ENGAGEMENTS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [clientRequests, setClientRequests] = useState<ClientRequest[]>(INITIAL_CLIENT_REQUESTS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [selectedEngagement, setSelectedEngagement] = useState<Engagement | null>(null);

  // Filtered engagements based on search
  const filteredEngagements = engagements.filter(
    (e) =>
      e.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.engagement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.inCharge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered tasks based on search
  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dynamic header text per page
  const getHeaderInfo = () => {
    switch (currentTab) {
      case 'dashboard':
        return {
          title: 'Good morning, Admin.',
          subtitle: "Here's what's happening across your workspace today.",
          breadcrumb: 'Executive Overview & Dashboard',
          section: 'Firm',
        };
      case 'tasks-deadlines':
        return {
          title: 'Tasks & Deadlines',
          subtitle: 'Plan, assign and track tasks across all engagements, with clear deadlines and accountability.',
          breadcrumb: 'Tasks & Deadlines',
          section: 'Operations',
        };
      case 'team-students':
      case 'students-articleship':
      case 'people-staff':
        return {
          title: 'Our Firm Team & CA Students',
          subtitle: 'Principal Partner (Sir), Audit Manager, and 6 Articled Students — single unified team dashboard.',
          breadcrumb: 'Our Team & Students',
          section: 'Firm',
        };
      case 'client-crm':
        return {
          title: 'Client CRM',
          subtitle: 'Manage client relationships, key contacts, active engagements, risk profiles and outstanding matters.',
          breadcrumb: 'Client CRM',
          section: 'Clients & Jobs',
        };
      case 'engagements-teams':
        return {
          title: 'Engagements & Teams',
          subtitle: 'Plan, assign and monitor engagements, teams, budgets, progress and review stages.',
          breadcrumb: 'Engagements & Teams',
          section: 'Clients & Jobs',
        };
      case 'timesheets':
        return {
          title: 'Timesheets',
          subtitle: 'Track billable and non-billable time across clients, engagements and firm activities.',
          breadcrumb: 'Timesheets',
          section: 'Operations',
        };
      case 'document-vault':
        return {
          title: 'Document Vault',
          subtitle: 'Central repository for client documents, audit evidence and working files.',
          breadcrumb: 'Document Vault',
          section: 'Audit & Docs',
        };
      case 'working-papers':
        return {
          title: 'Audit Mounting & Working Papers',
          subtitle: 'Set up, organize and track the complete audit file structure, working papers and documentation.',
          breadcrumb: 'Working Papers',
          section: 'Audit & Docs',
        };
      case 'review-signoffs':
        return {
          title: 'Review & Sign-offs',
          subtitle: 'Track review progress, manage sign-offs and ensure audit quality compliance.',
          breadcrumb: 'Review & Sign-offs',
          section: 'Audit & Docs',
        };
      case 'client-requests':
        return {
          title: 'Client Requests',
          subtitle: 'Track, manage and respond to client information requests, queries and action items.',
          breadcrumb: 'Client Requests',
          section: 'Practice Mgmt',
        };
      case 'office-finance':
        return {
          title: 'Office Finance',
          subtitle: 'Track firm income, expenses, receivables, payables and financial performance.',
          breadcrumb: 'Office Finance',
          section: 'Practice Mgmt',
        };
      case 'settings':
        return {
          title: 'Settings',
          subtitle: 'Configure firm profile, engagement numbering, security protocols and system preferences.',
          breadcrumb: 'Settings',
          section: 'Practice Mgmt',
        };
      case 'workspace':
        return {
          title: 'Office Workspace',
          subtitle: 'Collaborative workspaces, agendas, and central operational drives.',
          breadcrumb: 'Office Workspace',
          section: 'Firm',
        };
      default:
        return {
          title: 'Avenquis Workspace',
          subtitle: 'Smart Office Management',
          breadcrumb: 'Overview',
          section: 'Firm',
        };
    }
  };

  const currentHeader = getHeaderInfo();

  // Task toggler
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  // Add Task
  const handleAddTask = (newTask: TaskItem) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // Add Engagement
  const handleAddEngagement = (newEng: Engagement) => {
    setEngagements((prev) => [newEng, ...prev]);
  };

  // Update Engagement
  const handleUpdateEngagement = (updated: Engagement) => {
    setEngagements((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-neutral-800 font-sans selection:bg-[#0D7A6F]/20 selection:text-[#0D7A6F]">
      {/* Floating Demo View Switcher Pill at bottom for effortless inspection */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-2 border border-white/10 text-xs">
        <span className="text-neutral-400 text-[11px] font-medium hidden sm:inline">
          Preview Screen:
        </span>
        <button
          onClick={() => setCurrentView('signin')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            currentView === 'signin'
              ? 'bg-[#0D7A6F] text-white shadow-xs font-semibold'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Sign In / Landing
        </button>
        <button
          onClick={() => {
            setCurrentView('dashboard');
            setCurrentTab('dashboard');
          }}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            currentView === 'dashboard'
              ? 'bg-[#0D7A6F] text-white shadow-xs font-semibold'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Firm OS (Dashboard)
        </button>
      </div>

      {/* VIEW 1: SIGN IN / LANDING SCREEN (Matches image.png) */}
      {currentView === 'signin' && (
        <div className="min-h-screen flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Organic Background Shapes */}
          <div className="absolute -left-28 top-16 w-[480px] h-[480px] rounded-full bg-[#DFEDE7]/60 blur-3xl pointer-events-none -z-10" />
          <div className="absolute -right-24 bottom-16 w-[480px] h-[480px] rounded-full bg-[#FBEAE0]/70 blur-3xl pointer-events-none -z-10" />

          {/* Top Navigation */}
          <HeaderNav
            onSignInClick={() => {
              // Focus or trigger sign in
              const submitBtn = document.querySelector('button[type="submit"]') as HTMLElement;
              submitBtn?.focus();
            }}
            onNavigateSection={(sec) => {
              if (sec === 'pricing' || sec === 'features' || sec === 'about') {
                // switch to dashboard or show info
              }
            }}
          />

          {/* Main Content Area: 2 Columns */}
          <main className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 lg:py-12 flex-1 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
              {/* Left Column: Hero & 4 Feature Cards */}
              <div className="lg:col-span-7 flex justify-center lg:justify-start">
                <LandingHero
                  onSelectFeature={() => {
                    setCurrentView('dashboard');
                  }}
                />
              </div>

              {/* Right Column: Floating Welcome Back Card */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <SignInCard
                  onSignInSuccess={(email) => {
                    setCurrentView('dashboard');
                    setCurrentTab('dashboard');
                  }}
                  onForgotPassword={() => {
                    alert('Password reset link sent to registered email.');
                  }}
                  onCreateAccount={() => {
                    setCurrentView('dashboard');
                  }}
                />
              </div>
            </div>
          </main>

          {/* Footer Bar */}
          <footer className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-6 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200/50">
            <div>© 2026 Avenquis. All rights reserved.</div>
            <div className="flex items-center gap-3 text-neutral-600">
              <a href="#privacy" className="hover:text-neutral-900 transition-colors">
                Privacy Policy
              </a>
              <span className="text-neutral-300">|</span>
              <a href="#terms" className="hover:text-neutral-900 transition-colors">
                Terms of Service
              </a>
              <span className="text-neutral-300">|</span>
              <a href="#support" className="hover:text-neutral-900 transition-colors">
                Support
              </a>
            </div>
          </footer>
        </div>
      )}

      {/* VIEW 2: FULL OFFICE MANAGEMENT DASHBOARD (Matches Avenquis Office Management Dashboard.png) */}
      {currentView === 'dashboard' && (
        <div className="flex min-h-screen relative overflow-x-hidden">
          {/* Mobile Sidebar Overlay Backdrop */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Sidebar Drawer on Mobile / Fixed column on Desktop */}
          <div
            className={`
              fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out md:static md:translate-x-0
              ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
              ${isSidebarCollapsed ? 'md:hidden' : 'md:flex'}
            `}
          >
            <Sidebar
              currentTab={currentTab}
              onSelectTab={(tab) => {
                if (tab === 'notifications') {
                  setIsNotificationsOpen(true);
                } else {
                  setCurrentTab(tab);
                }
                setIsMobileMenuOpen(false);
              }}
              onLogout={() => setCurrentView('signin')}
              onCloseMobile={() => setIsMobileMenuOpen(false)}
              unreadCount={unreadNotifications}
            />
          </div>

          {/* Main Dashboard Content Area */}
          <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto w-full">
            {/* Top Enterprise Utility & Breadcrumb Bar (Global Header: Search -> Notification -> + Create new -> Admin Profile) */}
            <TopUtilityBar
              onToggleSidebar={() => {
                if (window.innerWidth < 768) {
                  setIsMobileMenuOpen((prev) => !prev);
                } else {
                  setIsSidebarCollapsed((prev) => !prev);
                }
              }}
              isSidebarCollapsed={isSidebarCollapsed}
              onOpenAskAI={() => setIsAskAIOpen(true)}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onCreateNewClick={() => setIsCreateModalOpen(true)}
              hasUnread={unreadNotifications > 0}
              currentPageTitle={currentHeader.breadcrumb}
              sectionName={currentHeader.section}
              onSearchFocus={() => {
                const searchEl = document.querySelector('input[placeholder*="Search"]') as HTMLElement;
                searchEl?.focus();
              }}
            />

            {/* Dashboard Inner Padding Area */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
              {/* Page Header (Date / Eyebrow, Page Title, Page Subtitle ONLY) */}
              {currentTab !== 'working-papers' && (
                <DashboardHeader
                  title={currentHeader.title}
                  subtitle={currentHeader.subtitle}
                />
              )}

              {/* View Router */}
              {currentTab === 'dashboard' ? (
                <div className="space-y-6">
                  {/* ROW 1: Hero Banner, Team Members Bar Chart, Team Status Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    {/* Banner Card: Everything in one place */}
                    <div className="md:col-span-5 lg:col-span-5">
                      <WorkspaceBanner
                        onExploreClick={() => setCurrentTab('workspace')}
                      />
                    </div>

                    {/* Team Members Bar Chart */}
                    <div className="md:col-span-4 lg:col-span-4">
                      <TeamMembersCard />
                    </div>

                    {/* Quick Team Status Counters */}
                    <div className="md:col-span-3 lg:col-span-3">
                      <TeamStatusCard
                        onStatusClick={() => {
                          setCurrentTab('people-staff');
                        }}
                      />
                    </div>
                  </div>

                  {/* ROW 2: Quick Overview (6 Metrics) */}
                  <QuickOverview
                    onCardClick={(metric) => {
                      if (metric.includes('approvals')) setCurrentTab('review-signoffs');
                      if (metric.includes('revenue') || metric.includes('receivable'))
                        setCurrentTab('office-finance');
                    }}
                  />

                  {/* ROW 3: Active Engagements Table & Today's Tasks List */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Active Engagements Table (65%) */}
                    <div className="lg:col-span-8">
                      <ActiveEngagementsTable
                        engagements={filteredEngagements}
                        onViewAllClick={() => setCurrentTab('engagements-teams')}
                        onSelectEngagement={(eng) => setSelectedEngagement(eng)}
                      />
                    </div>

                    {/* Today's Tasks List (35%) */}
                    <div className="lg:col-span-4">
                      <TodaysTasksList
                        tasks={filteredTasks}
                        onToggleTask={handleToggleTask}
                        onViewAllClick={() => setCurrentTab('tasks-deadlines')}
                        onAddTaskClick={() => setIsCreateModalOpen(true)}
                      />
                    </div>
                  </div>

                  {/* ROW 4: 4 Bottom Analytics Widgets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Card 1: Team Utilization */}
                    <TeamUtilizationCard
                      onViewAllClick={() => setCurrentTab('people-staff')}
                    />

                    {/* Card 2: Finance Snapshot */}
                    <FinanceSnapshotCard />

                    {/* Card 3: Pending Client Requests */}
                    <PendingRequestsCard
                      requests={clientRequests}
                      onViewAllClick={() => setCurrentTab('client-requests')}
                      onRequestClick={(req) => {
                        alert(`Request for ${req.client}: ${req.request} (Due: ${req.dueDate})`);
                      }}
                    />

                    {/* Card 4: Recent Activity */}
                    <RecentActivityCard
                      activities={activities}
                      onViewAllClick={() => setCurrentTab('workspace')}
                    />
                  </div>
                </div>
              ) : currentTab === 'working-papers' ? (
                /* AUDIT MOUNTING / WORKING PAPERS (Matches user uploaded image) */
                <WorkingPapersPage />
              ) : currentTab === 'document-vault' ? (
                /* DOCUMENT VAULT (Matches user uploaded image) */
                <DocumentVaultPage />
              ) : currentTab === 'client-crm' ? (
                /* CLIENT CRM (Matches Avenquis Client CRM Dashboard.png) */
                <ClientCRMPage />
              ) : currentTab === 'team-students' || currentTab === 'people-staff' || currentTab === 'students-articleship' ? (
                /* UNIFIED OUR TEAM & STUDENTS (Sir, Manager, 6 Students) */
                <OurTeamPage />
              ) : currentTab === 'review-signoffs' ? (
                /* REVIEW & SIGN-OFFS (Badge 3) */
                <ReviewSignoffsPage />
              ) : currentTab === 'engagements-teams' ? (
                /* ENGAGEMENTS & TEAMS */
                <EngagementsTeamsPage />
              ) : currentTab === 'tasks-deadlines' ? (
                /* Tasks & Deadlines */
                <TasksDeadlinesPage onBack={() => setCurrentTab('dashboard')} />
              ) : currentTab === 'timesheets' ? (
                /* TIMESHEETS (Real timesheet & attendance workflow) */
                <TimesheetsPage />
              ) : currentTab === 'client-requests' ? (
                /* CLIENT REQUESTS (Matches user uploaded image) */
                <ClientRequestsPage />
              ) : currentTab === 'office-finance' ? (
                /* OFFICE FINANCE (Matches user uploaded image) */
                <OfficeFinancePage />
              ) : currentTab === 'settings' ? (
                /* SETTINGS (Matches user uploaded image) */
                <SettingsPage />
              ) : currentTab === 'rjsc-legal' ? (
                /* RJSC & CORPORATE LEGAL FILINGS */
                <RjscLegalPage />
              ) : currentTab === 'tax-vat' ? (
                /* TAX & VAT COMPLIANCE ENGINE */
                <TaxVatPage />
              ) : (
                /* Other Pages View */
                <OtherPagesView
                  pageId={currentTab}
                  onBackToDashboard={() => setCurrentTab('dashboard')}
                  engagements={engagements}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create New Modal */}
      <CreateNewModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddTask={handleAddTask}
        onAddEngagement={handleAddEngagement}
        onNavigateToTab={(tab) => setCurrentTab(tab)}
      />

      {/* Engagement Details Modal */}
      <EngagementDetailsModal
        engagement={selectedEngagement}
        onClose={() => setSelectedEngagement(null)}
        onUpdateEngagement={handleUpdateEngagement}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAllRead={() => setUnreadNotifications(0)}
        onNavigateToTab={(tab) => setCurrentTab(tab)}
      />

      {/* Ask ISA AI Assistant Modal */}
      <AskISAAIModal
        isOpen={isAskAIOpen}
        onClose={() => setIsAskAIOpen(false)}
      />
    </div>
  );
}
