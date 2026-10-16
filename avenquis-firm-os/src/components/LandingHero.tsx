import React from 'react';
import { Calendar, FileText, PieChart, Users } from 'lucide-react';

interface LandingHeroProps {
  onSelectFeature?: (feature: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onSelectFeature }) => {
  return (
    <div className="flex flex-col justify-center max-w-xl">
      {/* Kicker Badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#0D6E66]">
          SMART OFFICE MANAGEMENT
        </span>
        <span className="text-neutral-300 font-light">—</span>
        <span className="text-amber-500 text-xs">✦</span>
      </div>

      {/* Main Headline */}
      <h1 className="font-serif text-5xl sm:text-6xl lg:text-[64px] font-normal leading-[1.08] tracking-tight text-neutral-900 mb-6">
        <span>Work </span>
        <span className="text-[#136A5E] font-medium">Smarter.</span>
        <br />
        <span>Stay Organized.</span>
        <br />
        <span className="italic font-serif text-[#C97C2B]">Grow </span>
        <span className="font-serif text-[#C97C2B]">Together.</span>
      </h1>

      {/* Paragraph */}
      <p className="text-[#596964] text-base leading-relaxed max-w-md mb-10">
        Manage your people, operations, accounts and daily tasks from one beautiful workspace. Simple,
        powerful and made for your office.
      </p>

      {/* 4 Feature Mini Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
        {/* Card 1: Team Management */}
        <button
          onClick={() => onSelectFeature?.('Team Management')}
          className="bg-[#DCEEE8] hover:bg-[#D2EAE1] text-left p-3.5 rounded-2xl border border-[#CCE3DC] transition-all hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between h-[106px]"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#115E51]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-800 leading-tight">
              Team
            </div>
            <div className="text-xs font-semibold text-neutral-800 leading-tight">
              Management
            </div>
          </div>
        </button>

        {/* Card 2: Attendance Tracking */}
        <button
          onClick={() => onSelectFeature?.('Attendance Tracking')}
          className="bg-[#FEF1D8] hover:bg-[#FCEAC7] text-left p-3.5 rounded-2xl border border-[#FDE6BD] transition-all hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between h-[106px]"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#B45309]">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-800 leading-tight">
              Attendance
            </div>
            <div className="text-xs font-semibold text-neutral-800 leading-tight">
              Tracking
            </div>
          </div>
        </button>

        {/* Card 3: Accounts & Finance */}
        <button
          onClick={() => onSelectFeature?.('Accounts & Finance')}
          className="bg-[#FDE2DB] hover:bg-[#FBD6CD] text-left p-3.5 rounded-2xl border border-[#F9CFCC] transition-all hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between h-[106px]"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#BE123C]">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-800 leading-tight">
              Accounts &
            </div>
            <div className="text-xs font-semibold text-neutral-800 leading-tight">
              Finance
            </div>
          </div>
        </button>

        {/* Card 4: Documents & Reports */}
        <button
          onClick={() => onSelectFeature?.('Documents & Reports')}
          className="bg-[#DAF0F7] hover:bg-[#CEE9F2] text-left p-3.5 rounded-2xl border border-[#C5E5F0] transition-all hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between h-[106px]"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0284C7]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-800 leading-tight">
              Documents &
            </div>
            <div className="text-xs font-semibold text-neutral-800 leading-tight">
              Reports
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
