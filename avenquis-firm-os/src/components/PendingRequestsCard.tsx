import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ClientRequest } from '../types';

interface PendingRequestsCardProps {
  requests: ClientRequest[];
  onViewAllClick?: () => void;
  onRequestClick?: (req: ClientRequest) => void;
}

export const PendingRequestsCard: React.FC<PendingRequestsCardProps> = ({
  requests,
  onViewAllClick,
  onRequestClick,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          Pending client requests
        </h3>
        <button
          onClick={onViewAllClick}
          className="text-xs font-semibold text-[#0B332A] hover:text-[#061F18] flex items-center gap-1 group cursor-pointer"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Mini Table */}
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="text-neutral-400 font-medium border-b border-neutral-100 text-[10px]">
              <th className="pb-2 font-medium">Client</th>
              <th className="pb-2 font-medium">Request</th>
              <th className="pb-2 font-medium">Due Date</th>
              <th className="pb-2 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100/70 text-neutral-700">
            {requests.map((r) => {
              const isReceived = r.status === 'Received';
              return (
                <tr
                  key={r.id}
                  onClick={() => onRequestClick?.(r)}
                  className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                >
                  {/* Client */}
                  <td className="py-2.5 font-medium text-neutral-900 text-[11px] max-w-[110px] truncate group-hover:text-[#0D7A6F]">
                    {r.client}
                  </td>
                  {/* Request */}
                  <td className="py-2.5 text-neutral-600 text-[11px] max-w-[100px] truncate">
                    {r.request}
                  </td>
                  {/* Due Date */}
                  <td className="py-2.5 text-neutral-500 text-[11px] tabular-nums">
                    {r.dueDate}
                  </td>
                  {/* Status Badge */}
                  <td className="py-2.5 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        isReceived
                          ? 'bg-[#E0F2FE] text-[#0369A1]'
                          : 'bg-[#FEF3C7] text-[#B45309]'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
