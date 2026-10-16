import React, { useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  Coins,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  Mail,
  Plus,
  Receipt,
  Upload,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { Engagement, TaskItem } from '../types';
import { BrandLogo } from './BrandLogo';

interface CreateNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask?: (task: TaskItem) => void;
  onAddEngagement?: (eng: Engagement) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const CreateNewModal: React.FC<CreateNewModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  onAddEngagement,
  onNavigateToTab,
}) => {
  // Quick form state if an action is opened
  const [activeForm, setActiveForm] = useState<
    | null
    | 'new-client'
    | 'new-engagement'
    | 'new-task'
    | 'new-working-paper'
    | 'upload-document'
    | 'client-request'
    | 'invoice'
    | 'add-staff'
    | 'articleship-record'
  >(null);

  // Task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskClient, setTaskClient] = useState('Silco Pharmaceuticals PLC');

  // Engagement form state
  const [engClient, setEngClient] = useState('Genex Infosys PLC');
  const [engType, setEngType] = useState('Statutory Audit FY 2026');

  if (!isOpen) return null;

  const handleActionClick = (target: string, tabFallback?: string) => {
    if (tabFallback && onNavigateToTab) {
      onNavigateToTab(tabFallback);
      onClose();
    } else {
      setActiveForm(target as any);
    }
  };

  const submitQuickTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    if (onAddTask) {
      onAddTask({
        id: `task-${Date.now()}`,
        title: taskTitle,
        client: taskClient,
        priority: 'High',
        dueText: 'Today 05:00 PM',
        isUrgent: true,
        completed: false,
      });
    }
    alert(`Task "${taskTitle}" assigned successfully.`);
    setActiveForm(null);
    onClose();
  };

  const submitQuickEngagement = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddEngagement) {
      onAddEngagement({
        id: `eng-${Date.now()}`,
        client: engClient,
        engagement: engType,
        type: 'Audit',
        inCharge: 'Zahirul Islam, FCA',
        dueDate: '31 Dec 2026',
        progress: 5,
        status: 'Planning',
      });
    }
    alert(`Engagement "${engType}" created successfully.`);
    setActiveForm(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-neutral-200/90 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header with Canonical Brand */}
        <div className="p-5 sm:p-6 pb-3 border-b border-neutral-100 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-neutral-200/80 flex items-center justify-center p-1 shrink-0 shadow-2xs">
              <BrandLogo variant="light" showWordmark={false} size="sm" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Create New
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Quickly create and set up new items in AVENQUIS Firm OS.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveForm(null);
              onClose();
            }}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 scrollbar-thin">
          {activeForm === null ? (
            <>
              {/* SECTION 1: Clients & Engagements */}
              <div>
                <h3 className="text-xs font-bold text-neutral-900 tracking-wider uppercase mb-2.5">
                  Clients & Engagements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Card 1: New Client */}
                  <div
                    onClick={() => handleActionClick('new-client', 'client-crm')}
                    className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#0D7A6F] hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#E8F5F1] text-[#0D7A6F] flex items-center justify-center shrink-0 mt-0.5">
                        <UserPlus className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-900 group-hover:text-[#0D7A6F] transition-colors truncate">
                          New Client
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug line-clamp-2">
                          Add a new client to your CRM with key details.
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0D7A6F] transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </div>

                  {/* Card 2: New Engagement */}
                  <div
                    onClick={() => handleActionClick('new-engagement', 'engagements-teams')}
                    className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#0D7A6F] hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-900 group-hover:text-[#0D7A6F] transition-colors truncate">
                          New Engagement
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug line-clamp-2">
                          Create an audit, tax or advisory engagement and assign a team.
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0D7A6F] transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Work & Documentation */}
              <div>
                <h3 className="text-xs font-bold text-neutral-900 tracking-wider uppercase mb-2.5">
                  Work & Documentation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Card 1: New Task */}
                  <div
                    onClick={() => handleActionClick('new-task', 'tasks-deadlines')}
                    className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#0D7A6F] hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#FFF7ED] text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckSquare className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-900 group-hover:text-[#0D7A6F] transition-colors truncate">
                          New Task
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug line-clamp-2">
                          Create a task and assign it to your team.
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0D7A6F] transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </div>

                  {/* Card 2: New Working Paper */}
                  <div
                    onClick={() => handleActionClick('new-working-paper', 'working-papers')}
                    className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#0D7A6F] hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#FAF5FF] text-[#7E22CE] flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-900 group-hover:text-[#0D7A6F] transition-colors truncate">
                          New Working Paper
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug line-clamp-2">
                          Set up a new working paper with template or from scratch.
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0D7A6F] transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </div>

                  {/* Card 3: Upload Document */}
                  <div
                    onClick={() => handleActionClick('upload-document', 'document-vault')}
                    className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#0D7A6F] hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                        <Upload className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-900 group-hover:text-[#0D7A6F] transition-colors truncate">
                          Upload Document
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug line-clamp-2">
                          Upload files to Document Vault and organize them.
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0D7A6F] transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </div>

                  {/* Card 4: Client Request */}
                  <div
                    onClick={() => handleActionClick('client-request', 'client-requests')}
                    className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#0D7A6F] hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-900 group-hover:text-[#0D7A6F] transition-colors truncate">
                          Client Request
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug line-clamp-2">
                          Create a client request and track responses.
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0D7A6F] transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </div>
                </div>
              </div>

              {/* SECTION 3: People & Practice Management */}
              <div>
                <h3 className="text-xs font-bold text-neutral-900 tracking-wider uppercase mb-2.5">
                  People & Practice Management
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Card 1: Invoice / Collection Entry */}
                    <div
                      onClick={() => handleActionClick('invoice', 'office-finance')}
                      className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#0D7A6F] hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#FFFBEB] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
                          <Coins className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-neutral-900 group-hover:text-[#0D7A6F] transition-colors truncate">
                            Invoice / Collection Entry
                          </div>
                          <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug line-clamp-2">
                            Record a new invoice or collection entry.
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0D7A6F] transition-transform group-hover:translate-x-0.5 shrink-0" />
                    </div>

                    {/* Card 2: Add Staff */}
                    <div
                      onClick={() => handleActionClick('add-staff', 'people-staff')}
                      className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#0D7A6F] hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#E8F5F1] text-[#0D7A6F] flex items-center justify-center shrink-0 mt-0.5">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-neutral-900 group-hover:text-[#0D7A6F] transition-colors truncate">
                            Add Staff
                          </div>
                          <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug line-clamp-2">
                            Create a new staff member and set permissions.
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0D7A6F] transition-transform group-hover:translate-x-0.5 shrink-0" />
                    </div>
                  </div>

                  {/* Card 3: Articleship Record (Full Width) */}
                  <div
                    onClick={() => handleActionClick('articleship-record', 'students-articleship')}
                    className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#0D7A6F] hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#FAF5FF] text-[#7E22CE] flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-900 group-hover:text-[#0D7A6F] transition-colors truncate">
                          Articleship Record
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                          Add a new student / articleship record and manage training progress.
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0D7A6F] transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </div>
                </div>
              </div>

              {/* SECTION 4: Recent templates */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs font-bold text-neutral-900 tracking-wider">
                    Recent templates
                  </h3>
                  <button
                    onClick={() => {
                      if (onNavigateToTab) onNavigateToTab('working-papers');
                      onClose();
                    }}
                    className="text-[11px] font-semibold text-[#0D7A6F] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Template 1 */}
                  <div
                    onClick={() => {
                      if (onNavigateToTab) onNavigateToTab('working-papers');
                      onClose();
                    }}
                    className="p-3 rounded-2xl bg-[#FAF8F5] hover:bg-neutral-100/80 border border-neutral-200/70 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span className="text-xs font-bold text-neutral-800 group-hover:text-[#0D7A6F] transition-colors truncate">
                        Audit Engagement &gt;
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500 leading-snug line-clamp-2">
                      Standard audit engagement setup with key tasks.
                    </p>
                  </div>

                  {/* Template 2 */}
                  <div
                    onClick={() => {
                      if (onNavigateToTab) onNavigateToTab('working-papers');
                      onClose();
                    }}
                    className="p-3 rounded-2xl bg-[#FAF8F5] hover:bg-neutral-100/80 border border-neutral-200/70 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span className="text-xs font-bold text-neutral-800 group-hover:text-[#0D7A6F] transition-colors truncate">
                        Tax Compliance &gt;
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500 leading-snug line-clamp-2">
                      Tax engagement with compliance checklist.
                    </p>
                  </div>

                  {/* Template 3 */}
                  <div
                    onClick={() => {
                      if (onNavigateToTab) onNavigateToTab('client-crm');
                      onClose();
                    }}
                    className="p-3 rounded-2xl bg-[#FAF8F5] hover:bg-neutral-100/80 border border-neutral-200/70 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FileCheck2 className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span className="text-xs font-bold text-neutral-800 group-hover:text-[#0D7A6F] transition-colors truncate">
                        Client Acceptance &gt;
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500 leading-snug line-clamp-2">
                      New client onboarding checklist and documents.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : activeForm === 'new-task' ? (
            /* Inline Quick Task Form */
            <form onSubmit={submitQuickTask} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <h4 className="font-bold text-sm text-neutral-900">
                  Quick Create Task
                </h4>
                <button
                  type="button"
                  onClick={() => setActiveForm(null)}
                  className="text-xs text-[#0D7A6F] font-semibold hover:underline"
                >
                  &larr; Back to list
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Verify revenue cut-off invoices"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Client
                </label>
                <select
                  value={taskClient}
                  onChange={(e) => setTaskClient(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs text-neutral-800"
                >
                  <option>Silco Pharmaceuticals PLC</option>
                  <option>Genex Infosys PLC</option>
                  <option>BD Paint</option>
                  <option>Advent</option>
                  <option>Master Feed Agrotech PLC</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveForm(null)}
                  className="px-4 py-2 border border-neutral-200 text-xs font-medium rounded-xl text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0D7A6F] text-white text-xs font-semibold rounded-xl hover:bg-[#074741]"
                >
                  Create Task
                </button>
              </div>
            </form>
          ) : (
            /* Inline Quick Engagement Form */
            <form onSubmit={submitQuickEngagement} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <h4 className="font-bold text-sm text-neutral-900">
                  Quick Create Engagement
                </h4>
                <button
                  type="button"
                  onClick={() => setActiveForm(null)}
                  className="text-xs text-[#0D7A6F] font-semibold hover:underline"
                >
                  &larr; Back to list
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Client
                </label>
                <select
                  value={engClient}
                  onChange={(e) => setEngClient(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs text-neutral-800"
                >
                  <option>Silco Pharmaceuticals PLC</option>
                  <option>Genex Infosys PLC</option>
                  <option>BD Paint</option>
                  <option>Advent</option>
                  <option>Master Feed Agrotech PLC</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Engagement Name
                </label>
                <input
                  type="text"
                  required
                  value={engType}
                  onChange={(e) => setEngType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveForm(null)}
                  className="px-4 py-2 border border-neutral-200 text-xs font-medium rounded-xl text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0D7A6F] text-white text-xs font-semibold rounded-xl hover:bg-[#074741]"
                >
                  Create Engagement
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
