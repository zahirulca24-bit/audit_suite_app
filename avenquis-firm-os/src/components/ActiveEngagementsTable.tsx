import React from 'react';
import { ArrowRight, MoreHorizontal } from 'lucide-react';
import { Engagement } from '../types';

interface ActiveEngagementsTableProps {
  engagements: Engagement[];
  onViewAllClick?: () => void;
  onSelectEngagement?: (engagement: Engagement) => void;
}

export const ActiveEngagementsTable: React.FC<ActiveEngagementsTableProps> = ({
  engagements,
  onViewAllClick,
  onSelectEngagement,
}) => {
  const getStatusBadge = (status: Engagement['status']) => {
    switch (status) {
      case 'In Progress':
        return 'bg-[#DCFCE7] text-[#15803D]';
      case 'Planning':
        return 'bg-[#FFEDD5] text-[#C2410C]';
      case 'Awaiting Client':
        return 'bg-[#FEF3C7] text-[#B45309]';
      case 'Review':
        return 'bg-[#E0F2FE] text-[#0369A1]';
      case 'Completed':
        return 'bg-[#F1F5F9] text-[#475569]';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 60) return 'bg-[#0D7A6F]';
    if (progress >= 40) return 'bg-[#10B981]';
    return 'bg-[#F59E0B]';
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          Active engagements
        </h3>
        <button
          onClick={onViewAllClick}
          className="text-xs font-semibold text-[#0B332A] hover:text-[#061F18] flex items-center gap-1 group cursor-pointer"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="text-neutral-400 font-medium border-b border-neutral-100 text-[11px] pb-2">
              <th className="pb-3 font-medium">Client</th>
              <th className="pb-3 font-medium">Engagement</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">In-charge</th>
              <th className="pb-3 font-medium">Due Date</th>
              <th className="pb-3 font-medium w-36">Progress</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100/80 text-neutral-700">
            {engagements.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectEngagement?.(item)}
                className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
              >
                {/* Client */}
                <td className="py-3 font-medium text-neutral-900 group-hover:text-[#0D7A6F] transition-colors">
                  {item.client}
                </td>

                {/* Engagement */}
                <td className="py-3 text-neutral-600">{item.engagement}</td>

                {/* Type */}
                <td className="py-3 text-neutral-500">{item.type}</td>

                {/* In-charge */}
                <td className="py-3 text-neutral-700 font-medium">
                  {item.inCharge}
                </td>

                {/* Due Date */}
                <td className="py-3 text-neutral-600 tabular-nums">
                  {item.dueDate}
                </td>

                {/* Progress Bar */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-neutral-100 rounded-full h-2 overflow-hidden">
                      <div
                        style={{ width: `${item.progress}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
                          item.progress
                        )}`}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-neutral-500 tabular-nums w-7">
                      {item.progress}%
                    </span>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium leading-normal ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Action Menu */}
                <td className="py-3 text-right">
                  <button
                    type="button"
                    aria-label="More options"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEngagement?.(item);
                    }}
                    className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
