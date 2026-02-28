import React from 'react';
import { CreditCard, ExternalLink, Link2, Search, UserPlus, Edit, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PAN_SERVICES = [
  {
    icon: UserPlus,
    title: 'Apply for New PAN',
    description: 'Apply for a new Permanent Account Number (PAN) card online through NSDL or UTIITSL portal.',
    badge: 'Online',
    badgeVariant: 'default' as const,
    href: 'https://www.onlineservices.nsdl.com/paan/endUserRegisterContact.html',
    buttonText: 'Apply for PAN (NSDL)',
    color: 'border-blue-200 bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    icon: Edit,
    title: 'Correction/Change in PAN',
    description: 'Apply for changes or corrections in your existing PAN card details such as name, date of birth, or address.',
    badge: 'Online',
    badgeVariant: 'default' as const,
    href: 'https://www.onlineservices.nsdl.com/paan/endUserRegisterContact.html',
    buttonText: 'Apply for Correction',
    color: 'border-orange-200 bg-orange-50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700',
  },
  {
    icon: Link2,
    title: 'Link PAN with Aadhaar',
    description: 'Link your PAN with Aadhaar number as mandated by the Income Tax Department. Failure to link may result in higher TDS deduction.',
    badge: 'Mandatory',
    badgeVariant: 'destructive' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
    buttonText: 'Link PAN-Aadhaar',
    color: 'border-red-200 bg-red-50',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-700',
  },
  {
    icon: Search,
    title: 'PAN Verification',
    description: 'Verify the validity and details of a PAN card. Useful for employers and financial institutions to verify PAN of employees/customers.',
    badge: 'Free',
    badgeVariant: 'secondary' as const,
    href: 'https://www.incometax.gov.in/iec/foportal/',
    buttonText: 'Verify PAN',
    color: 'border-green-200 bg-green-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
  },
  {
    icon: CheckCircle,
    title: 'PAN Status Check',
    description: 'Check the status of your PAN application or request for changes/corrections submitted to NSDL or UTIITSL.',
    badge: 'Track',
    badgeVariant: 'secondary' as const,
    href: 'https://tin.tin.nsdl.com/pantan/StatusTrack.html',
    buttonText: 'Check PAN Status',
    color: 'border-teal-200 bg-teal-50',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
  },
  {
    icon: CreditCard,
    title: 'Instant e-PAN',
    description: 'Get an instant e-PAN (electronic PAN) using your Aadhaar number. The e-PAN is issued free of cost and is valid as a physical PAN card.',
    badge: 'Instant',
    badgeVariant: 'default' as const,
    href: 'https://eportal.incometax.gov.in/iec/foservicesapp/#/login',
    buttonText: 'Get Instant e-PAN',
    color: 'border-purple-200 bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
  },
];

const TAN_SERVICES = [
  {
    icon: UserPlus,
    title: 'Apply for New TAN',
    description: 'Apply for a Tax Deduction and Collection Account Number (TAN) required for deducting TDS/TCS.',
    badge: 'Online',
    badgeVariant: 'default' as const,
    href: 'https://tin.tin.nsdl.com/tan/index.html',
    buttonText: 'Apply for TAN',
    color: 'border-indigo-200 bg-indigo-50',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
  },
  {
    icon: Search,
    title: 'TAN Verification',
    description: 'Verify the TAN of a deductor. Useful for verifying TAN details before filing TDS returns.',
    badge: 'Free',
    badgeVariant: 'secondary' as const,
    href: 'https://tin.tin.nsdl.com/tan/index.html',
    buttonText: 'Verify TAN',
    color: 'border-gray-200 bg-gray-50',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-700',
  },
  {
    icon: CheckCircle,
    title: 'TAN Status Check',
    description: 'Track the status of your TAN application submitted to NSDL.',
    badge: 'Track',
    badgeVariant: 'secondary' as const,
    href: 'https://tin.tin.nsdl.com/tan/index.html',
    buttonText: 'Check TAN Status',
    color: 'border-yellow-200 bg-yellow-50',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-700',
  },
];

function ServiceCard({ service }: { service: typeof PAN_SERVICES[0] }) {
  return (
    <Card className={`border-2 ${service.color} transition-shadow hover:shadow-md`}>
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${service.iconBg} shrink-0`}>
            <service.icon className={`h-6 w-6 ${service.iconColor}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-navy font-bold text-base">{service.title}</h3>
              <Badge variant={service.badgeVariant} className="text-xs">{service.badge}</Badge>
            </div>
            <p className="text-navy/70 text-sm leading-relaxed mb-3">{service.description}</p>
            <a
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-navy/90 transition-colors"
            >
              {service.buttonText}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PANTANServicesPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-navy rounded-lg">
          <CreditCard className="h-6 w-6 text-saffron" />
        </div>
        <div>
          <h1 className="text-navy text-2xl font-bold">PAN / TAN Services</h1>
          <p className="text-navy/60 text-sm">Permanent Account Number & Tax Deduction Account Number Services</p>
        </div>
      </div>

      {/* PAN Info Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm font-semibold mb-1">⚠ Important: PAN-Aadhaar Linking Mandatory</p>
        <p className="text-red-700 text-sm">
          Linking PAN with Aadhaar is mandatory for all taxpayers. Failure to link may result in your PAN becoming inoperative,
          leading to higher TDS deduction at 20% and inability to file ITR.
        </p>
        <a
          href="https://www.incometax.gov.in/iec/foportal/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-red-800 font-bold text-sm mt-2 hover:underline"
        >
          Link PAN-Aadhaar Now on incometax.gov.in
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* PAN Services */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1 h-6 bg-saffron rounded-full" />
          <h2 className="text-navy text-xl font-bold">PAN Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PAN_SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      {/* TAN Services */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1 h-6 bg-saffron rounded-full" />
          <h2 className="text-navy text-xl font-bold">TAN Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TAN_SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      {/* NSDL & UTIITSL Links */}
      <div className="bg-navy/5 border border-navy/20 rounded-lg p-5">
        <h3 className="text-navy font-bold text-base mb-3">Official PAN/TAN Service Providers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://www.onlineservices.nsdl.com/paan/endUserRegisterContact.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white border border-navy/20 rounded-lg hover:border-navy/50 hover:shadow-sm transition-all"
          >
            <div className="p-2 bg-navy/10 rounded-lg">
              <CreditCard className="h-5 w-5 text-navy" />
            </div>
            <div>
              <p className="text-navy font-semibold text-sm">NSDL e-Gov</p>
              <p className="text-navy/50 text-xs">PAN/TAN Application & Services</p>
            </div>
            <ExternalLink className="h-4 w-4 text-navy/40 ml-auto" />
          </a>
          <a
            href="https://www.utiitsl.com/UTIITSL_SITE/pan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white border border-navy/20 rounded-lg hover:border-navy/50 hover:shadow-sm transition-all"
          >
            <div className="p-2 bg-navy/10 rounded-lg">
              <CreditCard className="h-5 w-5 text-navy" />
            </div>
            <div>
              <p className="text-navy font-semibold text-sm">UTIITSL</p>
              <p className="text-navy/50 text-xs">PAN Application & Services</p>
            </div>
            <ExternalLink className="h-4 w-4 text-navy/40 ml-auto" />
          </a>
        </div>
      </div>
    </div>
  );
}
