import React, { useState, useEffect } from 'react';
import {
  FileText,
  Send,
  Download,
  CheckCircle2,
  FolderOpen,
  Calendar,
  AlertTriangle,
  Copy,
  Check,
  Building,
  Users,
  ExternalLink,
  Loader2,
  Scale
} from 'lucide-react';

interface Client {
  id: number;
  company_name: string;
  reg_no: string;
  inc_date: string;
  registered_address: string;
  authorized_capital: number;
  paid_up_capital: number;
  share_value: number;
  tin_no: string;
  taxes_circle: string;
  bin_no: string;
  drive_folder_link?: string;
}

interface Shareholder {
  id: number;
  client_id: number;
  name: string;
  father_name: string;
  mother_name: string;
  address: string;
  nid_no: string;
  designation: string;
  share_count: number;
  distinctive_from: number;
  distinctive_to: number;
  certificate_no: string;
}

export const RjscLegalPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'transfer' | 'annual' | 'checklist'>('transfer');
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number>(1);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Transfer form state
  const [transferForm, setTransferForm] = useState({
    transferor_id: 1,
    transferee_id: 4,
    share_count: 25000,
    consideration_type: 'Gift',
    consideration_amount: 0,
    distinctive_from: 49001,
    distinctive_to: 74000,
    transfer_date: '10-10-2026',
    assistant_name: 'Hemadry Roy'
  });
  const [transferResult, setTransferResult] = useState<any>(null);

  // Annual return state
  const [selectedYears, setSelectedYears] = useState<string[]>([
    '2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025'
  ]);
  const [annualResult, setAnnualResult] = useState<any>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      setClients(data);
      if (data.length > 0) {
        setSelectedClientId(data[0].id);
        fetchClientDetail(data[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientDetail = async (id: number) => {
    try {
      const res = await fetch(`/api/clients/${id}`);
      const data = await res.json();
      setCurrentClient(data.client);
      setShareholders(data.shareholders || []);
      if (data.shareholders?.length >= 2) {
        setTransferForm(prev => ({
          ...prev,
          transferor_id: data.shareholders[0].id,
          transferee_id: data.shareholders[data.shareholders.length - 1].id
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClientChange = (id: number) => {
    setSelectedClientId(id);
    fetchClientDetail(id);
    setTransferResult(null);
    setAnnualResult(null);
  };

  const handleGenerateTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const res = await fetch('/api/generate/share-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: selectedClientId,
          ...transferForm
        })
      });
      const data = await res.json();
      setTransferResult(data);
    } catch (e) {
      alert('Error generating share transfer package');
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateAnnualReturns = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/generate/annual-returns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: selectedClientId,
          fy_list: selectedYears,
          agm_date: '24th October, 2024',
          auditor_name: 'FAMES & R'
        })
      });
      const data = await res.json();
      setAnnualResult(data);
    } catch (e) {
      alert('Error generating annual returns');
    } finally {
      setGenerating(false);
    }
  };

  const copySigningGuide = () => {
    const text = `${currentClient?.company_name || 'SILVEE & SINTHEE TRAVEL AGENCY LTD.'}
HEMADRY SIGNING & NOTARY INSTRUCTIONS:
1. Form 117 (Share Transfer Deed): Transferor, Transferee, 2 Witnesses & MD sign.
2. Board Resolution: All Directors present sign + Certified True Copy by MD.
3. Affidavit (Tk. 300 Non-Judicial Stamp): Signed by Transferor & Notarized by Notary Public.
4. Form IX & XII: Candidate Director & MD sign.
Note: Black ballpoint pen only!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Client Selector */}
      <div className="bg-[#0f2d25] text-white rounded-2xl p-6 shadow-md border border-[#1b4337] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-1">
            <Scale className="w-4 h-4" />
            <span>Corporate Secretarial & RJSC Automation</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
            RJSC Filing & Legal Execution Engine
          </h1>
          <p className="text-xs text-emerald-200/80 mt-1">
            Form 117 Share Transfers, 5-Year Backlog Annual Returns, Affidavits on Tk. 300 Stamp, and Assistant Checklist.
          </p>
        </div>

        {/* Company Selector */}
        <div className="bg-[#163f34] p-3 rounded-xl border border-emerald-500/20 w-full md:w-auto">
          <label className="text-[11px] text-emerald-200 block font-medium mb-1">Selected Client Company:</label>
          <select
            value={selectedClientId}
            onChange={(e) => handleClientChange(Number(e.target.value))}
            className="bg-[#0d2821] border border-emerald-600/40 text-white text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none font-semibold w-full"
          >
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.company_name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-stone-200 space-x-2 bg-stone-50 p-1 rounded-xl">
        <button
          onClick={() => setActiveSubTab('transfer')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === 'transfer'
              ? 'bg-[#0f2d25] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Form 117 (Share Transfer Package)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('annual')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === 'annual'
              ? 'bg-[#0f2d25] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>5-Year Backlog Annual Returns</span>
        </button>
        <button
          onClick={() => setActiveSubTab('checklist')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === 'checklist'
              ? 'bg-[#0f2d25] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Hemadry / Field Signing Guide</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SUB TAB 1: FORM 117 SHARE TRANSFER WIZARD */}
      {/* ========================================================= */}
      {activeSubTab === 'transfer' && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              Form 117 Share Transfer Package Generator
            </h2>
            <p className="text-xs text-stone-500">
              Generates Form 117 Deed, Board Resolution, Tk. 300 Non-Judicial Stamp Affidavit, Split Certificates, and Signing Checklist.
            </p>
          </div>

          <form onSubmit={handleGenerateTransfer} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                  Transferor (শেয়ার বিক্রেতা/দাতা)
                </label>
                <select
                  value={transferForm.transferor_id}
                  onChange={(e) => setTransferForm({ ...transferForm, transferor_id: Number(e.target.value) })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-[#0f2d25]"
                  required
                >
                  {shareholders.map(s => (
                    <option key={s.id} value={s.id}>{s.name} (Holds: {s.share_count?.toLocaleString()} Shares)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                  Transferee (শেয়ার গ্রহীতা/ক্রেতা)
                </label>
                <select
                  value={transferForm.transferee_id}
                  onChange={(e) => setTransferForm({ ...transferForm, transferee_id: Number(e.target.value) })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-[#0f2d25]"
                  required
                >
                  {shareholders.map(s => (
                    <option key={s.id} value={s.id}>{s.name} (Current: {s.share_count?.toLocaleString()} Shares)</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                  Shares to Transfer
                </label>
                <input
                  type="number"
                  value={transferForm.share_count}
                  onChange={(e) => setTransferForm({ ...transferForm, share_count: Number(e.target.value) })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-sm font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                  Transfer Type
                </label>
                <select
                  value={transferForm.consideration_type}
                  onChange={(e) => setTransferForm({ ...transferForm, consideration_type: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-sm"
                >
                  <option value="Gift">Gift / Hiba (No Consideration)</option>
                  <option value="Sale">Sale / Purchase (Monetary Consideration)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                  Total Consideration (BDT)
                </label>
                <input
                  type="number"
                  value={transferForm.consideration_amount}
                  onChange={(e) => setTransferForm({ ...transferForm, consideration_amount: Number(e.target.value) })}
                  disabled={transferForm.consideration_type === 'Gift'}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                  Distinctive No From
                </label>
                <input
                  type="number"
                  value={transferForm.distinctive_from}
                  onChange={(e) => setTransferForm({ ...transferForm, distinctive_from: Number(e.target.value) })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                  Distinctive No To
                </label>
                <input
                  type="number"
                  value={transferForm.distinctive_to}
                  onChange={(e) => setTransferForm({ ...transferForm, distinctive_to: Number(e.target.value) })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                  Field Assistant (Signatures)
                </label>
                <input
                  type="text"
                  value={transferForm.assistant_name}
                  onChange={(e) => setTransferForm({ ...transferForm, assistant_name: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={generating}
                className="w-full bg-[#0f2d25] hover:bg-[#163f34] text-white font-bold py-3 px-6 rounded-xl shadow-md transition flex items-center justify-center space-x-2 text-sm"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Statutory Package...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    <span>Generate Share Transfer Package (.DOCX & Guides)</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Results Box */}
          {transferResult && (
            <div className="mt-6 pt-6 border-t border-stone-200 space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-emerald-900 text-sm flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Filing Package Ready & Saved</span>
                  </h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Instrument deeds, resolution, and Tk. 300 stamp affidavits generated successfully.
                  </p>
                </div>
                {transferResult.google_drive_folder && (
                  <a
                    href={transferResult.google_drive_folder}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white border border-emerald-300 text-emerald-800 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1 hover:bg-emerald-100"
                  >
                    <FolderOpen className="w-4 h-4 text-amber-500" />
                    <span>Open Drive Vault</span>
                  </a>
                )}
              </div>

              {/* Downloadable files grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {transferResult.files?.map((f: any) => (
                  <div
                    key={f.filename}
                    className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between hover:border-emerald-500 transition"
                  >
                    <div className="flex items-center space-x-2.5">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-stone-800">{f.title}</p>
                        <p className="text-[10px] text-stone-400 font-mono truncate max-w-[200px]">{f.filename}</p>
                      </div>
                    </div>
                    <a
                      href={f.url}
                      download
                      className="bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 p-2 rounded-lg text-xs font-semibold"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>

              {/* WhatsApp Dispatch Banner */}
              <div className="bg-[#0f2d25] text-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold flex items-center space-x-1.5">
                    <Send className="w-4 h-4 text-emerald-400" />
                    <span>1-Click WhatsApp Client & Assistant Dispatch</span>
                  </p>
                  <p className="text-[11px] text-emerald-200/80">
                    Dispatches pre-formatted message with signing guide & Drive link directly to phone.
                  </p>
                </div>
                <a
                  href={transferResult.whatsapp_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-lg text-xs transition flex items-center space-x-1.5 whitespace-nowrap shadow"
                >
                  <span>Send via WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB TAB 2: ANNUAL RETURN BACKLOG */}
      {/* ========================================================= */}
      {activeSubTab === 'annual' && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              5-Year Backlog Annual Returns Package (Schedule X)
            </h2>
            <p className="text-xs text-stone-500">
              Generates AGM Notices, AGM Minutes, and Form X / Schedule X for all backlogged financial years.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">
                Select Backlogged Financial Years:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {['2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025'].map(fy => (
                  <label
                    key={fy}
                    className="flex items-center space-x-2 bg-stone-50 p-3 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedYears.includes(fy)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedYears([...selectedYears, fy]);
                        else setSelectedYears(selectedYears.filter(y => y !== fy));
                      }}
                      className="rounded text-[#0f2d25] focus:ring-[#0f2d25]"
                    />
                    <span className="text-xs font-bold text-stone-800">{fy}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateAnnualReturns}
              disabled={selectedYears.length === 0 || generating}
              className="w-full bg-[#0f2d25] hover:bg-[#163f34] text-white font-bold py-3 px-6 rounded-xl shadow transition flex items-center justify-center space-x-2 text-sm"
            >
              {generating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating Backlogs...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  <span>Generate Selected ({selectedYears.length}) Annual Return Packages</span>
                </>
              )}
            </button>
          </div>

          {annualResult && (
            <div className="mt-6 pt-4 border-t border-stone-200 space-y-2">
              <h4 className="font-bold text-xs text-stone-800 uppercase tracking-wider mb-2">
                Generated Backlog Files:
              </h4>
              {annualResult.results?.map((r: any) => (
                <div
                  key={r.fy}
                  className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center text-xs"
                >
                  <span className="font-bold text-stone-900">FY {r.fy} Annual Return Package</span>
                  <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                    Ready in Output
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB TAB 3: HEMADRY SIGNING GUIDE */}
      {/* ========================================================= */}
      {activeSubTab === 'checklist' && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-5">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-stone-900 font-serif">
                Field Assistant & Signing Checklist (for Hemadry Roy)
              </h2>
              <p className="text-xs text-stone-500">
                Ensure zero errors during client signatures, stamp printing, and notary execution.
              </p>
            </div>
            <button
              onClick={copySigningGuide}
              className="bg-stone-800 hover:bg-stone-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium flex items-center space-x-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Guide!' : 'Copy to Clipboard'}</span>
            </button>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-1.5">
            <p className="font-bold flex items-center space-x-1.5 text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>মাঠপর্যায়ের গুরুত্বপূর্ণ সাইনিং নিয়মাবলী:</span>
            </p>
            <ul className="list-disc list-inside space-y-1 text-amber-800 pl-2">
              <li>সব সই অবশ্যই <strong>কালো কালির বলপেন</strong> দিয়ে করাবেন।</li>
              <li>এফিডেভিট অবশ্যই <strong>৩০০ টাকার নন-জুডিশিয়াল স্ট্যাম্পে</strong> প্রিন্ট করে নোটারি পাবলিকের সীল ও রেজিস্ট্রি নম্বর নিশ্চিত করবেন।</li>
              <li>Form 117-এ উভয় পক্ষের সাক্ষীর পূর্ণ নাম, ঠিকানা ও পেশা স্পষ্টভাবে উল্লেখ করাবেন।</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <p className="font-bold text-stone-900">1. Form 117 (Share Transfer Deed):</p>
              <p className="text-stone-600 mt-0.5">Transferor, Transferee, 2 Witnesses, and MD verification sign.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <p className="font-bold text-stone-900">2. Board Resolution:</p>
              <p className="text-stone-600 mt-0.5">All Directors present at meeting sign + MD Certified True Copy.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <p className="font-bold text-stone-900">3. Non-Judicial Affidavit:</p>
              <p className="text-stone-600 mt-0.5">Tk. 300 Stamp + Deponent Sign + Notary Public Dhaka attestation.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <p className="font-bold text-stone-900">4. Form IX & XII (Directorship):</p>
              <p className="text-stone-600 mt-0.5">Form IX signed by incoming Director; Form XII signed by Managing Director.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
