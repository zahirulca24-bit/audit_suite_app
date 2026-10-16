import React, { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Receipt,
  Search,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
} from 'lucide-react';

export interface InvoiceItem {
  id: string;
  invoiceNo: string;
  client: string;
  engagement: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  received: number;
  outstanding: number;
  status: 'Paid' | 'Partially Paid' | 'Overdue' | 'Draft';
  notes?: string;
  vatAmount?: number;
}

export const OfficeFinancePage: React.FC = () => {
  // Sub-tabs
  const [activeSubTab, setActiveSubTab] = useState<
    | 'Income & Receivables'
    | 'Expenses & Payables'
    | 'Invoices'
    | 'Payments'
    | 'Budget vs Actual'
    | 'Reports'
  >('Income & Receivables');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [engagementFilter, setEngagementFilter] = useState('All Engagements');
  const [dateRange, setDateRange] = useState('01 Jul 2025 - 30 Jun 2026');

  // Modals
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);

  // 6 KPI Summary Cards matching Image 2
  const stats = [
    {
      label: 'Total Income (FY 2025–26)',
      value: '৳ 7.8M',
      trend: '↑ 16%',
      trendSub: 'vs last year',
      icon: Banknote,
      iconBg: 'bg-[#E8F5F1] text-[#0D7A6F]',
      badgeColor: 'text-emerald-700 font-semibold',
    },
    {
      label: 'Total Expenses',
      value: '৳ 3.2M',
      trend: '↑ 8%',
      trendSub: '',
      icon: Receipt,
      iconBg: 'bg-[#FFF7ED] text-[#D97706]',
      badgeColor: 'text-neutral-500',
    },
    {
      label: 'Net Surplus',
      value: '৳ 4.6M',
      trend: '↑ 22%',
      trendSub: '',
      icon: TrendingUp,
      iconBg: 'bg-[#EFF6FF] text-[#2563EB]',
      badgeColor: 'text-emerald-700 font-semibold',
    },
    {
      label: 'Receivables',
      value: '৳ 2.4M',
      trend: '',
      trendSub: '12 clients outstanding',
      icon: ShoppingBag,
      iconBg: 'bg-[#FFFBEB] text-[#B45309]',
      badgeColor: 'text-neutral-500',
    },
    {
      label: 'Payables',
      value: '৳ 1.1M',
      trend: '',
      trendSub: '8 vendors outstanding',
      icon: CreditCard,
      iconBg: 'bg-[#FFF1F2] text-[#E11D48]',
      badgeColor: 'text-neutral-500',
    },
    {
      label: 'A/R Days',
      value: '68 days',
      trend: '↓ 12 days',
      trendSub: '',
      icon: Clock,
      iconBg: 'bg-[#FFF1F2] text-[#E11D48]',
      badgeColor: 'text-emerald-700 font-semibold',
    },
  ];

  // Invoices table data matching Image 2
  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    {
      id: 'INV-1',
      invoiceNo: 'INV-2026-001',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Audit FY 2025–26',
      invoiceDate: '15 Aug 2026',
      dueDate: '15 Sep 2026',
      amount: 1200000,
      received: 800000,
      outstanding: 400000,
      status: 'Partially Paid',
      notes: 'First installment received. Second installment of ৳ 400,000 pending audit report release.',
      vatAmount: 180000,
    },
    {
      id: 'INV-2',
      invoiceNo: 'INV-2026-002',
      client: 'Genex Infosys PLC',
      engagement: 'Audit FY 2025–26',
      invoiceDate: '10 Aug 2026',
      dueDate: '10 Sep 2026',
      amount: 1000000,
      received: 1000000,
      outstanding: 0,
      status: 'Paid',
      notes: 'Fully settled via City Bank wire transfer on 08 Sep 2026.',
      vatAmount: 150000,
    },
    {
      id: 'INV-3',
      invoiceNo: 'INV-2026-003',
      client: 'BD Paint',
      engagement: 'Audit FY 2025–26',
      invoiceDate: '05 Aug 2026',
      dueDate: '05 Sep 2026',
      amount: 800000,
      received: 400000,
      outstanding: 400000,
      status: 'Partially Paid',
      notes: 'Retainer received upon engagement letter signing. Balance due on fieldwork completion.',
      vatAmount: 120000,
    },
    {
      id: 'INV-4',
      invoiceNo: 'INV-2026-004',
      client: 'Advent',
      engagement: 'Audit FY 2025–26',
      invoiceDate: '01 Aug 2026',
      dueDate: '01 Sep 2026',
      amount: 900000,
      received: 900000,
      outstanding: 0,
      status: 'Paid',
      notes: 'Full payment cleared in Eastern Bank Ltd account.',
      vatAmount: 135000,
    },
    {
      id: 'INV-5',
      invoiceNo: 'INV-2026-005',
      client: 'Master Feed Agrotech PLC',
      engagement: 'Audit FY 2025–26',
      invoiceDate: '28 Jul 2026',
      dueDate: '28 Aug 2026',
      amount: 750000,
      received: 300000,
      outstanding: 450000,
      status: 'Overdue',
      notes: 'Overdue by 45 days. Follow-up reminder letter issued by Engagement Partner.',
      vatAmount: 112500,
    },
    {
      id: 'INV-6',
      invoiceNo: 'INV-2026-006',
      client: 'Fortune Shoe',
      engagement: 'Audit FY 2025–26',
      invoiceDate: '25 Jul 2026',
      dueDate: '25 Aug 2026',
      amount: 450000,
      received: 0,
      outstanding: 450000,
      status: 'Overdue',
      notes: 'Client requesting settlement plan upon upcoming Q3 export proceeds.',
      vatAmount: 67500,
    },
    {
      id: 'INV-7',
      invoiceNo: 'INV-2026-007',
      client: 'NRB Club Ltd.',
      engagement: 'Audit FY 2025–26',
      invoiceDate: '20 Jul 2026',
      dueDate: '20 Aug 2026',
      amount: 600000,
      received: 600000,
      outstanding: 0,
      status: 'Paid',
      notes: 'Settled by bearer cheque drawn on Prime Bank.',
      vatAmount: 90000,
    },
  ]);

  // Filtered invoices
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.engagement.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClient =
      clientFilter === 'All Clients' || inv.client === clientFilter;

    const matchesEngagement =
      engagementFilter === 'All Engagements' || inv.engagement.includes(engagementFilter);

    return matchesSearch && matchesClient && matchesEngagement;
  });

  // Top clients by revenue
  const topClients = [
    { code: 'SIL', name: 'Silco Pharmaceuticals PLC', amount: '৳ 1,200,000' },
    { code: 'GEN', name: 'Genex Infosys PLC', amount: '৳ 1,000,000' },
    { code: 'ADV', name: 'Advent', amount: '৳ 900,000' },
    { code: 'BDP', name: 'BD Paint', amount: '৳ 800,000' },
    { code: 'AGR', name: 'Master Feed Agrotech PLC', amount: '৳ 750,000' },
  ];

  // Monthly Income vs Expenses data for bar chart
  const monthlyFinance = [
    { month: 'Jul', income: 1.1, expense: 0.5 },
    { month: 'Aug', income: 1.1, expense: 0.6 },
    { month: 'Sep', income: 1.6, expense: 0.8 },
    { month: 'Oct', income: 1.2, expense: 0.6 },
    { month: 'Nov', income: 1.4, expense: 0.7 },
    { month: 'Dec', income: 1.4, expense: 0.8 },
    { month: 'Jan', income: 1.0, expense: 0.5 },
    { month: 'Feb', income: 1.7, expense: 0.8 },
    { month: 'Mar', income: 1.4, expense: 0.7 },
    { month: 'Apr', income: 1.5, expense: 0.8 },
    { month: 'May', income: 1.3, expense: 0.7 },
    { month: 'Jun', income: 1.6, expense: 0.9 },
  ];

  // Format currency
  const formatBDT = (num: number) => {
    return num.toLocaleString('en-US');
  };

  // Status chip styling
  const getStatusChip = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Partially Paid':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Overdue':
        return 'bg-red-50 text-red-700 border-red-200 font-semibold';
      case 'Draft':
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

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
                  <span className={`${stat.badgeColor} truncate`}>
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
            'Income & Receivables',
            'Expenses & Payables',
            'Invoices',
            'Payments',
            'Budget vs Actual',
            'Reports',
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

      {/* Main Filter & Action Toolbar */}
      <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[260px] max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by invoice no, client, description..."
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
          {/* Client Filter */}
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

          {/* Engagement Filter */}
          <select
            value={engagementFilter}
            onChange={(e) => setEngagementFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
          >
            <option>All Engagements</option>
            <option>Audit FY 2025–26</option>
          </select>

          {/* Date Range Picker */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>{dateRange}</span>
          </div>

          {/* + New Invoice Button */}
          <button
            onClick={() => setIsNewInvoiceOpen(true)}
            className="bg-[#0B332A] hover:bg-[#07241D] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Invoice</span>
          </button>

          {/* Export Button */}
          <button
            onClick={() => alert('Exporting financial report in CSV format...')}
            className="px-3 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-neutral-500" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Table (9 cols) + Right Analytics Widgets (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Invoices Table */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto min-h-[460px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#FAF8F5] text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-3">Invoice No.</th>
                  <th className="py-3 px-3">Client / Engagement</th>
                  <th className="py-3 px-2.5">Invoice Date</th>
                  <th className="py-3 px-2.5">Due Date</th>
                  <th className="py-3 px-2.5 text-right">Amount (৳)</th>
                  <th className="py-3 px-2.5 text-right">Received (৳)</th>
                  <th className="py-3 px-2.5 text-right">Outstanding (৳)</th>
                  <th className="py-3 px-2.5 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    onClick={() => {
                      setSelectedInvoice(inv);
                      setIsInvoiceModalOpen(true);
                    }}
                    className="hover:bg-neutral-50/70 transition-colors cursor-pointer"
                  >
                    {/* Invoice No */}
                    <td className="py-3 px-3 font-mono text-[11px] text-neutral-600 whitespace-nowrap font-medium">
                      {inv.invoiceNo}
                    </td>

                    {/* Client / Engagement */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-semibold text-neutral-900 leading-tight">
                        {inv.client}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5 leading-tight">
                        {inv.engagement}
                      </div>
                    </td>

                    {/* Invoice Date */}
                    <td className="py-3 px-2.5 text-neutral-600 whitespace-nowrap">
                      {inv.invoiceDate}
                    </td>

                    {/* Due Date */}
                    <td
                      className={`py-3 px-2.5 whitespace-nowrap font-medium ${
                        inv.status === 'Overdue'
                          ? 'text-rose-600 font-semibold'
                          : 'text-neutral-700'
                      }`}
                    >
                      {inv.dueDate}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-2.5 text-right font-mono text-neutral-900 font-semibold tabular-nums whitespace-nowrap">
                      {formatBDT(inv.amount)}
                    </td>

                    {/* Received */}
                    <td className="py-3 px-2.5 text-right font-mono text-neutral-700 tabular-nums whitespace-nowrap">
                      {formatBDT(inv.received)}
                    </td>

                    {/* Outstanding */}
                    <td
                      className={`py-3 px-2.5 text-right font-mono tabular-nums whitespace-nowrap font-semibold ${
                        inv.outstanding > 0 ? 'text-rose-600' : 'text-neutral-400'
                      }`}
                    >
                      {formatBDT(inv.outstanding)}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-2.5 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusChip(
                          inv.status
                        )}`}
                      >
                        {inv.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInvoice(inv);
                            setIsInvoiceModalOpen(true);
                          }}
                          className="px-3 py-1 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInvoice(inv);
                            setIsInvoiceModalOpen(true);
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

        {/* Right Column: Analytics & Top Clients Widgets */}
        <div className="lg:col-span-3 space-y-5">
          {/* Widget 1: Income vs Expenses Chart */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
            <h3 className="font-semibold text-xs text-neutral-900 mb-2">
              Income vs Expenses (FY 2025–26)
            </h3>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px] mb-3">
              <div className="flex items-center gap-1.5 text-neutral-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0D7A6F]" />
                <span>Income</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span>Expenses</span>
              </div>
            </div>

            {/* Chart Area */}
            <div className="relative pt-2">
              {/* Y Axis Gridlines */}
              <div className="flex flex-col justify-between h-40 text-[9px] font-mono text-neutral-400 pr-1 select-none">
                <div className="flex items-center gap-1">
                  <span className="w-6 text-right">2.0M</span>
                  <div className="flex-1 border-b border-neutral-100" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-6 text-right">1.5M</span>
                  <div className="flex-1 border-b border-neutral-100" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-6 text-right">1.0M</span>
                  <div className="flex-1 border-b border-neutral-100" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-6 text-right">0.5M</span>
                  <div className="flex-1 border-b border-neutral-100" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-6 text-right">0</span>
                  <div className="flex-1 border-b border-neutral-200" />
                </div>
              </div>

              {/* Bar Columns Container */}
              <div className="absolute inset-0 pl-7 flex items-end justify-between pr-1 pb-4">
                {monthlyFinance.map((m, mIdx) => (
                  <div key={mIdx} className="flex items-end gap-0.5 h-36">
                    {/* Income Bar (Max 2.0M = 100%) */}
                    <div
                      style={{ height: `${(m.income / 2.0) * 100}%` }}
                      className="w-1.5 sm:w-2 bg-[#0D7A6F] rounded-t-xs hover:opacity-80 transition-opacity"
                      title={`${m.month} Income: ৳ ${m.income}M`}
                    />
                    {/* Expense Bar */}
                    <div
                      style={{ height: `${(m.expense / 2.0) * 100}%` }}
                      className="w-1.5 sm:w-2 bg-[#F59E0B] rounded-t-xs hover:opacity-80 transition-opacity"
                      title={`${m.month} Expense: ৳ ${m.expense}M`}
                    />
                  </div>
                ))}
              </div>

              {/* Month Labels below bars */}
              <div className="flex justify-between pl-7 text-[9px] text-neutral-400 font-medium pt-1">
                {monthlyFinance.map((m, idx) => (
                  <span key={idx} className="w-4 text-center">
                    {m.month}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Widget 2: Top Clients by Revenue */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-xs text-neutral-900">
                Top Clients by Revenue
              </h3>
              <button
                onClick={() => setClientFilter('All Clients')}
                className="text-[11px] font-semibold text-[#0D7A6F] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {topClients.map((client, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 pb-2.5 border-b border-neutral-100 last:border-none last:pb-0"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#07261F] text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-2xs">
                      {client.code}
                    </div>
                    <span className="font-semibold text-neutral-800 truncate" title={client.name}>
                      {client.name}
                    </span>
                  </div>
                  <span className="font-mono text-neutral-900 font-bold tabular-nums shrink-0">
                    {client.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Details Modal */}
      {isInvoiceModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  {selectedInvoice.invoiceNo}
                </span>
                <h3 className="font-serif font-bold text-neutral-900 text-lg">
                  {selectedInvoice.client}
                </h3>
                <p className="text-xs text-neutral-500">
                  {selectedInvoice.engagement}
                </p>
              </div>
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Financial Numbers breakdown */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#FAF8F5] rounded-xl text-center border border-neutral-200/80">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-semibold">
                  Invoice Amount
                </span>
                <span className="font-mono text-base font-bold text-neutral-900">
                  ৳ {formatBDT(selectedInvoice.amount)}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-semibold">
                  Total Received
                </span>
                <span className="font-mono text-base font-bold text-emerald-700">
                  ৳ {formatBDT(selectedInvoice.received)}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-semibold">
                  Outstanding
                </span>
                <span className="font-mono text-base font-bold text-rose-600">
                  ৳ {formatBDT(selectedInvoice.outstanding)}
                </span>
              </div>
            </div>

            {/* Details table */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">Invoice Date:</span>
                <span className="font-medium text-neutral-800">{selectedInvoice.invoiceDate}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">Due Date:</span>
                <span className="font-medium text-neutral-800">{selectedInvoice.dueDate}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">Standard VAT (15%):</span>
                <span className="font-mono text-neutral-800">৳ {formatBDT(selectedInvoice.vatAmount || 0)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">Status:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusChip(selectedInvoice.status)}`}>
                  {selectedInvoice.status}
                </span>
              </div>
              <div className="pt-2">
                <span className="text-neutral-500 block mb-1">Billing Notes:</span>
                <p className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs">
                  {selectedInvoice.notes}
                </p>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <button
                onClick={() => {
                  alert(`Generating official PDF invoice receipt for ${selectedInvoice.invoiceNo}`);
                }}
                className="px-3.5 py-2 border border-neutral-200 text-xs font-semibold rounded-xl text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsInvoiceModalOpen(false)}
                  className="px-4 py-2 border border-neutral-200 text-xs font-medium rounded-xl text-neutral-700 hover:bg-neutral-50"
                >
                  Close
                </button>
                {selectedInvoice.outstanding > 0 && (
                  <button
                    onClick={() => {
                      setInvoices((prev) =>
                        prev.map((i) =>
                          i.id === selectedInvoice.id
                            ? { ...i, received: i.amount, outstanding: 0, status: 'Paid' }
                            : i
                        )
                      );
                      alert('Payment recorded! Invoice marked as Paid.');
                      setIsInvoiceModalOpen(false);
                    }}
                    className="px-4 py-2 bg-[#0D7A6F] text-white text-xs font-semibold rounded-xl hover:bg-[#074741] flex items-center gap-1.5 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Record Full Payment</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Invoice Modal */}
      {isNewInvoiceOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif font-bold text-neutral-900 text-lg">
                Generate New Audit Fee Invoice
              </h3>
              <button
                onClick={() => setIsNewInvoiceOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Client Name
                </label>
                <select className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800">
                  <option>Silco Pharmaceuticals PLC</option>
                  <option>Genex Infosys PLC</option>
                  <option>BD Paint</option>
                  <option>Advent</option>
                  <option>Master Feed Agrotech PLC</option>
                  <option>Fortune Shoe</option>
                  <option>NRB Club Ltd.</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Engagement Title
                </label>
                <input
                  type="text"
                  defaultValue="Statutory Audit FY 2025–26"
                  className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Invoice Amount (BDT)
                  </label>
                  <input
                    type="number"
                    defaultValue={500000}
                    className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-11-15"
                    className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Fee Description / Terms
                </label>
                <textarea
                  rows={2}
                  defaultValue="Progress billing for statutory audit fieldwork and interim review under the Chartered Accountants Order."
                  className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
              <button
                onClick={() => setIsNewInvoiceOpen(false)}
                className="px-4 py-2 border border-neutral-200 text-xs font-medium rounded-xl text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Invoice generated and posted to client ledger!');
                  setIsNewInvoiceOpen(false);
                }}
                className="px-4 py-2 bg-[#0D7A6F] text-white text-xs font-semibold rounded-xl hover:bg-[#074741]"
              >
                Issue Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
