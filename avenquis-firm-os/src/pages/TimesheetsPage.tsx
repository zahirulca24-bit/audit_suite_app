import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Building,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Coffee,
  Download,
  Edit,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Timer,
  Trash2,
  TrendingUp,
  User,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { MetricCard } from '../components/MetricCard';

interface TimeLogItem {
  id: string;
  date: string;
  client: string;
  engagement: string;
  task: string;
  startTime: string;
  endTime: string;
  hours: number;
  billable: boolean;
  status: 'Approved' | 'Submitted' | 'Draft' | 'In Review';
}

interface TeamTimesheetItem {
  id: string;
  staffName: string;
  role: string;
  week: string;
  totalHours: number;
  billableHours: number;
  nonBillableHours: number;
  utilization: number;
  submissionStatus: 'Submitted' | 'Draft' | 'Overdue';
  approvalStatus: 'Approved' | 'Pending' | 'In Review';
}

interface AttendanceItem {
  id: string;
  staffName: string;
  role: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  status: 'Present' | 'Client Visit' | 'WFH' | 'Leave';
  locationNote: string;
}

export const TimesheetsPage: React.FC = () => {
  // Navigation Tabs matching prompt
  const [activeTab, setActiveTab] = useState<
    'my-timesheet' | 'team-timesheets' | 'weekly-summary' | 'approval-queue' | 'attendance'
  >('my-timesheet');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedWeek, setSelectedWeek] = useState('Week 41: 06 Oct – 12 Oct 2026');

  // Modal state
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // New Log form state
  const [newDate, setNewDate] = useState('2026-10-12');
  const [newClient, setNewClient] = useState('Silco Pharmaceuticals PLC');
  const [newEngagement, setNewEngagement] = useState('Statutory Audit FY 2025–26');
  const [newTask, setNewTask] = useState('');
  const [newStartTime, setNewStartTime] = useState('09:00 AM');
  const [newEndTime, setNewEndTime] = useState('01:00 PM');
  const [newHours, setNewHours] = useState(4.0);
  const [newBillable, setNewBillable] = useState(true);

  // 6 Weekly KPI Cards required by specification
  const kpis = [
    {
      label: 'Total Hours',
      value: '42.5 hrs',
      trend: '↑ 5%',
      trendSub: 'vs last week',
      icon: Clock,
      iconBg: 'bg-[#E8F5F1]',
      iconColor: 'text-[#0D7A6F]',
    },
    {
      label: 'Billable Hours',
      value: '36.0 hrs',
      trend: '84.7%',
      trendSub: 'billable ratio',
      icon: Briefcase,
      iconBg: 'bg-[#EFF6FF]',
      iconColor: 'text-[#2563EB]',
    },
    {
      label: 'Non-billable Hours',
      value: '6.5 hrs',
      trend: '',
      trendSub: 'Internal, Admin & CPD',
      icon: Coffee,
      iconBg: 'bg-[#FFF7ED]',
      iconColor: 'text-[#D97706]',
      trendType: 'neutral' as const,
    },
    {
      label: 'Utilization',
      value: '84.7%',
      trend: '↑ 4.2%',
      trendSub: 'target: 80%',
      icon: TrendingUp,
      iconBg: 'bg-[#E8F5F1]',
      iconColor: 'text-[#059669]',
    },
    {
      label: 'Pending Approval',
      value: '8 logs',
      trend: '',
      trendSub: 'awaiting manager',
      icon: AlertCircle,
      iconBg: 'bg-[#FFFBEB]',
      iconColor: 'text-[#B45309]',
      trendType: 'neutral' as const,
    },
    {
      label: 'Missing Timesheets',
      value: '3 staff',
      trend: '',
      trendSub: 'overdue for W41',
      icon: AlertTriangle,
      iconBg: 'bg-[#FFF1F2]',
      iconColor: 'text-[#E11D48]',
      trendType: 'negative' as const,
    },
  ];

  // My Timesheet Records
  const [myLogs, setMyLogs] = useState<TimeLogItem[]>([
    {
      id: 'TL-101',
      date: '12 Oct 2026',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit FY 2025–26',
      task: 'Physical inventory observation sheet reconciliation & variance analysis',
      startTime: '09:00 AM',
      endTime: '01:30 PM',
      hours: 4.5,
      billable: true,
      status: 'Submitted',
    },
    {
      id: 'TL-102',
      date: '12 Oct 2026',
      client: 'Genex Infosys PLC',
      engagement: 'Statutory Audit FY 2025–26',
      task: 'Bank confirmation letter follow-up and reconciliations review',
      startTime: '02:30 PM',
      endTime: '06:00 PM',
      hours: 3.5,
      billable: true,
      status: 'Submitted',
    },
    {
      id: 'TL-103',
      date: '11 Oct 2026',
      client: 'BD Paint',
      engagement: 'Statutory Audit FY 2025–26',
      task: 'Trade debtors circularization sample selection under ISA 505',
      startTime: '09:30 AM',
      endTime: '02:30 PM',
      hours: 5.0,
      billable: true,
      status: 'Approved',
    },
    {
      id: 'TL-104',
      date: '11 Oct 2026',
      client: 'Internal Firm Activity',
      engagement: 'Professional Development',
      task: 'ICAB CPD Webinar on IFRS 17 and Income Tax Act 2023 provisions',
      startTime: '03:30 PM',
      endTime: '05:30 PM',
      hours: 2.0,
      billable: false,
      status: 'Approved',
    },
    {
      id: 'TL-105',
      date: '10 Oct 2026',
      client: 'Advent',
      engagement: 'Statutory Audit FY 2025–26',
      task: 'Fixed asset register inspection & physical tag matching',
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      hours: 7.0,
      billable: true,
      status: 'Approved',
    },
    {
      id: 'TL-106',
      date: '09 Oct 2026',
      client: 'Master Feed Agrotech PLC',
      engagement: 'Statutory Audit FY 2025–26',
      task: 'Raw material inventory valuation and IAS 2 compliance review',
      startTime: '10:00 AM',
      endTime: '06:00 PM',
      hours: 7.0,
      billable: true,
      status: 'Approved',
    },
    {
      id: 'TL-107',
      date: '08 Oct 2026',
      client: 'Fortune Shoe',
      engagement: 'Tax Advisory 2025–26',
      task: 'Deferred tax computation & corporate return filing documents',
      startTime: '09:30 AM',
      endTime: '04:30 PM',
      hours: 6.0,
      billable: true,
      status: 'Approved',
    },
  ]);

  // Team Timesheets Records
  const [teamLogs, setTeamLogs] = useState<TeamTimesheetItem[]>([
    {
      id: 'TT-01',
      staffName: 'Hemadry Roy',
      role: 'Audit Manager',
      week: 'W41 (06–12 Oct)',
      totalHours: 44.0,
      billableHours: 38.5,
      nonBillableHours: 5.5,
      utilization: 87.5,
      submissionStatus: 'Submitted',
      approvalStatus: 'Approved',
    },
    {
      id: 'TT-02',
      staffName: 'Md. Bayezid',
      role: 'Senior Article Student',
      week: 'W41 (06–12 Oct)',
      totalHours: 42.5,
      billableHours: 36.0,
      nonBillableHours: 6.5,
      utilization: 84.7,
      submissionStatus: 'Submitted',
      approvalStatus: 'Pending',
    },
    {
      id: 'TT-03',
      staffName: 'Musabbir Ahmed',
      role: 'Audit Associate',
      week: 'W41 (06–12 Oct)',
      totalHours: 41.0,
      billableHours: 34.0,
      nonBillableHours: 7.0,
      utilization: 82.9,
      submissionStatus: 'Submitted',
      approvalStatus: 'Pending',
    },
    {
      id: 'TT-04',
      staffName: 'Rakibul Islam',
      role: 'Article Student',
      week: 'W41 (06–12 Oct)',
      totalHours: 39.5,
      billableHours: 32.5,
      nonBillableHours: 7.0,
      utilization: 82.3,
      submissionStatus: 'Submitted',
      approvalStatus: 'Approved',
    },
    {
      id: 'TT-05',
      staffName: 'Iftekhar Hossain',
      role: 'Article Student',
      week: 'W41 (06–12 Oct)',
      totalHours: 38.0,
      billableHours: 30.0,
      nonBillableHours: 8.0,
      utilization: 78.9,
      submissionStatus: 'Draft',
      approvalStatus: 'In Review',
    },
    {
      id: 'TT-06',
      staffName: 'Tanvir Hasan',
      role: 'Junior Article Student',
      week: 'W41 (06–12 Oct)',
      totalHours: 30.0,
      billableHours: 22.0,
      nonBillableHours: 8.0,
      utilization: 73.3,
      submissionStatus: 'Overdue',
      approvalStatus: 'Pending',
    },
  ]);

  // Attendance Records
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceItem[]>([
    {
      id: 'ATT-01',
      staffName: 'Shafi Uddin Ahmed, FCA',
      role: 'Partner',
      date: '12 Oct 2026',
      checkIn: '08:45 AM',
      checkOut: '06:15 PM',
      totalHours: '9.5 hrs',
      status: 'Present',
      locationNote: 'Principal Office, Gulshan',
    },
    {
      id: 'ATT-02',
      staffName: 'Md. Zahirul Islam, FCA',
      role: 'Partner & EQCR',
      date: '12 Oct 2026',
      checkIn: '09:00 AM',
      checkOut: '06:30 PM',
      totalHours: '9.5 hrs',
      status: 'Client Visit',
      locationNote: 'Silco Pharmaceuticals Head Office',
    },
    {
      id: 'ATT-03',
      staffName: 'Hemadry Roy',
      role: 'Audit Manager',
      date: '12 Oct 2026',
      checkIn: '08:50 AM',
      checkOut: '06:20 PM',
      totalHours: '9.5 hrs',
      status: 'Client Visit',
      locationNote: 'Silco Plant, Sylhet',
    },
    {
      id: 'ATT-04',
      staffName: 'Md. Bayezid',
      role: 'Senior Article Student',
      date: '12 Oct 2026',
      checkIn: '08:55 AM',
      checkOut: '06:00 PM',
      totalHours: '9.0 hrs',
      status: 'Present',
      locationNote: 'Principal Office, Gulshan',
    },
    {
      id: 'ATT-05',
      staffName: 'Musabbir Ahmed',
      role: 'Audit Associate',
      date: '12 Oct 2026',
      checkIn: '09:10 AM',
      checkOut: '06:10 PM',
      totalHours: '9.0 hrs',
      status: 'WFH',
      locationNote: 'Remote - Report drafting',
    },
    {
      id: 'ATT-06',
      staffName: 'Rakibul Islam',
      role: 'Article Student',
      date: '12 Oct 2026',
      checkIn: '—',
      checkOut: '—',
      totalHours: '0.0 hrs',
      status: 'Leave',
      locationNote: 'ICAB Exam Preparation Leave',
    },
  ]);

  // Handle Add Time Log
  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newEntry: TimeLogItem = {
      id: `TL-${Date.now()}`,
      date: newDate,
      client: newClient,
      engagement: newEngagement,
      task: newTask,
      startTime: newStartTime,
      endTime: newEndTime,
      hours: Number(newHours),
      billable: newBillable,
      status: 'Submitted',
    };

    setMyLogs([newEntry, ...myLogs]);
    setNewTask('');
    setIsLogModalOpen(false);
  };

  // Filtered My Logs
  const filteredMyLogs = myLogs.filter((log) => {
    const matchesSearch =
      log.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.engagement.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClient = clientFilter === 'All Clients' || log.client === clientFilter;
    const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
    return matchesSearch && matchesClient && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 6 Weekly KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {kpis.map((kpi, idx) => (
          <MetricCard
            key={idx}
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            trendSub={kpi.trendSub}
            trendType={kpi.trendType}
            icon={kpi.icon}
            iconBg={kpi.iconBg}
            iconColor={kpi.iconColor}
          />
        ))}
      </div>

      {/* Main Sub-view Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'my-timesheet', label: 'My Timesheet' },
              { id: 'team-timesheets', label: 'Team Timesheets' },
              { id: 'weekly-summary', label: 'Weekly Summary' },
              { id: 'approval-queue', label: 'Approval Queue' },
              { id: 'attendance', label: 'Attendance' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0D7A6F] text-white shadow-2xs font-semibold'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border border-neutral-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action Button: Log Time */}
        <button
          onClick={() => setIsLogModalOpen(true)}
          className="bg-[#0B332A] hover:bg-[#07241D] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log Time</span>
        </button>
      </div>

      {/* TAB 1: My Timesheet */}
      {activeTab === 'my-timesheet' && (
        <div className="space-y-4">
          {/* Filter Toolbar */}
          <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[260px] max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search timesheets by task, client, engagement..."
                className="w-full pl-9 pr-3.5 py-1.5 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] focus:border-[#0D7A6F] transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>{selectedWeek}</span>
              </div>

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

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium hover:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#0D7A6F] cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Submitted">Submitted</option>
                <option value="Approved">Approved</option>
                <option value="Draft">Draft</option>
              </select>

              <button
                onClick={() => alert('Exporting timesheet records to Excel...')}
                className="px-3 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-700 font-medium flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-neutral-500" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Timesheet Table */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto min-h-[440px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-[#FAF8F5] text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    <th className="py-3 px-3.5">Date</th>
                    <th className="py-3 px-3">Client</th>
                    <th className="py-3 px-3">Engagement</th>
                    <th className="py-3 px-3.5">Task / Activity</th>
                    <th className="py-3 px-2.5 text-center">Start</th>
                    <th className="py-3 px-2.5 text-center">End</th>
                    <th className="py-3 px-2.5 text-right">Hours</th>
                    <th className="py-3 px-2.5 text-center">Billable</th>
                    <th className="py-3 px-2.5 text-center">Status</th>
                    <th className="py-3 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredMyLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3 px-3.5 font-medium text-neutral-900 whitespace-nowrap">
                        {log.date}
                      </td>
                      <td className="py-3 px-3 font-semibold text-neutral-800 whitespace-nowrap">
                        {log.client}
                      </td>
                      <td className="py-3 px-3 text-neutral-600 whitespace-nowrap">
                        {log.engagement}
                      </td>
                      <td className="py-3 px-3.5 max-w-xs text-neutral-800 font-medium">
                        <span className="line-clamp-2" title={log.task}>
                          {log.task}
                        </span>
                      </td>
                      <td className="py-3 px-2.5 text-center font-mono text-neutral-600 whitespace-nowrap">
                        {log.startTime}
                      </td>
                      <td className="py-3 px-2.5 text-center font-mono text-neutral-600 whitespace-nowrap">
                        {log.endTime}
                      </td>
                      <td className="py-3 px-2.5 text-right font-mono font-bold text-neutral-900 tabular-nums whitespace-nowrap">
                        {log.hours.toFixed(1)}
                      </td>
                      <td className="py-3 px-2.5 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            log.billable
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                          }`}
                        >
                          {log.billable ? 'Billable' : 'Non-billable'}
                        </span>
                      </td>
                      <td className="py-3 px-2.5 text-center whitespace-nowrap">
                        <StatusBadge status={log.status} />
                      </td>
                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => alert(`Edit log ${log.id}`)}
                            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                            title="Edit entry"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => alert(`Details for log ${log.id}`)}
                            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                            title="More options"
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
        </div>
      )}

      {/* TAB 2: Team Timesheets */}
      {activeTab === 'team-timesheets' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 bg-[#FAF8F5] border-b border-neutral-200/80 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-neutral-900">
                Team Timesheets — {selectedWeek}
              </h3>
              <p className="text-[11px] text-neutral-500">
                Overview of staff hours, billable utilization, and submission statuses.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0D7A6F]">
              6 team members listed
            </span>
          </div>

          <div className="overflow-x-auto min-h-[440px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-white text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-3">Week</th>
                  <th className="py-3 px-3 text-right">Total Hours</th>
                  <th className="py-3 px-3 text-right">Billable Hours</th>
                  <th className="py-3 px-3 text-right">Non-Billable</th>
                  <th className="py-3 px-3 text-center">Utilization %</th>
                  <th className="py-3 px-3 text-center">Submission Status</th>
                  <th className="py-3 px-3 text-center">Approval Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {teamLogs.map((staff) => (
                  <tr key={staff.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-semibold text-neutral-900">{staff.staffName}</div>
                      <div className="text-[11px] text-neutral-400">{staff.role}</div>
                    </td>
                    <td className="py-3 px-3 text-neutral-600 font-mono text-[11px] whitespace-nowrap">
                      {staff.week}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-neutral-900 whitespace-nowrap">
                      {staff.totalHours.toFixed(1)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-700 font-semibold whitespace-nowrap">
                      {staff.billableHours.toFixed(1)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-neutral-500 whitespace-nowrap">
                      {staff.nonBillableHours.toFixed(1)}
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <span className="font-mono font-bold text-neutral-800">
                          {staff.utilization}%
                        </span>
                        <div className="w-12 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${Math.min(staff.utilization, 100)}%` }}
                            className={`h-full ${
                              staff.utilization >= 80 ? 'bg-[#0D7A6F]' : 'bg-amber-500'
                            }`}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <StatusBadge status={staff.submissionStatus} />
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <StatusBadge status={staff.approvalStatus} />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => alert(`Reviewing timesheet of ${staff.staffName}`)}
                        className="px-3 py-1 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Weekly Summary */}
      {activeTab === 'weekly-summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5">
            <h3 className="font-serif font-bold text-sm text-neutral-900 mb-1">
              Daily Distribution (Hours Logged)
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Comparison between billable client work and non-billable training / firm governance.
            </p>

            <div className="space-y-3 text-xs">
              {[
                { day: 'Mon, 06 Oct', billable: 7.5, nonBillable: 1.0, total: 8.5 },
                { day: 'Tue, 07 Oct', billable: 8.0, nonBillable: 0.5, total: 8.5 },
                { day: 'Wed, 08 Oct', billable: 6.0, nonBillable: 2.0, total: 8.0 },
                { day: 'Thu, 09 Oct', billable: 7.0, nonBillable: 1.5, total: 8.5 },
                { day: 'Fri, 10 Oct', billable: 7.5, nonBillable: 1.5, total: 9.0 },
              ].map((d, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span className="text-neutral-800">{d.day}</span>
                    <span className="font-mono text-neutral-900 font-bold">{d.total} hrs</span>
                  </div>
                  <div className="flex h-3 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(d.billable / 10) * 100}%` }}
                      className="bg-[#0D7A6F]"
                      title={`Billable: ${d.billable} hrs`}
                    />
                    <div
                      style={{ width: `${(d.nonBillable / 10) * 100}%` }}
                      className="bg-amber-400"
                      title={`Non-Billable: ${d.nonBillable} hrs`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-5 pt-3 border-t border-neutral-100 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#0D7A6F]" />
                <span>Billable Time (36.0 hrs)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span>Non-Billable Time (6.5 hrs)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5">
            <h3 className="font-serif font-bold text-sm text-neutral-900 mb-1">
              Client Allocation
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Hours spent per audit client this week.
            </p>

            <div className="space-y-3 text-xs">
              {[
                { client: 'Silco Pharmaceuticals PLC', hrs: 14.5, pct: '40%' },
                { client: 'Advent', hrs: 8.0, pct: '22%' },
                { client: 'Master Feed Agrotech PLC', hrs: 7.0, pct: '19%' },
                { client: 'BD Paint', hrs: 6.5, pct: '18%' },
              ].map((c, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-neutral-200/60">
                  <div className="flex justify-between font-semibold text-neutral-900">
                    <span className="truncate">{c.client}</span>
                    <span className="font-mono text-emerald-800">{c.hrs} hrs</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{c.pct} of weekly total</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Approval Queue */}
      {activeTab === 'approval-queue' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
            <div>
              <h3 className="font-serif font-bold text-sm text-neutral-900">
                Timesheet Approval Queue
              </h3>
              <p className="text-xs text-neutral-500">
                Pending timesheets submitted by audit trainees and senior articles awaiting manager sign-off.
              </p>
            </div>
            <button
              onClick={() => alert('All pending timesheets approved!')}
              className="px-3.5 py-1.5 bg-[#0D7A6F] text-white text-xs font-semibold rounded-xl hover:bg-[#074741]"
            >
              Approve All (8)
            </button>
          </div>

          <div className="divide-y divide-neutral-100">
            {myLogs.slice(0, 3).map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-neutral-900">Md. Bayezid</span>
                    <span className="text-[11px] text-neutral-400">• {item.date}</span>
                    <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                      {item.hours} hrs
                    </span>
                  </div>
                  <div className="text-xs text-neutral-700 font-medium mt-0.5 truncate">
                    {item.client} — {item.task}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => alert(`Approved log ${item.id}`)}
                    className="px-3 py-1 bg-[#0D7A6F] text-white text-xs font-semibold rounded-lg hover:bg-[#074741]"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => alert(`Returned log ${item.id} with comments`)}
                    className="px-3 py-1 border border-neutral-200 text-xs font-medium text-neutral-700 rounded-lg hover:bg-neutral-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Attendance */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 bg-[#FAF8F5] border-b border-neutral-200/80 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-neutral-900">
                Firm Attendance Register — Monday, 12 October 2026
              </h3>
              <p className="text-[11px] text-neutral-500">
                Daily biometric check-in, field visits, and leave management records.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                5 Present / On Duty
              </span>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                1 On Leave
              </span>
            </div>
          </div>

          <div className="overflow-x-auto min-h-[440px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-white text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-center">Check-In</th>
                  <th className="py-3 px-3 text-center">Check-Out</th>
                  <th className="py-3 px-3 text-center">Total Hours</th>
                  <th className="py-3 px-3 text-center">Attendance Status</th>
                  <th className="py-3 px-4">Duty Location / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {attendanceRecords.map((att) => (
                  <tr key={att.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-semibold text-neutral-900">{att.staffName}</div>
                      <div className="text-[11px] text-neutral-400">{att.role}</div>
                    </td>
                    <td className="py-3 px-3 text-neutral-600 whitespace-nowrap">
                      {att.date}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-neutral-800 whitespace-nowrap">
                      {att.checkIn}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-neutral-800 whitespace-nowrap">
                      {att.checkOut}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-neutral-900 whitespace-nowrap">
                      {att.totalHours}
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          att.status === 'Present'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : att.status === 'Client Visit'
                            ? 'bg-sky-50 text-sky-700 border-sky-200'
                            : att.status === 'WFH'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {att.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-700 text-xs">
                      {att.locationNote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Log Time Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif font-bold text-neutral-900 text-lg">
                Log Time Entry
              </h3>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Hours Worked
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="16"
                    required
                    value={newHours}
                    onChange={(e) => setNewHours(Number(e.target.value))}
                    className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Client
                </label>
                <select
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800"
                >
                  <option>Silco Pharmaceuticals PLC</option>
                  <option>Genex Infosys PLC</option>
                  <option>BD Paint</option>
                  <option>Advent</option>
                  <option>Master Feed Agrotech PLC</option>
                  <option>Fortune Shoe</option>
                  <option>Internal Firm Activity</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Engagement Title
                </label>
                <input
                  type="text"
                  required
                  value={newEngagement}
                  onChange={(e) => setNewEngagement(e.target.value)}
                  className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Task / Activity Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Detail audit procedures performed, working paper references, or client meetings..."
                  className="w-full p-2 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-neutral-800"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newBillable}
                    onChange={(e) => setNewBillable(e.target.checked)}
                    className="rounded text-[#0D7A6F] focus:ring-[#0D7A6F]"
                  />
                  <span className="font-semibold text-neutral-800">
                    Billable to client
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 border border-neutral-200 text-xs font-medium rounded-xl text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0D7A6F] text-white text-xs font-semibold rounded-xl hover:bg-[#074741]"
                >
                  Submit Time Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
