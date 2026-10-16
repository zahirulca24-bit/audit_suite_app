import React, { useState } from 'react';
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Filter,
  Kanban,
  MoreHorizontal,
  Plus,
  Search,
  Table as TableIcon,
  Users,
  X,
} from 'lucide-react';

interface TeamMember {
  initials: string;
  name: string;
  bg: string;
}

interface EngagementRecord {
  code: string;
  client: string;
  service: string;
  partner: string;
  manager: string;
  team: TeamMember[];
  yearEnd: string;
  targetSignOff: string;
  budgetHours: number;
  actualHours: number;
  progress: number;
  stage: 'Planning' | 'Fieldwork' | 'Manager Review' | 'Partner Review' | 'Finalized';
  health: 'On Track' | 'At Risk' | 'Delayed';
}

export const EngagementsTeamsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'grid'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [partnerFilter, setPartnerFilter] = useState('All');
  const [managerFilter, setManagerFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 6 KPI Summary Cards matching Dashboard aesthetic
  const stats = [
    { label: 'Total Engagements', value: '28', sub: 'active portfolio', iconBg: 'bg-emerald-50 text-emerald-700' },
    { label: 'Planning', value: '5', sub: 'scope & letters', iconBg: 'bg-blue-50 text-blue-700' },
    { label: 'Fieldwork / In Progress', value: '12', sub: 'audits underway', iconBg: 'bg-teal-50 text-teal-700' },
    { label: 'In Review', value: '6', sub: 'manager & partner', iconBg: 'bg-amber-50 text-amber-700' },
    { label: 'Completed', value: '3', sub: 'final signed off', iconBg: 'bg-purple-50 text-purple-700' },
    { label: 'Delayed', value: '2', sub: 'requires intervention', iconBg: 'bg-rose-50 text-rose-700' },
  ];

  const kanbanStages: Array<'Planning' | 'Fieldwork' | 'Manager Review' | 'Partner Review' | 'Finalized'> = [
    'Planning',
    'Fieldwork',
    'Manager Review',
    'Partner Review',
    'Finalized',
  ];

  const [engagements, setEngagements] = useState<EngagementRecord[]>([
    {
      code: 'AUD-2026-001',
      client: 'Silco Pharmaceuticals PLC',
      service: 'Statutory Audit',
      partner: 'Shafi Uddin Ahmed, FCA',
      manager: 'Zahirul Islam',
      team: [
        { initials: 'HR', name: 'Hemadry Roy', bg: 'bg-teal-100 text-teal-800' },
        { initials: 'MB', name: 'Md. Bayezid', bg: 'bg-amber-100 text-amber-800' },
        { initials: 'SA', name: 'Sabbir Ahmed', bg: 'bg-purple-100 text-purple-800' },
        { initials: 'AT', name: 'Anika Tabassum', bg: 'bg-rose-100 text-rose-800' },
      ],
      yearEnd: '30 Jun 2026',
      targetSignOff: '15 Oct 2026',
      budgetHours: 320,
      actualHours: 240,
      progress: 70,
      stage: 'Fieldwork',
      health: 'On Track',
    },
    {
      code: 'AUD-2026-002',
      client: 'Genex Infosys PLC',
      service: 'External Audit',
      partner: 'Shafi Uddin Ahmed, FCA',
      manager: 'Hemadry Roy',
      team: [
        { initials: 'FH', name: 'Farhan Kabir', bg: 'bg-indigo-100 text-indigo-800' },
        { initials: 'AT', name: 'Anika Tabassum', bg: 'bg-orange-100 text-orange-800' },
      ],
      yearEnd: '30 Jun 2026',
      targetSignOff: '20 Oct 2026',
      budgetHours: 280,
      actualHours: 120,
      progress: 45,
      stage: 'Planning',
      health: 'On Track',
    },
    {
      code: 'AUD-2026-003',
      client: 'BD Paint',
      service: 'External Audit',
      partner: 'Shafi Uddin Ahmed, FCA',
      manager: 'Bayezid H.',
      team: [
        { initials: 'MS', name: 'Mehvish Sultana', bg: 'bg-blue-100 text-blue-800' },
        { initials: 'NR', name: 'Nadim Rahman', bg: 'bg-rose-100 text-rose-800' },
        { initials: 'SA', name: 'Sabbir Ahmed', bg: 'bg-purple-100 text-purple-800' },
      ],
      yearEnd: '30 Jun 2026',
      targetSignOff: '28 Oct 2026',
      budgetHours: 220,
      actualHours: 110,
      progress: 20,
      stage: 'Fieldwork',
      health: 'Delayed',
    },
    {
      code: 'AUD-2026-004',
      client: 'Advent',
      service: 'External Audit',
      partner: 'Shafi Uddin Ahmed, FCA',
      manager: 'Zahirul Islam',
      team: [
        { initials: 'RT', name: 'Raisa Tasin', bg: 'bg-teal-100 text-teal-800' },
        { initials: 'IH', name: 'Irfan Hossain', bg: 'bg-violet-100 text-violet-800' },
      ],
      yearEnd: '31 Dec 2026',
      targetSignOff: '05 Nov 2026',
      budgetHours: 260,
      actualHours: 160,
      progress: 60,
      stage: 'Fieldwork',
      health: 'On Track',
    },
    {
      code: 'AUD-2026-005',
      client: 'Master Feed Agrotech PLC',
      service: 'External Audit',
      partner: 'Shafi Uddin Ahmed, FCA',
      manager: 'Hemadry Roy',
      team: [
        { initials: 'HR', name: 'Hemadry Roy', bg: 'bg-teal-100 text-teal-800' },
        { initials: 'MB', name: 'Md. Bayezid', bg: 'bg-amber-100 text-amber-800' },
      ],
      yearEnd: '31 Dec 2026',
      targetSignOff: '25 Nov 2026',
      budgetHours: 300,
      actualHours: 270,
      progress: 85,
      stage: 'Manager Review',
      health: 'On Track',
    },
    {
      code: 'AUD-2026-006',
      client: 'Fortune Shoe',
      service: 'External Audit',
      partner: 'Shafi Uddin Ahmed, FCA',
      manager: 'Zahirul Islam',
      team: [
        { initials: 'SA', name: 'Sabbir Ahmed', bg: 'bg-purple-100 text-purple-800' },
        { initials: 'NM', name: 'Nusrat Mim', bg: 'bg-lime-100 text-lime-800' },
      ],
      yearEnd: '30 Jun 2026',
      targetSignOff: '10 Dec 2026',
      budgetHours: 240,
      actualHours: 40,
      progress: 10,
      stage: 'Planning',
      health: 'At Risk',
    },
    {
      code: 'AUD-2026-007',
      client: 'NRB Club Ltd.',
      service: 'Statutory Audit',
      partner: 'Shafi Uddin Ahmed, FCA',
      manager: 'Bayezid H.',
      team: [
        { initials: 'FH', name: 'Farhan Kabir', bg: 'bg-indigo-100 text-indigo-800' },
      ],
      yearEnd: '30 Jun 2026',
      targetSignOff: '30 Oct 2026',
      budgetHours: 180,
      actualHours: 165,
      progress: 90,
      stage: 'Partner Review',
      health: 'On Track',
    },
    {
      code: 'AUD-2026-008',
      client: 'Abdul Monem Ltd. (Igloo)',
      service: 'Inventory Audit',
      partner: 'Shafi Uddin Ahmed, FCA',
      manager: 'Zahirul Islam',
      team: [
        { initials: 'MB', name: 'Md. Bayezid', bg: 'bg-amber-100 text-amber-800' },
        { initials: 'HR', name: 'Hemadry Roy', bg: 'bg-teal-100 text-teal-800' },
      ],
      yearEnd: '31 Oct 2026',
      targetSignOff: '12 Oct 2026',
      budgetHours: 150,
      actualHours: 140,
      progress: 100,
      stage: 'Finalized',
      health: 'On Track',
    },
  ]);

  // Filtering
  const filteredEngagements = engagements.filter((item) => {
    const matchSearch =
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.manager.toLowerCase().includes(searchQuery.toLowerCase());

    const matchService = serviceFilter === 'All' || item.service === serviceFilter;
    const matchPartner = partnerFilter === 'All' || item.partner.includes(partnerFilter);
    const matchManager = managerFilter === 'All' || item.manager.includes(managerFilter);
    const matchHealth = statusFilter === 'All' || item.health === statusFilter;

    return matchSearch && matchService && matchPartner && matchManager && matchHealth;
  });

  return (
    <div className="space-y-6">
      {/* 6 Top Summary KPI Cards (Same visual language as Client CRM) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider truncate">
              {s.label}
            </div>
            <div className="text-2xl font-serif font-bold text-neutral-900 mt-1 tabular-nums">
              {s.value}
            </div>
            <div className="text-[10.5px] text-neutral-400 mt-0.5 truncate">
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Toolbar: Search + Filters + Segmented Switch + Create in ONE clean row */}
      <div className="bg-white p-3 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search engagement, client, or manager..."
            className="w-full text-xs text-neutral-800 placeholder:text-neutral-400 bg-transparent focus:outline-none"
          />
        </div>

        {/* Right: Filters, Segmented Control, + Create */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Service Line Filter */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200/90 text-neutral-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer transition-colors"
          >
            <option value="All">All Service Lines</option>
            <option value="Statutory Audit">Statutory Audit</option>
            <option value="External Audit">External Audit</option>
            <option value="Inventory Audit">Inventory Audit</option>
          </select>

          {/* Partner Filter */}
          <select
            value={partnerFilter}
            onChange={(e) => setPartnerFilter(e.target.value)}
            className="bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200/90 text-neutral-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer transition-colors"
          >
            <option value="All">All Partners</option>
            <option value="Shafi Uddin Ahmed">Shafi Uddin Ahmed, FCA</option>
          </select>

          {/* Manager Filter */}
          <select
            value={managerFilter}
            onChange={(e) => setManagerFilter(e.target.value)}
            className="bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200/90 text-neutral-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer transition-colors"
          >
            <option value="All">All Managers</option>
            <option value="Zahirul Islam">Zahirul Islam</option>
            <option value="Hemadry Roy">Hemadry Roy</option>
            <option value="Bayezid H.">Bayezid H.</option>
          </select>

          {/* Health Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200/90 text-neutral-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer transition-colors"
          >
            <option value="All">All Health</option>
            <option value="On Track">On Track</option>
            <option value="At Risk">At Risk</option>
            <option value="Delayed">Delayed</option>
          </select>

          {/* Internal View Switcher: Compact Segmented Control */}
          <div className="flex items-center bg-neutral-100 p-0.5 rounded-xl border border-neutral-200/80">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
          </div>

          {/* + Create Engagement Button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#0B332A] hover:bg-[#07241D] text-white px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Engagement</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 overflow-x-auto pb-4">
          {kanbanStages.map((stage) => {
            const stageEngagements = filteredEngagements.filter((e) => e.stage === stage);
            return (
              <div
                key={stage}
                className="bg-neutral-100/60 rounded-2xl p-3 border border-neutral-200/70 flex flex-col min-w-[245px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-2.5 px-1">
                  <span className="font-serif text-xs font-semibold text-neutral-900">
                    {stage}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-white text-neutral-700 text-[10px] font-bold flex items-center justify-center border border-neutral-200/80 shadow-2xs">
                    {stageEngagements.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-2.5 flex-1">
                  {stageEngagements.length === 0 ? (
                    <div className="h-28 rounded-xl border border-dashed border-neutral-200/80 flex items-center justify-center text-[10.5px] text-neutral-400">
                      No engagements
                    </div>
                  ) : (
                    stageEngagements.map((eng) => (
                      <div
                        key={eng.code}
                        className="bg-white p-3 rounded-xl border border-neutral-200/80 shadow-2xs hover:shadow-xs hover:border-[#0D7A6F]/50 transition-all cursor-pointer space-y-2 group"
                      >
                        {/* 1. Client Name (Visually strongest) */}
                        <div className="font-semibold text-neutral-900 text-xs group-hover:text-[#0D7A6F] transition-colors leading-snug line-clamp-1">
                          {eng.client}
                        </div>

                        {/* 2. Service / Code + Health badge */}
                        <div className="flex items-center justify-between text-[10.5px]">
                          <span className="text-neutral-500 font-medium truncate max-w-[130px]">
                            {eng.service} • <span className="font-mono text-neutral-400">{eng.code}</span>
                          </span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider shrink-0 border ${
                              eng.health === 'On Track'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : eng.health === 'At Risk'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {eng.health}
                          </span>
                        </div>

                        {/* Partner & Manager */}
                        <div className="text-[10px] text-neutral-500 space-y-0.5 pt-1 border-t border-neutral-100">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Partner:</span>
                            <span className="font-medium text-neutral-700 truncate max-w-[125px]">
                              {eng.partner.replace(', FCA', '')}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Manager:</span>
                            <span className="font-medium text-neutral-700 truncate max-w-[125px]">
                              {eng.manager}
                            </span>
                          </div>
                        </div>

                        {/* 3. Progress Bar & % */}
                        <div className="space-y-1 pt-0.5">
                          <div className="flex justify-between text-[10px] text-neutral-500 font-medium tabular-nums">
                            <span>{eng.actualHours}h / {eng.budgetHours}h</span>
                            <span className="text-neutral-800 font-semibold">{eng.progress}%</span>
                          </div>
                          <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#0D7A6F] h-full rounded-full transition-all"
                              style={{ width: `${eng.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* 4. Team Avatars + Target Sign-off */}
                        <div className="flex items-center justify-between pt-1 border-t border-neutral-50">
                          <div className="flex -space-x-1">
                            {eng.team.slice(0, 3).map((m, i) => (
                              <span
                                key={i}
                                title={m.name}
                                className={`w-5 h-5 rounded-full text-[8.5px] font-bold flex items-center justify-center ring-1.5 ring-white shadow-2xs ${m.bg}`}
                              >
                                {m.initials}
                              </span>
                            ))}
                            {eng.team.length > 3 && (
                              <span className="w-5 h-5 rounded-full text-[8.5px] font-bold flex items-center justify-center ring-1.5 ring-white bg-neutral-200 text-neutral-700">
                                +{eng.team.length - 3}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-neutral-500 font-medium">
                            Due: <span className="text-neutral-800">{eng.targetSignOff}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#FBF9F5] border-b border-neutral-100 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3.5 pl-4">Engagement</th>
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3">Service</th>
                  <th className="py-3 px-3">Leadership</th>
                  <th className="py-3 px-3">Assigned Team</th>
                  <th className="py-3 px-3">Year End</th>
                  <th className="py-3 px-3">Target Sign-off</th>
                  <th className="py-3 px-3">Budget vs Actual</th>
                  <th className="py-3 px-3">Progress</th>
                  <th className="py-3 px-3 text-center">Stage</th>
                  <th className="py-3 px-3 text-center">Health</th>
                  <th className="py-3 px-3.5 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {filteredEngagements.map((eng) => (
                  <tr
                    key={eng.code}
                    className="hover:bg-[#FBF9F5]/70 transition-colors group cursor-pointer"
                  >
                    {/* Engagement Code */}
                    <td className="py-3 px-3.5 pl-4 font-mono font-medium text-neutral-900 group-hover:text-[#0D7A6F]">
                      {eng.code}
                    </td>

                    {/* Client */}
                    <td className="py-3 px-3 font-semibold text-neutral-900">
                      {eng.client}
                    </td>

                    {/* Service */}
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[10.5px] font-medium">
                        {eng.service}
                      </span>
                    </td>

                    {/* Leadership Cell: Partner + Manager underneath */}
                    <td className="py-3 px-3">
                      <div className="leading-tight">
                        <div className="font-medium text-neutral-800">
                          {eng.partner}
                        </div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">
                          Mgr: {eng.manager}
                        </div>
                      </div>
                    </td>

                    {/* Assigned Team: Compact avatar initials, max 4 +N */}
                    <td className="py-3 px-3">
                      <div className="flex -space-x-1">
                        {eng.team.slice(0, 4).map((m, i) => (
                          <span
                            key={i}
                            title={m.name}
                            className={`w-5 h-5 rounded-full text-[8.5px] font-bold flex items-center justify-center ring-1.5 ring-white shadow-2xs ${m.bg}`}
                          >
                            {m.initials}
                          </span>
                        ))}
                        {eng.team.length > 4 && (
                          <span className="w-5 h-5 rounded-full text-[8.5px] font-bold flex items-center justify-center ring-1.5 ring-white bg-neutral-200 text-neutral-700">
                            +{eng.team.length - 4}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Year End */}
                    <td className="py-3 px-3 text-neutral-600">
                      {eng.yearEnd}
                    </td>

                    {/* Target Sign-off */}
                    <td className="py-3 px-3 text-neutral-800 font-medium">
                      {eng.targetSignOff}
                    </td>

                    {/* Budget vs Actual with mini bar */}
                    <td className="py-3 px-3">
                      <div className="space-y-1">
                        <div className="text-[11px] tabular-nums text-neutral-700">
                          <span className="font-semibold">{eng.actualHours}h</span> / {eng.budgetHours}h
                        </div>
                        <div className="w-16 bg-neutral-100 h-1 rounded-full overflow-hidden">
                          <div
                            className="bg-[#0D7A6F] h-full rounded-full"
                            style={{ width: `${Math.min((eng.actualHours / eng.budgetHours) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="py-3 px-3 font-semibold text-neutral-900 tabular-nums">
                      {eng.progress}%
                    </td>

                    {/* Stage Badge */}
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10.5px] font-medium border border-blue-100">
                        {eng.stage}
                      </span>
                    </td>

                    {/* Health Badge (Separate from Stage) */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                          eng.health === 'On Track'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : eng.health === 'At Risk'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {eng.health}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3.5 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        aria-label="Actions"
                        className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md hover:bg-neutral-100 transition-colors"
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Create Engagement */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCreateModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-neutral-200 p-6 z-10 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-serif text-base font-semibold text-neutral-900">
                Plan New Engagement & Assign Team
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-600 font-medium mb-1">Client Entity</label>
                <input
                  type="text"
                  placeholder="e.g. Silco Pharmaceuticals PLC"
                  className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Service Type</label>
                  <select className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]">
                    <option>Statutory Audit</option>
                    <option>External Audit</option>
                    <option>Inventory Audit</option>
                    <option>Tax Assessment & Advisory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Lead Partner</label>
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
                  <label className="block text-neutral-600 font-medium mb-1">Engagement Manager</label>
                  <select className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]">
                    <option>Zahirul Islam</option>
                    <option>Hemadry Roy</option>
                    <option>Bayezid H.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Target Sign-off Date</label>
                  <input
                    type="date"
                    className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Budgeted Hours</label>
                  <input
                    type="number"
                    placeholder="e.g. 240"
                    className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Audit Year End</label>
                  <input
                    type="text"
                    placeholder="30 June 2026"
                    className="w-full border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:border-[#0D7A6F]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Engagement successfully created and assigned to team.');
                  setIsCreateModalOpen(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0B332A] hover:bg-[#07241D] rounded-xl shadow-2xs cursor-pointer"
              >
                Assign & Launch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
