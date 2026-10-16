import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Briefcase,
  UserCheck,
  Search,
  Plus,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: 'Partner' | 'Manager' | 'Student';
  designation: string;
  department: string;
  icabReg?: string;
  batch?: string;
  allocatedClients: string[];
  status: 'Active' | 'On Engagement' | 'In Exam' | 'On Leave';
  stipend?: string;
  email: string;
  phone: string;
}

export const OurTeamPage: React.FC = () => {
  const [filterRole, setFilterRole] = useState<'All' | 'Partner' | 'Manager' | 'Student'>('All');
  const [search, setSearch] = useState('');

  const members: TeamMember[] = [
    {
      id: 'TM-01',
      name: 'Principal Partner (Sir)',
      role: 'Partner',
      designation: 'Senior Managing Partner & Principal Mentor',
      department: 'Audit & Assurance',
      icabReg: 'ICAB-FCA-1284',
      allocatedClients: ['All Firm Engagements'],
      status: 'Active',
      email: 'sir@auditfirm.com',
      phone: '+880 1711-000001',
    },
    {
      id: 'TM-02',
      name: 'Audit Manager (You / In-Charge)',
      role: 'Manager',
      designation: 'Audit & Tax Manager (Team Lead)',
      department: 'Audit, Tax & Corporate Legal',
      allocatedClients: ['Silvee & Sinthee Travels', 'Silco Pharma', 'BD Paint', 'Gulshan Palace'],
      status: 'Active',
      email: 'manager@auditfirm.com',
      phone: '+880 1711-000002',
    },
    {
      id: 'ST-01',
      name: 'Md. Bayezid',
      role: 'Student',
      designation: 'Senior Articled Student (Level II)',
      department: 'Audit & Assurance',
      icabReg: 'ICAB-ART-19842',
      batch: 'Batch 2024-A',
      allocatedClients: ['Silco Pharmaceuticals PLC', 'Master Feed Agrotech'],
      status: 'On Engagement',
      stipend: '12,000',
      email: 'bayezid@auditfirm.com',
      phone: '+880 1912-100001',
    },
    {
      id: 'ST-02',
      name: 'Musabbir',
      role: 'Student',
      designation: 'Articled Student (Level I)',
      department: 'Tax & Corporate Legal',
      icabReg: 'ICAB-ART-20311',
      batch: 'Batch 2024-B',
      allocatedClients: ['Silvee & Sinthee Travels', 'Fortune Shoe'],
      status: 'On Engagement',
      stipend: '12,000',
      email: 'musabbir@auditfirm.com',
      phone: '+880 1912-100002',
    },
    {
      id: 'ST-03',
      name: 'Ifte',
      role: 'Student',
      designation: 'Articled Student (Level I)',
      department: 'Audit & Assurance',
      icabReg: 'ICAB-ART-21094',
      batch: 'Batch 2025-A',
      allocatedClients: ['Advent Pharma', 'BD Paint'],
      status: 'On Engagement',
      stipend: '12,000',
      email: 'ifte@auditfirm.com',
      phone: '+880 1912-100003',
    },
    {
      id: 'ST-04',
      name: 'Sabbir Ahmed',
      role: 'Student',
      designation: 'Senior Articled Student (Level II)',
      department: 'Audit & Assurance',
      icabReg: 'ICAB-ART-19903',
      batch: 'Batch 2024-A',
      allocatedClients: ['Genex Infosys PLC'],
      status: 'Active',
      stipend: '12,000',
      email: 'sabbir@auditfirm.com',
      phone: '+880 1912-100004',
    },
    {
      id: 'ST-05',
      name: 'Anika Tabassum',
      role: 'Student',
      designation: 'Articled Student (Level I)',
      department: 'VAT & Tax Compliance',
      icabReg: 'ICAB-ART-21340',
      batch: 'Batch 2025-A',
      allocatedClients: ['Silvee & Sinthee Travels', 'Gulshan Palace'],
      status: 'Active',
      stipend: '12,000',
      email: 'anika@auditfirm.com',
      phone: '+880 1912-100005',
    },
    {
      id: 'ST-06',
      name: 'Farhan Kabir',
      role: 'Student',
      designation: 'Senior Student (Level III)',
      department: 'Audit & Advisory',
      icabReg: 'ICAB-ART-18450',
      batch: 'Batch 2023-A',
      allocatedClients: ['Silco Pharmaceuticals PLC', 'NRB Club Ltd.'],
      status: 'In Exam',
      stipend: '12,000',
      email: 'farhan@auditfirm.com',
      phone: '+880 1912-100006',
    },
  ];

  const filtered = members.filter((m) => {
    const matchRole = filterRole === 'All' || m.role === filterRole;
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.designation.toLowerCase().includes(search.toLowerCase()) ||
      m.allocatedClients.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    return matchRole && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0f2d25] text-white rounded-2xl p-6 shadow-md border border-[#1b4337] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-1">
            <Users className="w-4 h-4" />
            <span>Firm Team Directory</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
            Our Firm Team & CA Students
          </h1>
          <p className="text-xs text-emerald-200/80 mt-1">
            Principal Partner, Audit Manager, and 6 Articled Students — single unified team dashboard.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1.5 rounded-xl border border-emerald-500/30 font-semibold font-mono">
            Total Team: 8 Members
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">Principal Partner</span>
          <div className="text-2xl font-serif font-bold text-stone-900 mt-1">1 (Sir)</div>
          <span className="text-[11px] text-emerald-700 font-semibold">ICAB FCA Partner</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">Audit Manager</span>
          <div className="text-2xl font-serif font-bold text-stone-900 mt-1">1 (You)</div>
          <span className="text-[11px] text-blue-700 font-semibold">In-Charge & Lead</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">Articled Students</span>
          <div className="text-2xl font-serif font-bold text-stone-900 mt-1">6 Trainees</div>
          <span className="text-[11px] text-amber-700 font-semibold">Active CA Articleship</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">Student Stipend</span>
          <div className="text-xl font-serif font-bold text-stone-900 mt-1">Tk. 12,000</div>
          <span className="text-[11px] text-stone-500">Monthly per student</span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex space-x-1.5">
            {(['All', 'Partner', 'Manager', 'Student'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterRole === r
                    ? 'bg-[#0f2d25] text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {r === 'All' ? 'All (8)' : r === 'Student' ? 'Students (6)' : r}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search member, client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0f2d25]"
            />
          </div>
        </div>

        {/* Unified Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 uppercase text-[10px] tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">Role & Designation</th>
                <th className="py-3 px-4">ICAB Registration / Batch</th>
                <th className="py-3 px-4">Assigned Client Engagements</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Stipend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-stone-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-stone-900 text-sm">{m.name}</div>
                    <div className="text-[11px] text-stone-400 flex items-center space-x-2 mt-0.5">
                      <span>{m.email}</span>
                      <span>•</span>
                      <span>{m.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        m.role === 'Partner'
                          ? 'bg-purple-100 text-purple-800'
                          : m.role === 'Manager'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {m.role}
                    </span>
                    <div className="text-stone-700 font-medium mt-1">{m.designation}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-600">
                    <div>{m.icabReg || '—'}</div>
                    <div className="text-[10px] text-stone-400">{m.batch || ''}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {m.allocatedClients.map((c) => (
                        <span key={c} className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[10px] font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        m.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : m.status === 'On Engagement'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-semibold text-stone-800">
                    {m.stipend ? `Tk. ${m.stipend}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
