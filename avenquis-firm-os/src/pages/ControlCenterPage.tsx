import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  Database,
  ExternalLink,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  HardDrive,
  History,
  Key,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MoreHorizontal,
  RefreshCw,
  Search,
  Server,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
  Wifi,
  X,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface ControlCenterPageProps {
  onLogout: () => void;
}

export const ControlCenterPage: React.FC<ControlCenterPageProps> = ({
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'firms'
    | 'ai-operations'
    | 'billing'
    | 'leads-access'
    | 'platform-health'
    | 'audit-logs'
    | 'settings'
  >('overview');

  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Items matching brief
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'firms', label: 'Firms', icon: Building2, badge: '184' },
    { id: 'ai-operations', label: 'AI Operations', icon: Bot },
    { id: 'billing', label: 'Billing & Subscriptions', icon: CreditCard },
    { id: 'leads-access', label: 'Leads & Access', icon: UserCheck, badge: '3' },
    { id: 'platform-health', label: 'Platform Health', icon: Activity },
    { id: 'audit-logs', label: 'Audit Logs', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Mock CA Firms Directory
  const firmsList = [
    {
      id: 'firm-1',
      name: 'Rahman & Rahman Chartered Accountants',
      code: 'RRC-01',
      city: 'Dhaka',
      tier: 'Enterprise Practice',
      partners: 6,
      staff: 54,
      engagements: 128,
      status: 'Active',
      mrr: '৳ 65,000/mo',
      renewal: '15 Dec 2026',
    },
    {
      id: 'firm-2',
      name: 'Huda & Co. Chartered Accountants',
      code: 'HDC-02',
      city: 'Chittagong',
      tier: 'Standard Practice',
      partners: 3,
      staff: 22,
      engagements: 45,
      status: 'Active',
      mrr: '৳ 35,000/mo',
      renewal: '28 Nov 2026',
    },
    {
      id: 'firm-3',
      name: 'Shafi & Associates Chartered Accountants',
      code: 'SAC-03',
      city: 'Dhaka',
      tier: 'Enterprise Practice',
      partners: 5,
      staff: 42,
      engagements: 89,
      status: 'Active',
      mrr: '৳ 55,000/mo',
      renewal: '10 Jan 2027',
    },
    {
      id: 'firm-4',
      name: 'Chowdhury & Partners CA',
      code: 'CPC-04',
      city: 'Sylhet',
      tier: 'Starter Practice',
      partners: 2,
      staff: 14,
      engagements: 24,
      status: 'Pending KYC',
      mrr: '৳ 20,000/mo',
      renewal: '01 Nov 2026',
    },
    {
      id: 'firm-5',
      name: 'Zaman & Kabir Chartered Accountants',
      code: 'ZKC-05',
      city: 'Dhaka',
      tier: 'Enterprise Practice',
      partners: 8,
      staff: 68,
      engagements: 160,
      status: 'Active',
      mrr: '৳ 80,000/mo',
      renewal: '05 Mar 2027',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-neutral-800 flex flex-col md:flex-row font-sans">
      {/* CONTROL PANEL SIDEBAR (Dark Deep Forest) */}
      <aside className="w-64 shrink-0 bg-[#07261F] text-white flex flex-col justify-between border-r border-[#0D382E] select-none shadow-xl">
        <div className="p-5 pb-3">
          {/* Canonical Brand Header with Control Center Descriptor */}
          <div className="flex items-center justify-between">
            <BrandLogo
              variant="dark"
              showWordmark
              descriptor="Control Center"
              size="md"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-emerald-100/60 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Environment Switcher pill */}
          <div className="mt-4 p-2.5 rounded-xl bg-[#0F3930] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-[11px] font-semibold text-emerald-100">
                Production Control Plane
              </div>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 text-emerald-300">
              v1.0
            </span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div className="px-3 py-2 space-y-1 flex-1 overflow-y-auto scrollbar-thin">
          <div className="px-3 text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-100/40 mb-2">
            PLATFORM MANAGEMENT
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setIsMobileMenuOpen(false);
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
                {item.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/20">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Block & Logout */}
        <div className="p-3 border-t border-[#0D382E] bg-[#051E18]">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059] text-[#07261F] font-bold text-xs flex items-center justify-center font-serif shadow-xs">
              SA
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-white truncate">
                Super Admin
              </div>
              <div className="text-[10px] text-emerald-200/60 truncate">
                root@avenquis.internal
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full mt-2 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-rose-300/80 hover:text-rose-200 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Control Bar */}
        <header className="bg-white border-b border-neutral-200/80 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs">
              <BrandLogo variant="light" showWordmark={false} size="sm" />
              <span className="text-neutral-400 font-medium">/</span>
              <span className="text-neutral-500 font-medium">Control Center</span>
              <span className="text-neutral-400 font-medium">/</span>
              <span className="font-semibold text-neutral-900 capitalize">
                {activeTab.replace('-', ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Operational Status */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All 12 Microservices Operational</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 sm:p-8 space-y-6 max-w-7xl">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0D7A6F] mb-1">
                  PLATFORM EXECUTIVE SUMMARY
                </div>
                <h1 className="font-serif text-3xl font-semibold text-neutral-900">
                  Control Center Overview
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Multi-tenant health, chartered accountancy firms, AI compute usage and infrastructure telemetry.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 text-xs mb-2">
                    <span className="font-medium">Total Onboarded Firms</span>
                    <Building2 className="w-4 h-4 text-[#0D7A6F]" />
                  </div>
                  <div className="font-serif text-3xl font-semibold text-neutral-900">
                    184
                  </div>
                  <div className="mt-2 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+12 firms this month (BDT +৳7.8L)</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 text-xs mb-2">
                    <span className="font-medium">Active Auditors & Staff</span>
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="font-serif text-3xl font-semibold text-neutral-900">
                    2,420
                  </div>
                  <div className="mt-2 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>94.2% weekly active utilization</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 text-xs mb-2">
                    <span className="font-medium">Platform ARR / MRR</span>
                    <CreditCard className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="font-serif text-3xl font-semibold text-neutral-900">
                    ৳18.6L
                  </div>
                  <div className="mt-2 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+15.4% YoY SaaS expansion</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 text-xs mb-2">
                    <span className="font-medium">ISA AI Inference Queries</span>
                    <Bot className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="font-serif text-3xl font-semibold text-neutral-900">
                    48,200
                  </div>
                  <div className="mt-2 text-[11px] text-purple-600 font-medium flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Avg response 380ms • 99.4% cache</span>
                  </div>
                </div>
              </div>

              {/* Firms Table Preview */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
                  <h3 className="font-serif text-lg font-semibold text-neutral-900">
                    Chartered Accountancy Firms (Tenants)
                  </h3>
                  <button
                    onClick={() => setActiveTab('firms')}
                    className="text-xs font-semibold text-[#0D7A6F] hover:underline"
                  >
                    View All 184 Firms →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-neutral-500 font-semibold border-b border-neutral-200/70">
                      <tr>
                        <th className="py-3 px-4">Firm Name & Code</th>
                        <th className="py-3 px-4">City</th>
                        <th className="py-3 px-4">Subscription Tier</th>
                        <th className="py-3 px-4">Staff</th>
                        <th className="py-3 px-4">Engagements</th>
                        <th className="py-3 px-4">MRR (BDT)</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {firmsList.map((firm) => (
                        <tr key={firm.id} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-neutral-900">{firm.name}</div>
                            <div className="text-[11px] font-mono text-neutral-400">{firm.code}</div>
                          </td>
                          <td className="py-3.5 px-4 text-neutral-600">{firm.city}</td>
                          <td className="py-3.5 px-4 text-neutral-800 font-medium">{firm.tier}</td>
                          <td className="py-3.5 px-4 text-neutral-600">{firm.staff} users</td>
                          <td className="py-3.5 px-4 text-neutral-600">{firm.engagements} jobs</td>
                          <td className="py-3.5 px-4 font-mono font-medium text-neutral-800">{firm.mrr}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                firm.status === 'Active'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {firm.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FIRMS */}
          {activeTab === 'firms' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-neutral-900">
                    Tenant Firms Directory
                  </h1>
                  <p className="text-xs text-neutral-500 mt-1">
                    Manage tenant account limits, licensing keys and database partitioning.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search firms or ICAB ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:border-[#0D7A6F]"
                    />
                  </div>
                  <button
                    onClick={() => alert('Onboard new CA firm modal opened')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#07261F] text-white text-xs font-semibold hover:bg-[#041B16] cursor-pointer shadow-2xs"
                  >
                    + Provision New Firm
                  </button>
                </div>
              </div>

              {/* Table of All Firms */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-neutral-500 font-semibold border-b border-neutral-200/70">
                    <tr>
                      <th className="py-3 px-4">Firm Name & Code</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">License Tier</th>
                      <th className="py-3 px-4">Total Staff</th>
                      <th className="py-3 px-4">Active Engagements</th>
                      <th className="py-3 px-4">Next Renewal</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {firmsList.map((firm) => (
                      <tr key={firm.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-neutral-900">
                          {firm.name}
                        </td>
                        <td className="py-3.5 px-4 text-neutral-600">{firm.city}</td>
                        <td className="py-3.5 px-4 font-medium text-neutral-800">{firm.tier}</td>
                        <td className="py-3.5 px-4 text-neutral-600">{firm.staff}</td>
                        <td className="py-3.5 px-4 text-neutral-600">{firm.engagements}</td>
                        <td className="py-3.5 px-4 text-neutral-500 font-mono text-[11px]">{firm.renewal}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {firm.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => alert(`Managing tenant ${firm.name}`)}
                            className="px-2.5 py-1 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: AI OPERATIONS */}
          {activeTab === 'ai-operations' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="font-serif text-2xl font-bold text-neutral-900">
                  AI Operations & ISA Assistant Gateway
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Monitor LLM token consumption, ISA prompt grounding cache hits, latency SLA, and rate limits.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
                  <div className="text-xs text-neutral-500 font-medium mb-1">
                    Monthly Grounding Requests
                  </div>
                  <div className="font-serif text-3xl font-semibold text-neutral-900">
                    48,200
                  </div>
                  <div className="mt-2 text-[11px] text-emerald-600">
                    99.4% cache hit for ISA standard citations
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
                  <div className="text-xs text-neutral-500 font-medium mb-1">
                    Median Latency (p50 / p95)
                  </div>
                  <div className="font-serif text-3xl font-semibold text-neutral-900">
                    380ms / 850ms
                  </div>
                  <div className="mt-2 text-[11px] text-emerald-600">
                    Compliant with &lt;1.2s SLA
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
                  <div className="text-xs text-neutral-500 font-medium mb-1">
                    Token Quota Remaining
                  </div>
                  <div className="font-serif text-3xl font-semibold text-neutral-900">
                    84.2M / 100M
                  </div>
                  <div className="mt-2 text-[11px] text-blue-600">
                    Next quota refresh in 18 days
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BILLING & SUBSCRIPTIONS */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="font-serif text-2xl font-bold text-neutral-900">
                  Platform Billing & Subscriptions
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Manage BDT subscription plans, automated invoicing, VAT tax compliance and renewals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#0D7A6F] uppercase tracking-wider">
                      Starter Practice
                    </div>
                    <div className="font-serif text-2xl font-bold text-neutral-900 mt-2">
                      ৳ 20,000 <span className="text-xs font-sans text-neutral-500">/month</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      For emerging CA firms up to 15 staff members and 30 active audit engagements.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-600">
                    <strong>34 active firms</strong> subscribed
                  </div>
                </div>

                <div className="bg-[#FAF8F5] p-6 rounded-2xl border-2 border-[#0D7A6F] shadow-sm flex flex-col justify-between relative">
                  <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#0D7A6F] text-white text-[10px] font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                  <div>
                    <div className="text-[11px] font-bold text-[#0D7A6F] uppercase tracking-wider">
                      Standard Practice
                    </div>
                    <div className="font-serif text-2xl font-bold text-neutral-900 mt-2">
                      ৳ 35,000 <span className="text-xs font-sans text-neutral-500">/month</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      Full suite for mid-sized practices up to 35 staff with Document Vault and ISA AI.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200/70 text-xs text-neutral-600">
                    <strong>92 active firms</strong> subscribed
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#0D7A6F] uppercase tracking-wider">
                      Enterprise Audit
                    </div>
                    <div className="font-serif text-2xl font-bold text-neutral-900 mt-2">
                      ৳ 65,000+ <span className="text-xs font-sans text-neutral-500">/month</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      Unlimited users, dedicated database partition, audit mounting archive lock and priority support.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-600">
                    <strong>58 active firms</strong> subscribed
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LEADS & ACCESS */}
          {activeTab === 'leads-access' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-neutral-900">
                    Leads & Firm Onboarding Access
                  </h1>
                  <p className="text-xs text-neutral-500 mt-1">
                    Review and approve incoming Chartered Accountancy firm registration requests.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                  3 Pending Approvals
                </span>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 space-y-4">
                {[
                  {
                    name: 'K. M. Hasan & Co. CA',
                    applicant: 'Md. Kamrul Hasan, FCA',
                    email: 'kamrul@kmhasan.com',
                    city: 'Dhaka',
                    date: 'Today 10:15 AM',
                  },
                  {
                    name: 'M. M. Rahman & Co. CA',
                    applicant: 'Mahmudur Rahman, FCA',
                    email: 'mahmud@mmrahman.com',
                    city: 'Chittagong',
                    date: 'Yesterday 04:30 PM',
                  },
                  {
                    name: 'Ahmed & Zaki CA',
                    applicant: 'Zakiul Alam, FCA',
                    email: 'info@ahmedzaki.com',
                    city: 'Dhaka',
                    date: '28 Sep 2026',
                  },
                ].map((lead, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-neutral-100 hover:border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF8F5]"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">
                        {lead.name}
                      </div>
                      <div className="text-xs text-neutral-500 mt-0.5">
                        Applicant: {lead.applicant} • {lead.email} • {lead.city}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-1 font-mono">
                        Submitted: {lead.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Approved ${lead.name}`)}
                        className="px-3 py-1.5 rounded-xl bg-[#07261F] text-white text-xs font-semibold hover:bg-[#041B16] cursor-pointer"
                      >
                        Approve & Issue Key
                      </button>
                      <button
                        onClick={() => alert(`Contacted ${lead.applicant}`)}
                        className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs text-neutral-600 hover:bg-white cursor-pointer"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PLATFORM HEALTH */}
          {activeTab === 'platform-health' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="font-serif text-2xl font-bold text-neutral-900">
                  Infrastructure & Microservice Health
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Cluster availability, Postgres read-replicas, object storage vault and memory telemetry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Core API Gateway', latency: '42ms', status: 'Healthy', uptime: '99.99%' },
                  { name: 'Document Vault Storage', latency: '68ms', status: 'Healthy', uptime: '100%' },
                  { name: 'Auth & Session Manager', latency: '18ms', status: 'Healthy', uptime: '99.98%' },
                  { name: 'PostgreSQL Primary Cluster', latency: '8ms', status: 'Healthy', uptime: '99.99%' },
                  { name: 'Audit Trail Ledger', latency: '24ms', status: 'Healthy', uptime: '100%' },
                  { name: 'ISA AI Embedding Engine', latency: '340ms', status: 'Healthy', uptime: '99.95%' },
                ].map((svc, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-neutral-900 text-xs">{svc.name}</span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{svc.status}</span>
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500 flex items-center justify-between mt-3 pt-2 border-t border-neutral-100">
                      <span>Latency: <strong className="text-neutral-800 font-mono">{svc.latency}</strong></span>
                      <span>Uptime: <strong className="text-neutral-800 font-mono">{svc.uptime}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: AUDIT LOGS */}
          {activeTab === 'audit-logs' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="font-serif text-2xl font-bold text-neutral-900">
                  Global Security & Access Audit Logs
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Immutable record of system administration, privilege escalation, and data operations.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-neutral-500 font-semibold border-b border-neutral-200/70">
                    <tr>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Actor</th>
                      <th className="py-3 px-4">Action Event</th>
                      <th className="py-3 px-4">Target Resource</th>
                      <th className="py-3 px-4">IP Address</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 font-mono text-[11px]">
                    {[
                      {
                        time: '2026-10-01 10:45:12',
                        actor: 'superadmin@avenquis.com',
                        action: 'TENANT_PROVISION',
                        target: 'firm_rahman_ca_01',
                        ip: '103.205.71.18',
                        status: 'SUCCESS',
                      },
                      {
                        time: '2026-10-01 09:30:00',
                        actor: 'system_cron',
                        action: 'DAILY_BACKUP_SNAPSHOT',
                        target: 'vault_partition_all',
                        ip: '10.0.4.12',
                        status: 'SUCCESS',
                      },
                      {
                        time: '2026-10-01 08:14:22',
                        actor: 'audit_lead@avenquis.com',
                        action: 'SIGN_OFF_VERIFIED',
                        target: 'wp_inventory_sec_d',
                        ip: '103.205.71.24',
                        status: 'SUCCESS',
                      },
                      {
                        time: '2026-09-30 23:59:01',
                        actor: 'billing_service',
                        action: 'INVOICE_GENERATED',
                        target: 'inv_bdt_oct_2026',
                        ip: '10.0.1.8',
                        status: 'SUCCESS',
                      },
                    ].map((log, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                        <td className="py-3 px-4 text-neutral-500">{log.time}</td>
                        <td className="py-3 px-4 text-neutral-800 font-sans font-medium">{log.actor}</td>
                        <td className="py-3 px-4 text-emerald-800 font-semibold">{log.action}</td>
                        <td className="py-3 px-4 text-neutral-600">{log.target}</td>
                        <td className="py-3 px-4 text-neutral-500">{log.ip}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="font-serif text-2xl font-bold text-neutral-900">
                  Control Center Platform Settings
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Global cluster variables, automated maintenance windows and compliance policies.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-2xs max-w-2xl space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div>
                    <div className="font-semibold text-neutral-900">Platform Maintenance Mode</div>
                    <div className="text-neutral-500 text-[11px]">Temporarily restrict tenant logins during schema upgrades.</div>
                  </div>
                  <input type="checkbox" className="toggle rounded accent-[#0D7A6F] cursor-pointer" />
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div>
                    <div className="font-semibold text-neutral-900">Enforce Multi-Factor Authentication (MFA)</div>
                    <div className="text-neutral-500 text-[11px]">Require TOTP authenticator app for all firm partner accounts.</div>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle rounded accent-[#0D7A6F] cursor-pointer" />
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div>
                    <div className="font-semibold text-neutral-900">Automated Daily Database Snapshots</div>
                    <div className="text-neutral-500 text-[11px]">Execute encrypted multi-region backup at 04:00 AM BST daily.</div>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle rounded accent-[#0D7A6F] cursor-pointer" />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => alert('Platform settings saved.')}
                    className="px-4 py-2 rounded-xl bg-[#07261F] text-white font-semibold text-xs hover:bg-[#041B16] cursor-pointer"
                  >
                    Save Platform Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
