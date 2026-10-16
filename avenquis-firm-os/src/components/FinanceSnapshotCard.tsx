import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronDown } from 'lucide-react';

export const FinanceSnapshotCard: React.FC = () => {
  const [period, setPeriod] = useState('This month');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const periods = ['This week', 'This month', 'Last month', 'This quarter'];

  const weeklyData = [
    { week: 'W1', collected: 55, outstanding: 40 },
    { week: 'W2', collected: 70, outstanding: 60 },
    { week: 'W3', collected: 85, outstanding: 45 },
    { week: 'W4', collected: 95, outstanding: 80 },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          Finance snapshot
        </h3>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-800 bg-neutral-50 hover:bg-neutral-100 px-2 py-1 rounded-md transition-colors cursor-pointer"
          >
            <span>{period}</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-20 text-xs">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPeriod(p);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-neutral-50 text-neutral-700"
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3 Metric Stats */}
      <div className="grid grid-cols-3 gap-2 my-2 pt-1 border-b border-neutral-100 pb-3">
        {/* Receivable */}
        <div>
          <div className="text-[10px] font-medium text-neutral-400">Receivable</div>
          <div className="text-sm font-bold text-neutral-900 tabular-nums">
            ৳ 125.6L
          </div>
          <div className="flex items-center text-[10px] font-semibold text-emerald-600 mt-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>15%</span>
          </div>
        </div>

        {/* Collected */}
        <div>
          <div className="text-[10px] font-medium text-neutral-400">Collected</div>
          <div className="text-sm font-bold text-neutral-900 tabular-nums">
            ৳ 42.8L
          </div>
          <div className="flex items-center text-[10px] font-semibold text-emerald-600 mt-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>8%</span>
          </div>
        </div>

        {/* Outstanding */}
        <div>
          <div className="text-[10px] font-medium text-neutral-400">Outstanding</div>
          <div className="text-sm font-bold text-neutral-900 tabular-nums">
            ৳ 82.8L
          </div>
          <div className="flex items-center text-[10px] font-semibold text-[#EF4444] mt-0.5">
            <ArrowDownRight className="w-3 h-3" />
            <span>5%</span>
          </div>
        </div>
      </div>

      {/* Mini Bar Chart */}
      <div className="pt-1">
        <div className="h-16 flex items-end justify-between gap-3 px-2">
          {weeklyData.map((d) => (
            <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center gap-1 h-12">
                <div
                  style={{ height: `${d.collected}%` }}
                  className="w-2.5 bg-[#0D7A6F] rounded-t-sm"
                  title={`Collected: ${d.collected}%`}
                />
                <div
                  style={{ height: `${d.outstanding}%` }}
                  className="w-2.5 bg-[#E2A745] rounded-t-sm"
                  title={`Outstanding: ${d.outstanding}%`}
                />
              </div>
              <span className="text-[10px] font-medium text-neutral-400">
                {d.week}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
