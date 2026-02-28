import React, { useState } from 'react';
import { Calculator, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  calculateOldRegimeTax,
  calculateNewRegimeTax,
  formatINR,
  type TaxBreakdown,
  type OldRegimeInputs,
} from '../utils/taxCalculations';

type AgeGroup = 'below60' | '60to80' | 'above80';

function TaxBreakdownCard({ breakdown, title }: { breakdown: TaxBreakdown; title: string }) {
  const [showSlabs, setShowSlabs] = useState(false);

  return (
    <Card className="border-navy/20">
      <CardHeader className="bg-navy rounded-t-lg pb-3 pt-4">
        <CardTitle className="text-white text-base font-bold flex items-center justify-between">
          <span>{title}</span>
          <Badge className="bg-saffron text-white border-0">
            {formatINR(breakdown.totalTaxPayable)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-2 text-sm">
        <div className="flex justify-between py-1.5 border-b border-navy/10">
          <span className="text-navy/70">Gross Income</span>
          <span className="text-navy font-semibold">{formatINR(breakdown.grossIncome)}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-navy/10">
          <span className="text-navy/70">
            {breakdown.regime === 'new' ? 'Standard Deduction' : 'Total Deductions'}
          </span>
          <span className="text-green-700 font-semibold">- {formatINR(breakdown.totalDeductions)}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-navy/10 font-semibold">
          <span className="text-navy">Taxable Income</span>
          <span className="text-navy">{formatINR(breakdown.taxableIncome)}</span>
        </div>

        {/* Slab-wise breakdown toggle */}
        <button
          className="flex items-center gap-1 text-xs text-navy/60 hover:text-navy transition-colors py-1"
          onClick={() => setShowSlabs(s => !s)}
        >
          {showSlabs ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          {showSlabs ? 'Hide' : 'Show'} slab-wise breakdown
        </button>

        {showSlabs && (
          <div className="bg-navy/5 rounded-lg p-3 space-y-1.5">
            {breakdown.slabWiseTax.length === 0 ? (
              <p className="text-navy/50 text-xs text-center">No tax applicable</p>
            ) : (
              breakdown.slabWiseTax.map((s, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-navy/70">{s.slab} @ {s.rate}%</span>
                  <span className="text-navy font-medium">{formatINR(s.tax)}</span>
                </div>
              ))
            )}
          </div>
        )}

        <div className="flex justify-between py-1.5 border-b border-navy/10">
          <span className="text-navy/70">Tax Before Rebate</span>
          <span className="text-navy font-semibold">{formatINR(breakdown.taxBeforeRebate)}</span>
        </div>
        {breakdown.rebate87A > 0 && (
          <div className="flex justify-between py-1.5 border-b border-navy/10">
            <span className="text-green-700">Rebate u/s 87A</span>
            <span className="text-green-700 font-semibold">- {formatINR(breakdown.rebate87A)}</span>
          </div>
        )}
        {breakdown.surcharge > 0 && (
          <div className="flex justify-between py-1.5 border-b border-navy/10">
            <span className="text-navy/70">Surcharge</span>
            <span className="text-navy font-semibold">{formatINR(breakdown.surcharge)}</span>
          </div>
        )}
        <div className="flex justify-between py-1.5 border-b border-navy/10">
          <span className="text-navy/70">Health & Education Cess (4%)</span>
          <span className="text-navy font-semibold">{formatINR(breakdown.cess)}</span>
        </div>
        <div className="flex justify-between py-2 bg-saffron/10 rounded-lg px-3 mt-2">
          <span className="text-navy font-bold">Total Tax Payable</span>
          <span className="text-navy font-bold text-base">{formatINR(breakdown.totalTaxPayable)}</span>
        </div>
        <p className="text-navy/40 text-xs text-center pt-1">
          Effective Tax Rate: {breakdown.grossIncome > 0 ? ((breakdown.totalTaxPayable / breakdown.grossIncome) * 100).toFixed(2) : '0.00'}%
        </p>
      </CardContent>
    </Card>
  );
}

export default function TaxCalculatorPage() {
  const [grossIncome, setGrossIncome] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('below60');
  const [deduction80C, setDeduction80C] = useState('');
  const [deduction80D, setDeduction80D] = useState('');
  const [deduction80TTA, setDeduction80TTA] = useState('');
  const [hraExemption, setHraExemption] = useState('');
  const [otherDeductions, setOtherDeductions] = useState('');
  const [results, setResults] = useState<{ old?: TaxBreakdown; new?: TaxBreakdown } | null>(null);
  const [activeTab, setActiveTab] = useState('both');

  const parseNum = (v: string) => parseFloat(v.replace(/,/g, '')) || 0;

  const handleCalculate = () => {
    const income = parseNum(grossIncome);
    if (!income || income <= 0) return;

    const oldInputs: OldRegimeInputs = {
      grossIncome: income,
      ageGroup,
      deduction80C: parseNum(deduction80C),
      deduction80D: parseNum(deduction80D),
      deduction80TTA: parseNum(deduction80TTA),
      hraExemption: parseNum(hraExemption),
      otherDeductions: parseNum(otherDeductions),
    };

    setResults({
      old: calculateOldRegimeTax(oldInputs),
      new: calculateNewRegimeTax({ grossIncome: income }),
    });
  };

  const handleReset = () => {
    setGrossIncome('');
    setDeduction80C('');
    setDeduction80D('');
    setDeduction80TTA('');
    setHraExemption('');
    setOtherDeductions('');
    setResults(null);
  };

  const betterRegime = results?.old && results?.new
    ? results.old.totalTaxPayable <= results.new.totalTaxPayable ? 'old' : 'new'
    : null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-navy rounded-lg">
          <Calculator className="h-6 w-6 text-saffron" />
        </div>
        <div>
          <h1 className="text-navy text-2xl font-bold">Income Tax Calculator</h1>
          <p className="text-navy/60 text-sm">FY 2024-25 (AY 2025-26) — Old Regime vs New Regime</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <strong>FY 2024-25 Update:</strong> The New Tax Regime is now the default regime. Standard deduction of ₹75,000 is available under the New Regime.
          Section 87A rebate is ₹25,000 for income up to ₹7 lakh (New Regime) and ₹12,500 for income up to ₹5 lakh (Old Regime).
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-5">
          <Card className="border-navy/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-navy text-base font-bold flex items-center gap-2">
                <span className="w-1 h-5 bg-saffron rounded-full" />
                Income Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-navy font-medium text-sm">
                  Annual Gross Income (₹) <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  placeholder="e.g. 1200000"
                  value={grossIncome}
                  onChange={e => setGrossIncome(e.target.value)}
                  className="border-navy/30"
                  min="0"
                />
                {grossIncome && (
                  <p className="text-navy/50 text-xs">{formatINR(parseNum(grossIncome))}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-navy font-medium text-sm">Age Group</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'below60', label: 'Below 60' },
                    { value: '60to80', label: '60 – 80' },
                    { value: 'above80', label: 'Above 80' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setAgeGroup(opt.value as AgeGroup)}
                      className={`text-xs py-2 px-2 rounded-lg border-2 font-medium transition-all ${
                        ageGroup === opt.value
                          ? 'bg-navy text-white border-navy'
                          : 'bg-white text-navy border-navy/20 hover:border-navy/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="text-navy/40 text-xs">Age group affects exemption limit under Old Regime only</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-navy/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-navy text-base font-bold flex items-center gap-2">
                <span className="w-1 h-5 bg-saffron rounded-full" />
                Deductions (Old Regime Only)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Section 80C (max ₹1.5L)', value: deduction80C, setter: setDeduction80C, placeholder: 'e.g. 150000' },
                { label: 'Section 80D (Health Insurance)', value: deduction80D, setter: setDeduction80D, placeholder: 'e.g. 25000' },
                { label: 'Section 80TTA (Savings Interest)', value: deduction80TTA, setter: setDeduction80TTA, placeholder: 'e.g. 10000' },
                { label: 'HRA Exemption', value: hraExemption, setter: setHraExemption, placeholder: 'e.g. 120000' },
                { label: 'Other Deductions', value: otherDeductions, setter: setOtherDeductions, placeholder: 'e.g. 50000' },
              ].map((field) => (
                <div key={field.label} className="space-y-1">
                  <Label className="text-navy/70 text-xs font-medium">{field.label}</Label>
                  <Input
                    type="number"
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                    className="border-navy/20 h-8 text-sm"
                    min="0"
                  />
                </div>
              ))}
              <p className="text-navy/40 text-xs pt-1">
                * Standard deduction of ₹50,000 is automatically applied under Old Regime.
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={handleCalculate}
              disabled={!grossIncome || parseNum(grossIncome) <= 0}
              className="flex-1 bg-navy hover:bg-navy/90 text-white font-bold"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Tax
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-navy/30 text-navy"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {!results ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center py-16">
                <Calculator className="h-16 w-16 text-navy/20 mx-auto mb-4" />
                <p className="text-navy/40 text-lg font-medium">Enter your income details</p>
                <p className="text-navy/30 text-sm mt-1">and click Calculate Tax to see results</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Recommendation Banner */}
              {betterRegime && (
                <div className={`rounded-lg p-4 border-2 ${
                  betterRegime === 'new'
                    ? 'bg-green-50 border-green-300'
                    : 'bg-blue-50 border-blue-300'
                }`}>
                  <p className="font-bold text-sm text-navy">
                    💡 Recommendation: {betterRegime === 'new' ? 'New Tax Regime' : 'Old Tax Regime'} is more beneficial for you.
                  </p>
                  <p className="text-navy/60 text-xs mt-1">
                    You save {formatINR(Math.abs((results.old?.totalTaxPayable || 0) - (results.new?.totalTaxPayable || 0)))} by choosing the {betterRegime === 'new' ? 'New' : 'Old'} Regime.
                  </p>
                </div>
              )}

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-navy/10 w-full">
                  <TabsTrigger value="both" className="flex-1 data-[state=active]:bg-navy data-[state=active]:text-white text-xs">
                    Compare Both
                  </TabsTrigger>
                  <TabsTrigger value="new" className="flex-1 data-[state=active]:bg-navy data-[state=active]:text-white text-xs">
                    New Regime
                  </TabsTrigger>
                  <TabsTrigger value="old" className="flex-1 data-[state=active]:bg-navy data-[state=active]:text-white text-xs">
                    Old Regime
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="both" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.new && (
                      <div className="relative">
                        {betterRegime === 'new' && (
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                            <Badge className="bg-green-600 text-white text-xs">Recommended</Badge>
                          </div>
                        )}
                        <TaxBreakdownCard breakdown={results.new} title="New Regime (Default)" />
                      </div>
                    )}
                    {results.old && (
                      <div className="relative">
                        {betterRegime === 'old' && (
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                            <Badge className="bg-green-600 text-white text-xs">Recommended</Badge>
                          </div>
                        )}
                        <TaxBreakdownCard breakdown={results.old} title="Old Regime" />
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="new" className="mt-4">
                  {results.new && <TaxBreakdownCard breakdown={results.new} title="New Tax Regime (FY 2024-25)" />}
                </TabsContent>

                <TabsContent value="old" className="mt-4">
                  {results.old && <TaxBreakdownCard breakdown={results.old} title="Old Tax Regime (FY 2024-25)" />}
                </TabsContent>
              </Tabs>

              {/* Tax Slabs Reference */}
              <Card className="border-navy/20">
                <CardHeader className="pb-2 pt-3">
                  <CardTitle className="text-navy text-sm font-bold">FY 2024-25 Tax Slabs Reference</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-semibold text-navy mb-2">New Regime (Default)</p>
                      <table className="w-full">
                        <tbody>
                          {[
                            ['Up to ₹3L', 'Nil'],
                            ['₹3L – ₹7L', '5%'],
                            ['₹7L – ₹10L', '10%'],
                            ['₹10L – ₹12L', '15%'],
                            ['₹12L – ₹15L', '20%'],
                            ['Above ₹15L', '30%'],
                          ].map(([range, rate]) => (
                            <tr key={range} className="border-b border-navy/5">
                              <td className="py-1 text-navy/70">{range}</td>
                              <td className="py-1 text-navy font-semibold text-right">{rate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <p className="font-semibold text-navy mb-2">Old Regime (Below 60)</p>
                      <table className="w-full">
                        <tbody>
                          {[
                            ['Up to ₹2.5L', 'Nil'],
                            ['₹2.5L – ₹5L', '5%'],
                            ['₹5L – ₹10L', '20%'],
                            ['Above ₹10L', '30%'],
                          ].map(([range, rate]) => (
                            <tr key={range} className="border-b border-navy/5">
                              <td className="py-1 text-navy/70">{range}</td>
                              <td className="py-1 text-navy font-semibold text-right">{rate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
