import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  ExternalLink,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Filter,
  Folder,
  FolderOpen,
  Gauge,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  User,
  Users,
  X,
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

interface WorkingPaperItem {
  ref: string;
  name: string;
  preparedBy: string;
  reviewedBy: string;
  status: 'Reviewed' | 'In Progress' | 'Open' | 'Pending Review';
  updated: string;
}

interface FolderSection {
  id: string;
  letter: string;
  title: string;
  count: number;
  progress: number;
  items: WorkingPaperItem[];
}

export const WorkingPapersPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'workspace' | 'register'>('workspace');
  const [registerSearch, setRegisterSearch] = useState('');
  const [registerClientFilter, setRegisterClientFilter] = useState('All Clients');
  const [registerStatusFilter, setRegisterStatusFilter] = useState('All');

  const crossEngagementWPs = [
    {
      ref: 'WP-INV-12',
      engagement: 'Silco Pharmaceuticals PLC',
      area: '05 Inventory',
      name: 'Physical Inventory Valuation Testing (IAS 2)',
      preparer: 'Md. Bayezid',
      reviewer: 'Hemadry Roy',
      status: 'In Review',
      version: 'v3',
      updated: '12 Oct 2026',
    },
    {
      ref: 'WP-REV-05',
      engagement: 'Genex Infosys PLC',
      area: '04 Revenue',
      name: 'IFRS 15 Revenue Contract Testing & Sample Audit',
      preparer: 'Musabbir Ahmed',
      reviewer: 'Hemadry Roy',
      status: 'Reviewed',
      version: 'v2',
      updated: '11 Oct 2026',
    },
    {
      ref: 'WP-REC-08',
      engagement: 'BD Paint',
      area: '07 Receivables',
      name: 'Trade Debtors Circularization Summary (ISA 505)',
      preparer: 'Rakibul Islam',
      reviewer: 'Md. Zahirul Islam',
      status: 'Pending Review',
      version: 'v1',
      updated: '10 Oct 2026',
    },
    {
      ref: 'WP-FA-06',
      engagement: 'Advent',
      area: '06 Property, Plant & Equipment',
      name: 'Fixed Asset Additions & Physical Tag Verification',
      preparer: 'Iftekhar Hossain',
      reviewer: 'Hemadry Roy',
      status: 'In Progress',
      version: 'v2',
      updated: '09 Oct 2026',
    },
    {
      ref: 'WP-OBS-03',
      engagement: 'Master Feed Agrotech PLC',
      area: '05 Inventory',
      name: 'Raw Materials Silo Count Observation (ISA 501)',
      preparer: 'Md. Bayezid',
      reviewer: 'Md. Zahirul Islam',
      status: 'Open',
      version: 'v1',
      updated: '08 Oct 2026',
    },
    {
      ref: 'WP-TAX-04',
      engagement: 'Fortune Shoe',
      area: '10 Taxation',
      name: 'Corporate Income Tax Provision & Return Reconciliations',
      preparer: 'Musabbir Ahmed',
      reviewer: 'Shafi Uddin Ahmed, FCA',
      status: 'Reviewed',
      version: 'v2',
      updated: '07 Oct 2026',
    },
    {
      ref: 'WP-BANK-02',
      engagement: 'NRB Club Ltd.',
      area: '08 Cash & Bank',
      name: 'Bank Reconciliations & 6-Bank Direct Confirmations',
      preparer: 'Rakibul Islam',
      reviewer: 'Md. Zahirul Islam',
      status: 'Reviewed',
      version: 'v3',
      updated: '06 Oct 2026',
    },
  ];

  const [selectedClient, setSelectedClient] = useState('Silco Pharmaceuticals PLC');
  const [selectedEngagement, setSelectedEngagement] = useState('Statutory Audit 2025–26');
  const [activeTab, setActiveTab] = useState<string>('Audit File Structure');
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'A': true,
  });
  const [isAddPaperModalOpen, setIsAddPaperModalOpen] = useState(false);

  const toggleFolder = (letter: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [letter]: !prev[letter],
    }));
  };

  const handleToggleExpandAll = () => {
    const newState = !isAllExpanded;
    setIsAllExpanded(newState);
    setExpandedFolders({
      A: newState,
      B: newState,
      C: newState,
      D: newState,
      E: newState,
      F: newState,
      G: newState,
    });
  };

  // 5 Top Metric Cards matching user screenshot exactly
  const summaryMetrics = [
    {
      label: 'Working Papers',
      value: '126',
      total: 'of 184',
      percent: 68,
      icon: Folder,
      iconColor: 'bg-amber-50 text-amber-600',
      barColor: 'bg-[#0D7A6F]',
    },
    {
      label: 'Reviewed',
      value: '48',
      total: 'of 126',
      percent: 38,
      icon: CheckCircle2,
      iconColor: 'bg-emerald-50 text-emerald-600',
      barColor: 'bg-emerald-600',
    },
    {
      label: 'Pending Review',
      value: '42',
      total: '',
      percent: 55,
      icon: Clock,
      iconColor: 'bg-amber-50 text-amber-600',
      barColor: 'bg-amber-500',
    },
    {
      label: 'Open Issues',
      value: '6',
      total: '',
      percent: 25,
      icon: AlertTriangle,
      iconColor: 'bg-rose-50 text-rose-600',
      barColor: 'bg-rose-500',
    },
    {
      label: 'Client Documents',
      value: '83',
      total: 'of 120',
      percent: 69,
      icon: FileText,
      iconColor: 'bg-blue-50 text-blue-600',
      barColor: 'bg-[#0D7A6F]',
    },
  ];

  // Workflow Stages Stepper
  const workflowStages = [
    { step: '1', title: 'Planning', active: true },
    { step: '2', title: 'Risk Assessment', active: false },
    { step: '3', title: 'Substantive Testing', active: false },
    { step: '4', title: 'Completion', active: false },
    { step: '5', title: 'Finalization', active: false },
  ];

  // Tab Pills
  const tabs = [
    'Audit File Structure',
    'Working Paper List',
    'Tickmarks & Index',
    'Client Documents',
    'Review Notes',
    'Completion Checklist',
  ];

  // Audit File Folders (A to G)
  const folderSections: FolderSection[] = [
    {
      id: 'sec-a',
      letter: 'A',
      title: 'A. Planning & General',
      count: 8,
      progress: 75,
      items: [
        {
          ref: 'A1',
          name: 'Engagement Acceptance & Continuance',
          preparedBy: 'Bayezid',
          reviewedBy: 'Zahirul Islam',
          status: 'Reviewed',
          updated: '10 Oct 2026',
        },
        {
          ref: 'A2',
          name: 'Audit Planning Memorandum',
          preparedBy: 'Bayezid',
          reviewedBy: 'Zahirul Islam',
          status: 'In Progress',
          updated: '11 Oct 2026',
        },
        {
          ref: 'A3',
          name: 'Understanding the Entity & Its Environment',
          preparedBy: 'Bayezid',
          reviewedBy: 'Hemadry Roy',
          status: 'Open',
          updated: '08 Oct 2026',
        },
        {
          ref: 'A4',
          name: 'Determination of Materiality (ISA 320)',
          preparedBy: 'Hemadry Roy',
          reviewedBy: 'Shafi Uddin Ahmed, FCA',
          status: 'Reviewed',
          updated: '07 Oct 2026',
        },
      ],
    },
    {
      id: 'sec-b',
      letter: 'B',
      title: 'B. Risk Assessment',
      count: 6,
      progress: 50,
      items: [
        {
          ref: 'B1',
          name: 'Inherent Risk & Control Risk Matrix',
          preparedBy: 'Hemadry Roy',
          reviewedBy: 'Zahirul Islam',
          status: 'In Progress',
          updated: '09 Oct 2026',
        },
        {
          ref: 'B2',
          name: 'Fraud Risk Assessment & Inquiries (ISA 240)',
          preparedBy: 'Bayezid',
          reviewedBy: 'Zahirul Islam',
          status: 'Open',
          updated: '05 Oct 2026',
        },
      ],
    },
    {
      id: 'sec-c',
      letter: 'C',
      title: 'C. Internal Control & Walkthrough',
      count: 12,
      progress: 42,
      items: [
        {
          ref: 'C1',
          name: 'Order-to-Cash Cycle Walkthrough',
          preparedBy: 'Sabbir Ahmed',
          reviewedBy: 'Hemadry Roy',
          status: 'In Progress',
          updated: '08 Oct 2026',
        },
        {
          ref: 'C2',
          name: 'Procure-to-Pay Cycle Walkthrough',
          preparedBy: 'Bayezid',
          reviewedBy: 'Hemadry Roy',
          status: 'Reviewed',
          updated: '06 Oct 2026',
        },
      ],
    },
    {
      id: 'sec-d',
      letter: 'D',
      title: 'D. Substantive Testing',
      count: 48,
      progress: 60,
      items: [
        {
          ref: 'D1',
          name: 'Revenue Substantive Analytical Procedures',
          preparedBy: 'Hemadry Roy',
          reviewedBy: 'Zahirul Islam',
          status: 'Reviewed',
          updated: '10 Oct 2026',
        },
        {
          ref: 'D2',
          name: 'Accounts Receivable Circularization Summary',
          preparedBy: 'Bayezid',
          reviewedBy: 'Zahirul Islam',
          status: 'In Progress',
          updated: '11 Oct 2026',
        },
      ],
    },
    {
      id: 'sec-e',
      letter: 'E',
      title: 'E. Specific Areas',
      count: 28,
      progress: 35,
      items: [
        {
          ref: 'E1',
          name: 'Fixed Asset Register Verification & Depreciation Recalc',
          preparedBy: 'Sabbir Ahmed',
          reviewedBy: 'Hemadry Roy',
          status: 'Open',
          updated: '09 Oct 2026',
        },
        {
          ref: 'E2',
          name: 'Inventory Valuation & NRV Test of Costing',
          preparedBy: 'Bayezid',
          reviewedBy: 'Hemadry Roy',
          status: 'In Progress',
          updated: '10 Oct 2026',
        },
      ],
    },
    {
      id: 'sec-f',
      letter: 'F',
      title: 'F. Completion',
      count: 10,
      progress: 20,
      items: [
        {
          ref: 'F1',
          name: 'Going Concern Assessment Checklist',
          preparedBy: 'Hemadry Roy',
          reviewedBy: 'Shafi Uddin Ahmed, FCA',
          status: 'Open',
          updated: '04 Oct 2026',
        },
        {
          ref: 'F2',
          name: 'Management Representation Letter Draft',
          preparedBy: 'Zahirul Islam',
          reviewedBy: 'Shafi Uddin Ahmed, FCA',
          status: 'Open',
          updated: '04 Oct 2026',
        },
      ],
    },
    {
      id: 'sec-g',
      letter: 'G',
      title: 'G. Final Reports',
      count: 6,
      progress: 0,
      items: [
        {
          ref: 'G1',
          name: 'Draft Independent Auditor Report',
          preparedBy: 'Shafi Uddin Ahmed, FCA',
          reviewedBy: 'Quality Control Partner',
          status: 'Open',
          updated: '01 Oct 2026',
        },
        {
          ref: 'G2',
          name: 'Letter to Those Charged with Governance (ISA 260)',
          preparedBy: 'Zahirul Islam',
          reviewedBy: 'Shafi Uddin Ahmed, FCA',
          status: 'Open',
          updated: '01 Oct 2026',
        },
      ],
    },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Header Zone with Eyebrow, Breadcrumb, Title & Right Selectors */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-1">
        <div>
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#0D7A6F]">
            MONDAY, 12 OCTOBER 2026
          </div>

          {/* Sub-breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
            <span>Audit & Docs</span>
            <span>&gt;</span>
            <span className="text-neutral-700 font-medium">Working Papers</span>
            {viewMode === 'workspace' && (
              <>
                <span>&gt;</span>
                <span className="text-neutral-900 font-semibold">Audit Mounting Workspace</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-[34px] font-semibold text-neutral-900 tracking-tight mt-1">
            Working Papers
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5 max-w-2xl">
            {viewMode === 'workspace'
              ? `Audit Mounting Workspace: ${selectedClient} — FY 2025–26`
              : 'Cross-engagement working paper register, review workflow and audit evidence tracking.'}
          </p>
        </div>

        {/* Right Selectors: View Switcher & Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#FAF8F5] p-1 rounded-2xl border border-neutral-200">
            <button
              onClick={() => setViewMode('workspace')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'workspace'
                  ? 'bg-[#0D7A6F] text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Audit Mounting
            </button>
            <button
              onClick={() => setViewMode('register')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'register'
                  ? 'bg-[#0D7A6F] text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Register
            </button>
          </div>

          {/* Client Selector (when in workspace) */}
          {viewMode === 'workspace' && (
            <div className="bg-white border border-neutral-200/90 rounded-2xl px-3.5 py-1.5 shadow-2xs text-left min-w-[200px]">
              <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
                Client
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <span className="text-xs font-semibold text-neutral-900 truncate">
                  {selectedClient}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              </div>
            </div>
          )}

          {/* Engagement Selector (when in workspace) */}
          {viewMode === 'workspace' && (
            <div className="bg-white border border-neutral-200/90 rounded-2xl px-3.5 py-1.5 shadow-2xs text-left min-w-[210px]">
              <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
                Engagement
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <span className="text-xs font-semibold text-neutral-900 truncate">
                  {selectedEngagement}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* REGISTER VIEW: Cross-Engagement Table */}
      {viewMode === 'register' ? (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[260px] max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={registerSearch}
                onChange={(e) => setRegisterSearch(e.target.value)}
                placeholder="Search working papers by ref, name, or engagement..."
                className="w-full pl-9 pr-3.5 py-1.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={registerClientFilter}
                onChange={(e) => setRegisterClientFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium cursor-pointer"
              >
                <option>All Clients</option>
                <option>Silco Pharmaceuticals PLC</option>
                <option>Genex Infosys PLC</option>
                <option>BD Paint</option>
                <option>Advent</option>
                <option>Master Feed Agrotech PLC</option>
                <option>Fortune Shoe</option>
                <option>NRB Club Ltd.</option>
              </select>

              <select
                value={registerStatusFilter}
                onChange={(e) => setRegisterStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Reviewed">Reviewed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Open">Open</option>
              </select>

              <button
                onClick={() => setViewMode('workspace')}
                className="bg-[#0B332A] hover:bg-[#07241D] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Open Audit Mounting Workspace</span>
              </button>
            </div>
          </div>

          {/* Cross-Engagement Register Table */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto min-h-[440px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-[#FAF8F5] text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    <th className="py-3 px-3.5">Ref No.</th>
                    <th className="py-3 px-3">Engagement / Client</th>
                    <th className="py-3 px-3">Audit Area</th>
                    <th className="py-3 px-4">Working Paper Title</th>
                    <th className="py-3 px-3">Preparer</th>
                    <th className="py-3 px-3">Reviewer</th>
                    <th className="py-3 px-2.5 text-center">Status</th>
                    <th className="py-3 px-2.5 text-center">Version</th>
                    <th className="py-3 px-3">Last Updated</th>
                    <th className="py-3 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {crossEngagementWPs
                    .filter((wp) => {
                      const matchSearch =
                        wp.ref.toLowerCase().includes(registerSearch.toLowerCase()) ||
                        wp.name.toLowerCase().includes(registerSearch.toLowerCase()) ||
                        wp.engagement.toLowerCase().includes(registerSearch.toLowerCase());
                      const matchClient =
                        registerClientFilter === 'All Clients' || wp.engagement === registerClientFilter;
                      const matchStatus =
                        registerStatusFilter === 'All' || wp.status === registerStatusFilter;
                      return matchSearch && matchClient && matchStatus;
                    })
                    .map((wp) => (
                      <tr
                        key={wp.ref}
                        onClick={() => {
                          setSelectedClient(wp.engagement);
                          setViewMode('workspace');
                        }}
                        className="hover:bg-neutral-50/70 transition-colors cursor-pointer"
                      >
                        <td className="py-3 px-3.5 font-mono text-[11px] font-bold text-neutral-800 whitespace-nowrap">
                          {wp.ref}
                        </td>
                        <td className="py-3 px-3 font-semibold text-neutral-900 whitespace-nowrap">
                          {wp.engagement}
                        </td>
                        <td className="py-3 px-3 text-neutral-600 whitespace-nowrap">
                          {wp.area}
                        </td>
                        <td className="py-3 px-4 max-w-sm text-neutral-800 font-medium">
                          <span className="line-clamp-2">{wp.name}</span>
                        </td>
                        <td className="py-3 px-3 text-neutral-700 whitespace-nowrap">
                          {wp.preparer}
                        </td>
                        <td className="py-3 px-3 text-neutral-700 font-medium whitespace-nowrap">
                          {wp.reviewer}
                        </td>
                        <td className="py-3 px-2.5 text-center whitespace-nowrap">
                          <StatusBadge status={wp.status} />
                        </td>
                        <td className="py-3 px-2.5 text-center font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                          {wp.version}
                        </td>
                        <td className="py-3 px-3 text-neutral-500 whitespace-nowrap">
                          {wp.updated}
                        </td>
                        <td className="py-3 px-3.5 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedClient(wp.engagement);
                              setViewMode('workspace');
                            }}
                            className="px-3 py-1 rounded-lg border border-neutral-200 hover:bg-[#E8F5F1] text-[#0D7A6F] text-xs font-semibold inline-flex items-center gap-1"
                          >
                            <span>Open</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Back button when inside workspace */}
          <div className="flex items-center justify-between pb-1">
            <button
              onClick={() => setViewMode('register')}
              className="text-xs font-semibold text-[#0D7A6F] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to All Working Papers Register</span>
            </button>
            <span className="text-[11px] text-neutral-400">
              Audit Mounting Workspace Active
            </span>
          </div>

          {/* 2. Top Engagement Overview Card */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          {/* Left: Building icon & Engagement details */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF2F6] text-[#334155] flex items-center justify-center shrink-0 shadow-2xs">
              <Building2 className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="font-serif text-lg font-bold text-neutral-900">
                  Silco Pharmaceuticals PLC
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF6F3] text-[#0D7A6F] border border-[#CDECE3]">
                  In Progress
                </span>
              </div>
              <div className="text-xs text-neutral-500 mt-1 flex flex-wrap items-center gap-2">
                <span>Statutory Audit</span>
                <span className="text-neutral-300">|</span>
                <span>FY 2025–26</span>
                <span className="text-neutral-300">|</span>
                <span>01 Jul 2025 – 30 Jun 2026</span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => alert('Navigating to Engagement Dashboard')}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200/90 shadow-2xs transition-colors cursor-pointer"
            >
              Engagement Dashboard
            </button>
            <button
              onClick={() => alert('Opening Full Audit Master File')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#07261F] hover:bg-[#041B16] shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Open File</span>
            </button>
          </div>
        </div>

        {/* Bottom Metadata: Engagement Code, Partner, Manager, Senior, Junior */}
        <div className="pt-3.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-600">
            <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <div>
              <span className="text-[10px] text-neutral-400 block leading-tight">Engagement Code</span>
              <span className="font-semibold text-neutral-800 text-[11px]">AUD-2026-001</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-neutral-600">
            <User className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <div>
              <span className="text-[10px] text-neutral-400 block leading-tight">Partner</span>
              <span className="font-semibold text-neutral-800 text-[11px] truncate">Shafi Uddin Ahmed, FCA</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-neutral-600">
            <User className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <div>
              <span className="text-[10px] text-neutral-400 block leading-tight">Manager</span>
              <span className="font-semibold text-neutral-800 text-[11px] truncate">Md. Zahirul Islam</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-neutral-600">
            <User className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <div>
              <span className="text-[10px] text-neutral-400 block leading-tight">Senior</span>
              <span className="font-semibold text-neutral-800 text-[11px] truncate">Hemadry Roy</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-neutral-600">
            <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <div>
              <span className="text-[10px] text-neutral-400 block leading-tight">Junior</span>
              <span className="font-semibold text-neutral-800 text-[11px] truncate">Md. Bayezid</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 5 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {summaryMetrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-xl ${m.iconColor} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-[11px] text-neutral-500 font-medium">{m.label}</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-serif font-bold text-neutral-900 tabular-nums">
                  {m.value}
                </span>
                {m.total && (
                  <span className="text-xs text-neutral-400 font-normal">
                    {m.total}
                  </span>
                )}
              </div>
              {/* Indicator bar */}
              <div className="mt-2.5 flex items-center gap-2">
                <div className="flex-1 bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${m.barColor} h-full rounded-full transition-all`}
                    style={{ width: `${m.percent}%` }}
                  />
                </div>
                {m.total && (
                  <span className="text-[10px] text-neutral-400 font-semibold tabular-nums">
                    {m.percent}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Workflow Stepper (1 to 5) */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] px-4">
          {workflowStages.map((stg, i) => (
            <React.Fragment key={stg.step}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                    stg.active
                      ? 'bg-[#07261F] text-white shadow-2xs'
                      : 'border border-neutral-300 text-neutral-400 bg-white'
                  }`}
                >
                  {stg.step}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    stg.active ? 'text-neutral-900' : 'text-neutral-500'
                  }`}
                >
                  {stg.title}
                </span>
              </div>
              {i < workflowStages.length - 1 && (
                <div className="flex-1 max-w-[90px] h-px bg-neutral-200 mx-3" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 5. Tab Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer shrink-0 font-medium ${
              activeTab === tab
                ? 'bg-[#07261F] text-white shadow-xs font-semibold'
                : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 6. Main 2-Column Grid: Audit File Structure (Left 70%) & Right Widgets (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Audit File Structure Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            {/* Table Header Bar */}
            <div className="p-4 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-base font-semibold text-neutral-900">
                Audit File Structure
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleExpandAll}
                  className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{isAllExpanded ? 'Collapse all' : 'Expand all'}</span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isAllExpanded ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                <button
                  onClick={() => setIsAddPaperModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#07261F] hover:bg-[#041B16] text-white text-xs font-medium flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Working Paper</span>
                </button>
              </div>
            </div>

            {/* Nested Folder Tree Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-[#FBF9F5] border-b border-neutral-100 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3.5 pl-4 w-14">Ref</th>
                    <th className="py-2.5 px-3">Working Paper</th>
                    <th className="py-2.5 px-3">Prepared By</th>
                    <th className="py-2.5 px-3">Reviewed By</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Updated</th>
                    <th className="py-2.5 px-3.5 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-700">
                  {folderSections.map((section) => {
                    const isExpanded = !!expandedFolders[section.letter];
                    return (
                      <React.Fragment key={section.id}>
                        {/* Folder Row */}
                        <tr
                          onClick={() => toggleFolder(section.letter)}
                          className="bg-neutral-50/70 hover:bg-neutral-100/70 cursor-pointer font-semibold transition-colors select-none"
                        >
                          <td className="py-3 px-3.5 pl-4 text-neutral-400">
                            <ChevronRight
                              className={`w-3.5 h-3.5 transition-transform ${
                                isExpanded ? 'rotate-90 text-neutral-800' : ''
                              }`}
                            />
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <Folder className="w-4 h-4 text-amber-600 fill-amber-500/20" />
                              <span className="text-neutral-900 text-xs">
                                {section.title}
                              </span>
                              <span className="text-[11px] font-normal text-neutral-400">
                                {section.count} papers
                              </span>
                            </div>
                          </td>
                          <td colSpan={2} className="py-3 px-3">
                            <div className="w-32 bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-[#07261F] h-full rounded-full"
                                style={{ width: `${section.progress}%` }}
                              />
                            </div>
                          </td>
                          <td className="py-3 px-3 text-[11px] text-neutral-500 font-semibold tabular-nums">
                            {section.progress}%
                          </td>
                          <td className="py-3 px-3"></td>
                          <td
                            className="py-3 px-3.5 pr-4 text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md hover:bg-neutral-200/50">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>

                        {/* Child Working Papers if folder expanded */}
                        {isExpanded &&
                          section.items.map((paper) => (
                            <tr
                              key={paper.ref}
                              className="hover:bg-neutral-50/50 transition-colors"
                            >
                              <td className="py-2.5 px-3.5 pl-8 font-mono text-[11px] font-bold text-neutral-600">
                                {paper.ref}
                              </td>
                              <td className="py-2.5 px-3 font-medium text-neutral-800">
                                {paper.name}
                              </td>
                              <td className="py-2.5 px-3 text-neutral-600">
                                {paper.preparedBy}
                              </td>
                              <td className="py-2.5 px-3 text-neutral-600">
                                {paper.reviewedBy}
                              </td>
                              <td className="py-2.5 px-3">
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    paper.status === 'Reviewed'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : paper.status === 'In Progress'
                                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                                  }`}
                                >
                                  {paper.status}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-[11px] text-neutral-500 tabular-nums">
                                {paper.updated}
                              </td>
                              <td className="py-2.5 px-3.5 pr-4 text-right">
                                <button className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md hover:bg-neutral-100">
                                  <MoreHorizontal className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Widgets (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Widget 1: Engagement Progress */}
          <div className="bg-white rounded-2xl p-4.5 border border-neutral-200/80 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900">
              <Gauge className="w-4 h-4 text-[#0D7A6F]" />
              <span>Engagement Progress</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-neutral-900">
                68%
              </span>
            </div>

            {/* Segmented multi-color progress bar */}
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden flex">
              <div className="bg-[#07261F] h-full" style={{ width: '48%' }} />
              <div className="bg-blue-600 h-full" style={{ width: '20%' }} />
              <div className="bg-amber-500 h-full" style={{ width: '22%' }} />
              <div className="bg-rose-500 h-full" style={{ width: '10%' }} />
            </div>

            {/* Legend Stats 2x2 */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#07261F]" />
                  <span className="text-neutral-600 text-[11px]">Completed</span>
                </div>
                <span className="font-bold text-neutral-900">86</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-neutral-600 text-[11px]">Open</span>
                </div>
                <span className="font-bold text-neutral-900">42</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-neutral-600 text-[11px]">In Progress</span>
                </div>
                <span className="font-bold text-neutral-900">28</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-neutral-600 text-[11px]">Overdue</span>
                </div>
                <span className="font-bold text-neutral-900">6</span>
              </div>
            </div>
          </div>

          {/* Widget 2: Team Members */}
          <div className="bg-white rounded-2xl p-4.5 border border-neutral-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-semibold text-neutral-900">
                Team Members
              </h3>
              <a href="#team" className="text-[11px] font-semibold text-[#0D7A6F] hover:underline">
                View all →
              </a>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-[10px]">
                    SZ
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 text-xs">
                      Shafi Uddin Ahmed, FCA
                    </div>
                    <div className="text-[10px] text-neutral-400">Partner</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                  Review
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-[10px]">
                    MZ
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 text-xs">
                      Md. Zahirul Islam
                    </div>
                    <div className="text-[10px] text-neutral-400">Manager</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
                  In-charge
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[10px]">
                    HR
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 text-xs">
                      Hemadry Roy
                    </div>
                    <div className="text-[10px] text-neutral-400">Senior</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px]">
                    MB
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 text-xs">
                      Md. Bayezid
                    </div>
                    <div className="text-[10px] text-neutral-400">Junior</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Widget 3: Key Dates */}
          <div className="bg-white rounded-2xl p-4.5 border border-neutral-200/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900">
              <Calendar className="w-4 h-4 text-[#0D7A6F]" />
              <span>Key Dates</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 transition-colors text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">📅</span>
                  <div>
                    <div className="font-medium text-neutral-800">Physical Inventory Count</div>
                    <div className="text-[10px] text-neutral-400">27 Aug 2026</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Completed
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 transition-colors text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">📅</span>
                  <div>
                    <div className="font-medium text-neutral-800">Year End</div>
                    <div className="text-[10px] text-neutral-400">30 Jun 2026</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Completed
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 transition-colors text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">📅</span>
                  <div>
                    <div className="font-medium text-neutral-800">Draft Report</div>
                    <div className="text-[10px] text-neutral-400">15 Oct 2026</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Upcoming
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 transition-colors text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">📅</span>
                  <div>
                    <div className="font-medium text-neutral-800">Final Report</div>
                    <div className="text-[10px] text-neutral-400">30 Oct 2026</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Upcoming
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )}

      {/* Modal: Add Working Paper */}
      {isAddPaperModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsAddPaperModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-200 p-6 z-10 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-serif text-base font-semibold text-neutral-900">
                Add Working Paper
              </h3>
              <button
                onClick={() => setIsAddPaperModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-600 font-medium mb-1">Target Section</label>
                <select className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]">
                  <option>A. Planning & General</option>
                  <option>B. Risk Assessment</option>
                  <option>C. Internal Control & Walkthrough</option>
                  <option>D. Substantive Testing</option>
                  <option>E. Specific Areas</option>
                  <option>F. Completion</option>
                  <option>G. Final Reports</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">Index Reference (Ref)</label>
                <input
                  type="text"
                  placeholder="e.g. A5, D3.1"
                  className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">Working Paper Title</label>
                <input
                  type="text"
                  placeholder="e.g. Preliminary Analytical Review"
                  className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Prepared By</label>
                  <select className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]">
                    <option>Md. Bayezid</option>
                    <option>Hemadry Roy</option>
                    <option>Sabbir Ahmed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Reviewed By</label>
                  <select className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]">
                    <option>Md. Zahirul Islam</option>
                    <option>Shafi Uddin Ahmed, FCA</option>
                    <option>Hemadry Roy</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
              <button
                onClick={() => setIsAddPaperModalOpen(false)}
                className="px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Working paper created and indexed in Audit Mounting file.');
                  setIsAddPaperModalOpen(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#07261F] hover:bg-[#041B16] rounded-xl shadow-2xs cursor-pointer"
              >
                Create Paper
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
