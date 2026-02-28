import React from 'react';
import { Link } from '@tanstack/react-router';

const NEWS_ITEMS = [
  'Last date to file ITR for AY 2024-25 (Non-Audit cases) is 31st July 2025.',
  'New Tax Regime is the default regime for FY 2024-25. Standard deduction of ₹75,000 applicable.',
  'PAN-Aadhaar linking is mandatory. Failure to link may result in higher TDS deduction.',
  'CBDT notifies ITR forms for AY 2024-25. ITR-1 and ITR-4 now available for filing.',
  'Advance Tax 4th installment due date: 15th March 2025.',
  'Section 87A rebate: Tax rebate up to ₹25,000 for income up to ₹7 lakh under New Regime.',
  'TDS on salary: Employers must deduct TDS based on the tax regime opted by the employee.',
  'Form 26AS and AIS now available on the e-Filing portal for AY 2024-25.',
  'New circular: CBDT extends deadline for filing belated/revised ITR for AY 2023-24.',
];

export default function NewsTicker() {
  return (
    <div className="bg-navy/95 border-b border-white/10 py-1.5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        <Link
          to="/news-updates"
          className="shrink-0 bg-saffron text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide hover:bg-saffron-dark transition-colors whitespace-nowrap"
        >
          News & Updates
        </Link>
        <div className="overflow-hidden flex-1">
          <div className="news-ticker-track flex gap-12 whitespace-nowrap">
            {[...NEWS_ITEMS, ...NEWS_ITEMS].map((item, i) => (
              <span key={i} className="text-white/80 text-xs inline-block">
                <span className="text-saffron mr-2">▶</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
