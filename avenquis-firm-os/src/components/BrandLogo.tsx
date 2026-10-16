import React from 'react';

export interface BrandLogoProps {
  variant?: 'dark' | 'light'; // 'dark' = dark background (dark sidebar) with ivory/white text; 'light' = light/ivory background with deep forest green text
  showWordmark?: boolean; // defaults to true
  descriptor?: string; // Optional separate brand descriptor: "Firm OS" for Core, "Control Center" for Control Panel
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  showWordmark = true,
  descriptor,
  size = 'md',
  className = '',
  onClick,
}) => {
  const isDarkBg = variant === 'dark';

  // Strict Sizing Hierarchy
  // Sidebar: ~34–40px mark height
  // Login: ~48–64px mark height
  // Small/Topbar/Badges: ~24–28px mark height
  const config = {
    sm: {
      markH: 'h-[26px]',
      markW: 'w-[38px]',
      wordmark: 'text-lg',
      descriptor: 'text-[9px] tracking-[0.18em]',
      gap: 'gap-2',
    },
    md: {
      markH: 'h-[36px]',
      markW: 'w-[52px]',
      wordmark: 'text-xl',
      descriptor: 'text-[10px] tracking-[0.2em]',
      gap: 'gap-2.5',
    },
    lg: {
      markH: 'h-[50px]',
      markW: 'w-[72px]',
      wordmark: 'text-2xl sm:text-[26px]',
      descriptor: 'text-[11px] tracking-[0.22em]',
      gap: 'gap-3',
    },
    xl: {
      markH: 'h-[64px]',
      markW: 'w-[92px]',
      wordmark: 'text-3xl sm:text-4xl',
      descriptor: 'text-xs tracking-[0.24em]',
      gap: 'gap-3.5',
    },
  }[size] || {
    markH: 'h-[36px]',
    markW: 'w-[52px]',
    wordmark: 'text-xl',
    descriptor: 'text-[10px] tracking-[0.2em]',
    gap: 'gap-2.5',
  };

  // Color mapping based on variant
  // Dark Background (Sidebar): 'Av' is warm ivory cream (#F4EEDC), 'Q' is pure white (#FFFFFF)
  // Light Background: 'Av' is muted gold (#C5A059), 'Q' is deep forest green (#07261F)
  const aColor = isDarkBg ? '#F4EEDC' : '#C5A059';
  const qColor = isDarkBg ? '#FFFFFF' : '#07261F';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${config.gap} select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* CANONICAL AvQ BRAND MONOGRAM (Exact match to Screenshot 2026-10-01 211404.png) */}
      <svg
        className={`${config.markH} ${config.markW} shrink-0 aspect-[64/44]`}
        viewBox="0 0 64 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="AVENQUIS AvQ Monogram"
      >
        {/* Layer 1: 'Q' Circle & Tail */}
        <g id="glyph-Q">
          {/* Circular Ring */}
          <circle
            cx="43"
            cy="22"
            r="14"
            stroke={qColor}
            strokeWidth="3.6"
            fill="none"
          />
          {/* Dynamic Diagonal Slash Tail */}
          <line
            x1="39.5"
            y1="26.5"
            x2="53.5"
            y2="39.5"
            stroke={qColor}
            strokeWidth="3.6"
            strokeLinecap="round"
          />
        </g>

        {/* Layer 2: 'Av' Interlocking Letterform */}
        <g id="glyph-Av" fill={aColor}>
          {/* Capital 'A' */}
          <path
            d="M 12.8 7.5 H 15.2 L 23.2 36.5 H 19.2 L 17.2 28.5 H 8.8 L 5.5 36.5 H 1.5 L 12.8 7.5 Z M 9.8 24.8 H 16.2 L 13.5 13.2 Z"
            fillRule="nonzero"
          />
          {/* The distinct 'v' rising arm that meets 'Q' */}
          <path
            d="M 19.2 36.5 L 26.2 19.0 H 29.8 L 22.8 36.5 Z"
          />
        </g>
      </svg>

      {/* Avenquis Wordmark & Product Descriptor */}
      {showWordmark && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-serif ${config.wordmark} font-bold tracking-tight ${
              isDarkBg ? 'text-[#FAF8F5]' : 'text-[#07261F]'
            }`}
          >
            Avenquis
          </span>

          {descriptor && (
            <span
              className={`uppercase font-semibold mt-1 ${config.descriptor} ${
                isDarkBg ? 'text-emerald-200/60' : 'text-[#596964]'
              }`}
            >
              {descriptor}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
