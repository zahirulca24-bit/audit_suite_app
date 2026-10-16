import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  Mail,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Timer,
  Upload,
  User,
  X,
} from 'lucide-react';

export interface ClientRequestItem {
  id: string;
  requestNo: string;
  client: string;
  engagement: string;
  subject: string;
  type: 'Information' | 'Document' | 'Letter' | 'Data' | 'Confirmation';
  requestedBy: {
    name: string;
    designation: string;
  };
  assignedTo: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  lastUpdate: string;
  lastUpdateRelative: string;
  description?: string;
  attachments?: string[];
}

export const ClientRequestsPage: React.FC = () => {
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [engagementFilter, setEngagementFilter] = useState('All Engagements');
  const [typeFilter, setTypeFilter] = useState('All Request Types');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [ownerFilter, setOwnerFilter] = useState('All Owners');
  const [dateRange, setDateRange] = useState('01 Jul 2025 - 30 Jun 2026');

  // Modals & Details
  const [selectedRequest, setSelectedRequest] = useState<ClientRequestItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);

  // 6 KPI Summary Cards matching Image 1
  const stats = [
    {
      label: 'Total Requests',
      value: '146',
      trend: '↑ 18%',
      trendSub: 'vs last year',
      icon: FileSpreadsheet,
      iconBg: 'bg-[#E8F5F1] text-[#0D7A6F]',
      badgeColor: 'text-emerald-700',
    },
    {
      label: 'Pending Response',
      value: '32',
      trend: '',
      trendSub: '6 urgent',
      icon: Clock,
      iconBg: 'bg-[#FFF7ED] text-[#D97706]',
      badgeColor: 'text-rose-600 font-semibold',
    },
    {
      label: 'In Progress',
      value: '54',
      trend: '',
      trendSub: '37% of total',
      icon: Activity,
      iconBg: 'bg-[#EFF6FF] text-[#2563EB]',
      badgeColor: 'text-neutral-500',
    },
    {
      label: 'Completed',
      value: '52',
      trend: '↑ 28%',
      trendSub: 'vs last month',
      icon: CheckCircle2,
      iconBg: 'bg-[#E8F5F1] text-[#059669]',
      badgeColor: 'text-emerald-700',
    },
    {
      label: 'Overdue',
      value: '18',
      trend: '',
      trendSub: '12% of total',
      icon: AlertTriangle,
      iconBg: 'bg-[#FFF1F2] text-[#E11D48]',
      badgeColor: 'text-neutral-500',
    },
    {
      label: 'Avg. Response Time',
      value: '2.8 days',
      trend: '↓ 26%',
      trendSub: 'vs last year',
      icon: Timer,
      iconBg: 'bg-[#F0F9FF] text-[#0284C7]',
      badgeColor: 'text-emerald-700',
    },
  ];

  // Requests List matching Image 1
  const [requests, setRequests] = useState<ClientRequestItem[]>([
    {
      id: 'REQ-001',
      requestNo: 'REQ-2026-045',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Audit FY 2025–26',
      subject: 'Provide inventory count sheets',
      type: 'Information',
      requestedBy: {
        name: 'Dr. Arif Hossain',
        designation: 'CFO',
      },
      assignedTo: 'Hemadry Roy',
      dueDate: '12 Oct 2026',
      priority: 'High',
      status: 'Pending',
      lastUpdate: '10 Oct 2026',
      lastUpdateRelative: '2 hours ago',
      description: 'Please submit certified physical inventory count sheets for Sylhet manufacturing plant conducted on 27.08.2026 including sign-offs from internal auditor.',
      attachments: ['Inventory_Guidelines.pdf'],
    },
    {
      id: 'REQ-002',
      requestNo: 'REQ-2026-044',
      client: 'Genex Infosys PLC',
      engagement: 'Audit FY 2025–26',
      subject: 'Bank reconciliation as at 30 Jun 2026',
      type: 'Document',
      requestedBy: {
        name: 'Prince Mojumder',
        designation: 'MD',
      },
      assignedTo: 'Md. Bayezid',
      dueDate: '15 Oct 2026',
      priority: 'Medium',
      status: 'In Progress',
      lastUpdate: '09 Oct 2026',
      lastUpdateRelative: '1 day ago',
      description: 'Formal bank reconciliation statements for Dutch-Bangla Bank & Standard Chartered Bank main operational and payroll accounts.',
      attachments: ['Bank_List.xlsx'],
    },
    {
      id: 'REQ-003',
      requestNo: 'REQ-2026-043',
      client: 'BD Paint',
      engagement: 'Audit FY 2025–26',
      subject: 'Management representation letter',
      type: 'Letter',
      requestedBy: {
        name: 'Rezaul Karim',
        designation: 'FD',
      },
      assignedTo: 'Md. Zahirul Islam',
      dueDate: '18 Oct 2026',
      priority: 'Medium',
      status: 'Pending',
      lastUpdate: '08 Oct 2026',
      lastUpdateRelative: '2 days ago',
      description: 'Signed and dated management representation letter on client official letterhead as per draft provided under ISA 580.',
      attachments: ['ISA580_Draft_MRL.docx'],
    },
    {
      id: 'REQ-004',
      requestNo: 'REQ-2026-042',
      client: 'Advent',
      engagement: 'Audit FY 2025–26',
      subject: 'Fixed asset register with location',
      type: 'Data',
      requestedBy: {
        name: 'Kazi Tariqul Islam',
        designation: 'Head of Accounts',
      },
      assignedTo: 'Hemadry Roy',
      dueDate: '20 Oct 2026',
      priority: 'Low',
      status: 'In Progress',
      lastUpdate: '08 Oct 2026',
      lastUpdateRelative: '2 days ago',
      description: 'Detailed fixed asset register incorporating acquisition dates, asset category, historic cost, accumulated depreciation and asset tag IDs.',
      attachments: ['FAR_Format_Template.xlsx'],
    },
    {
      id: 'REQ-005',
      requestNo: 'REQ-2026-041',
      client: 'Master Feed Agrotech PLC',
      engagement: 'Audit FY 2025–26',
      subject: 'Tax computation working paper',
      type: 'Document',
      requestedBy: {
        name: 'Kabir Ahmed',
        designation: 'Chief Accountant',
      },
      assignedTo: 'Musabbir',
      dueDate: '22 Oct 2026',
      priority: 'High',
      status: 'Overdue',
      lastUpdate: '05 Oct 2026',
      lastUpdateRelative: '5 days ago',
      description: 'Year-end corporate tax computation workbook reconciled with audited profit and loss statement under Income Tax Act 2023.',
      attachments: ['Tax_Schedule_Draft.xlsx'],
    },
    {
      id: 'REQ-006',
      requestNo: 'REQ-2026-040',
      client: 'Fortune Shoe',
      engagement: 'Audit FY 2025–26',
      subject: 'Related party confirmation',
      type: 'Confirmation',
      requestedBy: {
        name: 'Mahbubul Alam',
        designation: 'DGM Finance',
      },
      assignedTo: 'Md. Zahirul Islam',
      dueDate: '25 Oct 2026',
      priority: 'Medium',
      status: 'Pending',
      lastUpdate: '06 Oct 2026',
      lastUpdateRelative: '4 days ago',
      description: 'Confirmation balance circulars from subsidiary and sister concerns detailing transactions and closing balances under IAS 24.',
      attachments: ['Related_Party_Disclosure.pdf'],
    },
  ]);

  // Filtered requests
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.requestNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requestedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClient =
      clientFilter === 'All Clients' || req.client === clientFilter;

    const matchesEngagement =
      engagementFilter === 'All Engagements' || req.engagement.includes(engagementFilter);

    const matchesType =
      typeFilter === 'All Request Types' || req.type === typeFilter;

    const matchesStatus =
      statusFilter === 'All Statuses' || req.status === statusFilter;

    const matchesOwner =
      ownerFilter === 'All Owners' || req.assignedTo === ownerFilter;

    return (
      matchesSearch &&
      matchesClient &&
      matchesEngagement &&
      matchesType &&
      matchesStatus &&
      matchesOwner
    );
  });

  // Type badge styling
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Information':
        return 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]';
      case 'Document':
        return 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]';
      case 'Letter':
        return 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]';
      case 'Data':
        return 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]';
      case 'Confirmation':
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  // Priority badge styling
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Overdue':
        return 'bg-red-50 text-red-700 border-red-200 font-bold';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  // Upcoming deadlines data matching Image 1
  const upcomingDeadlines = [
    {
      title: 'Provide inventory count sheets',
      client: 'Silco Pharmaceuticals PLC',
      date: '12 Oct 2026',
      timeLabel: 'In 2 days',
      iconBg: 'bg-[#FFF7ED] text-[#D97706]',
    },
    {
      title: 'Bank reconciliation',
      client: 'Genex Infosys PLC',
      date: '15 Oct 2026',
      timeLabel: 'In 5 days',
      iconBg: 'bg-[#FFF7ED] text-[#D97706]',
    },
    {
      title: 'Management representation letter',
      client: 'BD Paint',
      date: '18 Oct 2026',
      timeLabel: 'In 8 days',
      iconBg: 'bg-[#FFF7ED] text-[#D97706]',
    },
    {
      title: 'Fixed asset register',
      client: 'Advent',
      date: '20 Oct 2026',
      timeLabel: 'In 10 days',
      iconBg: 'bg-[#ECFDF5] text-[#059669]',
    },
    {
      title: 'Tax computation WP',
      client: 'Master Feed Agrotech PLC',
      date: '22 Oct 2026',
      timeLabel: 'In 12 days',
      iconBg: 'bg-[#FFF1F2] text-[#E11D48]',
    },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 6 Top Summary KPI Cards */}
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
                  <span className={`${stat.badgeColor} truncate`}>
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
        {/* Search */}
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, subject, request no..."
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

        {/* Dropdowns & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Clients */}
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
          </select>

          {/* Engagements */}
          <select
            value={engagementFilter}
            onChange={(e) => setEngagementFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
          >
            <option>All Engagements</option>
            <option>Audit FY 2025–26</option>
            <option>Tax Advisory 2025</option>
          </select>

          {/* Request Types */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
          >
            <option>All Request Types</option>
            <option>Information</option>
            <option>Document</option>
            <option>Letter</option>
            <option>Data</option>
            <option>Confirmation</option>
          </select>

          {/* Statuses */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>

          {/* Owners */}
          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
          >
            <option>All Owners</option>
            <option>Hemadry Roy</option>
            <option>Md. Bayezid</option>
            <option>Md. Zahirul Islam</option>
            <option>Musabbir</option>
          </select>

          {/* Date Range Picker */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>{dateRange}</span>
          </div>

          {/* + New Request Button */}
          <button
            onClick={() => setIsNewRequestModalOpen(true)}
            className="bg-[#0B332A] hover:bg-[#07241D] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Request</span>
          </button>
        </div>
      </div>

      {/* Split Layout: Left Table (9 cols) + Right Widgets (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Client Requests Table */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto min-h-[460px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#FAF8F5] text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-3">Request No.</th>
                  <th className="py-3 px-3">Client / Engagement</th>
                  <th className="py-3 px-3">Subject / Request</th>
                  <th className="py-3 px-2.5">Type</th>
                  <th className="py-3 px-2.5">Requested By</th>
                  <th className="py-3 px-2.5">Assigned To</th>
                  <th className="py-3 px-2.5">Due Date</th>
                  <th className="py-3 px-2.5">Priority</th>
                  <th className="py-3 px-2.5">Status</th>
                  <th className="py-3 px-2.5">Last Update</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    onClick={() => {
                      setSelectedRequest(req);
                      setIsViewModalOpen(true);
                    }}
                    className="hover:bg-neutral-50/70 transition-colors cursor-pointer"
                  >
                    {/* Request No. */}
                    <td className="py-3 px-3 font-mono text-[11px] text-neutral-600 whitespace-nowrap font-medium">
                      {req.requestNo}
                    </td>

                    {/* Client / Engagement */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-semibold text-neutral-900 leading-tight">
                        {req.client}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5 leading-tight">
                        {req.engagement}
                      </div>
                    </td>

                    {/* Subject / Request */}
                    <td className="py-3 px-3 max-w-[220px]">
                      <span className="text-neutral-800 font-medium truncate block" title={req.subject}>
                        {req.subject}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="py-3 px-2.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getTypeBadge(
                          req.type
                        )}`}
                      >
                        {req.type}
                      </span>
                    </td>

                    {/* Requested By */}
                    <td className="py-3 px-2.5 whitespace-nowrap">
                      <div className="text-neutral-900 font-medium leading-tight">
                        {req.requestedBy.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 leading-tight">
                        {req.requestedBy.designation}
                      </div>
                    </td>

                    {/* Assigned To */}
                    <td className="py-3 px-2.5 text-neutral-700 whitespace-nowrap">
                      {req.assignedTo}
                    </td>

                    {/* Due Date */}
                    <td
                      className={`py-3 px-2.5 whitespace-nowrap font-medium ${
                        req.status === 'Overdue'
                          ? 'text-rose-600'
                          : 'text-neutral-700'
                      }`}
                    >
                      {req.dueDate}
                    </td>

                    {/* Priority */}
                    <td className="py-3 px-2.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getPriorityBadge(
                          req.priority
                        )}`}
                      >
                        {req.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-2.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(
                          req.status
                        )}`}
                      >
                        {req.status}
                      </span>
                    </td>

                    {/* Last Update */}
                    <td className="py-3 px-2.5 whitespace-nowrap">
                      <div className="text-neutral-700 text-xs">
                        {req.lastUpdate}
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        {req.lastUpdateRelative}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRequest(req);
                            setIsViewModalOpen(true);
                          }}
                          className="px-3 py-1 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRequest(req);
                            setIsViewModalOpen(true);
                          }}
                          className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="lg:col-span-3 space-y-5">
          {/* Widget 1: Request Summary Donut Card */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
            <h3 className="font-semibold text-xs text-neutral-900 mb-3">
              Request Summary
            </h3>

            {/* Circular Donut Visual */}
            <div className="flex items-center justify-center py-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
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
                  {/* Completed: 52 (35%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#059669"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="163"
                    strokeLinecap="round"
                  />
                  {/* In Progress: 54 (37%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#2563EB"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="158"
                  />
                  {/* Pending: 32 (22%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="195"
                  />
                  {/* Overdue: 18 (12%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#EF4444"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="221"
                  />
                </svg>

                {/* Center Value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold font-serif text-neutral-900">
                    146
                  </span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                    Total
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown Legend */}
            <div className="space-y-2 mt-3 pt-3 border-t border-neutral-100 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span>Pending</span>
                </div>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  32
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                  <span>In Progress</span>
                </div>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  54
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
                  <span>Completed</span>
                </div>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  52
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
            </div>
          </div>

          {/* Widget 2: Upcoming Deadlines Card */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-xs text-neutral-900">
                Upcoming Deadlines
              </h3>
              <button
                onClick={() => setStatusFilter('Pending')}
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
                        {item.client}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[11px] text-neutral-500 font-medium">
                      {item.date}
                    </div>
                    <div className="text-[10px] font-bold text-amber-600 mt-0.5">
                      {item.timeLabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* View Request Modal */}
      {isViewModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  {selectedRequest.requestNo}
                </span>
                <h3 className="font-serif font-bold text-neutral-900 text-lg">
                  {selectedRequest.subject}
                </h3>
                <p className="text-xs text-neutral-500">
                  {selectedRequest.client} • {selectedRequest.engagement}
                </p>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scope & Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-[#FAF8F5] rounded-xl text-xs border border-neutral-200/80">
              <div>
                <span className="text-neutral-400 block text-[10px]">Requested By</span>
                <span className="font-semibold text-neutral-800">
                  {selectedRequest.requestedBy.name} ({selectedRequest.requestedBy.designation})
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">Assigned To</span>
                <span className="font-semibold text-neutral-800">
                  {selectedRequest.assignedTo}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">Due Date</span>
                <span className="font-semibold text-neutral-800">
                  {selectedRequest.dueDate}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">Current Status</span>
                <span className="font-semibold text-[#0D7A6F]">
                  {selectedRequest.status}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="text-xs text-neutral-700 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 leading-relaxed">
              <span className="font-semibold text-neutral-900 block mb-1">
                Detailed Requirement:
              </span>
              {selectedRequest.description}
            </div>

            {/* Attachments */}
            {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-neutral-800 block mb-1.5">
                  Attached Reference Files:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.attachments.map((file, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-xs rounded-xl text-neutral-700 cursor-pointer transition-colors"
                      onClick={() => alert(`Downloading ${file}`)}
                    >
                      <Paperclip className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action footer */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setRequests((prev) =>
                      prev.map((r) =>
                        r.id === selectedRequest.id
                          ? { ...r, status: 'In Progress' }
                          : r
                      )
                    );
                    alert('Status set to In Progress');
                    setIsViewModalOpen(false);
                  }}
                  className="px-3 py-1.5 border border-neutral-200 rounded-xl text-xs text-neutral-700 hover:bg-neutral-50 font-medium"
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => {
                    setRequests((prev) =>
                      prev.map((r) =>
                        r.id === selectedRequest.id
                          ? { ...r, status: 'Completed' }
                          : r
                      )
                    );
                    alert('Request marked as Completed');
                    setIsViewModalOpen(false);
                  }}
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold hover:bg-emerald-100"
                >
                  Mark Completed
                </button>
              </div>

              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-[#0D7A6F] text-white text-xs font-semibold rounded-xl hover:bg-[#074741]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Request Modal */}
      {isNewRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif font-bold text-neutral-900 text-lg">
                Create New Client Information Request
              </h3>
              <button
                onClick={() => setIsNewRequestModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Client & Engagement
                </label>
                <select className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800">
                  <option>Silco Pharmaceuticals PLC - Audit FY 2025–26</option>
                  <option>Genex Infosys PLC - Audit FY 2025–26</option>
                  <option>BD Paint - Audit FY 2025–26</option>
                  <option>Advent - Audit FY 2025–26</option>
                  <option>Master Feed Agrotech PLC - Audit FY 2025–26</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Subject / Information Requested
                </label>
                <input
                  type="text"
                  placeholder="e.g. Provide bank statement for Oct 2026"
                  className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Request Type
                  </label>
                  <select className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800">
                    <option>Information</option>
                    <option>Document</option>
                    <option>Letter</option>
                    <option>Data</option>
                    <option>Confirmation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Priority
                  </label>
                  <select className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Assigned Auditor
                  </label>
                  <select className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800">
                    <option>Hemadry Roy</option>
                    <option>Md. Bayezid</option>
                    <option>Md. Zahirul Islam</option>
                    <option>Musabbir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-10-20"
                    className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
              <button
                onClick={() => setIsNewRequestModalOpen(false)}
                className="px-4 py-2 border border-neutral-200 text-xs font-medium rounded-xl text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Request sent to client successfully!');
                  setIsNewRequestModalOpen(false);
                }}
                className="px-4 py-2 bg-[#0D7A6F] text-white text-xs font-semibold rounded-xl hover:bg-[#074741]"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
