import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Star,
  UserCheck,
  Users,
  X,
} from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  designation: string;
  roleType: 'Partner' | 'Manager' | 'Senior' | 'Articled Student' | 'Audit Trainee';
  department: string;
  allocatedEngagements: string[];
  activeClientsCount: number;
  billableHours: string;
  utilizationRate: number;
  icabReg?: string;
  rating: number;
  status: 'Available' | 'On Engagement' | 'On Leave' | 'In Exam';
  email: string;
  phone: string;
}

export const PeopleStaffPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'partners' | 'managers' | 'students' | 'trainees'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);

  const stats = [
    {
      label: 'Total Firm Members',
      value: '58',
      change: '↑ 14%',
      sub: 'vs last year',
      icon: Users,
      iconBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Qualified (FCA/ACA)',
      value: '8',
      change: '100%',
      sub: 'licensed ICAB',
      icon: UserCheck,
      iconBg: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Articled Students',
      value: '34',
      change: '28 active',
      sub: 'in 3 batches',
      icon: GraduationCap,
      iconBg: 'bg-amber-50 text-amber-700',
    },
    {
      label: 'Audit Trainees',
      value: '16',
      change: '↑ 4',
      sub: 'probationary',
      icon: Briefcase,
      iconBg: 'bg-teal-50 text-teal-700',
    },
    {
      label: 'Avg. Utilization',
      value: '84.2%',
      change: '↑ 6.1%',
      sub: 'billable target',
      icon: Star,
      iconBg: 'bg-purple-50 text-purple-700',
    },
  ];

  const staffMembers: StaffMember[] = [
    {
      id: 'STF-001',
      name: 'Shafi Uddin Ahmed, FCA',
      initials: 'SZ',
      avatarBg: 'bg-purple-100 text-purple-800',
      designation: 'Senior Managing Partner',
      roleType: 'Partner',
      department: 'Audit & Assurance',
      allocatedEngagements: ['Silco Pharmaceuticals PLC', 'Master Feed Agrotech PLC', 'Abdul Monem Ltd. (Igloo)'],
      activeClientsCount: 6,
      billableHours: '1,420h',
      utilizationRate: 92,
      icabReg: 'ICAB-FCA-1284',
      rating: 5.0,
      status: 'On Engagement',
      email: 'shafi@avenquis.com',
      phone: '+880 1711-100001',
    },
    {
      id: 'STF-002',
      name: 'Zahirul Islam, FCA',
      initials: 'ZI',
      avatarBg: 'bg-emerald-100 text-emerald-800',
      designation: 'Audit & Tax Partner',
      roleType: 'Partner',
      department: 'Tax & Advisory',
      allocatedEngagements: ['Genex Infosys PLC', 'Advent'],
      activeClientsCount: 5,
      billableHours: '1,380h',
      utilizationRate: 88,
      icabReg: 'ICAB-FCA-1422',
      rating: 4.9,
      status: 'On Engagement',
      email: 'zahirul@avenquis.com',
      phone: '+880 1711-100002',
    },
    {
      id: 'STF-003',
      name: 'Fouzia Haque, FCA',
      initials: 'FH',
      avatarBg: 'bg-rose-100 text-rose-800',
      designation: 'Audit Partner & Principal Mentor',
      roleType: 'Partner',
      department: 'Audit & Assurance',
      allocatedEngagements: ['BD Paint', 'Fortune Shoe', 'NRB Club Ltd.'],
      activeClientsCount: 5,
      billableHours: '1,340h',
      utilizationRate: 86,
      icabReg: 'ICAB-FCA-1530',
      rating: 4.9,
      status: 'Available',
      email: 'fouzia@avenquis.com',
      phone: '+880 1711-100003',
    },
    {
      id: 'STF-004',
      name: 'Mahmudur Rahman, ACA',
      initials: 'MR',
      avatarBg: 'bg-blue-100 text-blue-800',
      designation: 'Associate Partner',
      roleType: 'Partner',
      department: 'Corporate Advisory',
      allocatedEngagements: ['NRB Club Ltd.'],
      activeClientsCount: 3,
      billableHours: '1,290h',
      utilizationRate: 83,
      icabReg: 'ICAB-ACA-2104',
      rating: 4.8,
      status: 'On Engagement',
      email: 'mahmudur@avenquis.com',
      phone: '+880 1711-100004',
    },
    {
      id: 'STF-005',
      name: 'Hemadry Roy',
      initials: 'HR',
      avatarBg: 'bg-teal-100 text-teal-800',
      designation: 'Senior Audit Manager',
      roleType: 'Manager',
      department: 'Audit & Assurance',
      allocatedEngagements: ['Silco Pharmaceuticals PLC', 'Master Feed Agrotech PLC'],
      activeClientsCount: 4,
      billableHours: '1,540h',
      utilizationRate: 94,
      rating: 4.9,
      status: 'On Engagement',
      email: 'hemadry@avenquis.com',
      phone: '+880 1819-200001',
    },
    {
      id: 'STF-006',
      name: 'Md. Bayezid',
      initials: 'MB',
      avatarBg: 'bg-amber-100 text-amber-800',
      designation: 'Audit In-charge & Assistant Manager',
      roleType: 'Manager',
      department: 'Audit & Assurance',
      allocatedEngagements: ['Silco Pharmaceuticals PLC', 'Abdul Monem Ltd. (Igloo)'],
      activeClientsCount: 3,
      billableHours: '1,490h',
      utilizationRate: 91,
      rating: 4.7,
      status: 'On Engagement',
      email: 'bayezid@avenquis.com',
      phone: '+880 1819-200002',
    },
    {
      id: 'STF-007',
      name: 'Sabbir Ahmed',
      initials: 'SA',
      avatarBg: 'bg-purple-100 text-purple-800',
      designation: 'Senior Articled Student (Level II)',
      roleType: 'Articled Student',
      department: 'Audit & Assurance',
      allocatedEngagements: ['Silco Pharmaceuticals PLC', 'Fortune Shoe'],
      activeClientsCount: 2,
      billableHours: '1,210h',
      utilizationRate: 85,
      icabReg: 'ICAB-ART-19842',
      rating: 4.8,
      status: 'On Engagement',
      email: 'sabbir@avenquis.com',
      phone: '+880 1912-300001',
    },
    {
      id: 'STF-008',
      name: 'Anika Tabassum',
      initials: 'AT',
      avatarBg: 'bg-orange-100 text-orange-800',
      designation: 'Articled Student (Level I)',
      roleType: 'Articled Student',
      department: 'Audit & Assurance',
      allocatedEngagements: ['Genex Infosys PLC'],
      activeClientsCount: 1,
      billableHours: '980h',
      utilizationRate: 78,
      icabReg: 'ICAB-ART-20311',
      rating: 4.6,
      status: 'Available',
      email: 'anika@avenquis.com',
      phone: '+880 1912-300002',
    },
    {
      id: 'STF-009',
      name: 'Farhan Kabir',
      initials: 'FK',
      avatarBg: 'bg-indigo-100 text-indigo-800',
      designation: 'Senior Student (Level III Completed)',
      roleType: 'Articled Student',
      department: 'Tax & Advisory',
      allocatedEngagements: ['Genex Infosys PLC', 'NRB Club Ltd.'],
      activeClientsCount: 2,
      billableHours: '1,320h',
      utilizationRate: 89,
      icabReg: 'ICAB-ART-18450',
      rating: 4.9,
      status: 'Available',
      email: 'farhan@avenquis.com',
      phone: '+880 1912-300003',
    },
    {
      id: 'STF-010',
      name: 'Nadim Rahman',
      initials: 'NR',
      avatarBg: 'bg-rose-100 text-rose-800',
      designation: 'Articled Student (Level II)',
      roleType: 'Articled Student',
      department: 'Audit & Assurance',
      allocatedEngagements: ['BD Paint'],
      activeClientsCount: 1,
      billableHours: '850h',
      utilizationRate: 65,
      icabReg: 'ICAB-ART-19903',
      rating: 4.5,
      status: 'On Leave',
      email: 'nadim@avenquis.com',
      phone: '+880 1912-300004',
    },
  ];

  const filteredStaff = staffMembers.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchTab =
      activeTab === 'all' ||
      (activeTab === 'partners' && m.roleType === 'Partner') ||
      (activeTab === 'managers' && m.roleType === 'Manager') ||
      (activeTab === 'students' && m.roleType === 'Articled Student') ||
      (activeTab === 'trainees' && m.roleType === 'Audit Trainee');

    const matchDept = departmentFilter === 'All' || m.department === departmentFilter;
    const matchStatus = statusFilter === 'All' || m.status === statusFilter;

    return matchSearch && matchTab && matchDept && matchStatus;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 5 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  {s.label}
                </span>
                <div className={`w-7 h-7 rounded-xl ${s.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-neutral-900 tabular-nums">
                  {s.value}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] mt-1 font-medium">
                  <span className="text-emerald-700 font-semibold">{s.change}</span>
                  <span className="text-neutral-400 font-normal">{s.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#07261F] text-white shadow-2xs font-semibold'
              : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80'
          }`}
        >
          All Members ({staffMembers.length})
        </button>
        <button
          onClick={() => setActiveTab('partners')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'partners'
              ? 'bg-[#07261F] text-white shadow-2xs font-semibold'
              : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80'
          }`}
        >
          Partners & Directors (4)
        </button>
        <button
          onClick={() => setActiveTab('managers')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'managers'
              ? 'bg-[#07261F] text-white shadow-2xs font-semibold'
              : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80'
          }`}
        >
          Managers & In-charges (2)
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'students'
              ? 'bg-[#07261F] text-white shadow-2xs font-semibold'
              : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80'
          }`}
        >
          Articled Students (4)
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-3 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search member, designation, ICAB Reg, or email..."
            className="w-full text-xs text-neutral-800 placeholder:text-neutral-400 bg-transparent focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="All">All Departments</option>
            <option value="Audit & Assurance">Audit & Assurance</option>
            <option value="Tax & Advisory">Tax & Advisory</option>
            <option value="Corporate Advisory">Corporate Advisory</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="On Engagement">On Engagement</option>
            <option value="Available">Available</option>
            <option value="On Leave">On Leave</option>
          </select>

          <button
            onClick={() => setIsAddStaffModalOpen(true)}
            className="bg-[#0B332A] hover:bg-[#07241D] text-white px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Staff Members Table */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-sm font-semibold text-neutral-900">
              Staff & Professionals Directory
            </h2>
            <span className="text-[11px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full font-medium">
              {filteredStaff.length} of {staffMembers.length}
            </span>
          </div>
          <span className="text-[11px] text-neutral-400">
            Active Roster FY 2025–26
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#FBF9F5] border-b border-neutral-100 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3.5 pl-4">Member & ID</th>
                <th className="py-3 px-3">Role & Designation</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Allocated Engagements</th>
                <th className="py-3 px-3 text-center">Active Clients</th>
                <th className="py-3 px-3">Utilization</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3.5 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {filteredStaff.map((member) => (
                <tr
                  key={member.id}
                  onClick={() => setSelectedStaff(member)}
                  className="hover:bg-[#FBF9F5]/70 transition-colors group cursor-pointer"
                >
                  {/* Member & ID */}
                  <td className="py-3 px-3.5 pl-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 shadow-2xs ${member.avatarBg}`}>
                        {member.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 group-hover:text-[#0D7A6F] transition-colors leading-tight">
                          {member.name}
                        </div>
                        <div className="text-[10px] text-neutral-400 mt-0.5 flex items-center gap-1.5">
                          <span>{member.id}</span>
                          {member.icabReg && (
                            <>
                              <span>•</span>
                              <span className="text-amber-600 font-medium">{member.icabReg}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role & Designation */}
                  <td className="py-3 px-3">
                    <div className="leading-tight">
                      <div className="font-medium text-neutral-800">
                        {member.designation}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">
                        {member.roleType}
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-3 px-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10.5px] font-medium">
                      {member.department}
                    </span>
                  </td>

                  {/* Allocated Engagements */}
                  <td className="py-3 px-3">
                    <div className="text-[11px] font-medium text-neutral-800 truncate max-w-[220px]">
                      {member.allocatedEngagements.join(', ')}
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      {member.allocatedEngagements.length} current assignments
                    </div>
                  </td>

                  {/* Active Clients */}
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                      {member.activeClientsCount}
                    </span>
                  </td>

                  {/* Utilization */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#07261F] h-full rounded-full"
                          style={{ width: `${member.utilizationRate}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-neutral-900 tabular-nums">
                        {member.utilizationRate}%
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        member.status === 'On Engagement'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : member.status === 'Available'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3.5 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedStaff(member)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold text-[#0D7A6F] bg-[#EAF6F3] hover:bg-[#DDF0EB] transition-colors cursor-pointer"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile Drawer */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedStaff(null)}
          />

          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${selectedStaff.avatarBg}`}>
                  {selectedStaff.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base font-semibold text-neutral-900 truncate">
                    {selectedStaff.name}
                  </h3>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    {selectedStaff.designation}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedStaff(null)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1">
                <div className="text-[10px] text-neutral-400 font-semibold uppercase">Department</div>
                <div className="font-semibold text-neutral-900 text-sm">{selectedStaff.department}</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Member ID: {selectedStaff.id}</div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Contact Information</div>
                <div className="p-3 rounded-xl border border-neutral-100 space-y-2">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{selectedStaff.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{selectedStaff.phone}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Active Client Allocations</div>
                <div className="space-y-1.5">
                  {selectedStaff.allocatedEngagements.map((eng, i) => (
                    <div key={i} className="p-2.5 rounded-xl border border-neutral-100 flex items-center justify-between bg-[#FDFCFB]">
                      <span className="font-medium text-neutral-800 text-[11px]">{eng}</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Active</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">Billable Hours</span>
                  <div className="text-base font-bold text-neutral-900 mt-1 tabular-nums">{selectedStaff.billableHours}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">Utilization</span>
                  <div className="text-base font-bold text-neutral-900 mt-1 tabular-nums">{selectedStaff.utilizationRate}%</div>
                </div>
              </div>
            </div>

            <div className="p-3.5 border-t border-neutral-100 flex items-center justify-end gap-2 bg-[#FBF9F5]">
              <button
                onClick={() => setSelectedStaff(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Assigning new engagement to ${selectedStaff.name}`);
                  setSelectedStaff(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#07261F] hover:bg-[#041B16] rounded-xl shadow-2xs"
              >
                Assign Engagement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Member */}
      {isAddStaffModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsAddStaffModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-200 p-6 z-10 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-serif text-base font-semibold text-neutral-900">
                Add Firm Member / Trainee
              </h3>
              <button
                onClick={() => setIsAddStaffModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-600 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tanvir Hasan, ACA"
                  className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Role Type</label>
                  <select className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]">
                    <option>Partner</option>
                    <option>Manager</option>
                    <option>Senior</option>
                    <option>Articled Student</option>
                    <option>Audit Trainee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Department</label>
                  <select className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]">
                    <option>Audit & Assurance</option>
                    <option>Tax & Advisory</option>
                    <option>Corporate Advisory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">Company Email</label>
                <input
                  type="email"
                  placeholder="member@avenquis.com"
                  className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
              <button
                onClick={() => setIsAddStaffModalOpen(false)}
                className="px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Member successfully added to firm directory.');
                  setIsAddStaffModalOpen(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#07261F] hover:bg-[#041B16] rounded-xl shadow-2xs cursor-pointer"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
