import React, { useState } from 'react';
import {
  AlertCircle,
  Briefcase,
  Building,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Filter,
  FolderOpen,
  LayoutGrid,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Table as TableIcon,
  User,
  Users,
  X,
} from 'lucide-react';

interface ClientItem {
  id: string;
  code: string;
  name: string;
  industry: string;
  primaryContact: {
    name: string;
    designation: string;
    email: string;
    phone: string;
  };
  relationshipPartner: {
    name: string;
    role: string;
    initials: string;
    email: string;
  };
  engagementsCount: number;
  requestsCount: number;
  receivable: string;
  overdueReceivable: string;
  risk: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'Review' | 'Dormant';
  yearEnd: string;
  clientSince: string;
  taxBIN: string;
  taxTIN: string;
  tradeLicense: string;
  engagementsList: {
    code: string;
    name: string;
    status: 'In Progress' | 'In Review' | 'Not Started' | 'Completed';
  }[];
  requestsList: {
    title: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
  recentActivities: {
    title: string;
    author: string;
    time: string;
  }[];
}

export const ClientCRMPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [partnerFilter, setPartnerFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'Overview' | 'Engagements' | 'Requests' | 'Documents'>('Overview');

  // 5 Top KPI Cards exactly matching screenshot
  const stats = [
    {
      label: 'Total Clients',
      value: '48',
      change: '↑ 12%',
      sub: 'vs last year',
      iconColor: 'bg-emerald-50 text-emerald-700',
      changeColor: 'text-emerald-700',
    },
    {
      label: 'Active Clients',
      value: '42',
      change: '87.5%',
      sub: 'retention rate',
      iconColor: 'bg-amber-50 text-amber-700',
      changeColor: 'text-emerald-700',
    },
    {
      label: 'Active Engagements',
      value: '64',
      change: '5 service lines',
      sub: 'in fieldwork',
      iconColor: 'bg-blue-50 text-blue-700',
      changeColor: 'text-emerald-700',
    },
    {
      label: 'Pending Requests',
      value: '19',
      change: '4 urgent',
      sub: 'awaiting response',
      iconColor: 'bg-rose-50 text-rose-700',
      changeColor: 'text-rose-700',
    },
    {
      label: 'Outstanding Receivable',
      value: '৳ 8.4M',
      change: '↑ 28%',
      sub: '৳ 2.1M overdue (30+ days)',
      iconColor: 'bg-amber-50 text-amber-700',
      changeColor: 'text-rose-700',
    },
  ];

  // 8 Clients from screenshot with full details
  const clientList: ClientItem[] = [
    {
      id: 'CLI-001',
      code: 'SIL',
      name: 'Silco Pharmaceuticals PLC',
      industry: 'Pharmaceuticals',
      primaryContact: {
        name: 'Dr. Arif Hossain',
        designation: 'CFO',
        email: 'arif.h@silcopharma.com',
        phone: '+880 1711 234 567',
      },
      relationshipPartner: {
        name: 'Shafi Uddin Ahmed, FCA',
        role: 'Engagement Leader',
        initials: 'SA',
        email: 'shafi@avenquis.com',
      },
      engagementsCount: 4,
      requestsCount: 3,
      receivable: '৳ 1,200,000',
      overdueReceivable: '৳ 400,000 overdue',
      risk: 'Low',
      status: 'Active',
      yearEnd: '30 Jun',
      clientSince: '2018 (7 years)',
      taxBIN: '001234567-0001',
      taxTIN: '123456789012',
      tradeLicense: 'TRD-2026-001',
      engagementsList: [
        { code: 'AUD-2026-001', name: 'Statutory Audit', status: 'In Progress' },
        { code: 'TAX-2026-001', name: 'Tax Compliance', status: 'Not Started' },
        { code: 'ADV-2026-002', name: 'Advisory', status: 'In Progress' },
        { code: 'REV-2026-001', name: 'Review Engagement', status: 'In Review' },
      ],
      requestsList: [
        { title: 'Provide inventory schedule', dueDate: '12 Oct 2026', priority: 'High' },
        { title: 'Management representation letter', dueDate: '15 Oct 2026', priority: 'Medium' },
        { title: 'Related party confirmation', dueDate: '18 Oct 2026', priority: 'Medium' },
      ],
      recentActivities: [
        { title: 'Document uploaded: Inventory schedule', author: 'Dr. Arif Hossain', time: '2 hours ago' },
        { title: 'Engagement status updated: Fieldwork', author: 'Shafi Uddin Ahmed', time: '1 day ago' },
        { title: 'Client request raised: Related party details', author: 'Dr. Arif Hossain', time: '2 days ago' },
      ],
    },
    {
      id: 'CLI-002',
      code: 'GEN',
      name: 'Genex Infosys PLC',
      industry: 'Technology & IT',
      primaryContact: {
        name: 'Prince Mojumder',
        designation: 'Managing Director',
        email: 'prince@genexinfosys.com',
        phone: '+880 1819 345 678',
      },
      relationshipPartner: {
        name: 'Zahirul Islam, FCA',
        role: 'Engagement Leader',
        initials: 'ZI',
        email: 'zahirul@avenquis.com',
      },
      engagementsCount: 3,
      requestsCount: 2,
      receivable: '৳ 1,000,000',
      overdueReceivable: '৳ 200,000 overdue',
      risk: 'Low',
      status: 'Active',
      yearEnd: '30 Jun',
      clientSince: '2020 (5 years)',
      taxBIN: '002345678-0002',
      taxTIN: '234567890123',
      tradeLicense: 'TRD-2026-002',
      engagementsList: [
        { code: 'AUD-2026-002', name: 'External Audit', status: 'In Progress' },
        { code: 'TAX-2026-002', name: 'BPO Support', status: 'In Progress' },
        { code: 'ADV-2026-003', name: 'Transfer Pricing', status: 'Completed' },
      ],
      requestsList: [
        { title: 'Software capitalization ledger', dueDate: '16 Oct 2026', priority: 'Medium' },
        { title: 'Bank confirmation certificates', dueDate: '18 Oct 2026', priority: 'Medium' },
      ],
      recentActivities: [
        { title: 'Requested demo access', author: 'Prince Mojumder', time: '5 hours ago' },
        { title: 'Bank confirmation verified', author: 'Zahirul Islam', time: '1 day ago' },
      ],
    },
    {
      id: 'CLI-003',
      code: 'BDP',
      name: 'BD Paint',
      industry: 'Manufacturing',
      primaryContact: {
        name: 'Rezaul Karim',
        designation: 'Finance Director',
        email: 'karim@bdpaint.com',
        phone: '+880 1912 456 789',
      },
      relationshipPartner: {
        name: 'Fouzia Haque, FCA',
        role: 'Engagement Leader',
        initials: 'FH',
        email: 'fouzia@avenquis.com',
      },
      engagementsCount: 2,
      requestsCount: 4,
      receivable: '৳ 800,000',
      overdueReceivable: '৳ 350,000 overdue',
      risk: 'Medium',
      status: 'Review',
      yearEnd: '30 Jun',
      clientSince: '2019 (6 years)',
      taxBIN: '003456789-0003',
      taxTIN: '345678901234',
      tradeLicense: 'TRD-2026-003',
      engagementsList: [
        { code: 'AUD-2026-003', name: 'External Audit', status: 'In Review' },
        { code: 'ADV-2026-004', name: 'Internal Control Evaluation', status: 'In Progress' },
      ],
      requestsList: [
        { title: 'Trial Balance Q1 final draft', dueDate: '15 Oct 2026', priority: 'High' },
        { title: 'Tax assessment orders', dueDate: '15 Oct 2026', priority: 'Medium' },
      ],
      recentActivities: [
        { title: 'Invoice generated', author: 'Rezaul Karim', time: '1 day ago' },
        { title: 'Overdue request follow-up dispatched', author: 'Fouzia Haque', time: '2 days ago' },
      ],
    },
    {
      id: 'CLI-004',
      code: 'ADV',
      name: 'Advent',
      industry: 'Pharmaceuticals',
      primaryContact: {
        name: 'Kazi Tariqul Islam',
        designation: 'Head of Accounts',
        email: 'tariqul@adventpharma.com',
        phone: '+880 1713 567 890',
      },
      relationshipPartner: {
        name: 'Zahirul Islam, FCA',
        role: 'Engagement Leader',
        initials: 'ZI',
        email: 'zahirul@avenquis.com',
      },
      engagementsCount: 2,
      requestsCount: 1,
      receivable: '৳ 900,000',
      overdueReceivable: '৳ 100,000 overdue',
      risk: 'Low',
      status: 'Active',
      yearEnd: '31 Dec',
      clientSince: '2021 (4 years)',
      taxBIN: '004567890-0004',
      taxTIN: '456789012345',
      tradeLicense: 'TRD-2026-004',
      engagementsList: [
        { code: 'AUD-2026-004', name: 'External Audit', status: 'In Progress' },
        { code: 'TAX-2026-003', name: 'Tax Advisory', status: 'In Progress' },
      ],
      requestsList: [
        { title: 'Deferred tax computation working', dueDate: '22 Oct 2026', priority: 'Low' },
      ],
      recentActivities: [
        { title: 'Sent management letter', author: 'Kazi Tariqul Islam', time: '1 day ago' },
      ],
    },
    {
      id: 'CLI-005',
      code: 'MAS',
      name: 'Master Feed Agrotech PLC',
      industry: 'Food & Agrotech',
      primaryContact: {
        name: 'Kabir Ahmed',
        designation: 'Chief Accountant',
        email: 'kabir@masterfeed.com',
        phone: '+880 1611 678 901',
      },
      relationshipPartner: {
        name: 'Shafi Uddin Ahmed, FCA',
        role: 'Engagement Leader',
        initials: 'SA',
        email: 'shafi@avenquis.com',
      },
      engagementsCount: 3,
      requestsCount: 2,
      receivable: '৳ 750,000',
      overdueReceivable: '৳ 150,000 overdue',
      risk: 'Medium',
      status: 'Active',
      yearEnd: '30 Jun',
      clientSince: '2022 (3 years)',
      taxBIN: '005678901-0005',
      taxTIN: '567890123456',
      tradeLicense: 'TRD-2026-005',
      engagementsList: [
        { code: 'AUD-2026-005', name: 'External Audit', status: 'In Progress' },
        { code: 'ADV-2026-005', name: 'Physical Inventory Verification', status: 'Completed' },
      ],
      requestsList: [
        { title: 'Silo storage stock verification report', dueDate: '19 Oct 2026', priority: 'Medium' },
      ],
      recentActivities: [
        { title: 'Draft inventory memo issued', author: 'Kabir Ahmed', time: '2 days ago' },
      ],
    },
    {
      id: 'CLI-006',
      code: 'FOR',
      name: 'Fortune Shoe',
      industry: 'Textile & Footwear',
      primaryContact: {
        name: 'Mahbubul Alam',
        designation: 'DGM Finance',
        email: 'mahbub@fortuneshoe.com',
        phone: '+880 1714 789 012',
      },
      relationshipPartner: {
        name: 'Mahmudur Rahman, ACA',
        role: 'Engagement Leader',
        initials: 'MR',
        email: 'mahmudur@avenquis.com',
      },
      engagementsCount: 1,
      requestsCount: 1,
      receivable: '৳ 450,000',
      overdueReceivable: '৳ 450,000 overdue',
      risk: 'High',
      status: 'Review',
      yearEnd: '30 Jun',
      clientSince: '2023 (2 years)',
      taxBIN: '006789012-0006',
      taxTIN: '678901234567',
      tradeLicense: 'TRD-2026-006',
      engagementsList: [
        { code: 'AUD-2026-006', name: 'External Audit', status: 'In Review' },
      ],
      requestsList: [
        { title: 'Bank confirmation response', dueDate: '20 Oct 2026', priority: 'Low' },
      ],
      recentActivities: [
        { title: 'Credit risk assessment revised', author: 'Mahmudur Rahman', time: '3 days ago' },
      ],
    },
    {
      id: 'CLI-007',
      code: 'NRB',
      name: 'NRB Club Ltd.',
      industry: 'Hospitality & Clubs',
      primaryContact: {
        name: 'Syed Hasan',
        designation: 'General Manager',
        email: 'hasan@nrbclub.com',
        phone: '+880 1811 890 123',
      },
      relationshipPartner: {
        name: 'Fouzia Haque, FCA',
        role: 'Engagement Leader',
        initials: 'FH',
        email: 'fouzia@avenquis.com',
      },
      engagementsCount: 2,
      requestsCount: 3,
      receivable: '৳ 600,000',
      overdueReceivable: '৳ 0 overdue',
      risk: 'Low',
      status: 'Active',
      yearEnd: '31 Dec',
      clientSince: '2021 (4 years)',
      taxBIN: '007890123-0007',
      taxTIN: '789012345678',
      tradeLicense: 'TRD-2026-007',
      engagementsList: [
        { code: 'AUD-2026-007', name: 'Statutory Audit', status: 'In Progress' },
      ],
      requestsList: [
        { title: 'Subscription fee collection register', dueDate: '24 Oct 2026', priority: 'Low' },
      ],
      recentActivities: [
        { title: 'Raised data access request', author: 'Syed Hasan', time: '2 days ago' },
      ],
    },
    {
      id: 'CLI-008',
      code: 'IGL',
      name: 'Abdul Monem Ltd. (Igloo)',
      industry: 'FMCG',
      primaryContact: {
        name: 'Tanim Rahman',
        designation: 'Head of Finance',
        email: 'tanim@igloobd.com',
        phone: '+880 1715 901 234',
      },
      relationshipPartner: {
        name: 'Shafi Uddin Ahmed, FCA',
        role: 'Engagement Leader',
        initials: 'SA',
        email: 'shafi@avenquis.com',
      },
      engagementsCount: 2,
      requestsCount: 1,
      receivable: '৳ 500,000',
      overdueReceivable: '৳ 0 overdue',
      risk: 'Medium',
      status: 'Dormant',
      yearEnd: '30 Jun',
      clientSince: '2017 (8 years)',
      taxBIN: '008901234-0008',
      taxTIN: '890123456789',
      tradeLicense: 'TRD-2026-008',
      engagementsList: [
        { code: 'AUD-2026-008', name: 'Inventory Audit', status: 'Completed' },
      ],
      requestsList: [
        { title: 'Fixed asset register', dueDate: '22 Oct 2026', priority: 'Medium' },
      ],
      recentActivities: [
        { title: 'Inventory count reconciled', author: 'Tanim Rahman', time: '4 days ago' },
      ],
    },
  ];

  // Lower Left: Recent Client Activity table exactly from screenshot
  const recentActivityTable = [
    {
      client: 'Silco Pharmaceuticals PLC',
      activity: 'Uploaded inventory schedule',
      person: 'Dr. Arif Hossain',
      time: '2 hours ago',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      client: 'Genex Infosys PLC',
      activity: 'Requested demo access',
      person: 'Prince Mojumder',
      time: '5 hours ago',
      status: 'Pending',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      client: 'BD Paint',
      activity: 'Invoice generated',
      person: 'Rezaul Karim',
      time: '1 day ago',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      client: 'Advent',
      activity: 'Sent management letter',
      person: 'Kazi Tariqul Islam',
      time: '1 day ago',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      client: 'NRB Club Ltd.',
      activity: 'Raised data access request',
      person: 'Syed Hasan',
      time: '2 days ago',
      status: 'Pending',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  // Lower Right: Outstanding Client Requests table exactly from screenshot
  const outstandingRequestsTable = [
    {
      client: 'Silco Pharmaceuticals PLC',
      request: 'Provide inventory schedule',
      dueDate: '12 Oct 2026',
      owner: 'Dr. Arif Hossain',
      status: 'High',
      statusColor: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      client: 'BD Paint',
      request: 'Management representation letter',
      dueDate: '15 Oct 2026',
      owner: 'Rezaul Karim',
      status: 'Medium',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      client: 'Genex Infosys PLC',
      request: 'Related party confirmation',
      dueDate: '18 Oct 2026',
      owner: 'Prince Mojumder',
      status: 'Medium',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      client: 'Fortune Shoe',
      request: 'Bank confirmation',
      dueDate: '20 Oct 2026',
      owner: 'Mahbubul Alam',
      status: 'Low',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      client: 'Abdul Monem Ltd. (Igloo)',
      request: 'Fixed asset register',
      dueDate: '22 Oct 2026',
      owner: 'Tanim Rahman',
      status: 'Medium',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  // Filters
  const filteredClients = clientList.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.primaryContact.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchIndustry = industryFilter === 'All' || c.industry.includes(industryFilter);
    const matchPartner = partnerFilter === 'All' || c.relationshipPartner.name.includes(partnerFilter);
    const matchRisk = riskFilter === 'All' || c.risk === riskFilter;
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchIndustry && matchPartner && matchRisk && matchStatus;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 5 Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                {s.label}
              </span>
              <div className={`w-7 h-7 rounded-xl ${s.iconColor} flex items-center justify-center shrink-0`}>
                <Building className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-neutral-900 tabular-nums">
                {s.value}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] mt-1 font-medium">
                <span className={`${s.changeColor} font-semibold`}>{s.change}</span>
                <span className="text-neutral-400 font-normal truncate">{s.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Filter Toolbar */}
      <div className="bg-white p-3 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, company, contact or code..."
            className="w-full text-xs text-neutral-800 placeholder:text-neutral-400 bg-transparent focus:outline-none"
          />
        </div>

        {/* Right dropdown filters */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="All">All Industries</option>
            <option value="Pharmaceuticals">Pharmaceuticals</option>
            <option value="Technology">Technology & IT</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Food">Food & Agrotech</option>
            <option value="Textile">Textile & Footwear</option>
            <option value="Hospitality">Hospitality & Clubs</option>
            <option value="FMCG">FMCG</option>
          </select>

          <select
            value={partnerFilter}
            onChange={(e) => setPartnerFilter(e.target.value)}
            className="bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="All">All Partners</option>
            <option value="Shafi Uddin Ahmed">Shafi Uddin Ahmed, FCA</option>
            <option value="Zahirul Islam">Zahirul Islam, FCA</option>
            <option value="Fouzia Haque">Fouzia Haque, FCA</option>
            <option value="Mahmudur Rahman">Mahmudur Rahman, ACA</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="All">All Risk Levels</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Review">Review</option>
            <option value="Dormant">Dormant</option>
          </select>

          {/* + New Client */}
          <button
            onClick={() => setIsNewClientModalOpen(true)}
            className="bg-[#0B332A] hover:bg-[#07241D] text-white px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Client</span>
          </button>
        </div>
      </div>

      {/* 4. Clients Portfolio Table */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-sm font-semibold text-neutral-900">
              Clients Portfolio
            </h2>
            <span className="text-[11px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full font-medium">
              8 of 48
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Exporting Clients portfolio to Excel/CSV')}
              className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-neutral-500" />
              <span>Export</span>
            </button>
            <div className="flex items-center bg-neutral-100 p-0.5 rounded-xl border border-neutral-200/80">
              <button className="p-1 rounded-lg bg-white shadow-2xs text-neutral-800">
                <TableIcon className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 rounded-lg text-neutral-500 hover:text-neutral-800">
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#FBF9F5] border-b border-neutral-100 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3.5 pl-4">Client / Company</th>
                <th className="py-3 px-3">Industry</th>
                <th className="py-3 px-3">Primary Contact</th>
                <th className="py-3 px-3">Relationship Partner</th>
                <th className="py-3 px-3 text-center">Engagements</th>
                <th className="py-3 px-3 text-center">Requests</th>
                <th className="py-3 px-3 text-right">Receivable</th>
                <th className="py-3 px-3 text-center">Risk</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3.5 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className="hover:bg-[#FBF9F5]/70 transition-colors group cursor-pointer"
                >
                  {/* Client / Company */}
                  <td className="py-3 px-3.5 pl-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#07261F] text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-2xs">
                        {client.code}
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 group-hover:text-[#0D7A6F] transition-colors leading-tight">
                          {client.name}
                        </div>
                        <div className="text-[10px] text-neutral-400 mt-0.5 flex items-center gap-1.5">
                          <span>ID: {client.id}</span>
                          <span>•</span>
                          <span>Year End: {client.yearEnd}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Industry */}
                  <td className="py-3 px-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10.5px] font-medium">
                      {client.industry}
                    </span>
                  </td>

                  {/* Primary Contact */}
                  <td className="py-3 px-3">
                    <div className="leading-tight">
                      <div className="font-medium text-neutral-800">
                        {client.primaryContact.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">
                        {client.primaryContact.designation}
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">
                        {client.primaryContact.email}
                      </div>
                    </div>
                  </td>

                  {/* Relationship Partner */}
                  <td className="py-3 px-3">
                    <div className="leading-tight">
                      <div className="font-medium text-neutral-800">
                        {client.relationshipPartner.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">
                        {client.relationshipPartner.role}
                      </div>
                    </div>
                  </td>

                  {/* Engagements */}
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-100">
                      <Briefcase className="w-3 h-3 text-emerald-600" />
                      <span>{client.engagementsCount}</span>
                    </span>
                  </td>

                  {/* Requests */}
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        client.requestsCount > 2
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{client.requestsCount}</span>
                    </span>
                  </td>

                  {/* Receivable (Right aligned) */}
                  <td className="py-3 px-3 text-right">
                    <span className="font-semibold text-neutral-900 tabular-nums">
                      {client.receivable}
                    </span>
                  </td>

                  {/* Risk Badge */}
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                        client.risk === 'Low'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : client.risk === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {client.risk}
                    </span>
                  </td>

                  {/* Status Chip */}
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`text-[10.5px] font-medium px-2.5 py-0.5 rounded-md ${
                        client.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : client.status === 'Review'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3.5 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 shadow-2xs transition-colors cursor-pointer"
                      >
                        Open Client
                      </button>
                      <button
                        aria-label="More options"
                        className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md hover:bg-neutral-100 transition-colors"
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Lower Section: 2 Connected Workflow Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT: Recent Client Activity */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-4.5 border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="font-serif text-sm font-semibold text-neutral-900">
              Recent Client Activity
            </h3>
            <a href="#activity" className="text-[11px] font-semibold text-[#0D7A6F] hover:underline">
              View All →
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="text-[10.5px] font-semibold text-neutral-400 border-b border-neutral-100 uppercase pb-2">
                <tr>
                  <th className="pb-2 font-medium">Client</th>
                  <th className="pb-2 font-medium">Activity</th>
                  <th className="pb-2 font-medium">Person</th>
                  <th className="pb-2 font-medium">Time</th>
                  <th className="pb-2 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 text-neutral-700">
                {recentActivityTable.map((act, i) => (
                  <tr key={i} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-2.5 font-semibold text-neutral-900 max-w-[140px] truncate">
                      {act.client}
                    </td>
                    <td className="py-2.5 text-neutral-600 max-w-[190px] truncate text-[11px]">
                      {act.activity}
                    </td>
                    <td className="py-2.5 text-neutral-500 text-[11px]">
                      {act.person}
                    </td>
                    <td className="py-2.5 text-neutral-400 text-[10.5px]">
                      {act.time}
                    </td>
                    <td className="py-2.5 text-right">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${act.statusColor}`}>
                        {act.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Outstanding Client Requests */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-4.5 border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="font-serif text-sm font-semibold text-neutral-900">
              Outstanding Client Requests
            </h3>
            <a href="#requests" className="text-[11px] font-semibold text-[#0D7A6F] hover:underline">
              View All →
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="text-[10.5px] font-semibold text-neutral-400 border-b border-neutral-100 uppercase pb-2">
                <tr>
                  <th className="pb-2 font-medium">Client</th>
                  <th className="pb-2 font-medium">Request</th>
                  <th className="pb-2 font-medium">Due Date</th>
                  <th className="pb-2 font-medium">Owner</th>
                  <th className="pb-2 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 text-neutral-700">
                {outstandingRequestsTable.map((req, i) => (
                  <tr key={i} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-2.5 font-semibold text-neutral-900 max-w-[130px] truncate">
                      {req.client}
                    </td>
                    <td className="py-2.5 text-neutral-600 max-w-[190px] truncate text-[11px]">
                      {req.request}
                    </td>
                    <td className="py-2.5 text-rose-600 font-medium text-[11px]">
                      {req.dueDate}
                    </td>
                    <td className="py-2.5 text-neutral-500 text-[11px]">
                      {req.owner}
                    </td>
                    <td className="py-2.5 text-right">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${req.statusColor}`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 6. Client Detail Drawer (Matches screenshot right rail exactly) */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedClient(null)}
          />

          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
            {/* Header: Avatar, Name, ID + Status, Close */}
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#07261F] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  {selectedClient.code}
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base font-semibold text-neutral-900 truncate">
                    {selectedClient.name}
                  </h3>
                  <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-2">
                    <span>{selectedClient.id}</span>
                    <span className="px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                      Active Client
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedClient(null)}
                aria-label="Close client drawer"
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Sub-tabs: Overview | Engagements | Requests | Documents */}
            <div className="px-5 pt-3 border-b border-neutral-100 flex items-center gap-2 bg-[#FDFCFB]">
              {(['Overview', 'Engagements', 'Requests', 'Documents'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDrawerTab(tab)}
                  className={`pb-2 px-1 text-xs font-semibold transition-colors cursor-pointer border-b-2 ${
                    drawerTab === tab
                      ? 'border-[#07261F] text-neutral-900'
                      : 'border-transparent text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Drawer Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
              {/* Section 1: Client Information (Industry, Year End, Client Since) */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Client Information
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/60">
                    <span className="text-[9.5px] text-neutral-400 block">Industry</span>
                    <span className="font-semibold text-neutral-800 text-[11px] truncate block mt-0.5">
                      {selectedClient.industry}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/60">
                    <span className="text-[9.5px] text-neutral-400 block">Year End</span>
                    <span className="font-semibold text-neutral-800 text-[11px] block mt-0.5">
                      {selectedClient.yearEnd}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/60">
                    <span className="text-[9.5px] text-neutral-400 block">Client Since</span>
                    <span className="font-semibold text-neutral-800 text-[11px] truncate block mt-0.5">
                      {selectedClient.clientSince}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Primary Contact */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Primary Contact
                </div>
                <div className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/40 space-y-1">
                  <div className="font-semibold text-neutral-900 text-xs">
                    {selectedClient.primaryContact.name}
                  </div>
                  <div className="text-neutral-500 text-[11px]">
                    {selectedClient.primaryContact.designation}
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 pt-1 text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{selectedClient.primaryContact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{selectedClient.primaryContact.phone}</span>
                  </div>
                </div>
              </div>

              {/* Section 3: Relationship Partner */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Relationship Partner
                </div>
                <div className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-xs">
                      {selectedClient.relationshipPartner.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 text-xs">
                        {selectedClient.relationshipPartner.name}
                      </div>
                      <div className="text-neutral-400 text-[10.5px]">
                        {selectedClient.relationshipPartner.role}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {selectedClient.relationshipPartner.email}
                  </span>
                </div>
              </div>

              {/* Section 4: Current Engagements (4) */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Current Engagements ({selectedClient.engagementsList.length})
                </div>
                <div className="space-y-1.5">
                  {selectedClient.engagementsList.map((eng, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl border border-neutral-100 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-[11.5px]">
                        <span className="font-mono text-neutral-400 text-[10.5px]">{eng.code}</span>
                        <span className="font-medium text-neutral-800">{eng.name}</span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          eng.status === 'In Progress'
                            ? 'bg-emerald-50 text-emerald-700'
                            : eng.status === 'In Review'
                            ? 'bg-amber-50 text-amber-700'
                            : eng.status === 'Completed'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {eng.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Pending Client Requests (3) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  <span>Pending Client Requests ({selectedClient.requestsList.length})</span>
                  <a href="#view" className="text-[#0D7A6F] font-semibold normal-case">View All</a>
                </div>
                <div className="space-y-1.5">
                  {selectedClient.requestsList.map((req, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl border border-neutral-100 bg-[#FDFCFB] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 text-neutral-700 text-[11px] truncate max-w-[220px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span className="truncate">{req.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-neutral-400">{req.dueDate}</span>
                        <span
                          className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                            req.priority === 'High'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {req.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 6: Outstanding Receivable */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  <span>Outstanding Receivable</span>
                  <a href="#ledger" className="text-[#0D7A6F] font-semibold normal-case">View Ledger →</a>
                </div>
                <div className="p-3 bg-neutral-50/70 rounded-xl border border-neutral-100 flex items-center justify-between">
                  <span className="text-base font-serif font-bold text-neutral-900 tabular-nums">
                    {selectedClient.receivable}
                  </span>
                  <span className="text-[11px] text-rose-600 font-semibold">
                    {selectedClient.overdueReceivable}
                  </span>
                </div>
              </div>

              {/* Section 7: Tax / Registration Information */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Tax / Registration Information
                </div>
                <div className="p-3 rounded-xl bg-neutral-50/60 border border-neutral-100 grid grid-cols-3 gap-2 text-[10.5px]">
                  <div>
                    <span className="text-neutral-400 block">BIN</span>
                    <span className="font-mono text-neutral-800 font-medium">{selectedClient.taxBIN}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">TIN</span>
                    <span className="font-mono text-neutral-800 font-medium">{selectedClient.taxTIN}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Trade License</span>
                    <span className="font-mono text-neutral-800 font-medium">{selectedClient.tradeLicense}</span>
                  </div>
                </div>
              </div>

              {/* Section 8: Recent Activity */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  <span>Recent Activity</span>
                  <a href="#all" className="text-[#0D7A6F] font-semibold normal-case">View All</a>
                </div>
                <div className="space-y-2">
                  {selectedClient.recentActivities.map((act, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl border border-neutral-100 bg-[#FDFCFB] flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <FileText className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-neutral-800 text-[11px] leading-tight">
                            {act.title}
                          </div>
                          <div className="text-[10px] text-neutral-400 mt-0.5">
                            by {act.author}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-400 shrink-0">{act.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom 3 Action Buttons */}
            <div className="p-3.5 border-t border-neutral-100 grid grid-cols-3 gap-2 bg-[#FBF9F5]">
              <button
                onClick={() => {
                  alert(`Opening client workspace for ${selectedClient.name}`);
                  setSelectedClient(null);
                }}
                className="py-2 px-2 text-[11px] font-semibold text-white bg-[#07261F] hover:bg-[#041B16] rounded-xl transition-colors shadow-2xs cursor-pointer text-center"
              >
                Open Workspace
              </button>
              <button
                onClick={() => {
                  alert(`Viewing documents for ${selectedClient.name}`);
                  setSelectedClient(null);
                }}
                className="py-2 px-2 text-[11px] font-semibold text-neutral-700 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-200 transition-colors cursor-pointer text-center"
              >
                View Documents
              </button>
              <button
                onClick={() => {
                  alert(`Viewing engagements for ${selectedClient.name}`);
                  setSelectedClient(null);
                }}
                className="py-2 px-2 text-[11px] font-semibold text-neutral-700 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-200 transition-colors cursor-pointer text-center"
              >
                View Engagements
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Register New Client */}
      {isNewClientModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsNewClientModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-neutral-200 p-6 z-10 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-serif text-base font-semibold text-neutral-900">
                Register New Client Entity
              </h3>
              <button
                onClick={() => setIsNewClientModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-600 font-medium mb-1">Company / Entity Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Footwear PLC"
                  className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Industry</label>
                  <select className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]">
                    <option>Pharmaceuticals</option>
                    <option>Technology & IT</option>
                    <option>Manufacturing</option>
                    <option>Textile & Footwear</option>
                    <option>Food & Agrotech</option>
                    <option>Hospitality & Clubs</option>
                    <option>FMCG</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Relationship Partner</label>
                  <select className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]">
                    <option>Shafi Uddin Ahmed, FCA</option>
                    <option>Zahirul Islam, FCA</option>
                    <option>Fouzia Haque, FCA</option>
                    <option>Mahmudur Rahman, ACA</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Contact Person Name</label>
                  <input
                    type="text"
                    placeholder="e.g. K. M. Jahangir"
                    className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Contact Email</label>
                  <input
                    type="email"
                    placeholder="contact@company.com"
                    className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
              <button
                onClick={() => setIsNewClientModalOpen(false)}
                className="px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Client entity successfully registered into AVENQUIS CRM.');
                  setIsNewClientModalOpen(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0B332A] hover:bg-[#07241D] rounded-xl shadow-2xs cursor-pointer"
              >
                Create Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
