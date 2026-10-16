import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  Clock,
  Download,
  ExternalLink,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Tag,
  UserCheck,
  Users,
  X,
} from 'lucide-react';

export interface WorkPaperReviewItem {
  id: string;
  engagement: string;
  workPaper: string;
  refNo: string;
  preparer: string;
  reviewer: string;
  currentStage: 'Manager Review' | 'Partner Review' | 'EQCR' | 'Final Clearance';
  status: 'In Review' | 'Pending' | 'Overdue' | 'Completed';
  dueDate: string;
  lastAction: string;
  notesCount?: number;
  priority?: 'High' | 'Medium' | 'Low';
  description?: string;
  isaStandards?: string[];
}

export const ReviewSignoffsPage: React.FC = () => {
  // Navigation tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'By Engagement' | 'By Reviewer' | 'By Work Paper' | 'Quality Review' | 'Sign-off Log'
  >('By Engagement');

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [engagementFilter, setEngagementFilter] = useState('All Engagements');
  const [reviewerFilter, setReviewerFilter] = useState('All Reviewers');
  const [stageFilter, setStageFilter] = useState('All Stages');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Selection states
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeReviewItem, setActiveReviewItem] = useState<WorkPaperReviewItem | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSignoffModalOpen, setIsSignoffModalOpen] = useState(false);

  // 6 KPI Summary Cards
  const stats = [
    {
      label: 'Total Work Papers',
      value: '1,248',
      trend: '↑ 12%',
      trendSub: 'vs last year',
      icon: FileCheck2,
      iconBg: 'bg-[#E8F5F1] text-[#0D7A6F]',
      badgeColor: 'text-emerald-700',
    },
    {
      label: 'Pending Review',
      value: '86',
      trend: '',
      trendSub: '6 high priority',
      icon: Tag,
      iconBg: 'bg-[#FFF7ED] text-[#D97706]',
      badgeColor: 'text-neutral-500',
    },
    {
      label: 'In Review',
      value: '124',
      trend: '',
      trendSub: 'Across 8 engagements',
      icon: FileText,
      iconBg: 'bg-[#EFF6FF] text-[#2563EB]',
      badgeColor: 'text-neutral-500',
    },
    {
      label: 'Awaiting Partner Sign-off',
      value: '32',
      trend: '',
      trendSub: '4 past due',
      icon: Briefcase,
      iconBg: 'bg-[#FFFBEB] text-[#B45309]',
      badgeColor: 'text-neutral-500',
    },
    {
      label: 'Completed',
      value: '1,006',
      trend: '↑ 80.6%',
      trendSub: '',
      icon: CheckSquare,
      iconBg: 'bg-[#E8F5F1] text-[#059669]',
      badgeColor: 'text-emerald-700',
    },
    {
      label: 'Overdue Items',
      value: '18',
      trend: '',
      trendSub: 'Requires attention',
      icon: Clock,
      iconBg: 'bg-[#FFF1F2] text-[#E11D48]',
      badgeColor: 'text-rose-600',
    },
  ];

  // Table Data exactly matching Image 2
  const [workPapers, setWorkPapers] = useState<WorkPaperReviewItem[]>([
    {
      id: 'WP-1',
      engagement: 'Silco Pharmaceuticals PLC',
      workPaper: 'Inventory Valuation',
      refNo: 'WP-INV-12',
      preparer: 'Md. Bayezid',
      reviewer: 'Hemadry Roy',
      currentStage: 'Manager Review',
      status: 'In Review',
      dueDate: '28 Sep 2026',
      lastAction: '26 Sep 2026',
      notesCount: 2,
      priority: 'High',
      description: 'Physical inventory valuation testing under IAS 2 and verification of unit costs against vendor invoices.',
      isaStandards: ['ISA 230 - Audit Documentation', 'ISA 500 - Audit Evidence', 'ISA 501 - Specific Items: Inventory'],
    },
    {
      id: 'WP-2',
      engagement: 'Silco Pharmaceuticals PLC',
      workPaper: 'Inventory Reconciliation',
      refNo: 'WP-INV-13',
      preparer: 'Md. Bayezid',
      reviewer: 'Md. Zahirul Islam',
      currentStage: 'Partner Review',
      status: 'Pending',
      dueDate: '30 Sep 2026',
      lastAction: '24 Sep 2026',
      notesCount: 1,
      priority: 'High',
      description: 'Floor count reconciliation against ERP perpetual inventory records with cut-off testing.',
      isaStandards: ['ISA 501 - Inventory Count Verification', 'ISA 330 - Auditor Responses to Assessed Risks'],
    },
    {
      id: 'WP-3',
      engagement: 'Genex Infosys PLC',
      workPaper: 'Revenue Testing',
      refNo: 'WP-REV-05',
      preparer: 'Musabbir',
      reviewer: 'Hemadry Roy',
      currentStage: 'Manager Review',
      status: 'In Review',
      dueDate: '27 Sep 2026',
      lastAction: '25 Sep 2026',
      notesCount: 0,
      priority: 'Medium',
      description: '5-step revenue recognition criteria review under IFRS 15 for IT software services contracts.',
      isaStandards: ['ISA 240 - Fraud in Revenue Recognition', 'ISA 500 - Substantive Testing'],
    },
    {
      id: 'WP-4',
      engagement: 'BD Paint',
      workPaper: 'Receivables Confirmation',
      refNo: 'WP-REC-08',
      preparer: 'Rakib',
      reviewer: 'Md. Zahirul Islam',
      currentStage: 'Partner Review',
      status: 'Pending',
      dueDate: '26 Sep 2026',
      lastAction: '23 Sep 2026',
      notesCount: 3,
      priority: 'High',
      description: 'External circularization of trade debtors and subsequent realization testing up to audit sign-off.',
      isaStandards: ['ISA 505 - External Confirmations', 'IFRS 9 - Expected Credit Losses'],
    },
    {
      id: 'WP-5',
      engagement: 'Advent',
      workPaper: 'Fixed Assets Testing',
      refNo: 'WP-FA-06',
      preparer: 'Ifte',
      reviewer: 'Hemadry Roy',
      currentStage: 'Manager Review',
      status: 'In Review',
      dueDate: '25 Sep 2026',
      lastAction: '22 Sep 2026',
      notesCount: 1,
      priority: 'Medium',
      description: 'Physical inspection of plant and machinery additions, depreciation rates and title deed verification.',
      isaStandards: ['IAS 16 - Property, Plant & Equipment', 'ISA 500 - Audit Evidence'],
    },
    {
      id: 'WP-6',
      engagement: 'Master Feed Agrotech PLC',
      workPaper: 'Inventory Observation',
      refNo: 'WP-OBS-03',
      preparer: 'Md. Bayezid',
      reviewer: 'Md. Zahirul Islam',
      currentStage: 'Partner Review',
      status: 'Overdue',
      dueDate: '20 Sep 2026',
      lastAction: '19 Sep 2026',
      notesCount: 4,
      priority: 'High',
      description: 'Feed stock raw material silo count observation and moisture loss allowance adjustments.',
      isaStandards: ['ISA 501 - Inventory Observation', 'ISA 260 - Communication with Governance'],
    },
    {
      id: 'WP-7',
      engagement: 'Fortune Shoe',
      workPaper: 'Tax Provision',
      refNo: 'WP-TAX-04',
      preparer: 'Musabbir',
      reviewer: 'Hemadry Roy',
      currentStage: 'Manager Review',
      status: 'Completed',
      dueDate: '22 Sep 2026',
      lastAction: '22 Sep 2026',
      notesCount: 0,
      priority: 'Low',
      description: 'Corporate income tax provision computation, turnover tax minimum liability, and deferred tax calculation under IAS 12.',
      isaStandards: ['IAS 12 - Income Taxes', 'Income Tax Act 2023'],
    },
    {
      id: 'WP-8',
      engagement: 'NRB Club Ltd.',
      workPaper: 'Bank Reconciliation',
      refNo: 'WP-BANK-02',
      preparer: 'Rakib',
      reviewer: 'Md. Zahirul Islam',
      currentStage: 'Partner Review',
      status: 'Pending',
      dueDate: '28 Sep 2026',
      lastAction: '24 Sep 2026',
      notesCount: 2,
      priority: 'Medium',
      description: 'Year-end bank confirmation letters and reconciliation statement testing for 6 scheduled banks.',
      isaStandards: ['ISA 505 - External Confirmations', 'ISA 230 - Documentation'],
    },
  ]);

  // Review checklist state
  const [checklist, setChecklist] = useState({
    isa230: true,
    isa500: true,
    sampleVerified: true,
    varianceInvestigated: true,
    disclosureAdequate: false,
  });

  const [reviewNoteInput, setReviewNoteInput] = useState('');

  // Toggle selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredWorkPapers.map((w) => w.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Filtered rows
  const filteredWorkPapers = workPapers.filter((wp) => {
    const matchesSearch =
      wp.engagement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wp.workPaper.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wp.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wp.preparer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wp.reviewer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEngagement =
      engagementFilter === 'All Engagements' || wp.engagement === engagementFilter;

    const matchesReviewer =
      reviewerFilter === 'All Reviewers' || wp.reviewer === reviewerFilter;

    const matchesStage =
      stageFilter === 'All Stages' || wp.currentStage === stageFilter;

    const matchesStatus =
      statusFilter === 'All Status' || wp.status === statusFilter;

    return matchesSearch && matchesEngagement && matchesReviewer && matchesStage && matchesStatus;
  });

  const isAllSelected =
    filteredWorkPapers.length > 0 &&
    filteredWorkPapers.every((wp) => selectedIds.includes(wp.id));

  // Upcoming deadlines data
  const upcomingDeadlines = [
    {
      title: 'Inventory Reconciliation',
      engagement: 'Silco Pharmaceuticals PLC',
      date: '28 Sep 2026',
      dueLabel: 'In 2 days',
      dueType: 'amber',
      iconBg: 'bg-[#FFF7ED] text-[#D97706]',
    },
    {
      title: 'Receivables Confirmation',
      engagement: 'BD Paint',
      date: '26 Sep 2026',
      dueLabel: 'Overdue',
      dueType: 'rose',
      iconBg: 'bg-[#FFF1F2] text-[#E11D48]',
    },
    {
      title: 'Fixed Assets Testing',
      engagement: 'Advent',
      date: '25 Sep 2026',
      dueLabel: 'In 3 days',
      dueType: 'amber',
      iconBg: 'bg-[#FFF7ED] text-[#D97706]',
    },
    {
      title: 'Tax Provision',
      engagement: 'Fortune Shoe',
      date: '27 Sep 2026',
      dueLabel: 'In 5 days',
      dueType: 'amber',
      iconBg: 'bg-[#FFFBEB] text-[#B45309]',
    },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 6 Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  {stat.label}
                </span>
                <div
                  className={`w-7 h-7 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-neutral-900 tabular-nums">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] mt-1 font-medium">
                  {stat.trend && (
                    <span className="text-emerald-700 font-semibold">
                      {stat.trend}
                    </span>
                  )}
                  <span className="text-neutral-400 font-normal truncate">
                    {stat.trendSub}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub-view Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            'By Engagement',
            'By Reviewer',
            'By Work Paper',
            'Quality Review',
            'Sign-off Log',
          ] as const
        ).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeSubTab === tab
                ? 'bg-[#0D7A6F] text-white shadow-2xs'
                : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border border-neutral-200/80'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 min-w-[260px] max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search engagement, work paper or reviewer..."
            className="w-full pl-9 pr-3.5 py-1.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] focus:border-[#0D7A6F] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Engagements Filter */}
          <select
            value={engagementFilter}
            onChange={(e) => setEngagementFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
          >
            <option>All Engagements</option>
            <option>Silco Pharmaceuticals PLC</option>
            <option>Genex Infosys PLC</option>
            <option>BD Paint</option>
            <option>Advent</option>
            <option>Master Feed Agrotech PLC</option>
            <option>Fortune Shoe</option>
            <option>NRB Club Ltd.</option>
          </select>

          {/* Reviewers Filter */}
          <select
            value={reviewerFilter}
            onChange={(e) => setReviewerFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
          >
            <option>All Reviewers</option>
            <option>Hemadry Roy</option>
            <option>Md. Zahirul Islam</option>
            <option>Shafi Uddin Ahmed, FCA</option>
          </select>

          {/* Stages Filter */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
          >
            <option>All Stages</option>
            <option>Manager Review</option>
            <option>Partner Review</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
          >
            <option>All Status</option>
            <option>In Review</option>
            <option>Pending</option>
            <option>Overdue</option>
            <option>Completed</option>
          </select>

          {/* Export Button */}
          <button
            onClick={() => alert('Exporting review report in Excel format...')}
            className="px-3 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-neutral-500" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Table (9 cols) + Right Analytics Widgets (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: Work Paper Review Table */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto min-h-[460px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#FAF8F5] text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-3 w-8 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded text-[#0D7A6F] focus:ring-[#0D7A6F] cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-3">Engagement</th>
                  <th className="py-3 px-3">Work Paper / Section</th>
                  <th className="py-3 px-2.5">Ref. No.</th>
                  <th className="py-3 px-2.5">Preparer</th>
                  <th className="py-3 px-2.5">Reviewer</th>
                  <th className="py-3 px-2.5">Current Stage</th>
                  <th className="py-3 px-2.5">Status</th>
                  <th className="py-3 px-2.5">Due Date</th>
                  <th className="py-3 px-2.5">Last Action</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredWorkPapers.map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-neutral-50/70 transition-colors ${
                        isChecked ? 'bg-[#F2FAF7]' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-2.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleRow(item.id)}
                          className="rounded text-[#0D7A6F] focus:ring-[#0D7A6F] cursor-pointer"
                        />
                      </td>

                      {/* Engagement */}
                      <td className="py-2.5 px-3 font-semibold text-neutral-900 whitespace-nowrap">
                        {item.engagement}
                      </td>

                      {/* Work Paper / Section */}
                      <td className="py-2.5 px-3 text-neutral-700 whitespace-nowrap">
                        {item.workPaper}
                      </td>

                      {/* Ref. No. */}
                      <td className="py-2.5 px-2.5 font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                        {item.refNo}
                      </td>

                      {/* Preparer */}
                      <td className="py-2.5 px-2.5 text-neutral-600 whitespace-nowrap">
                        {item.preparer}
                      </td>

                      {/* Reviewer */}
                      <td className="py-2.5 px-2.5 text-neutral-700 font-medium whitespace-nowrap">
                        {item.reviewer}
                      </td>

                      {/* Current Stage */}
                      <td className="py-2.5 px-2.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            item.currentStage === 'Manager Review'
                              ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]'
                              : 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]'
                          }`}
                        >
                          {item.currentStage}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-2.5 px-2.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            item.status === 'In Review'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : item.status === 'Pending'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : item.status === 'Overdue'
                              ? 'bg-red-50 text-red-700 border-red-200 font-bold'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Due Date */}
                      <td
                        className={`py-2.5 px-2.5 whitespace-nowrap ${
                          item.status === 'Overdue'
                            ? 'text-rose-600 font-bold'
                            : 'text-neutral-600'
                        }`}
                      >
                        {item.dueDate}
                      </td>

                      {/* Last Action */}
                      <td className="py-2.5 px-2.5 text-neutral-500 whitespace-nowrap">
                        {item.lastAction}
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setActiveReviewItem(item);
                              setIsReviewModalOpen(true);
                            }}
                            className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                              item.status === 'Completed'
                                ? 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-700'
                                : 'bg-white hover:bg-[#E8F5F1] border-[#0D7A6F] text-[#0D7A6F]'
                            }`}
                          >
                            {item.status === 'Completed' ? 'View' : 'Review'}
                          </button>
                          <button
                            onClick={() => {
                              setActiveReviewItem(item);
                              setIsReviewModalOpen(true);
                            }}
                            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Analytics & Upcoming Deadlines Widgets */}
        <div className="lg:col-span-3 space-y-5">
          {/* Widget 1: Review Progress Donut Card */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
            <h3 className="font-semibold text-xs text-neutral-900 mb-3">
              Review Progress
            </h3>

            {/* Circular Donut Visual */}
            <div className="flex items-center justify-center py-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* SVG Donut Circle */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#F3F4F6"
                    strokeWidth="12"
                  />
                  {/* Completed: 80.6% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="48.7"
                    strokeLinecap="round"
                  />
                  {/* In Review: 9.9% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#0EA5E9"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="226.3"
                  />
                  {/* Pending: 6.9% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="233.8"
                  />
                </svg>

                {/* Center Percentage */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold font-serif text-neutral-900">
                    80.6%
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown Legend */}
            <div className="space-y-2 mt-3 pt-3 border-t border-neutral-100 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span>Completed</span>
                </div>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  1,006
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9]" />
                  <span>In Review</span>
                </div>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  124
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span>Pending</span>
                </div>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  86
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span>Overdue</span>
                </div>
                <span className="font-semibold text-rose-600 tabular-nums">
                  18
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9CA3AF]" />
                  <span>Not Started</span>
                </div>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  14
                </span>
              </div>
            </div>
          </div>

          {/* Widget 2: Upcoming Deadlines Card */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-xs text-neutral-900">
                Upcoming Deadlines
              </h3>
              <button
                onClick={() => setStatusFilter('Overdue')}
                className="text-[11px] font-semibold text-[#0D7A6F] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {upcomingDeadlines.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 pb-2.5 border-b border-neutral-100 last:border-none last:pb-0"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-neutral-900 truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {item.engagement}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[11px] text-neutral-500 font-medium">
                      {item.date}
                    </div>
                    <div
                      className={`text-[10px] font-bold mt-0.5 ${
                        item.dueType === 'rose'
                          ? 'text-rose-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {item.dueLabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review & Clearance Audit Modal */}
      {isReviewModalOpen && activeReviewItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  {activeReviewItem.refNo}
                </span>
                <h3 className="font-serif font-bold text-neutral-900 text-lg">
                  {activeReviewItem.workPaper}
                </h3>
                <p className="text-xs text-neutral-500">
                  {activeReviewItem.engagement}
                </p>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scope and Meta details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-[#FAF8F5] rounded-xl text-xs border border-neutral-200/80">
              <div>
                <span className="text-neutral-400 block text-[10px]">Preparer</span>
                <span className="font-semibold text-neutral-800">
                  {activeReviewItem.preparer}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">Reviewer</span>
                <span className="font-semibold text-neutral-800">
                  {activeReviewItem.reviewer}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">Current Stage</span>
                <span className="font-semibold text-blue-700">
                  {activeReviewItem.currentStage}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">Due Date</span>
                <span className="font-semibold text-neutral-800">
                  {activeReviewItem.dueDate}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
              <span className="font-semibold text-neutral-800 block mb-1">
                Audit Program Objective:
              </span>
              {activeReviewItem.description}
            </div>

            {/* ISA Compliance Checklist */}
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 mb-2">
                Audit Quality & ISA Standards Verification:
              </h4>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.isa230}
                    onChange={(e) =>
                      setChecklist({ ...checklist, isa230: e.target.checked })
                    }
                    className="rounded text-[#0D7A6F] focus:ring-[#0D7A6F]"
                  />
                  <span className="text-neutral-700">
                    <strong>ISA 230:</strong> Working paper documentation is clear, complete and enables an experienced auditor to understand procedures performed.
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.isa500}
                    onChange={(e) =>
                      setChecklist({ ...checklist, isa500: e.target.checked })
                    }
                    className="rounded text-[#0D7A6F] focus:ring-[#0D7A6F]"
                  />
                  <span className="text-neutral-700">
                    <strong>ISA 500:</strong> Sufficient appropriate audit evidence obtained and corroborated with source third-party documents.
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.varianceInvestigated}
                    onChange={(e) =>
                      setChecklist({
                        ...checklist,
                        varianceInvestigated: e.target.checked,
                      })
                    }
                    className="rounded text-[#0D7A6F] focus:ring-[#0D7A6F]"
                  />
                  <span className="text-neutral-700">
                    All variances exceeding performance materiality investigated and resolved.
                  </span>
                </label>
              </div>
            </div>

            {/* Review Notes Box */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Reviewer Comments / Review Notes:
              </label>
              <textarea
                rows={2}
                value={reviewNoteInput}
                onChange={(e) => setReviewNoteInput(e.target.value)}
                placeholder="Enter review notes for the preparer..."
                className="w-full p-2.5 text-xs bg-[#FAF8F5] border border-neutral-200 rounded-xl focus:ring-1 focus:ring-[#0D7A6F] focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <button
                onClick={() => {
                  alert(`Raised review note for ${activeReviewItem.preparer}`);
                  setIsReviewModalOpen(false);
                }}
                className="px-3.5 py-2 border border-neutral-200 text-xs font-medium rounded-xl text-neutral-700 hover:bg-neutral-50"
              >
                Raise Review Note
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 border border-neutral-200 text-xs font-medium rounded-xl text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Update state to completed
                    setWorkPapers((prev) =>
                      prev.map((wp) =>
                        wp.id === activeReviewItem.id
                          ? { ...wp, status: 'Completed' }
                          : wp
                      )
                    );
                    alert(`Work Paper ${activeReviewItem.refNo} approved and signed-off successfully!`);
                    setIsReviewModalOpen(false);
                  }}
                  className="px-4 py-2 bg-[#0D7A6F] text-white text-xs font-semibold rounded-xl hover:bg-[#074741] flex items-center gap-1.5 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Approve & Sign-off
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
