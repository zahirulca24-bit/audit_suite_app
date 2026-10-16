import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, User, X } from 'lucide-react';
import { Engagement } from '../types';

interface EngagementDetailsModalProps {
  engagement: Engagement | null;
  onClose: () => void;
  onUpdateEngagement: (updated: Engagement) => void;
}

export const EngagementDetailsModal: React.FC<EngagementDetailsModalProps> = ({
  engagement,
  onClose,
  onUpdateEngagement,
}) => {
  if (!engagement) return null;

  const [progress, setProgress] = useState(engagement.progress);
  const [status, setStatus] = useState(engagement.status);

  const handleSave = () => {
    onUpdateEngagement({
      ...engagement,
      progress,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-neutral-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0D7A6F]">
              ENGAGEMENT DETAILS
            </div>
            <h3 className="font-serif text-xl font-semibold text-neutral-900 mt-0.5">
              {engagement.client}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-neutral-200/60 flex items-center justify-center text-neutral-400 hover:text-neutral-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
            <div>
              <div className="text-neutral-400 font-medium">Engagement Type</div>
              <div className="text-neutral-800 font-semibold mt-1">
                {engagement.engagement} ({engagement.type})
              </div>
            </div>
            <div>
              <div className="text-neutral-400 font-medium">In-Charge Lead</div>
              <div className="text-neutral-800 font-semibold mt-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0D7A6F]" />
                <span>{engagement.inCharge}</span>
              </div>
            </div>
            <div>
              <div className="text-neutral-400 font-medium">Scheduled Due Date</div>
              <div className="text-neutral-800 font-semibold mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                <span>{engagement.dueDate}</span>
              </div>
            </div>
            <div>
              <div className="text-neutral-400 font-medium">Audit Working Files</div>
              <div className="text-neutral-800 font-semibold mt-1">
                8 documents uploaded
              </div>
            </div>
          </div>

          {/* Progress Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-medium text-neutral-700">Audit Completion Progress</span>
              <span className="font-bold text-[#0D7A6F] tabular-nums text-sm">
                {progress}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#0D7A6F]"
            />
          </div>

          {/* Status Selection */}
          <div>
            <label className="block font-medium text-neutral-700 mb-1.5">
              Engagement Lifecycle Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Planning', 'In Progress', 'Awaiting Client', 'Review', 'Completed'] as const).map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      status === st
                        ? 'bg-[#0F3930] text-white border-[#0F3930] shadow-2xs'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Footer action */}
          <div className="pt-2 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-xl bg-[#0B332A] hover:bg-[#07241D] text-white font-semibold shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
