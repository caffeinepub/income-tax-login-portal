import React from 'react';
import { RefreshCw, ExternalLink, Phone, Clock, AlertCircle, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const STEPS = [
  {
    step: 1,
    title: 'File Your ITR',
    description: 'Ensure you have filed your Income Tax Return (ITR) for the relevant Assessment Year and it has been verified (e-verified or physically verified).',
    icon: FileText,
  },
  {
    step: 2,
    title: 'ITR Processing',
    description: 'The Income Tax Department processes your ITR. This typically takes 20-45 days after e-verification. You will receive an intimation under Section 143(1).',
    icon: Clock,
  },
  {
    step: 3,
    title: 'Refund Initiation',
    description: 'If a refund is due, the department initiates the refund. The refund is credited to your pre-validated bank account linked with your PAN.',
    icon: CheckCircle,
  },
  {
    step: 4,
    title: 'Check Refund Status',
    description: 'Track your refund status on the NSDL TIN portal or the Income Tax e-Filing portal using your PAN and Assessment Year.',
    icon: RefreshCw,
  },
];

const COMMON_REASONS = [
  'Bank account not pre-validated or not linked with PAN',
  'Mismatch in name between PAN and bank account',
  'ITR not e-verified within 30 days of filing',
  'Outstanding tax demand against the taxpayer',
  'Incorrect bank account number or IFSC code',
  'ITR under scrutiny or selected for detailed assessment',
];

export default function RefundStatusPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-navy rounded-lg">
          <RefreshCw className="h-6 w-6 text-saffron" />
        </div>
        <div>
          <h1 className="text-navy text-2xl font-bold">Income Tax Refund Status</h1>
          <p className="text-navy/60 text-sm">Check the status of your income tax refund</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="bg-navy rounded-xl p-6">
        <h2 className="text-white font-bold text-lg mb-2">Check Your Refund Status</h2>
        <p className="text-white/70 text-sm mb-5">
          You will be redirected to the official government portal to check your refund status. Keep your PAN and Assessment Year handy.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://tin.tin.nsdl.com/oltas/refundstatuslogin.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-saffron text-white font-bold px-6 py-3 rounded-lg hover:bg-saffron-dark transition-colors text-sm"
          >
            Check on NSDL Portal
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href="https://eportal.incometax.gov.in/iec/foservicesapp/#/login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors text-sm"
          >
            Check on e-Filing Portal
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <p className="text-white/40 text-xs mt-3 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          You will be redirected to the official Government of India portal.
        </p>
      </div>

      {/* Step-by-step Guide */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1 h-6 bg-saffron rounded-full" />
          <h2 className="text-navy text-xl font-bold">How to Check Refund Status</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step) => (
            <Card key={step.step} className="border-navy/20 relative">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  <step.icon className="h-5 w-5 text-saffron" />
                </div>
                <h3 className="text-navy font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-navy/60 text-xs leading-relaxed">{step.description}</p>
              </CardContent>
              {step.step < 4 && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="h-4 w-4 text-navy/30" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Two-column: Timeline + Common Reasons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Processing Timeline */}
        <Card className="border-navy/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-navy text-base font-bold flex items-center gap-2">
              <Clock className="h-4 w-4 text-saffron" />
              Typical Refund Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'ITR Filing to e-Verification', time: '0–30 days', note: 'Must e-verify within 30 days' },
              { label: 'ITR Processing (Section 143(1))', time: '20–45 days', note: 'After e-verification' },
              { label: 'Refund Initiation', time: '7–10 days', note: 'After processing completion' },
              { label: 'Credit to Bank Account', time: '3–5 days', note: 'After refund initiation' },
              { label: 'Total Expected Time', time: '30–90 days', note: 'From date of filing', highlight: true },
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between py-2 border-b border-navy/10 last:border-0 ${item.highlight ? 'bg-saffron/10 rounded-lg px-3' : ''}`}>
                <div>
                  <p className={`text-sm ${item.highlight ? 'text-navy font-bold' : 'text-navy/80'}`}>{item.label}</p>
                  <p className="text-navy/40 text-xs">{item.note}</p>
                </div>
                <span className={`text-sm font-bold shrink-0 ml-3 ${item.highlight ? 'text-saffron' : 'text-navy'}`}>
                  {item.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Common Reasons for Delay */}
        <Card className="border-navy/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-navy text-base font-bold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-saffron" />
              Common Reasons for Refund Delay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {COMMON_REASONS.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-navy/70">
                  <span className="text-red-500 mt-0.5 shrink-0">✗</span>
                  {reason}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Helpline */}
      <Card className="border-saffron/30 bg-saffron/5">
        <CardContent className="pt-5 pb-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 bg-saffron/20 rounded-xl">
              <Phone className="h-6 w-6 text-saffron" />
            </div>
            <div className="flex-1">
              <h3 className="text-navy font-bold text-base mb-1">Need Help? Contact the Helpline</h3>
              <p className="text-navy/70 text-sm">
                For refund-related queries, contact the Income Tax Department helpline:
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <div>
                  <p className="text-navy font-bold text-lg">1800 103 0025</p>
                  <p className="text-navy/50 text-xs">Toll-free (Mon–Sat, 8am–8pm)</p>
                </div>
                <div>
                  <p className="text-navy font-bold text-lg">1800 419 0025</p>
                  <p className="text-navy/50 text-xs">Alternate Helpline</p>
                </div>
              </div>
            </div>
            <a
              href="https://eportal.incometax.gov.in/iec/foservicesapp/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-navy text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-navy/90 transition-colors text-sm shrink-0"
            >
              e-Filing Portal
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
