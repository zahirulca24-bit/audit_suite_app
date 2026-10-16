import React, { useState } from 'react';
import {
  Archive,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  File,
  FileCheck2,
  FileCode,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderOpen,
  HardDrive,
  History,
  LayoutGrid,
  List,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  Shield,
  SlidersHorizontal,
  Table as TableIcon,
  Trash2,
  Upload,
  User,
  Users,
  X,
} from 'lucide-react';

export interface VaultFile {
  id: string;
  name: string;
  type: string;
  extension: '.xlsx' | '.pdf' | '.docx' | '.eml' | '.pptx';
  size: string;
  modified: string;
  uploadedBy: string;
  status: 'Final' | 'In Review' | 'Draft';
  folder: string;
  client: string;
  engagement: string;
  uploadedOn: string;
  sharedWith: string;
  description: string;
  versions?: {
    version: string;
    date: string;
    author: string;
    size: string;
    isCurrent?: boolean;
  }[];
  accessList?: {
    name: string;
    role: string;
    permission: 'Full Access' | 'Edit & Review' | 'View Only';
  }[];
}

export const DocumentVaultPage: React.FC = () => {
  // Navigation / Folder selection
  const [selectedClient, setSelectedClient] = useState('Silco Pharmaceuticals PLC');
  const [selectedYear, setSelectedYear] = useState('FY 2025–26');
  const [selectedFolder, setSelectedFolder] = useState('05 Inventory');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'all-clients': true,
    'Silco Pharmaceuticals PLC': true,
    'FY 2025–26': true,
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [engagementFilter, setEngagementFilter] = useState('All Engagements');
  const [fileTypeFilter, setFileTypeFilter] = useState('All File Types');
  const [sortOrder, setSortOrder] = useState('Last Modified');
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'cards'>('table');

  // Preview / Details drawer state
  const [selectedFileId, setSelectedFileId] = useState<string>('DOC-001');
  const [activeTab, setActiveTab] = useState<'details' | 'versions' | 'access'>('details');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // 5 KPI Summary cards
  const stats = [
    {
      label: 'Total Files',
      value: '12,468',
      trend: '↑ 18%',
      trendSub: 'vs last year',
      icon: FileText,
      iconBg: 'bg-[#E8F5F1] text-[#0D7A6F]',
      badgeColor: 'text-emerald-700',
    },
    {
      label: 'Client Folders',
      value: '48',
      trend: '',
      trendSub: 'All active clients',
      icon: Folder,
      iconBg: 'bg-[#FFF7ED] text-[#D97706]',
      badgeColor: 'text-neutral-500',
    },
    {
      label: 'Engagement Folders',
      value: '64',
      trend: '',
      trendSub: 'FY 2025–26',
      icon: FolderOpen,
      iconBg: 'bg-[#EFF6FF] text-[#2563EB]',
      badgeColor: 'text-neutral-500',
    },
    {
      label: 'Shared Files',
      value: '326',
      trend: '',
      trendSub: 'Shared with team',
      icon: Users,
      iconBg: 'bg-[#FFF1F2] text-[#E11D48]',
      badgeColor: 'text-neutral-500',
    },
    {
      label: 'Storage Used',
      value: '18.4 GB',
      trend: '',
      trendSub: 'of 100 GB (18%)',
      icon: HardDrive,
      iconBg: 'bg-[#FFFBEB] text-[#B45309]',
      badgeColor: 'text-neutral-500',
    },
  ];

  // Folder Hierarchy
  const folderTree = [
    {
      id: 'Silco Pharmaceuticals PLC',
      name: 'Silco Pharmaceuticals PLC',
      subfolders: [
        {
          id: 'FY 2025–26',
          name: 'FY 2025–26',
          folders: [
            '01 Planning',
            '02 Risk Assessment',
            '03 Internal Control',
            '04 Substantive Testing',
            '05 Inventory',
            '06 Property, Plant & Equipment',
            '07 Receivables',
          ],
        },
      ],
    },
    { id: 'Genex Infosys PLC', name: 'Genex Infosys PLC', subfolders: [] },
    { id: 'BD Paint', name: 'BD Paint', subfolders: [] },
    { id: 'Advent', name: 'Advent', subfolders: [] },
    { id: 'Master Feed Agrotech PLC', name: 'Master Feed Agrotech PLC', subfolders: [] },
    { id: 'Fortune Shoe', name: 'Fortune Shoe', subfolders: [] },
    { id: 'NRB Club Ltd.', name: 'NRB Club Ltd.', subfolders: [] },
    { id: 'Abdul Monem Ltd. (Igloo)', name: 'Abdul Monem Ltd. (Igloo)', subfolders: [] },
  ];

  // All Files List (Matching the screenshot sample)
  const filesData: VaultFile[] = [
    {
      id: 'DOC-001',
      name: 'Inventory Count Sheet - 27 Aug 2026',
      type: '.xlsx',
      extension: '.xlsx',
      size: '1.2 MB',
      modified: '28 Aug 2026',
      uploadedBy: 'Hemadry Roy',
      status: 'Final',
      folder: '05 Inventory',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit FY 2025-26',
      uploadedOn: '28 Aug 2026 4:22 PM',
      sharedWith: '5 team members',
      description: 'Final physical count sheet as per 27.08.2026 count.',
      versions: [
        { version: 'v3 (Current)', date: '28 Aug 2026 4:22 PM', author: 'Hemadry Roy', size: '1.2 MB', isCurrent: true },
        { version: 'v2', date: '27 Aug 2026 9:15 PM', author: 'Hemadry Roy', size: '1.1 MB' },
        { version: 'v1', date: '25 Aug 2026 11:30 AM', author: 'Md. Bayezid', size: '940 KB' },
      ],
      accessList: [
        { name: 'Shafi Uddin Ahmed, FCA', role: 'Engagement Partner', permission: 'Full Access' },
        { name: 'Md. Zahirul Islam, FCA', role: 'EQCR Partner', permission: 'Full Access' },
        { name: 'Hemadry Roy', role: 'Audit Manager', permission: 'Edit & Review' },
        { name: 'Md. Bayezid', role: 'Senior Article', permission: 'View Only' },
      ],
    },
    {
      id: 'DOC-002',
      name: 'Inventory Listing - Final',
      type: '.xlsx',
      extension: '.xlsx',
      size: '852 KB',
      modified: '26 Sep 2026',
      uploadedBy: 'Md. Bayezid',
      status: 'Final',
      folder: '05 Inventory',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit FY 2025-26',
      uploadedOn: '26 Sep 2026 11:15 AM',
      sharedWith: '4 team members',
      description: 'Clean inventory listing reconciled with store ledger balance.',
      versions: [
        { version: 'v2 (Current)', date: '26 Sep 2026 11:15 AM', author: 'Md. Bayezid', size: '852 KB', isCurrent: true },
        { version: 'v1', date: '23 Sep 2026 03:40 PM', author: 'Md. Bayezid', size: '820 KB' },
      ],
      accessList: [
        { name: 'Shafi Uddin Ahmed, FCA', role: 'Engagement Partner', permission: 'Full Access' },
        { name: 'Hemadry Roy', role: 'Audit Manager', permission: 'Edit & Review' },
        { name: 'Md. Bayezid', role: 'Senior Article', permission: 'Edit & Review' },
      ],
    },
    {
      id: 'DOC-003',
      name: 'Stock Movement Analysis',
      type: '.xlsx',
      extension: '.xlsx',
      size: '1.1 MB',
      modified: '24 Sep 2026',
      uploadedBy: 'Md. Bayezid',
      status: 'Final',
      folder: '05 Inventory',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit FY 2025-26',
      uploadedOn: '24 Sep 2026 02:10 PM',
      sharedWith: '4 team members',
      description: 'Historical raw materials and finished goods inventory throughput testing.',
      versions: [
        { version: 'v1 (Current)', date: '24 Sep 2026 02:10 PM', author: 'Md. Bayezid', size: '1.1 MB', isCurrent: true },
      ],
      accessList: [
        { name: 'Hemadry Roy', role: 'Audit Manager', permission: 'Edit & Review' },
        { name: 'Md. Bayezid', role: 'Senior Article', permission: 'Edit & Review' },
      ],
    },
    {
      id: 'DOC-004',
      name: 'Inventory Reconciliation WP',
      type: '.xlsx',
      extension: '.xlsx',
      size: '968 KB',
      modified: '22 Sep 2026',
      uploadedBy: 'Hemadry Roy',
      status: 'In Review',
      folder: '05 Inventory',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit FY 2025-26',
      uploadedOn: '22 Sep 2026 05:45 PM',
      sharedWith: '3 team members',
      description: 'Reconciliation of floor count variances against ERP inventory records.',
      versions: [
        { version: 'v2 (Current)', date: '22 Sep 2026 05:45 PM', author: 'Hemadry Roy', size: '968 KB', isCurrent: true },
        { version: 'v1', date: '20 Sep 2026 10:20 AM', author: 'Hemadry Roy', size: '910 KB' },
      ],
      accessList: [
        { name: 'Shafi Uddin Ahmed, FCA', role: 'Engagement Partner', permission: 'Full Access' },
        { name: 'Hemadry Roy', role: 'Audit Manager', permission: 'Edit & Review' },
      ],
    },
    {
      id: 'DOC-005',
      name: 'Obsolete & Slow Moving Analysis',
      type: '.pdf',
      extension: '.pdf',
      size: '1.4 MB',
      modified: '20 Sep 2026',
      uploadedBy: 'Md. Zahirul Islam',
      status: 'Draft',
      folder: '05 Inventory',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit FY 2025-26',
      uploadedOn: '20 Sep 2026 01:25 PM',
      sharedWith: '4 team members',
      description: 'Assessment of expired pharmaceutical stock and damaged batches.',
      versions: [
        { version: 'v1 (Current)', date: '20 Sep 2026 01:25 PM', author: 'Md. Zahirul Islam', size: '1.4 MB', isCurrent: true },
      ],
      accessList: [
        { name: 'Md. Zahirul Islam, FCA', role: 'EQCR Partner', permission: 'Full Access' },
        { name: 'Hemadry Roy', role: 'Audit Manager', permission: 'Edit & Review' },
      ],
    },
    {
      id: 'DOC-006',
      name: 'NRV Working Paper',
      type: '.xlsx',
      extension: '.xlsx',
      size: '760 KB',
      modified: '18 Sep 2026',
      uploadedBy: 'Hemadry Roy',
      status: 'In Review',
      folder: '05 Inventory',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit FY 2025-26',
      uploadedOn: '18 Sep 2026 04:00 PM',
      sharedWith: '3 team members',
      description: 'Net Realizable Value testing in accordance with IAS 2 Inventories.',
      versions: [
        { version: 'v1 (Current)', date: '18 Sep 2026 04:00 PM', author: 'Hemadry Roy', size: '760 KB', isCurrent: true },
      ],
      accessList: [
        { name: 'Shafi Uddin Ahmed, FCA', role: 'Engagement Partner', permission: 'Full Access' },
        { name: 'Hemadry Roy', role: 'Audit Manager', permission: 'Edit & Review' },
      ],
    },
    {
      id: 'DOC-007',
      name: 'Management Representation Letter',
      type: '.docx',
      extension: '.docx',
      size: '320 KB',
      modified: '15 Sep 2026',
      uploadedBy: 'Md. Bayezid',
      status: 'Final',
      folder: '05 Inventory',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit FY 2025-26',
      uploadedOn: '15 Sep 2026 03:10 PM',
      sharedWith: '5 team members',
      description: 'Formal representation signed by CFO and Managing Director regarding inventory existence.',
      versions: [
        { version: 'v1 (Current)', date: '15 Sep 2026 03:10 PM', author: 'Md. Bayezid', size: '320 KB', isCurrent: true },
      ],
      accessList: [
        { name: 'Shafi Uddin Ahmed, FCA', role: 'Engagement Partner', permission: 'Full Access' },
        { name: 'Hemadry Roy', role: 'Audit Manager', permission: 'Edit & Review' },
      ],
    },
    {
      id: 'DOC-008',
      name: 'Client Query - Inventory Valuation',
      type: '.pdf',
      extension: '.pdf',
      size: '450 KB',
      modified: '12 Sep 2026',
      uploadedBy: 'Md. Zahirul Islam',
      status: 'Final',
      folder: '05 Inventory',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit FY 2025-26',
      uploadedOn: '12 Sep 2026 10:00 AM',
      sharedWith: '4 team members',
      description: 'Written response from plant manager regarding work-in-progress conversion cost basis.',
      versions: [
        { version: 'v1 (Current)', date: '12 Sep 2026 10:00 AM', author: 'Md. Zahirul Islam', size: '450 KB', isCurrent: true },
      ],
      accessList: [
        { name: 'Md. Zahirul Islam, FCA', role: 'EQCR Partner', permission: 'Full Access' },
        { name: 'Hemadry Roy', role: 'Audit Manager', permission: 'Edit & Review' },
      ],
    },
    {
      id: 'DOC-009',
      name: 'Email Confirmation - Sample',
      type: '.eml',
      extension: '.eml',
      size: '220 KB',
      modified: '10 Sep 2026',
      uploadedBy: 'Md. Bayezid',
      status: 'Final',
      folder: '05 Inventory',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit FY 2025-26',
      uploadedOn: '10 Sep 2026 09:15 AM',
      sharedWith: '3 team members',
      description: 'Direct email confirmation received from 3rd-party logistics warehouse facility.',
      versions: [
        { version: 'v1 (Current)', date: '10 Sep 2026 09:15 AM', author: 'Md. Bayezid', size: '220 KB', isCurrent: true },
      ],
      accessList: [
        { name: 'Hemadry Roy', role: 'Audit Manager', permission: 'Edit & Review' },
        { name: 'Md. Bayezid', role: 'Senior Article', permission: 'Edit & Review' },
      ],
    },
  ];

  // Helper for file icons
  const getFileBadge = (ext: string) => {
    switch (ext) {
      case '.xlsx':
        return (
          <div className="w-6 h-6 rounded bg-[#107C41] text-white flex items-center justify-center font-bold text-[10px] shadow-2xs shrink-0">
            X
          </div>
        );
      case '.pdf':
        return (
          <div className="w-6 h-6 rounded bg-[#E11D48] text-white flex items-center justify-center font-bold text-[10px] shadow-2xs shrink-0">
            PDF
          </div>
        );
      case '.docx':
        return (
          <div className="w-6 h-6 rounded bg-[#185ABD] text-white flex items-center justify-center font-bold text-[10px] shadow-2xs shrink-0">
            W
          </div>
        );
      case '.eml':
        return (
          <div className="w-6 h-6 rounded bg-[#0284C7] text-white flex items-center justify-center font-bold text-[10px] shadow-2xs shrink-0">
            @
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded bg-neutral-600 text-white flex items-center justify-center font-bold text-[10px] shadow-2xs shrink-0">
            <File className="w-3.5 h-3.5" />
          </div>
        );
    }
  };

  // Filtered files
  const filteredFiles = filesData.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      fileTypeFilter === 'All File Types' || file.extension === fileTypeFilter;
    return matchesSearch && matchesType;
  });

  const selectedFile =
    filesData.find((f) => f.id === selectedFileId) || filesData[0];

  const toggleFolder = (folderKey: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 5 KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
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

      {/* Main Filter & Action Toolbar */}
      <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files or folders..."
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

        {/* Filter Dropdowns & View toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Client dropdown */}
          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
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

          {/* Engagement dropdown */}
          <select
            value={engagementFilter}
            onChange={(e) => setEngagementFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
          >
            <option>All Engagements</option>
            <option>Statutory Audit FY 2025-26</option>
            <option>Tax Compliance 2025</option>
            <option>Special Assurance Review</option>
          </select>

          {/* File Types dropdown */}
          <select
            value={fileTypeFilter}
            onChange={(e) => setFileTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
          >
            <option>All File Types</option>
            <option value=".xlsx">.xlsx (Excel)</option>
            <option value=".pdf">.pdf (Acrobat)</option>
            <option value=".docx">.docx (Word)</option>
            <option value=".eml">.eml (Email)</option>
          </select>

          {/* Sort order dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
          >
            <option>Last Modified</option>
            <option>Name (A-Z)</option>
            <option>File Size</option>
            <option>Date Uploaded</option>
          </select>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-[#FAF8F5] p-0.5 rounded-xl border border-neutral-200">
            <button
              onClick={() => setViewMode('table')}
              title="Table view"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#0D7A6F] text-white shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="Grid view"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#0D7A6F] text-white shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              title="List view"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-[#0D7A6F] text-white shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Client Folder Structure (Tree View) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-3.5 sm:p-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-2">
            <div className="text-xs font-semibold text-neutral-900">
              Client Folder Structure
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="text-[#0D7A6F] hover:text-[#074741] p-1 rounded hover:bg-[#E8F5F1] transition-colors"
              title="Upload to vault"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tree Structure */}
          <div className="space-y-1 text-xs select-none overflow-y-auto max-h-[580px] scrollbar-thin pr-1">
            {/* Top Level: All Clients (48) */}
            <div>
              <div
                onClick={() => toggleFolder('all-clients')}
                className="flex items-center gap-1.5 py-1 px-1.5 rounded-lg hover:bg-neutral-50 cursor-pointer font-medium text-neutral-800"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                    expandedFolders['all-clients'] ? '' : '-rotate-90'
                  }`}
                />
                <FolderOpen className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">All Clients (48)</span>
              </div>

              {expandedFolders['all-clients'] && (
                <div className="pl-4 mt-0.5 space-y-1 border-l border-neutral-200 ml-2.5">
                  {folderTree.map((client) => {
                    const isClientExpanded = expandedFolders[client.name];
                    const isClientActive = selectedClient === client.name;

                    return (
                      <div key={client.id}>
                        <div
                          onClick={() => {
                            setSelectedClient(client.name);
                            toggleFolder(client.name);
                          }}
                          className={`flex items-center gap-1.5 py-1 px-2 rounded-lg cursor-pointer transition-colors ${
                            isClientActive
                              ? 'bg-neutral-100 font-semibold text-neutral-900'
                              : 'text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          <ChevronRight
                            className={`w-3.5 h-3.5 text-neutral-400 transition-transform shrink-0 ${
                              isClientExpanded ? 'rotate-90' : ''
                            }`}
                          />
                          <Folder className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate text-xs">{client.name}</span>
                        </div>

                        {/* Subfolders for expanded client */}
                        {isClientExpanded && client.subfolders.length > 0 && (
                          <div className="pl-4 mt-0.5 space-y-0.5 border-l border-neutral-200 ml-2.5">
                            {client.subfolders.map((year) => {
                              const isYearExpanded = expandedFolders[year.name];

                              return (
                                <div key={year.id}>
                                  <div
                                    onClick={() => {
                                      setSelectedYear(year.name);
                                      toggleFolder(year.name);
                                    }}
                                    className="flex items-center gap-1.5 py-1 px-2 rounded-lg cursor-pointer text-neutral-700 hover:bg-neutral-50 font-medium"
                                  >
                                    <ChevronRight
                                      className={`w-3.5 h-3.5 text-neutral-400 transition-transform shrink-0 ${
                                        isYearExpanded ? 'rotate-90' : ''
                                      }`}
                                    />
                                    <Folder className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                                    <span className="truncate">{year.name}</span>
                                  </div>

                                  {/* Deep subfolders like 01 Planning, 05 Inventory */}
                                  {isYearExpanded && (
                                    <div className="pl-4 mt-0.5 space-y-0.5 border-l border-neutral-200 ml-2.5">
                                      {year.folders.map((fName) => {
                                        const isFolderActive =
                                          selectedFolder === fName;
                                        return (
                                          <div
                                            key={fName}
                                            onClick={() => setSelectedFolder(fName)}
                                            className={`flex items-center gap-1.5 py-1 px-2 rounded-lg cursor-pointer transition-colors ${
                                              isFolderActive
                                                ? 'bg-[#E8F5F1] text-[#0D7A6F] font-semibold shadow-2xs'
                                                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                            }`}
                                          >
                                            <Folder
                                              className={`w-3.5 h-3.5 shrink-0 ${
                                                isFolderActive
                                                  ? 'text-[#0D7A6F]'
                                                  : 'text-amber-500/80'
                                              }`}
                                            />
                                            <span className="truncate">
                                              {fName}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center Column: Files Table / Content Area */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden flex flex-col">
          {/* Breadcrumb Path Banner above table */}
          <div className="px-4 py-3 bg-[#FAF8F5] border-b border-neutral-200/80 flex items-center justify-between gap-2">
            <div className="text-xs font-semibold text-neutral-800 truncate flex items-center gap-1.5">
              <span className="text-neutral-400 font-normal">Files in /</span>
              <span className="text-neutral-600">{selectedClient}</span>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-600">{selectedYear}</span>
              <span className="text-neutral-300">/</span>
              <span className="text-[#0D7A6F] font-bold">{selectedFolder}</span>
            </div>
            <span className="text-[11px] text-neutral-400 shrink-0 font-medium">
              {filteredFiles.length} files
            </span>
          </div>

          {/* Files List / Table */}
          <div className="overflow-x-auto min-h-[500px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-white text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3.5">Name</th>
                  <th className="py-2.5 px-2.5">Type</th>
                  <th className="py-2.5 px-2.5">Size</th>
                  <th className="py-2.5 px-2.5">Modified</th>
                  <th className="py-2.5 px-2.5">Uploaded By</th>
                  <th className="py-2.5 px-2.5">Status</th>
                  <th className="py-2.5 px-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredFiles.map((file) => {
                  const isSelected = selectedFileId === file.id;
                  return (
                    <tr
                      key={file.id}
                      onClick={() => setSelectedFileId(file.id)}
                      className={`group transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#F2FAF7] text-neutral-900 font-medium'
                          : 'hover:bg-neutral-50/80 text-neutral-700'
                      }`}
                    >
                      {/* Name */}
                      <td className="py-2.5 px-3.5">
                        <div className="flex items-center gap-2.5 min-w-[200px] max-w-[260px]">
                          {getFileBadge(file.extension)}
                          <span
                            className={`truncate ${
                              isSelected
                                ? 'font-semibold text-neutral-900'
                                : 'text-neutral-800'
                            }`}
                            title={file.name}
                          >
                            {file.name}
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-2.5 px-2.5 font-mono text-[11px] text-neutral-500">
                        {file.type}
                      </td>

                      {/* Size */}
                      <td className="py-2.5 px-2.5 font-mono text-[11px] text-neutral-500 tabular-nums">
                        {file.size}
                      </td>

                      {/* Modified */}
                      <td className="py-2.5 px-2.5 text-neutral-600 whitespace-nowrap">
                        {file.modified}
                      </td>

                      {/* Uploaded By */}
                      <td className="py-2.5 px-2.5 text-neutral-700 whitespace-nowrap">
                        {file.uploadedBy}
                      </td>

                      {/* Status */}
                      <td className="py-2.5 px-2.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            file.status === 'Final'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                              : file.status === 'In Review'
                              ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                              : 'bg-sky-50 text-sky-700 border-sky-200/80'
                          }`}
                        >
                          {file.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-2.5 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFileId(file.id);
                            setIsPreviewOpen(true);
                          }}
                          className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                          title="More options"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: File Details Panel / Drawer */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-4 flex flex-col justify-between min-h-[560px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
              <div className="text-xs font-semibold text-neutral-900">
                File Details
              </div>
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="text-xs text-[#0D7A6F] font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Full</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Selected File Card */}
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200/80 mb-3">
              <div className="flex items-start gap-3">
                {/* Big File Badge */}
                <div className="w-10 h-10 rounded-xl bg-[#107C41] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  {selectedFile.extension.replace('.', '').toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className="text-xs font-semibold text-neutral-900 leading-snug line-clamp-2"
                    title={selectedFile.name}
                  >
                    {selectedFile.name}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                    <span className="font-mono">{selectedFile.type}</span>
                    <span>•</span>
                    <span className="font-mono">{selectedFile.size}</span>
                    <span
                      className={`ml-auto inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold border ${
                        selectedFile.status === 'Final'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {selectedFile.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs: Details | Versions (3) | Access */}
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 mb-3 text-xs">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-1 font-semibold transition-colors relative cursor-pointer ${
                  activeTab === 'details'
                    ? 'text-[#0D7A6F]'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Details
                {activeTab === 'details' && (
                  <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#0D7A6F]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('versions')}
                className={`pb-1 font-semibold transition-colors relative cursor-pointer ${
                  activeTab === 'versions'
                    ? 'text-[#0D7A6F]'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Versions ({selectedFile.versions?.length || 1})
                {activeTab === 'versions' && (
                  <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#0D7A6F]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('access')}
                className={`pb-1 font-semibold transition-colors relative cursor-pointer ${
                  activeTab === 'access'
                    ? 'text-[#0D7A6F]'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Access
                {activeTab === 'access' && (
                  <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#0D7A6F]" />
                )}
              </button>
            </div>

            {/* Tab 1: Details content */}
            {activeTab === 'details' && (
              <div className="space-y-2.5 text-xs">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">Client</span>
                  <span className="col-span-2 text-neutral-800 font-medium truncate">
                    {selectedFile.client}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">Engagement</span>
                  <span className="col-span-2 text-neutral-800 font-medium truncate">
                    {selectedFile.engagement}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">Folder</span>
                  <span className="col-span-2 text-neutral-800 font-medium">
                    {selectedFile.folder}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">Uploaded By</span>
                  <span className="col-span-2 text-neutral-800 font-medium">
                    {selectedFile.uploadedBy}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">Uploaded On</span>
                  <span className="col-span-2 text-neutral-800 font-medium">
                    {selectedFile.uploadedOn}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">Last Modified</span>
                  <span className="col-span-2 text-neutral-800 font-medium">
                    {selectedFile.modified}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">Shared With</span>
                  <span className="col-span-2 text-neutral-800 font-medium">
                    {selectedFile.sharedWith}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-100">
                  <span className="text-neutral-400 block mb-1">Description</span>
                  <p className="text-neutral-700 text-[11px] leading-relaxed bg-[#FAF8F5] p-2 rounded-lg border border-neutral-200/60">
                    {selectedFile.description}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Versions content */}
            {activeTab === 'versions' && (
              <div className="space-y-2 text-xs">
                {selectedFile.versions?.map((ver, vIdx) => (
                  <div
                    key={vIdx}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      ver.isCurrent
                        ? 'bg-[#E8F5F1]/50 border-emerald-300'
                        : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-900">
                        {ver.version}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-500">
                        {ver.size}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      {ver.date} • {ver.author}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Access list */}
            {activeTab === 'access' && (
              <div className="space-y-2 text-xs">
                {selectedFile.accessList?.map((acc, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/70 flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-semibold text-neutral-900 truncate">
                        {acc.name}
                      </div>
                      <div className="text-[10px] text-neutral-500 truncate">
                        {acc.role}
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-[#0D7A6F] bg-[#E8F5F1] px-2 py-0.5 rounded-full shrink-0">
                      {acc.permission}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Action Buttons */}
          <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 mt-4">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="flex-1 bg-[#0D7A6F] hover:bg-[#074741] text-white py-2 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Open</span>
            </button>
            <button
              onClick={() => {
                alert(`Downloading ${selectedFile.name}...`);
              }}
              className="bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 py-2 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-600 transition-colors"
              title="More actions"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* File Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                {getFileBadge(selectedFile.extension)}
                <div>
                  <h3 className="font-serif font-bold text-neutral-900 text-base">
                    {selectedFile.name}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {selectedFile.client} • {selectedFile.engagement}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-dashed border-neutral-300 text-center space-y-3">
              <FileSpreadsheet className="w-12 h-12 text-[#107C41] mx-auto opacity-80" />
              <div className="text-xs text-neutral-600 max-w-md mx-auto">
                <p className="font-semibold text-neutral-800">
                  Document Preview & Audit Working File
                </p>
                <p className="mt-1">
                  {selectedFile.description}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-neutral-200 text-[11px] text-neutral-500">
                <span>Status: <strong className="text-emerald-700 font-semibold">{selectedFile.status}</strong></span>
                <span>•</span>
                <span>Size: {selectedFile.size}</span>
                <span>•</span>
                <span>Audit Ref: WP-INV-12</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-neutral-400">
                Uploaded by {selectedFile.uploadedBy} on {selectedFile.uploadedOn}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-4 py-2 border border-neutral-200 text-xs font-medium rounded-xl text-neutral-700 hover:bg-neutral-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Downloading ${selectedFile.name}`);
                    setIsPreviewOpen(false);
                  }}
                  className="px-4 py-2 bg-[#0D7A6F] text-white text-xs font-medium rounded-xl hover:bg-[#074741] flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload File Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif font-bold text-neutral-900 text-base">
                Upload Document to Vault
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Target Folder
                </label>
                <input
                  type="text"
                  disabled
                  value={`/ ${selectedClient} / ${selectedYear} / ${selectedFolder}`}
                  className="w-full px-3 py-2 bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-600"
                />
              </div>

              <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-6 text-center hover:border-[#0D7A6F] transition-colors cursor-pointer bg-[#FAF8F5]">
                <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <p className="font-medium text-neutral-700">
                  Drag and drop audit working papers here
                </p>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Supports .xlsx, .pdf, .docx, .eml up to 50 MB
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 border border-neutral-200 text-xs font-medium rounded-xl text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Document uploaded successfully to ' + selectedFolder);
                  setIsUploadModalOpen(false);
                }}
                className="px-4 py-2 bg-[#0D7A6F] text-white text-xs font-medium rounded-xl hover:bg-[#074741]"
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
