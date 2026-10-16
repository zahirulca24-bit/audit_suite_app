import React, { useState } from 'react';
import {
  Calculator,
  Receipt,
  Percent,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Building,
  User,
  AlertCircle
} from 'lucide-react';

export const TaxVatPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tax' | 'vat'>('tax');

  // Corporate Tax state (Income Tax Act 2023)
  const [profitBeforeTax, setProfitBeforeTax] = useState<number>(5000000);
  const [inadmissibleExpenses, setInadmissibleExpenses] = useState<number>(850000);
  const [allowableDepreciation, setAllowableDepreciation] = useState<number>(620000);
  const [accountingDepreciation, setAccountingDepreciation] = useState<number>(500000);
  const [grossReceipts, setGrossReceipts] = useState<number>(45000000);
  const [companyType, setCompanyType] = useState<'non-listed' | 'listed' | 'one-person'>('non-listed');

  // VAT & VDS state
  const [monthlySales, setMonthlySales] = useState<number>(3500000);
  const [monthlyPurchases, setMonthlyPurchases] = useState<number>(2200000);
  const [vdsDeducted, setVdsDeducted] = useState<number>(65000);

  // Calculations
  const taxableIncome = Math.max(
    0,
    profitBeforeTax + inadmissibleExpenses + accountingDepreciation - allowableDepreciation
  );
  const taxRate = companyType === 'listed' ? 0.20 : 0.275;
  const regularTax = taxableIncome * taxRate;
  const minimumTax = grossReceipts * 0.006; // 0.6% on gross receipts under Section 163
  const finalCorporateTax = Math.max(regularTax, minimumTax);

  // VAT calculations
  const outputVat = monthlySales * 0.15;
  const inputVatRebate = monthlyPurchases * 0.15;
  const netVatPayable = Math.max(0, outputVat - inputVatRebate - vdsDeducted);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0f2d25] text-white rounded-2xl p-6 shadow-md border border-[#1b4337]">
        <div className="flex items-center space-x-2 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-1">
          <Calculator className="w-4 h-4" />
          <span>Tax & VAT Compliance Suite</span>
        </div>
        <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
          Income Tax (Act 2023) & VAT (Mushak 9.1) Engine
        </h1>
        <p className="text-xs text-emerald-200/80 mt-1">
          Instant corporate tax computations, Sec 163 minimum tax, and monthly VAT & VDS (Mushak 6.6) reconciliation.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 space-x-2 bg-stone-50 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('tax')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'tax'
              ? 'bg-[#0f2d25] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Corporate Income Tax (Act 2023)</span>
        </button>
        <button
          onClick={() => setActiveTab('vat')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'vat'
              ? 'bg-[#0f2d25] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <Percent className="w-4 h-4" />
          <span>VAT (Mushak 9.1 & VDS 6.6)</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: CORPORATE TAX CALCULATOR */}
      {/* ========================================================= */}
      {activeTab === 'tax' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-bold text-stone-900 font-serif text-base border-b border-stone-100 pb-2">
              Corporate Tax Computation Worksheet
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Accounting Profit Before Tax (BDT)
                </label>
                <input
                  type="number"
                  value={profitBeforeTax}
                  onChange={(e) => setProfitBeforeTax(Number(e.target.value))}
                  className="w-full border border-stone-300 rounded-xl p-2.5 font-semibold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Gross Receipts / Turnover (BDT)
                </label>
                <input
                  type="number"
                  value={grossReceipts}
                  onChange={(e) => setGrossReceipts(Number(e.target.value))}
                  className="w-full border border-stone-300 rounded-xl p-2.5 font-semibold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Add: Inadmissible Expenses (Sec 48-55)
                </label>
                <input
                  type="number"
                  value={inadmissibleExpenses}
                  onChange={(e) => setInadmissibleExpenses(Number(e.target.value))}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Add: Accounting Depreciation
                </label>
                <input
                  type="number"
                  value={accountingDepreciation}
                  onChange={(e) => setAccountingDepreciation(Number(e.target.value))}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Less: Tax Allowable Depreciation (3rd Sch.)
                </label>
                <input
                  type="number"
                  value={allowableDepreciation}
                  onChange={(e) => setAllowableDepreciation(Number(e.target.value))}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">
                  Company Category & Tax Rate
                </label>
                <select
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value as any)}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-sm font-semibold"
                >
                  <option value="non-listed">Non-Listed Private Ltd. (27.5%)</option>
                  <option value="listed">Publicly Listed Company (20.0%)</option>
                  <option value="one-person">One Person Company (OPC - 22.5%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tax Summary Card */}
          <div className="bg-stone-900 text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex justify-between items-center border-b border-stone-800 pb-3 mb-4">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Tax Liability Summary</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">
                  Act 2023
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Taxable Business Income:</span>
                  <span className="font-mono font-bold text-white">Tk. {taxableIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Regular Corporate Tax ({(taxRate * 100).toFixed(1)}%):</span>
                  <span className="font-mono font-bold text-white">Tk. {Math.round(regularTax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Minimum Tax u/s 163 (0.6%):</span>
                  <span className="font-mono font-bold text-amber-400">Tk. {Math.round(minimumTax).toLocaleString()}</span>
                </div>

                <div className="pt-4 border-t border-stone-800 mt-4">
                  <span className="text-xs text-stone-400 uppercase tracking-wider block mb-1">
                    Final Tax Payable (Higher of Two)
                  </span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    Tk. {Math.round(finalCorporateTax).toLocaleString()}/-
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('Corporate Tax Computation Sheet exported to Document Vault!')}
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Tax Computation Sheet</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: VAT & VDS WORKSHEET */}
      {/* ========================================================= */}
      {activeTab === 'vat' && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-5">
          <div className="border-b border-stone-100 pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-stone-900 font-serif text-base">
                Monthly VAT Return (Mushak 9.1) & VDS Worksheet
              </h3>
              <p className="text-xs text-stone-500">
                Turnover VAT @ 15%, Input tax credit (rebate), and VDS (Mushak 6.6) deductions.
              </p>
            </div>
            <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-bold">
              Due Date: 15th of Every Month
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 uppercase mb-1">
                Taxable Sales / Output (BDT)
              </label>
              <input
                type="number"
                value={monthlySales}
                onChange={(e) => setMonthlySales(Number(e.target.value))}
                className="w-full border border-stone-300 rounded-xl p-2.5 font-semibold text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 uppercase mb-1">
                Eligible Purchases for Rebate (BDT)
              </label>
              <input
                type="number"
                value={monthlyPurchases}
                onChange={(e) => setMonthlyPurchases(Number(e.target.value))}
                className="w-full border border-stone-300 rounded-xl p-2.5 font-semibold text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 uppercase mb-1">
                VDS Deducted by Customers (Mushak 6.6)
              </label>
              <input
                type="number"
                value={vdsDeducted}
                onChange={(e) => setVdsDeducted(Number(e.target.value))}
                className="w-full border border-stone-300 rounded-xl p-2.5 font-semibold text-sm"
              />
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-stone-500 uppercase">Output VAT (15%)</p>
              <p className="text-lg font-bold text-stone-800 mt-1">Tk. {outputVat.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase">Less: Input Tax Rebate (15%)</p>
              <p className="text-lg font-bold text-stone-800 mt-1">Tk. {inputVatRebate.toLocaleString()}</p>
            </div>
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200">
              <p className="text-xs text-emerald-800 uppercase font-semibold">Net Treasury Deposit (Mushak 9.1)</p>
              <p className="text-lg font-bold text-emerald-700 mt-1">Tk. {netVatPayable.toLocaleString()}/-</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
