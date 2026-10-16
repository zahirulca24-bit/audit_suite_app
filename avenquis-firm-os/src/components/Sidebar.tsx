import React, { useState } from 'react';
import {
  ChevronDown,
  Clock,
  CreditCard,
  FileCheck2,
  FileText,
  Folder,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  UserSquare2,
  CheckSquare,
  X,
  Scale,
  Calculator,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
  onCloseMobile?: () => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onLogout,
  onCloseMobile,
}) => {
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState('Admin workspace');

  // Exact 5-section navigation structure
  const navSections = [
    {
      title: 'FIRM',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'team-students', label: 'Our Team & Students', icon: Users },
      ],
    },
    {
      title: 'CLIENTS & JOBS',
      items: [
        { id: 'client-crm', label: 'Client CRM', icon: UserSquare2 },
        { id: 'engagements-teams', label: 'Engagements & Teams', icon: CheckSquare },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: 'tasks-deadlines', label: 'Tasks & Deadlines', icon: Clock },
        { id: 'timesheets', label: 'Timesheets', icon: Clock },
      ],
    },
    {
      title: 'AUDIT & DOCS',
      items: [
        { id: 'document-vault', label: 'Document Vault', icon: Folder },
        { id: 'working-papers', label: 'Working Papers', icon: FileText },
        { id: 'review-signoffs', label: 'Review & Sign-offs', icon: FileCheck2, badge: 3 },
        { id: 'rjsc-legal', label: 'RJSC & Corporate Legal', icon: Scale },
        { id: 'tax-vat', label: 'Tax & VAT Compliance', icon: Calculator },
      ],
    },
    {
      title: 'PRACTICE MGMT',
      items: [
        { id: 'client-requests', label: 'Client Requests', icon: Inbox, badge: 4 },
        { id: 'office-finance', label: 'Office Finance', icon: CreditCard },
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-60 shrink-0 bg-[#07261F] text-white flex flex-col justify-between h-full min-h-screen border-r border-[#0D382E] select-none shadow-xl">
      <div className="overflow-y-auto max-h-[calc(100vh-90px)] scrollbar-thin">
        {/* Brand Header with Close button for mobile */}
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between">
            <BrandLogo variant="dark" showWordmark descriptor="Firm OS" size="md" />
            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="md:hidden p-1.5 rounded-lg text-emerald-100/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Workspace / Firm Selector */}
          <div className="relative mt-5">
            <button
              onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
              className="w-full bg-[#0F3930] hover:bg-[#14473D] transition-colors rounded-xl p-2.5 flex items-center justify-between border border-white/5 cursor-pointer text-left shadow-2xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#07261F] border border-[#C5A059]/40 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden p-0.5">
                  <BrandLogo variant="dark" showWordmark={false} size="sm" />
                </div>
                <div className="min-w-0 truncate">
                  <div className="text-xs font-semibold text-white truncate leading-tight">
                    Avenquis Office
                  </div>
                  <div className="text-[11px] text-emerald-200/60 truncate leading-tight mt-0.5">
                    {currentWorkspace}
                  </div>
                </div>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-emerald-200/60 transition-transform shrink-0 ${
                  workspaceMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {workspaceMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#0A3026] border border-emerald-500/20 rounded-xl shadow-xl py-1 z-30 text-xs">
                {['Admin workspace', 'Audit & Assurance', 'Tax Advisory', 'Corporate Services'].map(
                  (ws) => (
                    <button
                      key={ws}
                      onClick={() => {
                        setCurrentWorkspace(ws);
                        setWorkspaceMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 transition-colors cursor-pointer flex items-center justify-between ${
                        currentWorkspace === ws
                          ? 'bg-[#14473D] text-emerald-300 font-medium'
                          : 'text-neutral-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{ws}</span>
                      {currentWorkspace === ws && (
                        <span className="text-[10px] text-emerald-400 font-semibold">Active</span>
                      )}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="px-3 py-2 space-y-4">
          {navSections.map((section) => (
            <div key={section.title}>
              <div className="px-3 text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-100/40 mb-1.5">
                {section.title}
              </div>
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        if (onCloseMobile) onCloseMobile();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#0F3930] text-emerald-300 shadow-2xs font-semibold'
                          : 'text-emerald-100/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-emerald-400' : 'text-emerald-100/60'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="bg-[#E11D48] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums shrink-0 ml-1.5">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-white/10 shrink-0 bg-[#07261F]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white text-[#07261F] flex items-center justify-center font-bold text-xs shadow-xs">
            A
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">Admin</div>
            <div className="text-[11px] text-emerald-200/50 truncate">Firm Administrator</div>
          </div>
        </div>

        {/* Logout Link */}
        <button
          onClick={onLogout}
          className="mt-3 flex items-center gap-2 text-xs text-emerald-100/60 hover:text-white transition-colors cursor-pointer px-1 py-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
