import React from 'react';
import { Link } from '@tanstack/react-router';
import {
  FileText, Calculator, CreditCard, RefreshCw, Search,
  ExternalLink, ArrowRight, Phone, Shield, Clock, CheckCircle,
  AlertCircle, Download, Users, TrendingUp
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const QUICK_SERVICES = [
  {
    icon: FileText,
    title: 'e-Filing of ITR',
    description: 'File your Income Tax Return online for AY 2024-25',
    badge: 'Due: 31 Jul 2025',
    badgeVariant: 'destructive' as const,
    href: 'https://eportal.incometax.gov.in/iec/foservicesapp/#/login',
    external: true,
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    icon: Calculator,
    title: 'Tax Calculator',
    description: 'Calculate your tax liability under Old & New Regime FY 2024-25',
    badge: 'FY 2024-25',
    badgeVariant: 'secondary' as const,
    to: '/tax-calculator',
    external: false,
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
  },
  {
    icon: FileText,
    title: 'ITR Forms',
    description: 'Download ITR-1 to ITR-7 forms and instructions',
    badge: null,
    badgeVariant: 'default' as const,
    to: '/itr-forms',
    external: false,
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
  },
  {
    icon: CreditCard,
    title: 'PAN/TAN Services',
    description: 'Apply for PAN, link Aadhaar, verify PAN, apply for TAN',
    badge: null,
    badgeVariant: 'default' as const,
    to: '/pan-tan-services',
    external: false,
    color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700',
  },
  {
    icon: RefreshCw,
    title: 'Refund Status',
    description: 'Check the status of your income tax refund',
    badge: null,
    badgeVariant: 'default' as const,
    to: '/refund-status',
    external: false,
    color: 'bg-teal-50 border-teal-200 hover:border-teal-400',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
  },
  {
    icon: Search,
    title: 'Form 26AS / AIS',
    description: 'View Annual Information Statement and Tax Credit Statement',
    badge: null,
    badgeVariant: 'default' as const,
    href: 'https://eportal.incometax.gov.in/iec/foservicesapp/#/login',
    external: true,
    color: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
  },
  {
    icon: Download,
    title: 'Downloads',
    description: 'Download forms, utilities, and instructions',
    badge: null,
    badgeVariant: 'default' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/downloads',
    external: true,
    color: 'bg-red-50 border-red-200 hover:border-red-400',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-700',
  },
  {
    icon: Users,
    title: 'Grievances',
    description: 'Submit or track your grievances with the department',
    badge: null,
    badgeVariant: 'default' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
    external: true,
    color: 'bg-gray-50 border-gray-200 hover:border-gray-400',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-700',
  },
];

const IMPORTANT_DATES = [
  { date: '31 Jul 2025', event: 'Last date to file ITR for AY 2024-25 (Non-Audit)', urgent: true },
  { date: '31 Oct 2025', event: 'Last date to file ITR for AY 2024-25 (Audit cases)', urgent: false },
  { date: '15 Jun 2025', event: 'Advance Tax – 1st Installment for AY 2025-26', urgent: false },
  { date: '15 Sep 2025', event: 'Advance Tax – 2nd Installment for AY 2025-26', urgent: false },
];

const STATS = [
  { icon: Users, value: '8.9 Cr+', label: 'Registered Taxpayers' },
  { icon: FileText, value: '7.4 Cr+', label: 'ITRs Filed (AY 2023-24)' },
  { icon: TrendingUp, value: '₹18.9 L Cr', label: 'Direct Tax Collection FY 2023-24' },
  { icon: CheckCircle, value: '99.7%', label: 'ITRs Processed' },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/generated/itd-header-banner.dim_1200x80.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-navy/90 px-6 py-10 md:py-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/generated/ashoka-emblem.dim_128x128.png"
                alt="Ashoka Emblem"
                className="h-12 w-12 object-contain"
              />
              <div>
                <p className="text-saffron text-xs font-semibold tracking-widest uppercase">Government of India</p>
                <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight">
                  Income Tax Department
                </h1>
              </div>
            </div>
            <p className="text-white/80 text-base md:text-lg mt-3 mb-6 max-w-xl">
              File your Income Tax Returns, calculate tax liability, access PAN/TAN services, and more — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="https://eportal.incometax.gov.in/iec/foservicesapp/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-saffron text-white font-bold px-6 py-3 rounded-lg hover:bg-saffron-dark transition-colors text-sm"
              >
                Login to e-Filing Portal
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://eportal.incometax.gov.in/iec/foservicesapp/#/register"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors text-sm"
              >
                Register on Portal
                <ExternalLink className="h-4 w-4" />
              </a>
              <Link
                to="/login"
                className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors text-sm"
              >
                Login to App
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Redirect notice */}
            <p className="text-white/50 text-xs mt-3 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Clicking "Login to e-Filing Portal" will redirect you to the official Government of India portal.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="border-navy/10 bg-white text-center">
            <CardContent className="pt-4 pb-4">
              <stat.icon className="h-6 w-6 text-saffron mx-auto mb-2" />
              <p className="text-navy font-bold text-lg leading-tight">{stat.value}</p>
              <p className="text-navy/50 text-xs mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Services */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1 h-6 bg-saffron rounded-full" />
          <h2 className="text-navy text-xl font-bold">Quick Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_SERVICES.map((service) => {
            const content = (
              <div className={`flex flex-col gap-3 p-4 rounded-xl border-2 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer h-full ${service.color}`}>
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-lg ${service.iconBg}`}>
                    <service.icon className={`h-5 w-5 ${service.iconColor}`} />
                  </div>
                  {service.badge && (
                    <Badge variant={service.badgeVariant} className="text-xs">
                      {service.badge}
                    </Badge>
                  )}
                </div>
                <div>
                  <h3 className="text-navy font-semibold text-sm">{service.title}</h3>
                  <p className="text-navy/60 text-xs mt-1 leading-relaxed">{service.description}</p>
                </div>
                <div className="mt-auto flex items-center gap-1 text-xs font-semibold text-navy/70">
                  {service.external ? (
                    <>Access Service <ExternalLink className="h-3 w-3" /></>
                  ) : (
                    <>View Details <ArrowRight className="h-3 w-3" /></>
                  )}
                </div>
              </div>
            );

            return service.external ? (
              <a
                key={service.title}
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {content}
              </a>
            ) : (
              <Link key={service.title} to={service.to!} className="block">
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Two-column: Important Dates + Helpline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Important Dates */}
        <Card className="border-navy/20">
          <div className="bg-navy rounded-t-lg px-4 py-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-saffron" />
            <h3 className="text-white font-bold text-sm">Important Due Dates</h3>
          </div>
          <CardContent className="pt-4 pb-4 space-y-3">
            {IMPORTANT_DATES.map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-navy/10 last:border-0 last:pb-0">
                <div className={`text-xs font-mono font-bold px-2 py-1 rounded shrink-0 ${
                  item.urgent ? 'bg-red-100 text-red-700' : 'bg-saffron/15 text-navy'
                }`}>
                  {item.date}
                </div>
                <span className="text-navy/80 text-sm leading-snug">{item.event}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Helpline & Contact */}
        <Card className="border-navy/20">
          <div className="bg-navy rounded-t-lg px-4 py-3 flex items-center gap-2">
            <Phone className="h-4 w-4 text-saffron" />
            <h3 className="text-white font-bold text-sm">Helpline & Contact</h3>
          </div>
          <CardContent className="pt-4 pb-4 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-saffron/10 rounded-lg border border-saffron/20">
              <Phone className="h-5 w-5 text-saffron shrink-0" />
              <div>
                <p className="text-navy font-bold text-base">1800 103 0025</p>
                <p className="text-navy/60 text-xs">Toll-free Helpline (Mon–Sat, 8am–8pm)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-saffron/10 rounded-lg border border-saffron/20">
              <Phone className="h-5 w-5 text-saffron shrink-0" />
              <div>
                <p className="text-navy font-bold text-base">1800 419 0025</p>
                <p className="text-navy/60 text-xs">Alternate Helpline Number</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Shield className="h-5 w-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-navy font-semibold text-sm">Official Portal</p>
                <a
                  href="https://www.incometax.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs hover:underline flex items-center gap-1"
                >
                  www.incometax.gov.in
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Regime Banner */}
      <div className="bg-gradient-to-r from-navy to-navy/80 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-saffron font-bold text-lg mb-1">New Tax Regime – FY 2024-25</h3>
            <p className="text-white/80 text-sm max-w-xl">
              The New Tax Regime is now the default regime. Enjoy lower tax rates with a standard deduction of ₹75,000.
              Compare both regimes using our Tax Calculator.
            </p>
          </div>
          <Link
            to="/tax-calculator"
            className="flex items-center gap-2 bg-saffron text-white font-bold px-5 py-2.5 rounded-lg hover:bg-saffron-dark transition-colors text-sm shrink-0"
          >
            Calculate Tax Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
