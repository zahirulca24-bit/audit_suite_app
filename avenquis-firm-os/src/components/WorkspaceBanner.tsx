import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WorkspaceBannerProps {
  onExploreClick?: () => void;
}

export const WorkspaceBanner: React.FC<WorkspaceBannerProps> = ({ onExploreClick }) => {
  return (
    <div className="bg-[#E7F3EF] rounded-2xl p-6 sm:p-7 border border-[#D2E8DF] flex flex-col justify-between relative overflow-hidden h-full min-h-[220px]">
      {/* Background Soft Blobs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#DAEDE6] rounded-full blur-2xl pointer-events-none" />

      {/* Text Info */}
      <div className="relative z-10 max-w-[280px]">
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0D7A6F] mb-1">
          YOUR WORKSPACE
        </div>
        <h2 className="font-serif text-2xl sm:text-[28px] font-semibold text-neutral-900 leading-tight">
          Everything in <br />
          <span className="italic font-serif text-[#C47D2B]">one place.</span>
        </h2>
        <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
          Keep your team aligned, your work moving, and your office growing.
        </p>

        <button
          onClick={onExploreClick}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B332A] hover:text-[#061F18] group cursor-pointer"
        >
          <span>Explore workspace</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Decorative 3D-Styled Vector Illustration on Right */}
      <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 pointer-events-none select-none">
        <svg
          className="w-40 sm:w-48 h-32 sm:h-36 drop-shadow-sm"
          viewBox="0 0 200 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back document card */}
          <rect
            x="30"
            y="25"
            width="85"
            height="95"
            rx="12"
            fill="#FEFBF6"
            stroke="#DDECE6"
            strokeWidth="1.5"
          />
          {/* Header pill on doc */}
          <rect x="42" y="38" width="28" height="4" rx="2" fill="#84CC16" fillOpacity="0.6" />
          <rect x="42" y="47" width="55" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="42" y="55" width="45" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="42" y="63" width="50" height="3" rx="1.5" fill="#E2E8F0" />

          {/* Mini mini-bars on back card */}
          <rect x="42" y="85" width="8" height="18" rx="2" fill="#D97706" fillOpacity="0.4" />
          <rect x="54" y="78" width="8" height="25" rx="2" fill="#0D9488" fillOpacity="0.3" />
          <rect x="66" y="73" width="8" height="30" rx="2" fill="#0D9488" fillOpacity="0.4" />

          {/* Front card with clean stats & user */}
          <g filter="url(#shadow)">
            <rect
              x="75"
              y="15"
              width="95"
              height="105"
              rx="14"
              fill="#FFFFFF"
              stroke="#DDEAE4"
              strokeWidth="1.5"
            />
            {/* Top user badge */}
            <circle cx="148" cy="34" r="10" fill="#E8F4F0" />
            <circle cx="148" cy="31" r="3.5" fill="#0D7A6F" />
            <path
              d="M141.5 40c0-2.8 2.9-4 6.5-4s6.5 1.2 6.5 4"
              stroke="#0D7A6F"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Document lines on front card */}
            <rect x="88" y="30" width="36" height="4" rx="2" fill="#0D7A6F" fillOpacity="0.7" />
            <rect x="88" y="40" width="48" height="3" rx="1.5" fill="#CBD5E1" />
            <rect x="88" y="48" width="38" height="3" rx="1.5" fill="#E2E8F0" />

            {/* Vertical chart bars inside front card */}
            <rect x="90" y="80" width="7" height="24" rx="2" fill="#84D8C9" />
            <rect x="101" y="72" width="7" height="32" rx="2" fill="#67C7B5" />
            <rect x="112" y="62" width="7" height="42" rx="2" fill="#3AA894" />
            <rect x="123" y="52" width="7" height="52" rx="2" fill="#0F766E" />
          </g>

          <defs>
            <filter id="shadow" x="65" y="10" width="120" height="125" filterUnits="userSpaceOnUse">
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="6"
                floodColor="#07261F"
                floodOpacity="0.08"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};
