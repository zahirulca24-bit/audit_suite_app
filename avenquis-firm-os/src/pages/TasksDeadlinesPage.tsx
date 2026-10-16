import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from 'lucide-react';

interface TasksDeadlinesPageProps {
  onBack?: () => void;
}

export const TasksDeadlinesPage: React.FC<TasksDeadlinesPageProps> = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'team' | 'overdue'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const stats = [
    {
      label: 'Total Tasks',
      value: '48',
      change: '↑ 12%',
      sub: 'vs last month',
      icon: FileText,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Completed',
      value: '20',
      change: '↑ 42%',
      sub: 'vs last month',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'In Progress',
      value: '20',
      change: '↑ 8%',
      sub: 'vs last month',
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Overdue',
      value: '6',
      change: '↓ 50%',
      sub: 'vs last month',
      isNegative: true,
      icon: AlertCircle,
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      label: 'Due This Week',
      value: '14',
      change: '↑ 27%',
      sub: 'vs last month',
      icon: Calendar,
      iconBg: 'bg-purple-50 text-purple-600',
    },
  ];

  const tasksList = [
    {
      id: 'T01',
      title: 'Review inventory schedule',
      ref: 'AUD-2026-001-T01',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit 2025-26',
      assignee: 'Hemadry Roy',
      initials: 'HR',
      initialsBg: 'bg-teal-100 text-teal-800',
      dueDate: '12 Oct 2026',
      isOverdue: true,
      priority: 'High',
      status: 'In Progress',
      progress: 70,
    },
    {
      id: 'T02',
      title: 'Prepare tax computation',
      ref: 'AUD-2026-001-T02',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit 2025-26',
      assignee: 'Md. Bayezid',
      initials: 'MB',
      initialsBg: 'bg-amber-100 text-amber-800',
      dueDate: '15 Oct 2026',
      priority: 'High',
      status: 'Not Started',
      progress: 0,
    },
    {
      id: 'T03',
      title: 'Send bank confirmation',
      ref: 'AUD-2026-001-T03',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit 2025-26',
      assignee: 'Zahirul Islam',
      initials: 'ZI',
      initialsBg: 'bg-emerald-100 text-emerald-800',
      dueDate: '16 Oct 2026',
      priority: 'Medium',
      status: 'In Progress',
      progress: 40,
    },
    {
      id: 'T04',
      title: 'Update fixed asset register',
      ref: 'AUD-2026-001-T04',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit 2025-26',
      assignee: 'Sabbir Ahmed',
      initials: 'SA',
      initialsBg: 'bg-purple-100 text-purple-800',
      dueDate: '18 Oct 2026',
      priority: 'Medium',
      status: 'Review',
      progress: 80,
    },
    {
      id: 'T05',
      title: 'Draft management letter',
      ref: 'AUD-2026-001-T05',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit 2025-26',
      assignee: 'Farhan Kabir',
      initials: 'FH',
      initialsBg: 'bg-indigo-100 text-indigo-800',
      dueDate: '20 Oct 2026',
      priority: 'Low',
      status: 'Not Started',
      progress: 0,
    },
    {
      id: 'T06',
      title: 'Check related party schedule',
      ref: 'AUD-2026-001-T06',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit 2025-26',
      assignee: 'Anika Tabassum',
      initials: 'AT',
      initialsBg: 'bg-orange-100 text-orange-800',
      dueDate: '22 Oct 2026',
      priority: 'Medium',
      status: 'In Progress',
      progress: 50,
    },
    {
      id: 'T07',
      title: 'Verify production records',
      ref: 'AUD-2026-001-T07',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit 2025-26',
      assignee: 'Mehvish Sultana',
      initials: 'MS',
      initialsBg: 'bg-blue-100 text-blue-800',
      dueDate: '25 Oct 2026',
      priority: 'Low',
      status: 'Not Started',
      progress: 0,
    },
    {
      id: 'T08',
      title: 'Review NRV / slow moving',
      ref: 'AUD-2026-001-T08',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit 2025-26',
      assignee: 'Nadia Sharmin',
      initials: 'NA',
      initialsBg: 'bg-slate-100 text-slate-800',
      dueDate: '28 Oct 2026',
      priority: 'High',
      status: 'Not Started',
      progress: 0,
    },
    {
      id: 'T09',
      title: 'Finalize inventory working paper',
      ref: 'AUD-2026-001-T09',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit 2025-26',
      assignee: 'Md. Bayezid',
      initials: 'MB',
      initialsBg: 'bg-amber-100 text-amber-800',
      dueDate: '30 Oct 2026',
      priority: 'High',
      status: 'In Progress',
      progress: 30,
    },
    {
      id: 'T10',
      title: 'Partner review & sign-off',
      ref: 'AUD-2026-001-T10',
      client: 'Silco Pharmaceuticals PLC',
      engagement: 'Statutory Audit 2025-26',
      assignee: 'Shafi Uddin Ahmed',
      initials: 'SZ',
      initialsBg: 'bg-violet-100 text-violet-800',
      dueDate: '02 Nov 2026',
      priority: 'High',
      status: 'Pending',
      progress: 10,
    },
  ];

  const upcomingDeadlines = [
    { date: '12 Oct 2026', title: 'Review inventory schedule', client: 'Silco Pharmaceuticals PLC', priority: 'High', color: 'bg-rose-500' },
    { date: '15 Oct 2026', title: 'Prepare tax computation', client: 'Silco Pharmaceuticals PLC', priority: 'Medium', color: 'bg-amber-500' },
    { date: '16 Oct 2026', title: 'Send bank confirmation', client: 'Silco Pharmaceuticals PLC', priority: 'High', color: 'bg-rose-500' },
    { date: '20 Oct 2026', title: 'Draft management letter', client: 'Silco Pharmaceuticals PLC', priority: 'Low', color: 'bg-blue-500' },
    { date: '22 Oct 2026', title: 'Check related party schedule', client: 'Silco Pharmaceuticals PLC', priority: 'Medium', color: 'bg-amber-500' },
  ];

  const filteredTasks = tasksList.filter((task) => {
    if (activeTab === 'overdue') return task.isOverdue;
    if (activeTab === 'my') return task.assignee.includes('Admin') || task.assignee.includes('Zahirul');
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const toggleSelectTask = (id: string) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Tabs Filter Row */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#0B332A] text-white shadow-xs'
              : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80'
          }`}
        >
          All Tasks (48)
        </button>
        <button
          onClick={() => setActiveTab('my')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'my'
              ? 'bg-[#0B332A] text-white shadow-xs'
              : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80'
          }`}
        >
          My Tasks (12)
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'team'
              ? 'bg-[#0B332A] text-white shadow-xs'
              : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80'
          }`}
        >
          Team Tasks (36)
        </button>
        <button
          onClick={() => setActiveTab('overdue')}
          className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'overdue'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'bg-white text-rose-600 hover:bg-rose-50 border border-rose-200'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Overdue (6)</span>
        </button>
      </div>

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
                <span className={s.isNegative ? 'text-rose-600' : 'text-emerald-600'}>
                  {s.change}
                </span>
                <span className="text-neutral-400">{s.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, client, engagement, or assignee..."
            className="w-full text-xs text-neutral-800 placeholder:text-neutral-400 bg-transparent focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select className="bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs rounded-xl px-3 py-1.5 focus:outline-none">
            <option>All Engagements</option>
            <option>Statutory Audit 2025-26</option>
            <option>External Audit 2026</option>
          </select>
          <select className="bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs rounded-xl px-3 py-1.5 focus:outline-none">
            <option>All Assignees</option>
            <option>Hemadry Roy</option>
            <option>Md. Bayezid</option>
            <option>Zahirul Islam</option>
          </select>
          <select className="bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs rounded-xl px-3 py-1.5 focus:outline-none">
            <option>All Status</option>
            <option>In Progress</option>
            <option>Not Started</option>
            <option>Review</option>
          </select>
          <select className="bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs rounded-xl px-3 py-1.5 focus:outline-none">
            <option>All Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button className="bg-[#0B332A] hover:bg-[#07241D] text-white px-4 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Tasks Table + Right Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Table Section (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-serif text-base font-semibold text-neutral-900">
              Tasks ({filteredTasks.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#FBF9F5] border-b border-neutral-100 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <tr>
                  <th className="p-3 pl-4 w-8">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) setSelectedTasks(filteredTasks.map((t) => t.id));
                        else setSelectedTasks([]);
                      }}
                      checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                      className="rounded border-neutral-300 accent-[#0D7A6F]"
                    />
                  </th>
                  <th className="p-3">Task & Reference</th>
                  <th className="p-3">Client / Engagement</th>
                  <th className="p-3">Assignee</th>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Progress</th>
                  <th className="p-3 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {filteredTasks.map((task) => {
                  const isChecked = selectedTasks.includes(task.id);
                  return (
                    <tr
                      key={task.id}
                      className={`hover:bg-[#FBF9F5]/70 transition-colors ${
                        isChecked ? 'bg-[#F2F8F6]' : ''
                      }`}
                    >
                      <td className="p-3 pl-4">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectTask(task.id)}
                          className="rounded border-neutral-300 accent-[#0D7A6F]"
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-neutral-900 leading-tight">
                          {task.title}
                        </div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">{task.ref}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-neutral-800 leading-tight">
                          {task.client}
                        </div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">{task.engagement}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${task.initialsBg}`}
                          >
                            {task.initials}
                          </span>
                          <span className="text-neutral-700">{task.assignee}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span
                          className={
                            task.isOverdue
                              ? 'text-rose-600 font-semibold'
                              : 'text-neutral-700'
                          }
                        >
                          {task.dueDate}
                          {task.isOverdue && ' (Overdue)'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            task.priority === 'High'
                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                              : task.priority === 'Medium'
                              ? 'bg-amber-50 text-amber-600 border border-amber-200'
                              : 'bg-blue-50 text-blue-600 border border-blue-200'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                            task.status === 'In Progress'
                              ? 'bg-emerald-50 text-emerald-700'
                              : task.status === 'Review'
                              ? 'bg-purple-50 text-purple-700'
                              : task.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#0D7A6F] h-full rounded-full transition-all"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-neutral-400 font-medium tabular-nums">
                            {task.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="p-3 pr-4 text-right">
                        <button className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md hover:bg-neutral-100 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="p-3.5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Showing 1 to {filteredTasks.length} of 48 tasks</span>
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

        {/* Right Rail (4 cols): Calendar, Upcoming Deadlines, Task Distribution */}
        <div className="lg:col-span-4 space-y-5">
          {/* Calendar Widget */}
          <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-sm font-semibold text-neutral-900">
                Calendar / Deadlines
              </h3>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 rounded-md hover:bg-neutral-100 flex items-center justify-center text-neutral-500">
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button className="w-6 h-6 rounded-md hover:bg-neutral-100 flex items-center justify-center text-neutral-500">
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="text-xs font-semibold text-neutral-800 mb-2">October 2026</div>

            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-neutral-400 font-medium mb-1">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              <span className="text-neutral-300 py-1">27</span>
              <span className="text-neutral-300 py-1">28</span>
              <span className="text-neutral-300 py-1">29</span>
              <span className="text-neutral-300 py-1">30</span>
              <span className="text-neutral-300 py-1">31</span>
              <span className="py-1">1</span>
              <span className="py-1">2</span>
              <span className="py-1">3</span>
              <span className="py-1">4</span>
              <span className="py-1">5</span>
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center font-bold">
                6
              </span>
              <span className="py-1">7</span>
              <span className="py-1">8</span>
              <span className="py-1">9</span>
              <span className="py-1">10</span>
              <span className="py-1">11</span>
              <span className="w-6 h-6 rounded-full bg-rose-500 text-white mx-auto flex items-center justify-center font-bold shadow-xs">
                12
              </span>
              <span className="py-1">13</span>
              <span className="py-1">14</span>
              <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 mx-auto flex items-center justify-center font-bold">
                15
              </span>
              <span className="py-1">16</span>
              <span className="py-1">17</span>
              <span className="py-1">18</span>
              <span className="py-1">19</span>
              <span className="py-1">20</span>
              <span className="py-1">21</span>
              <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 mx-auto flex items-center justify-center font-bold">
                22
              </span>
              <span className="py-1">23</span>
              <span className="py-1">24</span>
              <span className="py-1">25</span>
              <span className="py-1">26</span>
              <span className="py-1">27</span>
              <span className="py-1">28</span>
              <span className="py-1">29</span>
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 mx-auto flex items-center justify-center font-bold">
                30
              </span>
              <span className="py-1">31</span>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-sm font-semibold text-neutral-900">
                Upcoming Deadlines
              </h3>
              <a href="#deadlines" className="text-[11px] font-semibold text-[#0D7A6F] hover:underline">
                View all →
              </a>
            </div>

            <div className="space-y-2.5">
              {upcomingDeadlines.map((d, i) => (
                <div key={i} className="flex items-start justify-between text-xs p-1.5 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start gap-2">
                    <span className={`w-2 h-2 rounded-full ${d.color} mt-1 shrink-0`} />
                    <div>
                      <div className="font-semibold text-neutral-800 leading-tight">
                        {d.title}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{d.client}</div>
                      <div className="text-[10px] text-neutral-500 font-medium mt-0.5">{d.date}</div>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                      d.priority === 'High'
                        ? 'bg-rose-50 text-rose-600'
                        : d.priority === 'Medium'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    {d.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Distribution Donut Chart */}
          <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-sm font-semibold text-neutral-900">
                Task Distribution
              </h3>
              <a href="#distribution" className="text-[11px] font-semibold text-[#0D7A6F] hover:underline">
                View all →
              </a>
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* Donut Graphic */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Total circle */}
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                  {/* Segment 1: In Progress 20/48 = 41.6% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#0D7A6F"
                    strokeWidth="4"
                    strokeDasharray="36.5 88"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: Not Started 14/48 = 29% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#64748B"
                    strokeWidth="4"
                    strokeDasharray="25.5 88"
                    strokeDashoffset="-36.5"
                  />
                  {/* Segment 3: Review 8/48 = 16.6% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="4"
                    strokeDasharray="14.6 88"
                    strokeDashoffset="-62"
                  />
                  {/* Segment 4: Completed 6/48 = 12.5% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="4"
                    strokeDasharray="11 88"
                    strokeDashoffset="-76.6"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-serif text-xl font-bold text-neutral-900 leading-none">48</span>
                  <span className="text-[10px] text-neutral-400 font-medium">Tasks</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-1.5 text-xs flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#64748B]" />
                    <span className="text-neutral-600 text-[11px]">Not Started</span>
                  </div>
                  <span className="font-bold text-neutral-800">14</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0D7A6F]" />
                    <span className="text-neutral-600 text-[11px]">In Progress</span>
                  </div>
                  <span className="font-bold text-neutral-800">20</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span className="text-neutral-600 text-[11px]">Review</span>
                  </div>
                  <span className="font-bold text-neutral-800">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                    <span className="text-neutral-600 text-[11px]">Completed</span>
                  </div>
                  <span className="font-bold text-neutral-800">6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
