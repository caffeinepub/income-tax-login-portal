import React from 'react';
import { FileText, Download, ExternalLink, Users, Building, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ITR_FORMS = [
  {
    name: 'ITR-1',
    subtitle: 'SAHAJ',
    icon: Users,
    applicability: 'For Resident Individuals with income from Salary/Pension, One House Property, Other Sources (Interest etc.), and total income up to ₹50 lakh.',
    notFor: 'Not for individuals with income from business/profession, capital gains, or foreign assets.',
    badge: 'Most Common',
    badgeVariant: 'default' as const,
    color: 'border-blue-200 bg-blue-50',
    iconColor: 'text-blue-700',
    iconBg: 'bg-blue-100',
    downloadUrl: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-to-you',
  },
  {
    name: 'ITR-2',
    subtitle: null,
    icon: Briefcase,
    applicability: 'For Individuals and HUFs not having income from profits and gains of business or profession. Applicable for those with capital gains, foreign income, or income from more than one house property.',
    notFor: 'Not for individuals with business/professional income.',
    badge: 'Capital Gains',
    badgeVariant: 'secondary' as const,
    color: 'border-purple-200 bg-purple-50',
    iconColor: 'text-purple-700',
    iconBg: 'bg-purple-100',
    downloadUrl: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-to-you',
  },
  {
    name: 'ITR-3',
    subtitle: null,
    icon: Briefcase,
    applicability: 'For Individuals and HUFs having income from profits and gains of business or profession. Also for those with income from a partnership firm.',
    notFor: null,
    badge: 'Business/Profession',
    badgeVariant: 'secondary' as const,
    color: 'border-orange-200 bg-orange-50',
    iconColor: 'text-orange-700',
    iconBg: 'bg-orange-100',
    downloadUrl: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-to-you',
  },
  {
    name: 'ITR-4',
    subtitle: 'SUGAM',
    icon: Users,
    applicability: 'For Individuals, HUFs, and Firms (other than LLP) with total income up to ₹50 lakh and having income from business and profession computed under presumptive taxation scheme (Sections 44AD, 44ADA, 44AE).',
    notFor: 'Not for those with income from capital gains, foreign assets, or more than one house property.',
    badge: 'Presumptive Tax',
    badgeVariant: 'default' as const,
    color: 'border-green-200 bg-green-50',
    iconColor: 'text-green-700',
    iconBg: 'bg-green-100',
    downloadUrl: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-to-you',
  },
  {
    name: 'ITR-5',
    subtitle: null,
    icon: Building,
    applicability: 'For persons other than: (i) Individual, (ii) HUF, (iii) Company, and (iv) Person filing Form ITR-7. Applicable for Partnership Firms, LLPs, AOPs, BOIs, etc.',
    notFor: null,
    badge: 'Firms/LLPs',
    badgeVariant: 'outline' as const,
    color: 'border-teal-200 bg-teal-50',
    iconColor: 'text-teal-700',
    iconBg: 'bg-teal-100',
    downloadUrl: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-to-you',
  },
  {
    name: 'ITR-6',
    subtitle: null,
    icon: Building,
    applicability: 'For Companies other than companies claiming exemption under Section 11 (income from property held for charitable or religious purposes).',
    notFor: null,
    badge: 'Companies',
    badgeVariant: 'outline' as const,
    color: 'border-indigo-200 bg-indigo-50',
    iconColor: 'text-indigo-700',
    iconBg: 'bg-indigo-100',
    downloadUrl: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-to-you',
  },
  {
    name: 'ITR-7',
    subtitle: null,
    icon: Building,
    applicability: 'For persons including companies who are required to furnish return under Sections 139(4A), 139(4B), 139(4C), 139(4D), 139(4E), or 139(4F). Applicable for Trusts, Political Parties, Institutions, etc.',
    notFor: null,
    badge: 'Trusts/Institutions',
    badgeVariant: 'outline' as const,
    color: 'border-red-200 bg-red-50',
    iconColor: 'text-red-700',
    iconBg: 'bg-red-100',
    downloadUrl: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-to-you',
  },
];

export default function ITRFormsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-navy rounded-lg">
          <FileText className="h-6 w-6 text-saffron" />
        </div>
        <div>
          <h1 className="text-navy text-2xl font-bold">ITR Forms Directory</h1>
          <p className="text-navy/60 text-sm">Income Tax Return Forms for AY 2024-25</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-saffron/10 border border-saffron/30 rounded-lg p-4">
        <p className="text-navy text-sm">
          <strong>Which ITR form should you use?</strong> Select the correct ITR form based on your income sources and taxpayer category.
          Filing the wrong form may result in a defective return notice from the Income Tax Department.
        </p>
        <a
          href="https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-to-you"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-navy font-semibold text-sm mt-2 hover:underline"
        >
          View official guidance on incometax.gov.in
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ITR_FORMS.map((form) => (
          <Card key={form.name} className={`border-2 ${form.color} transition-shadow hover:shadow-md`}>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${form.iconBg} shrink-0`}>
                  <form.icon className={`h-6 w-6 ${form.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-navy font-bold text-lg">{form.name}</h3>
                    {form.subtitle && (
                      <span className="text-navy/60 font-semibold text-sm">({form.subtitle})</span>
                    )}
                    <Badge variant={form.badgeVariant} className="text-xs">
                      {form.badge}
                    </Badge>
                  </div>
                  <p className="text-navy/70 text-sm leading-relaxed mb-2">{form.applicability}</p>
                  {form.notFor && (
                    <p className="text-red-600/80 text-xs bg-red-50 rounded px-2 py-1 mb-3">
                      ⚠ {form.notFor}
                    </p>
                  )}
                  <a
                    href={form.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-navy/90 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download / View Form
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Note */}
      <div className="bg-navy/5 border border-navy/20 rounded-lg p-4 text-center">
        <p className="text-navy/70 text-sm">
          For the latest ITR forms, instructions, and utilities, visit the official portal:{' '}
          <a
            href="https://www.incometax.gov.in/iec/foportal/downloads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy font-semibold hover:underline inline-flex items-center gap-1"
          >
            incometax.gov.in/downloads
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </p>
      </div>
    </div>
  );
}
