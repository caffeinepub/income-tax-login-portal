import React from 'react';
import { Newspaper, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NEWS_ITEMS = [
  {
    date: '15 Feb 2026',
    category: 'Circular',
    title: 'CBDT extends deadline for filing belated/revised ITR for AY 2024-25',
    description: 'The Central Board of Direct Taxes (CBDT) has extended the last date for filing belated and revised Income Tax Returns for Assessment Year 2024-25 to 31st March 2026 for certain categories of taxpayers.',
    badge: 'Important',
    badgeVariant: 'destructive' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
  },
  {
    date: '01 Feb 2026',
    category: 'Budget',
    title: 'Union Budget 2026-27: Key Income Tax Proposals',
    description: 'The Finance Minister presented the Union Budget 2026-27. Key proposals include revised tax slabs under the New Regime, increased standard deduction, and enhanced rebate under Section 87A.',
    badge: 'Budget',
    badgeVariant: 'default' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
  },
  {
    date: '20 Jan 2026',
    category: 'Notification',
    title: 'ITR Forms for AY 2025-26 notified by CBDT',
    description: 'CBDT has notified the Income Tax Return forms (ITR-1 to ITR-7) for Assessment Year 2025-26. Taxpayers can now download the forms from the official portal.',
    badge: 'New Forms',
    badgeVariant: 'secondary' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
  },
  {
    date: '10 Jan 2026',
    category: 'Advisory',
    title: 'Advisory: Pre-validate Bank Account for Faster Refund Processing',
    description: 'Taxpayers are advised to pre-validate their bank accounts on the e-Filing portal to ensure faster processing of income tax refunds. Refunds are credited only to pre-validated accounts.',
    badge: 'Advisory',
    badgeVariant: 'secondary' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
  },
  {
    date: '31 Dec 2025',
    category: 'Deadline',
    title: 'Last date for filing updated ITR (ITR-U) for AY 2022-23',
    description: 'Taxpayers who wish to file an updated return (ITR-U) for Assessment Year 2022-23 must do so by 31st December 2025. ITR-U allows taxpayers to correct errors or omissions in previously filed returns.',
    badge: 'Deadline',
    badgeVariant: 'destructive' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
  },
  {
    date: '15 Dec 2025',
    category: 'Circular',
    title: 'TDS Rate Chart for FY 2025-26 released by CBDT',
    description: 'CBDT has released the updated TDS (Tax Deducted at Source) rate chart for Financial Year 2025-26. Key changes include revised rates for certain sections and new provisions introduced in the Finance Act.',
    badge: 'TDS',
    badgeVariant: 'secondary' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
  },
  {
    date: '01 Dec 2025',
    category: 'Notification',
    title: 'New Tax Regime remains default for FY 2025-26',
    description: 'The New Tax Regime continues to be the default tax regime for FY 2025-26. Taxpayers who wish to opt for the Old Tax Regime must explicitly do so while filing their ITR.',
    badge: 'Tax Regime',
    badgeVariant: 'default' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
  },
  {
    date: '15 Nov 2025',
    category: 'Advisory',
    title: 'PAN-Aadhaar Linking: Consequences of Non-Compliance',
    description: 'Taxpayers whose PAN is not linked with Aadhaar will face consequences including higher TDS deduction at 20%, inability to file ITR, and PAN becoming inoperative. Link immediately to avoid penalties.',
    badge: 'Urgent',
    badgeVariant: 'destructive' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
  },
  {
    date: '31 Oct 2025',
    category: 'Deadline',
    title: 'Last date to file ITR for AY 2024-25 (Audit cases)',
    description: 'The last date to file Income Tax Return for Assessment Year 2024-25 for taxpayers whose accounts are required to be audited is 31st October 2025.',
    badge: 'Deadline',
    badgeVariant: 'destructive' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
  },
  {
    date: '31 Jul 2025',
    category: 'Deadline',
    title: 'Last date to file ITR for AY 2024-25 (Non-Audit cases)',
    description: 'The last date to file Income Tax Return for Assessment Year 2024-25 for non-audit taxpayers (individuals, HUFs, etc.) is 31st July 2025.',
    badge: 'Deadline',
    badgeVariant: 'destructive' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Circular: 'bg-blue-100 text-blue-700',
  Budget: 'bg-purple-100 text-purple-700',
  Notification: 'bg-green-100 text-green-700',
  Advisory: 'bg-orange-100 text-orange-700',
  Deadline: 'bg-red-100 text-red-700',
};

export default function NewsUpdatesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-navy rounded-lg">
            <Newspaper className="h-6 w-6 text-saffron" />
          </div>
          <div>
            <h1 className="text-navy text-2xl font-bold">News & Updates</h1>
            <p className="text-navy/60 text-sm">Latest announcements from the Income Tax Department</p>
          </div>
        </div>
        <a
          href="https://www.incometax.gov.in/iec/foportal/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-navy text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-navy/90 transition-colors text-sm"
        >
          View All Official Announcements
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* News List */}
      <div className="space-y-4">
        {NEWS_ITEMS.map((item, i) => (
          <Card key={i} className="border-navy/20 hover:shadow-md transition-shadow">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-4">
                <div className="shrink-0 text-center min-w-[60px]">
                  <div className="bg-navy rounded-lg px-2 py-1.5">
                    <p className="text-saffron font-bold text-xs leading-tight">
                      {item.date.split(' ')[0]}
                    </p>
                    <p className="text-white/80 text-xs">
                      {item.date.split(' ')[1]}
                    </p>
                    <p className="text-white/60 text-xs">
                      {item.date.split(' ')[2]}
                    </p>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${CATEGORY_COLORS[item.category] || 'bg-gray-100 text-gray-700'}`}>
                      <Tag className="h-2.5 w-2.5 inline mr-1" />
                      {item.category}
                    </span>
                    <Badge variant={item.badgeVariant} className="text-xs">{item.badge}</Badge>
                  </div>
                  <h3 className="text-navy font-bold text-base leading-snug mb-1.5">{item.title}</h3>
                  <p className="text-navy/60 text-sm leading-relaxed mb-3">{item.description}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-navy font-semibold text-xs hover:underline"
                  >
                    Read more on incometax.gov.in
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All CTA */}
      <div className="text-center py-4">
        <a
          href="https://www.incometax.gov.in/iec/foportal/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-navy text-white font-bold px-8 py-3 rounded-lg hover:bg-navy/90 transition-colors"
        >
          View All Official Announcements on incometax.gov.in
          <ExternalLink className="h-4 w-4" />
        </a>
        <p className="text-navy/40 text-xs mt-2 flex items-center justify-center gap-1">
          <Calendar className="h-3 w-3" />
          Content last updated: February 2026
        </p>
      </div>
    </div>
  );
}
