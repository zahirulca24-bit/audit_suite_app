import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Check,
  CheckCircle2,
  CheckSquare,
  Clock,
  Coins,
  FileCheck2,
  FileText,
  Mail,
  Undo2,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead?: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onMarkAllRead,
  onNavigateToTab,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'tasks' | 'reviews' | 'client-requests' | 'system'
  >('all');

  if (!isOpen) return null;

  // Filter Categories matching Image
  const categories = [
    { id: 'all', label: 'All', count: 12 },
    { id: 'tasks', label: 'Tasks', count: 4 },
    { id: 'reviews', label: 'Reviews', count: 3 },
    { id: 'client-requests', label: 'Client Requests', count: 3 },
    { id: 'system', label: 'System', count: 2 },
  ];

  // Grouped Notification items matching Image exactly
  const notificationGroups = [
    {
      timeframe: 'Today',
      items: [
        {
          id: 'notif-1',
          category: 'reviews',
          title: 'Review sign-off pending',
          badge: 'High',
          badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
          subtitle: 'Silco Pharmaceuticals PLC',
          detail: 'Audit Program - FY 2026 requires your review.',
          timestamp: '10:30 AM',
          unread: true,
          icon: UserCheck,
          iconBg: 'bg-rose-50 text-rose-600',
          targetTab: 'review-signoffs',
        },
        {
          id: 'notif-2',
          category: 'client-requests',
          title: 'Client request overdue',
          badge: 'High',
          badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
          subtitle: 'Genex Infosys PLC',
          detail: 'Inventory schedule from client is 3 days overdue.',
          timestamp: '09:15 AM',
          unread: true,
          icon: AlertTriangle,
          iconBg: 'bg-amber-50 text-amber-600',
          targetTab: 'client-requests',
        },
        {
          id: 'notif-3',
          category: 'reviews',
          title: 'Working paper returned',
          badge: 'Medium',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
          subtitle: 'Prepared by Hemadry Roy',
          detail: 'WP-ST-03 - Stock Movement Analysis has been returned with comments.',
          timestamp: '08:42 AM',
          unread: false,
          icon: Undo2,
          iconBg: 'bg-purple-50 text-purple-600',
          targetTab: 'working-papers',
        },
      ],
    },
    {
      timeframe: 'Yesterday',
      items: [
        {
          id: 'notif-4',
          category: 'tasks',
          title: 'New engagement created',
          badge: '',
          badgeColor: '',
          subtitle: 'Abdul Monem Ltd. (Igloo)',
          detail: 'A new audit engagement has been created and assigned to Md. Bayezid.',
          timestamp: 'Yesterday, 4:20 PM',
          unread: false,
          icon: Briefcase,
          iconBg: 'bg-sky-50 text-sky-600',
          targetTab: 'engagements-teams',
        },
        {
          id: 'notif-5',
          category: 'tasks',
          title: 'Task assigned to you',
          badge: '',
          badgeColor: '',
          subtitle: 'Prepare tax computation',
          detail: 'For Genexil (GENEXIL) - Due 18 Oct 2026.',
          timestamp: 'Yesterday, 2:18 PM',
          unread: false,
          icon: CheckSquare,
          iconBg: 'bg-amber-50 text-amber-600',
          targetTab: 'tasks-deadlines',
        },
      ],
    },
    {
      timeframe: 'This week',
      items: [
        {
          id: 'notif-6',
          category: 'system',
          title: 'Office Finance reminder',
          badge: 'Medium',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
          subtitle: 'Invoice follow-up due',
          detail: '3 invoices are pending follow-up with clients.',
          timestamp: '10 Oct 2026',
          unread: false,
          icon: Coins,
          iconBg: 'bg-amber-50 text-amber-600',
          targetTab: 'office-finance',
        },
        {
          id: 'notif-7',
          category: 'client-requests',
          title: 'New client request submitted',
          badge: 'Low',
          badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
          subtitle: 'BD Paint',
          detail: 'Client has submitted a new request: Bank confirmation letter.',
          timestamp: '09 Oct 2026',
          unread: false,
          icon: Mail,
          iconBg: 'bg-indigo-50 text-indigo-600',
          targetTab: 'client-requests',
        },
      ],
    },
  ];

  // Filtering groups based on selected category pill
  const filteredGroups = notificationGroups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => activeCategory === 'all' || item.category === activeCategory
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      {/* Click outside backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Notifications Drawer */}
      <div className="w-full max-w-[420px] bg-white h-screen shadow-2xl border-l border-neutral-200/90 flex flex-col justify-between animate-in slide-in-from-right duration-200 overflow-hidden">
        {/* Top Header with Canonical Brand */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-neutral-200/80 flex items-center justify-center p-1 shrink-0 shadow-2xs">
                <BrandLogo variant="light" showWordmark={false} size="sm" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-neutral-900 tracking-tight">
                  Notifications
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Stay updated on everything happening in your firm.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto scrollbar-none pb-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#0B332A] text-white shadow-2xs font-semibold'
                      : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/80'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-bold ${
                      isActive ? 'text-emerald-300' : 'text-neutral-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notification Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 px-4 py-2 scrollbar-thin">
          {filteredGroups.map((group, gIdx) => (
            <div key={gIdx} className="py-3 first:pt-1 last:pb-3">
              {/* Group Title */}
              <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                {group.timeframe}
              </div>

              {/* Items in Group */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (onNavigateToTab && item.targetTab) {
                          onNavigateToTab(item.targetTab);
                        }
                        onClose();
                      }}
                      className="p-2.5 rounded-2xl hover:bg-neutral-50 transition-colors flex items-start gap-3 cursor-pointer group"
                    >
                      {/* Icon */}
                      <div
                        className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-xs font-bold text-neutral-900 group-hover:text-[#0D7A6F] transition-colors truncate">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border shrink-0 ${item.badgeColor}`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] font-mono text-neutral-400">
                              {item.timestamp}
                            </span>
                            {item.unread && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                            )}
                          </div>
                        </div>

                        {/* Subtitle */}
                        <div className="text-xs font-semibold text-neutral-700 mt-0.5 truncate">
                          {item.subtitle}
                        </div>

                        {/* Detail text */}
                        <div className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed line-clamp-2">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-neutral-100 bg-[#FAF8F5] text-center shrink-0">
          <button
            onClick={() => {
              if (onMarkAllRead) onMarkAllRead();
              alert('All notifications marked as read.');
            }}
            className="text-xs font-semibold text-neutral-700 hover:text-[#0D7A6F] inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span>View all notifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
