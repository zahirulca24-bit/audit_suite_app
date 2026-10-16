import React from 'react';

// Common interface for list/table view pages
export interface BasePageViewProps {
  pageTitle: string;
  pageSubtitle: string;
  stats: { label: string; value: string | number; change?: string }[];
  filters: React.ReactNode;
  tableHeader: string[];
  tableRows: React.ReactNode[];
  onBack: () => void;
}

export const BasePageView: React.FC<BasePageViewProps> = ({
  pageTitle,
  pageSubtitle,
  stats,
  filters,
  tableHeader,
  tableRows,
  onBack,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-neutral-900 tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">{pageSubtitle}</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              {stat.label}
            </div>
            <div className="text-2xl font-bold text-neutral-900 mt-1 tabular-nums">
              {stat.value}
            </div>
            {stat.change && (
              <div className="text-[11px] font-semibold text-emerald-600 mt-0.5">
                {stat.change}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          {filters}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="text-neutral-400 font-medium border-b border-neutral-100 text-[11px]">
                {tableHeader.map((h, i) => (
                  <th key={i} className="pb-3 px-2 first:pl-0 last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
