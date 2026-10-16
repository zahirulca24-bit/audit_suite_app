import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  MoreHorizontal,
  Plus,
  Search,
  UserCheck,
  Users,
} from 'lucide-react';

interface StudentsArticleshipPageProps {
  onBack?: () => void;
}

export const StudentsArticleshipPage: React.FC<StudentsArticleshipPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [examLevelFilter, setExamLevelFilter] = useState('all');
  const [leaveStatusFilter, setLeaveStatusFilter] = useState('all');

  const stats = [
    {
      label: 'Total Students',
      value: '34',
      change: '↑ 21%',
      sub: 'vs last month',
      icon: Users,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Active Students',
      value: '28',
      change: '↑ 17%',
      sub: 'vs last month',
      icon: GraduationCap,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'On Leave',
      value: '3',
      change: '↑ 50%',
      sub: 'vs last month',
      isWarning: true,
      icon: Clock,
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      label: 'In Exam',
      value: '2',
      change: '↑ 0%',
      sub: 'vs last month',
      icon: FileText,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Completed',
      value: '1',
      change: '↑ 100%',
      sub: 'vs last month',
      icon: CheckCircle2,
      iconBg: 'bg-purple-50 text-purple-600',
    },
  ];

  const students = [
    {
      id: 'Sabbir Ahmed',
      regId: 'REG-2024-041',
      initials: 'SA',
      avatarBg: 'bg-purple-100 text-purple-700',
      partner: 'Fouzia Haque, FCA',
      mentorRole: 'Principal Mentor',
      batch: 'Batch 2024-A',
      icabReg: 'ICAB-ART-19842',
      startDate: '2024-01-15',
      endDate: '2027-01-14',
      examLevel: 'Level II',
      remainingTerm: '14 months',
      remainingDays: '420 days left',
      leaveStatus: 'Active',
      leaveColor: 'bg-emerald-500',
      stipend: '12,000',
      status: 'On Track',
      statusType: 'success',
    },
    {
      id: 'Anika Tabassum',
      regId: 'REG-2024-089',
      initials: 'AT',
      avatarBg: 'bg-amber-100 text-amber-700',
      partner: 'Zahirul Islam, FCA',
      mentorRole: 'Principal Mentor',
      batch: 'Batch 2024-B',
      icabReg: 'ICAB-ART-20311',
      startDate: '2024-06-01',
      endDate: '2027-05-31',
      examLevel: 'Level I',
      remainingTerm: '29 months',
      remainingDays: '310 days left',
      leaveStatus: 'Active',
      leaveColor: 'bg-emerald-500',
      stipend: '12,000',
      status: 'On Track',
      statusType: 'success',
    },
    {
      id: 'Farhan Kabir',
      regId: 'REG-2023-018',
      initials: 'FK',
      avatarBg: 'bg-emerald-100 text-emerald-700',
      partner: 'Zahirul Islam, FCA',
      mentorRole: 'Principal Mentor',
      batch: 'Batch 2023-A',
      icabReg: 'ICAB-ART-18450',
      startDate: '2023-03-01',
      endDate: '2026-02-28',
      examLevel: 'Level III',
      remainingTerm: 'Completed',
      remainingDays: 'Eligible for Qualified Status',
      leaveStatus: '-',
      leaveColor: '',
      stipend: '12,000',
      status: '✦ Completed',
      statusType: 'completed',
    },
    {
      id: 'Mehvish Sultana',
      regId: 'REG-2025-012',
      initials: 'MS',
      avatarBg: 'bg-sky-100 text-sky-700',
      partner: 'Mahmudur Rahman, ACA',
      mentorRole: 'Principal Mentor',
      batch: 'Batch 2025-A',
      icabReg: 'ICAB-ART-21094',
      startDate: '2025-02-01',
      endDate: '2028-01-31',
      examLevel: 'Level I',
      remainingTerm: '35 months',
      remainingDays: '680 days left',
      leaveStatus: 'Active',
      leaveColor: 'bg-emerald-500',
      stipend: '12,000',
      status: 'On Track',
      statusType: 'success',
    },
    {
      id: 'Nadim Rahman',
      regId: 'REG-2024-056',
      initials: 'NR',
      avatarBg: 'bg-rose-100 text-rose-700',
      partner: 'Fouzia Haque, FCA',
      mentorRole: 'Principal Mentor',
      batch: 'Batch 2024-A',
      icabReg: 'ICAB-ART-19903',
      startDate: '2024-04-15',
      endDate: '2027-04-14',
      examLevel: 'Level II',
      remainingTerm: '24 months',
      remainingDays: '530 days left',
      leaveStatus: 'On Leave',
      leaveColor: 'bg-rose-500',
      stipend: '12,000',
      status: 'On Leave',
      statusType: 'danger',
    },
    {
      id: 'Raisa Tasin',
      regId: 'REG-2025-020',
      initials: 'RT',
      avatarBg: 'bg-teal-100 text-teal-700',
      partner: 'Zahirul Islam, FCA',
      mentorRole: 'Principal Mentor',
      batch: 'Batch 2025-A',
      icabReg: 'ICAB-ART-21340',
      startDate: '2025-03-01',
      endDate: '2028-02-28',
      examLevel: 'Level I',
      remainingTerm: '34 months',
      remainingDays: '650 days left',
      leaveStatus: 'Active',
      leaveColor: 'bg-emerald-500',
      stipend: '12,000',
      status: 'On Track',
      statusType: 'success',
    },
    {
      id: 'Irfan Hossain',
      regId: 'REG-2024-067',
      initials: 'IH',
      avatarBg: 'bg-indigo-100 text-indigo-700',
      partner: 'Mahmudur Rahman, ACA',
      mentorRole: 'Principal Mentor',
      batch: 'Batch 2024-B',
      icabReg: 'ICAB-ART-20033',
      startDate: '2024-08-01',
      endDate: '2027-07-31',
      examLevel: 'Level I',
      remainingTerm: '31 months',
      remainingDays: '610 days left',
      leaveStatus: 'In Exam',
      leaveColor: 'bg-blue-500',
      stipend: '12,000',
      status: 'In Exam',
      statusType: 'info',
    },
    {
      id: 'Nusrat Mim',
      regId: 'REG-2025-018',
      initials: 'NM',
      avatarBg: 'bg-lime-100 text-lime-800',
      partner: 'Fouzia Haque, FCA',
      mentorRole: 'Principal Mentor',
      batch: 'Batch 2025-A',
      icabReg: 'ICAB-ART-21421',
      startDate: '2025-04-01',
      endDate: '2028-03-31',
      examLevel: 'Level I',
      remainingTerm: '36 months',
      remainingDays: '690 days left',
      leaveStatus: 'Active',
      leaveColor: 'bg-emerald-500',
      stipend: '12,000',
      status: 'On Track',
      statusType: 'success',
    },
  ];

  const filteredStudents = students.filter((s) => {
    const matchQuery =
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.regId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.partner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchLevel =
      examLevelFilter === 'all' || s.examLevel.toLowerCase().includes(examLevelFilter);
    const matchLeave =
      leaveStatusFilter === 'all' || s.leaveStatus.toLowerCase() === leaveStatusFilter;
    return matchQuery && matchLevel && matchLeave;
  });

  return (
    <div className="space-y-6">
      {/* 5 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  {s.label}
                </span>
                <div className={`w-8 h-8 rounded-xl ${s.iconBg} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-serif font-bold text-neutral-900">
                {s.value}
              </div>
              <div className="flex items-center gap-1 text-[11px] mt-1 font-medium">
                <span className={s.isWarning ? 'text-rose-600' : 'text-emerald-600'}>
                  {s.change}
                </span>
                <span className="text-neutral-400">{s.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Actions Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, Reg No, ICAB No, batch, email..."
            className="w-full text-xs text-neutral-800 placeholder:text-neutral-400 bg-transparent focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-neutral-600">
            <span className="text-neutral-400">Exam Level</span>
            <select
              value={examLevelFilter}
              onChange={(e) => setExamLevelFilter(e.target.value)}
              className="bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              <option value="all">All Exam Levels</option>
              <option value="level i">Level I</option>
              <option value="level ii">Level II</option>
              <option value="level iii">Level III</option>
            </select>
          </div>

          <div className="flex items-center gap-1 text-xs text-neutral-600">
            <span className="text-neutral-400">Leave Status</span>
            <select
              value={leaveStatusFilter}
              onChange={(e) => setLeaveStatusFilter(e.target.value)}
              className="bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              <option value="all">All Leave Status</option>
              <option value="active">Active</option>
              <option value="on leave">On Leave</option>
              <option value="in exam">In Exam</option>
            </select>
          </div>

          <button className="border border-neutral-200 hover:bg-neutral-50 text-neutral-700 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export Excel</span>
          </button>

          <button className="border border-neutral-200 hover:bg-neutral-50 text-neutral-700 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer">
            <Download className="w-3.5 h-3.5 text-amber-600" />
            <span>Export PDF</span>
          </button>

          <button className="bg-[#0B332A] hover:bg-[#07241D] text-white px-4 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Articled Student</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#FBF9F5] border-b border-neutral-100 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="p-3 pl-4">Student & ID</th>
                <th className="p-3">Principal Partner</th>
                <th className="p-3">Batch & ICAB Reg</th>
                <th className="p-3">Enrolment & Completion</th>
                <th className="p-3">Exam Level</th>
                <th className="p-3">Remaining Term</th>
                <th className="p-3">Leave Status</th>
                <th className="p-3">Stipend (BDT)</th>
                <th className="p-3">Status</th>
                <th className="p-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {filteredStudents.map((s, idx) => (
                <tr key={idx} className="hover:bg-[#FBF9F5]/70 transition-colors">
                  <td className="p-3 pl-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-7 h-7 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${s.avatarBg}`}
                      >
                        {s.initials}
                      </span>
                      <div>
                        <div className="font-semibold text-neutral-900 leading-tight">
                          {s.id}
                        </div>
                        <div className="text-[10px] text-amber-600 font-medium mt-0.5">
                          {s.regId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-neutral-800 leading-tight flex items-center gap-1">
                      <span className="text-amber-600">👤</span>
                      <span>{s.partner}</span>
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{s.mentorRole}</div>
                  </td>
                  <td className="p-3">
                    <div className="inline-block px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[10px] font-semibold">
                      {s.batch}
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{s.icabReg}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-[11px] text-neutral-700">
                      <span className="text-neutral-400">Start: </span>
                      {s.startDate}
                    </div>
                    <div className="text-[11px] text-neutral-700 mt-0.5">
                      <span className="text-neutral-400">End: </span>
                      {s.endDate}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                      {s.examLevel}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1 text-[11px] font-medium text-neutral-800">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span>{s.remainingTerm}</span>
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{s.remainingDays}</div>
                  </td>
                  <td className="p-3">
                    {s.leaveStatus === '-' ? (
                      <span className="text-neutral-400">-</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-700">
                        <span className={`w-2 h-2 rounded-full ${s.leaveColor}`} />
                        <span>{s.leaveStatus}</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-semibold text-neutral-800 tabular-nums">
                    {s.stipend}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        s.statusType === 'success'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : s.statusType === 'completed'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : s.statusType === 'danger'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-sky-50 text-sky-700 border border-sky-200'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="p-3 pr-4 text-right">
                    <button className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md hover:bg-neutral-100 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="p-3.5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <span>Showing 8 of 34 students</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 text-neutral-600">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#0B332A] text-white font-semibold">1</button>
            <button className="w-7 h-7 rounded-lg hover:bg-neutral-50 text-neutral-600">2</button>
            <button className="w-7 h-7 rounded-lg hover:bg-neutral-50 text-neutral-600">3</button>
            <button className="w-7 h-7 rounded-lg hover:bg-neutral-50 text-neutral-600">4</button>
            <button className="w-7 h-7 rounded-lg hover:bg-neutral-50 text-neutral-600">5</button>
            <button className="w-7 h-7 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 text-neutral-600">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
