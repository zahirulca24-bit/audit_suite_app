import React, { useState } from 'react';
import { BookOpen, Check, HelpCircle, Send, Sparkles, X } from 'lucide-react';

interface AskISAAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskISAAIModal: React.FC<AskISAAIModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const sampleStandards = [
    { code: 'ISA 315', title: 'Identifying and Assessing Risks of Material Misstatement' },
    { code: 'ISA 500', title: 'Audit Evidence and Documentation Sufficiency' },
    { code: 'ISA 700', title: 'Forming an Opinion and Reporting on Financial Statements' },
    { code: 'ISA 240', title: "The Auditor's Responsibilities Relating to Fraud" },
  ];

  const handleAsk = (promptText: string) => {
    setIsThinking(true);
    setResponse(null);
    setTimeout(() => {
      setIsThinking(false);
      setResponse(
        `Guidance for ${promptText}: Under International Standards on Auditing, maintain professional skepticism, verify supporting trial balances against external bank confirmations, test physical inventory cutoff procedures, and document working paper references in accordance with firm quality control.`
      );
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-neutral-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#EAF6F3] border-b border-[#CDECE3] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0D7A6F] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-neutral-900 leading-tight">
                Ask ISA AI Assistant
              </h3>
              <p className="text-xs text-[#0D7A6F] font-medium">
                International Standards on Auditing Knowledge Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-neutral-200/60 flex items-center justify-center text-neutral-500 hover:text-neutral-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-medium text-neutral-700 mb-1.5">
              Ask an ISA standard, audit procedure, or disclosure requirement:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && query.trim()) handleAsk(query);
                }}
                placeholder="e.g. Requirements for inventory observation under ISA 501..."
                className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#0D7A6F] focus:ring-1 focus:ring-[#0D7A6F]"
              />
              <button
                onClick={() => query.trim() && handleAsk(query)}
                className="px-4 py-2 rounded-xl bg-[#0B332A] text-white font-medium hover:bg-[#07241D] flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask</span>
              </button>
            </div>
          </div>

          {/* Quick Standards Pill Suggestions */}
          <div>
            <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Quick Standards Reference
            </div>
            <div className="space-y-1.5">
              {sampleStandards.map((std) => (
                <button
                  key={std.code}
                  onClick={() => {
                    setQuery(`${std.code}: ${std.title}`);
                    handleAsk(`${std.code} (${std.title})`);
                  }}
                  className="w-full text-left p-2.5 rounded-xl border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50 flex items-center justify-between transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0D7A6F] group-hover:underline">
                      {std.code}
                    </span>
                    <span className="text-neutral-600 truncate max-w-xs">{std.title}</span>
                  </div>
                  <BookOpen className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#0D7A6F]" />
                </button>
              ))}
            </div>
          </div>

          {/* Response Box */}
          {isThinking && (
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-500 flex items-center gap-2">
              <span className="animate-spin inline-block w-4 h-4 border-2 border-[#0D7A6F] border-t-transparent rounded-full" />
              <span>Analyzing ISA compliance framework...</span>
            </div>
          )}

          {response && (
            <div className="p-4 rounded-xl bg-[#EAF6F3] border border-[#CDECE3] text-neutral-800 space-y-1.5 animate-in fade-in">
              <div className="font-semibold text-[#0D7A6F] flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>ISA Audit Guidance</span>
              </div>
              <p className="text-xs leading-relaxed text-neutral-700">{response}</p>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-xs font-medium cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
