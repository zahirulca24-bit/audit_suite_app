import React from 'react';
import {
  Bell,
  Building2,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface TopUtilityBarProps {
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  onOpenAskAI?: () => void;
  onOpenNotifications?: () => void;
  onCreateNewClick?: () => void;
  hasUnread?: boolean;
  onSearchFocus?: () => void;
  currentPageTitle?: string;
  sectionName?: string;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  onToggleSidebar,
  isSidebarCollapsed = false,
  onOpenNotifications,
  onCreateNewClick,
  hasUnread = true,
  onSearchFocus,
  currentPageTitle = 'Executive Overview & Dashboard',
  sectionName,
}) => {
  return (
    <header className="w-full bg-[#FAF8F5] border-b border-neutral-200/70 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs select-none sticky top-0 z-30">
      {/* Left Zone: Sidebar Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Sidebar Toggle Button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="w-8 h-8 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors shadow-2xs shrink-0 cursor-pointer"
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>

        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 min-w-0 truncate">
          {/* Firm Badge with Canonical AQ Mark */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FCF8EE] border border-[#F2E5C5] text-[#8C6018] font-medium text-[11px] shrink-0 shadow-2xs">
            <div className="w-4 h-3.5 flex items-center justify-center shrink-0">
              <BrandLogo variant="light" showWordmark={false} size="sm" />
            </div>
            <span className="truncate max-w-[140px] sm:max-w-none">
              AVENQUIS Chartered Accountants
            </span>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />

          {sectionName && (
            <>
              <span className="text-neutral-500 font-medium text-xs shrink-0">
                {sectionName}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            </>
          )}

          {/* Current Page Title */}
          <span className="font-semibold text-neutral-900 truncate">
            {currentPageTitle}
          </span>
        </div>
      </div>

      {/* Right Zone: Search → Notification → + Create new → Admin Profile */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* 1. Global Search Input */}
        <div
          onClick={onSearchFocus}
          className="hidden md:flex items-center gap-2 bg-white hover:border-neutral-300 border border-neutral-200/90 rounded-full px-3.5 py-1.5 text-xs text-neutral-500 w-56 lg:w-68 cursor-pointer shadow-2xs transition-all"
        >
          <Search className="w-3.5 h-3.5 text-neutral-400" />
          <span className="flex-1 text-neutral-400 text-xs truncate">
            Search documents, clients, or folders...
          </span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-500 bg-neutral-100 border border-neutral-200 rounded">
            <span>⌘K</span>
          </kbd>
        </div>

        {/* 2. Notification Bell */}
        <button
          type="button"
          onClick={onOpenNotifications}
          aria-label="View notifications"
          className="relative w-8 h-8 rounded-full border border-neutral-200/90 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-700 transition-colors shadow-2xs cursor-pointer"
        >
          <Bell className="w-3.5 h-3.5" />
          {hasUnread && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#991B1B] ring-1.5 ring-white" />
          )}
        </button>

        {/* 3. + Create new Pill Button */}
        <button
          type="button"
          onClick={onCreateNewClick}
          className="bg-[#0B332A] hover:bg-[#07241D] text-white px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create new</span>
          <ChevronDown className="w-3 h-3 text-emerald-200" />
        </button>

        {/* 4. Admin Profile */}
        <div className="flex items-center gap-2 pl-1 py-1 pr-2.5 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200/90 transition-colors cursor-pointer shadow-2xs">
          <div className="w-7 h-7 rounded-full bg-[#07261F] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
            A
          </div>
          <div className="text-left hidden sm:block leading-tight pr-0.5">
            <div className="text-xs font-semibold text-neutral-800 leading-none">
              Admin
            </div>
            <div className="text-[10px] text-neutral-500 font-medium leading-none mt-1">
              Firm Administrator
            </div>
          </div>
          <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0" />
        </div>
      </div>
    </header>
  );
};
