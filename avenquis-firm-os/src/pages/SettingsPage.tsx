import React, { useState } from 'react';
import {
  Bell,
  Briefcase,
  Building,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Database,
  Download,
  Eye,
  FileCheck2,
  FileCode,
  FileText,
  GitBranch,
  Globe,
  HardDrive,
  History,
  Key,
  Layers,
  Lock,
  Mail,
  Palette,
  Phone,
  Plus,
  Puzzle,
  RefreshCw,
  Save,
  Search,
  Server,
  Settings as SettingsIcon,
  Shield,
  ShieldCheck,
  Sliders,
  Trash2,
  Upload,
  User,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

export const SettingsPage: React.FC = () => {
  // Navigation tabs inside Settings
  const [activeTab, setActiveTab] = useState<
    | 'firm-profile'
    | 'users-access'
    | 'roles-permissions'
    | 'engagement-settings'
    | 'document-settings'
    | 'workflow-approvals'
    | 'email-notifications'
    | 'data-security'
    | 'integrations'
    | 'audit-trail'
    | 'system-preferences'
  >('firm-profile');

  // Firm Profile form states
  const [firmName, setFirmName] = useState('AVENQUIS Chartered Accountants');
  const [tagline, setTagline] = useState('Audit • Tax • Advisory');
  const [email, setEmail] = useState('info@avenquis.com');
  const [phone, setPhone] = useState('+880 2 5500 1234');
  const [website, setWebsite] = useState('www.avenquis.com');
  const [address, setAddress] = useState('House 12, Road 5\nGulshan 1, Dhaka 1212\nBangladesh');

  // Engagement Numbering states
  const [engagementPrefix, setEngagementPrefix] = useState('AUD');
  const [engagementYearFormat, setEngagementYearFormat] = useState('YYYY');
  const [engagementNumberFormat, setEngagementNumberFormat] = useState('001, 002, 003...');

  // Work Paper Numbering states
  const [wpPrefix, setWpPrefix] = useState('WP');
  const [wpSectionCode, setWpSectionCode] = useState('Auto (ST, INV, REC...)');
  const [wpNumberFormat, setWpNumberFormat] = useState('01, 02, 03...');

  // Save notification state
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Nav menu items matching Image
  const navItems = [
    { id: 'firm-profile', label: 'Firm Profile', icon: Building2 },
    { id: 'users-access', label: 'Users & Access', icon: Users },
    { id: 'roles-permissions', label: 'Roles & Permissions', icon: ShieldCheck },
    { id: 'engagement-settings', label: 'Engagement Settings', icon: Briefcase },
    { id: 'document-settings', label: 'Document Settings', icon: FileText },
    { id: 'workflow-approvals', label: 'Workflow & Approvals', icon: GitBranch },
    { id: 'email-notifications', label: 'Email & Notifications', icon: Mail },
    { id: 'data-security', label: 'Data & Security', icon: Lock },
    { id: 'integrations', label: 'Integrations', icon: Puzzle },
    { id: 'audit-trail', label: 'Audit Trail', icon: History },
    { id: 'system-preferences', label: 'System Preferences', icon: SettingsIcon },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 3-Column Settings Layout: Left Nav (2.5 cols) + Center Content (6.5 cols) + Right Info (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Column 1: Left Navigation Menu */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-2.5">
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#E8F5F1] text-[#0D7A6F] font-semibold shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#0D7A6F]' : 'text-neutral-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Column 2: Center Main Content Form */}
        <div className="lg:col-span-6 space-y-5">
          {activeTab === 'firm-profile' ? (
            <>
              {/* Card 1: Firm Profile */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5">
                <div className="flex items-start justify-between pb-4 border-b border-neutral-100 mb-5">
                  <div>
                    <h2 className="text-sm font-bold text-neutral-900">
                      Firm Profile
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Maintain your firm information, branding and contact details.
                    </p>
                  </div>
                  <button
                    onClick={handleSave}
                    className="bg-[#0B332A] hover:bg-[#07241D] text-white px-4 py-1.5 rounded-xl text-xs font-semibold shadow-2xs transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  {/* Left: Logo block */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] rounded-2xl border border-neutral-200/70 text-center">
                    <div className="w-full h-28 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex flex-col items-center justify-center p-3 mb-3">
                      <BrandLogo variant="light" showWordmark descriptor="Firm OS" size="md" />
                    </div>
                    <button
                      onClick={() => alert('Change logo dialog opened')}
                      className="px-3 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer mb-2"
                    >
                      <Camera className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Change Logo</span>
                    </button>
                    <span className="text-[10px] text-neutral-400 leading-tight">
                      Recommended size: 400 × 400 px (PNG/SVG)
                    </span>
                  </div>

                  {/* Right: Form inputs */}
                  <div className="md:col-span-8 space-y-3.5 text-xs">
                    {/* Firm Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                      <label className="text-neutral-600 font-medium">
                        Firm Name
                      </label>
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={firmName}
                          onChange={(e) => setFirmName(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 text-xs focus:ring-1 focus:ring-[#0D7A6F] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Tagline */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                      <label className="text-neutral-600 font-medium">
                        Tagline
                      </label>
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={tagline}
                          onChange={(e) => setTagline(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 text-xs focus:ring-1 focus:ring-[#0D7A6F] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                      <label className="text-neutral-600 font-medium">
                        Email
                      </label>
                      <div className="sm:col-span-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 text-xs focus:ring-1 focus:ring-[#0D7A6F] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                      <label className="text-neutral-600 font-medium">
                        Phone
                      </label>
                      <div className="sm:col-span-2">
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 text-xs focus:ring-1 focus:ring-[#0D7A6F] focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    {/* Website */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                      <label className="text-neutral-600 font-medium">
                        Website
                      </label>
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 text-xs focus:ring-1 focus:ring-[#0D7A6F] focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-start">
                      <label className="text-neutral-600 font-medium pt-1.5">
                        Address
                      </label>
                      <div className="sm:col-span-2">
                        <textarea
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 text-xs focus:ring-1 focus:ring-[#0D7A6F] focus:outline-none leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: 2 Configuration Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Card 2: Engagement Numbering */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-neutral-900">
                      Engagement Numbering
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Configure how engagement codes are generated.
                    </p>

                    <div className="grid grid-cols-3 gap-2 mt-3.5 text-xs">
                      <div>
                        <label className="text-[10px] text-neutral-400 font-medium block mb-1">
                          Prefix
                        </label>
                        <input
                          type="text"
                          value={engagementPrefix}
                          onChange={(e) => setEngagementPrefix(e.target.value)}
                          className="w-full px-2 py-1 bg-[#FAF8F5] border border-neutral-200 rounded-lg text-neutral-800 font-mono text-xs focus:ring-1 focus:ring-[#0D7A6F]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 font-medium block mb-1">
                          Year Format
                        </label>
                        <select
                          value={engagementYearFormat}
                          onChange={(e) => setEngagementYearFormat(e.target.value)}
                          className="w-full px-1.5 py-1 bg-[#FAF8F5] border border-neutral-200 rounded-lg text-neutral-800 text-xs"
                        >
                          <option>YYYY</option>
                          <option>YY</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 font-medium block mb-1 truncate">
                          Number Format
                        </label>
                        <select
                          value={engagementNumberFormat}
                          onChange={(e) => setEngagementNumberFormat(e.target.value)}
                          className="w-full px-1.5 py-1 bg-[#FAF8F5] border border-neutral-200 rounded-lg text-neutral-800 text-xs"
                        >
                          <option>001, 002, 003...</option>
                          <option>01, 02, 03...</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Preview Badge */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400">Preview:</span>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#E8F5F1] text-[#0D7A6F] font-mono text-xs font-bold shadow-2xs">
                        AUD-2026-001
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Work Paper Numbering */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-neutral-900">
                      Work Paper Numbering
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Configure work paper reference numbering.
                    </p>

                    <div className="grid grid-cols-3 gap-2 mt-3.5 text-xs">
                      <div>
                        <label className="text-[10px] text-neutral-400 font-medium block mb-1">
                          Prefix
                        </label>
                        <input
                          type="text"
                          value={wpPrefix}
                          onChange={(e) => setWpPrefix(e.target.value)}
                          className="w-full px-2 py-1 bg-[#FAF8F5] border border-neutral-200 rounded-lg text-neutral-800 font-mono text-xs focus:ring-1 focus:ring-[#0D7A6F]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 font-medium block mb-1 truncate">
                          Section Code
                        </label>
                        <select
                          value={wpSectionCode}
                          onChange={(e) => setWpSectionCode(e.target.value)}
                          className="w-full px-1.5 py-1 bg-[#FAF8F5] border border-neutral-200 rounded-lg text-neutral-800 text-xs truncate"
                        >
                          <option>Auto (ST, INV, REC...)</option>
                          <option>Manual Input</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 font-medium block mb-1 truncate">
                          Number Format
                        </label>
                        <select
                          value={wpNumberFormat}
                          onChange={(e) => setWpNumberFormat(e.target.value)}
                          className="w-full px-1.5 py-1 bg-[#FAF8F5] border border-neutral-200 rounded-lg text-neutral-800 text-xs"
                        >
                          <option>01, 02, 03...</option>
                          <option>001, 002, 003...</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Preview Badge */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400">Preview:</span>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#E8F5F1] text-[#0D7A6F] font-mono text-xs font-bold shadow-2xs">
                        WP-ST-01
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Sub-views for other tabs */
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 capitalize">
                    {activeTab.replace('-', ' ')}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Configuration settings for {activeTab.replace('-', ' ')}.
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  className="bg-[#0B332A] hover:bg-[#07241D] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-2xs"
                >
                  Save Settings
                </button>
              </div>

              <div className="p-8 text-center bg-[#FAF8F5] rounded-xl border border-dashed border-neutral-300">
                <SettingsIcon className="w-10 h-10 text-[#0D7A6F] mx-auto mb-2 opacity-70" />
                <h4 className="font-semibold text-neutral-800 text-xs">
                  Active Configuration Module
                </h4>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  All enterprise parameters for {activeTab.replace('-', ' ')} are synced with AVENQUIS firm governance.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Column 3: Right Sidebar / Firm & System Info Panels */}
        <div className="lg:col-span-3 space-y-5">
          {/* Panel 1: Firm Information */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-4">
            <h3 className="font-semibold text-xs text-neutral-900 mb-3 pb-2 border-b border-neutral-100">
              Firm Information
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">ICAB Firm Reg. No.</span>
                <span className="font-mono font-medium text-neutral-800">AF-1234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">BIN Number</span>
                <span className="font-mono font-medium text-neutral-800">000123456-001</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">TIN Number</span>
                <span className="font-mono font-medium text-neutral-800">123456789012</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">VAT Reg. No.</span>
                <span className="font-mono font-medium text-neutral-800">N/A</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Established</span>
                <span className="font-medium text-neutral-800">2020</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">No. of Partners</span>
                <span className="font-mono font-bold text-neutral-900">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">No. of Staff</span>
                <span className="font-mono font-bold text-neutral-900">16</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">No. of Students</span>
                <span className="font-mono font-bold text-neutral-900">8</span>
              </div>
            </div>
          </div>

          {/* Panel 2: System Information */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-4">
            <h3 className="font-semibold text-xs text-neutral-900 mb-3 pb-2 border-b border-neutral-100">
              System Information
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Plan</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E8F5F1] text-[#0D7A6F] border border-[#0D7A6F]/20">
                  Professional
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-neutral-500">Storage Used</span>
                  <span className="font-mono text-neutral-700 text-[11px]">
                    18.4 GB of 100 GB
                  </span>
                </div>
                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: '18.4%' }}
                      className="h-full bg-[#0D7A6F] rounded-full"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">
                    18%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-neutral-500">Last Backup</span>
                <span className="text-neutral-700 text-[11px] whitespace-nowrap">
                  12 Oct 2026, 02:30 AM
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Version</span>
                <span className="font-mono text-neutral-700 text-[11px]">
                  v1.0.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
