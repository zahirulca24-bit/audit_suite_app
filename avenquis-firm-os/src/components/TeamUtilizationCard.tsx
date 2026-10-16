import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TeamUtilizationCardProps {
  onViewAllClick?: () => void;
}

export const TeamUtilizationCard: React.FC<TeamUtilizationCardProps> = ({
  onViewAllClick,
}) => {
  const legendItems = [
    { label: 'Assigned', count: 28, color: '#0D7A6F' },
    { label: 'Available', count: 8, color: '#6EE7B7' },
    { label: 'On leave', count: 3, color: '#F97316' },
    { label: 'Over capacity', count: 2, color: '#EF4444' },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          Team utilization
        </h3>
        <button
          onClick={onViewAllClick}
          className="text-xs font-semibold text-[#0B332A] hover:text-[#061F18] flex items-center gap-1 group cursor-pointer"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Donut and Legend Layout */}
      <div className="flex items-center justify-between gap-4 mt-2">
        {/* SVG Donut Chart */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth="11"
            />
            {/* Assigned: 28/41 ~ 68% -> stroke-dasharray="162 238" */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#0D7A6F"
              strokeWidth="11"
              strokeDasharray="162 238"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Available: 8/41 ~ 19% -> stroke-dasharray="45 238" offset 166 */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#6EE7B7"
              strokeWidth="11"
              strokeDasharray="45 238"
              strokeDashoffset="-164"
            />
            {/* On leave: 3/41 ~ 7% */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#F97316"
              strokeWidth="11"
              strokeDasharray="18 238"
              strokeDashoffset="-211"
            />
            {/* Over capacity: 2/41 ~ 5% */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#EF4444"
              strokeWidth="11"
              strokeDasharray="12 238"
              strokeDashoffset="-231"
            />
          </svg>

          {/* Centered Donut Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-xl font-bold font-serif text-neutral-900 leading-none">
              78%
            </span>
            <span className="text-[9px] text-neutral-500 font-medium mt-0.5">
              Utilization
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2">
          {legendItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: item.color }}
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                />
                <span className="text-neutral-600 text-xs font-medium">
                  {item.label}
                </span>
              </div>
              <span className="font-semibold text-neutral-800 tabular-nums">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
