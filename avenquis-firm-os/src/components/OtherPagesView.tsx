import React from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Download, FileText, Filter, Plus, Search, Users } from 'lucide-react';
import { Engagement } from '../types';

interface OtherPagesViewProps {
  pageId: string;
  onBackToDashboard: () => void;
  engagements: Engagement[];
}

export const OtherPagesView: React.FC<OtherPagesViewProps> = ({
  pageId,
  onBackToDashboard,
  engagements,
}) => {
  const getPageTitle = () => {
    switch (pageId) {
      case 'people-staff':
      case 'student-staff':
        return {
          title: 'People & Staff',
          subtitle: 'Manage audit trainees, managers, chartered accountants, and team allocations',
        };
      case 'students-articleship':
        return {
          title: 'Students / Articleship',
          subtitle: 'Articleship training logs, registration records, and progression monitoring',
        };
      case 'client-crm':
      case 'client-portal':
        return {
          title: 'Client CRM',
          subtitle: 'Client directories, contact partners, billing entities, and communication records',
        };
      case 'engagements-teams':
      case 'engagements':
        return {
          title: 'Engagements & Teams',
          subtitle: 'Statutory audits, special assignments, team assignments, and due date schedules',
        };
      case 'tasks-deadlines':
        return {
          title: 'Tasks & Deadlines',
          subtitle: 'Audit fieldwork checkpoints, tax submission dates, and operational deliverables',
        };
      case 'timesheets':
      case 'timesheet':
        return {
          title: 'Timesheets',
          subtitle: 'Track team hours across audit engagements and review client billing logs',
        };
      case 'document-vault':
      case 'documents':
        return {
          title: 'Document Vault',
          subtitle: 'Secure permanent files, tax return receipts, and statutory audit registers',
        };
      case 'working-papers':
        return {
          title: 'Working Papers',
          subtitle: 'Lead schedules, sampling documentation, audit test sheets, and corroborating evidence',
        };
      case 'review-signoffs':
      case 'approvals':
        return {
          title: 'Review & Sign-offs',
          subtitle: 'Partner reviews, engagement quality control reviews (EQCR), and final sign-offs',
        };
      case 'client-requests':
        return {
          title: 'Client Requests',
          subtitle: 'Pending schedules, bank confirmation requests, and inventory certificates',
        };
      case 'office-finance':
      case 'finance':
        return {
          title: 'Office Finance',
          subtitle: 'Fee recovery, outstanding receivables, billing schedules, and collections',
        };
      case 'settings':
        return {
          title: 'Settings',
          subtitle: 'Firm configuration, roles, access permissions, and notification triggers',
        };
      case 'workspace':
        return {
          title: 'Office Workspace',
          subtitle: 'Collaborative workspaces, agendas, and central operational drives',
        };
      default:
        return {
          title: 'Avenquis Workspace',
          subtitle: 'Smart Office Management',
        };
    }
  };

  const pageInfo = getPageTitle();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top action row */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#0D7A6F] hover:text-[#09574E] cursor-pointer bg-white px-3 py-1.5 rounded-full border border-neutral-200 shadow-2xs hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 rounded-full border border-neutral-200 text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-50 cursor-pointer shadow-2xs"
          >
            Return to Overview
          </button>
          <button
            className="px-4 py-2 rounded-full bg-[#0B332A] text-white text-xs font-medium hover:bg-[#07241D] flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Record</span>
          </button>
        </div>
      </div>

      {/* Content Area according to Page */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-neutral-100">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${pageInfo.title.toLowerCase()}...`}
              className="w-full text-xs pl-9 pr-4 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#0D7A6F]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs border border-neutral-200 rounded-xl text-neutral-600 hover:bg-neutral-50">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter by Status</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs border border-neutral-200 rounded-xl text-neutral-600 hover:bg-neutral-50">
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Directory Listing / Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="text-neutral-400 font-medium border-b border-neutral-100 text-[11px]">
                <th className="pb-3">Client / Entity</th>
                <th className="pb-3">Service Scope</th>
                <th className="pb-3">Assigned Lead</th>
                <th className="pb-3">Target Deadline</th>
                <th className="pb-3">Progress</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {engagements.map((eng) => (
                <tr key={eng.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3.5 font-semibold text-neutral-900">
                    {eng.client}
                  </td>
                  <td className="py-3.5 text-neutral-600">{eng.engagement}</td>
                  <td className="py-3.5 text-neutral-700">{eng.inCharge}</td>
                  <td className="py-3.5 text-neutral-600 tabular-nums">
                    {eng.dueDate}
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2 w-28">
                      <div className="flex-1 bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          style={{ width: `${eng.progress}%` }}
                          className="h-full bg-[#0D7A6F] rounded-full"
                        />
                      </div>
                      <span className="text-[11px] text-neutral-500 tabular-nums">
                        {eng.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#DCFCE7] text-[#15803D]">
                      {eng.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button className="text-xs font-semibold text-[#0D7A6F] hover:underline">
                      View details
                    </button>
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
