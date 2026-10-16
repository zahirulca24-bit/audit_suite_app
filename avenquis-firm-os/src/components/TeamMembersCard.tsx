import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { MONTHLY_TEAM_DATA } from '../data/mockData';

export const TeamMembersCard: React.FC = () => {
  const [hoveredMonth, setHoveredMonth] = useState<{
    month: string;
    count: number;
  } | null>(null);

  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs flex flex-col justify-between h-full min-h-[220px]">
      {/* Top Header */}
      <div>
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">
          TEAM MEMBERS
        </div>
        <div className="flex items-baseline gap-3 mt-1">
          <span className="font-serif text-3xl font-bold text-neutral-900 tabular-nums">
            128
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>12% vs last month</span>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mt-4 pt-2">
        <div className="h-24 flex items-end justify-between gap-1.5 sm:gap-2 px-1 relative">
          {hoveredMonth && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
              {hoveredMonth.month}: {hoveredMonth.count} members
            </div>
          )}

          {MONTHLY_TEAM_DATA.map((item) => {
            const isJune = item.month === 'Jun';
            const barBg = isJune
              ? 'bg-[#E39D43] hover:bg-[#D58C30]'
              : 'bg-[#98D2C5] hover:bg-[#7DC4B5]';

            return (
              <div
                key={item.month}
                onMouseEnter={() => setHoveredMonth({ month: item.month, count: item.count })}
                onMouseLeave={() => setHoveredMonth(null)}
                className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer h-full justify-end"
              >
                <div
                  style={{ height: `${item.heightPercent}%` }}
                  className={`w-full rounded-t-md transition-all duration-300 ${barBg}`}
                />
              </div>
            );
          })}
        </div>

        {/* Month Labels */}
        <div className="flex items-center justify-between text-[10px] font-medium text-neutral-400 mt-2 px-1">
          {MONTHLY_TEAM_DATA.map((item) => (
            <span key={item.month} className="text-center flex-1">
              {item.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
