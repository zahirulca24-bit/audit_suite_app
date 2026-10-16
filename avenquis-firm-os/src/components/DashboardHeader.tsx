import React from 'react';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  dateLabel?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = 'Good morning, Admin.',
  subtitle = "Here's what's happening across your workspace today.",
  dateLabel = 'MONDAY, 12 OCTOBER 2026',
}) => {
  return (
    <div className="pb-2">
      {/* Date / Eyebrow */}
      {dateLabel && (
        <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#0D7A6F]">
          {dateLabel}
        </div>
      )}

      {/* Page Title */}
      <h1 className="font-serif text-3xl sm:text-[34px] font-semibold text-neutral-900 tracking-tight mt-1">
        {title}
      </h1>

      {/* Page Subtitle */}
      {subtitle && (
        <p className="text-xs text-neutral-500 mt-1 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
