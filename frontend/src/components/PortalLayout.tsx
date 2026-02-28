import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import DisclaimerBanner from './DisclaimerBanner';
import NewsTicker from './NewsTicker';

interface PortalLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  to?: string;
  href?: string;
  children?: { label: string; to?: string; href?: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'e-Filing',
    children: [
      { label: 'File ITR Online', href: 'https://eportal.incometax.gov.in/iec/foservicesapp/#/login' },
      { label: 'View Filed Returns', href: 'https://eportal.incometax.gov.in/iec/foservicesapp/#/login' },
      { label: 'Upload Form 16', href: 'https://eportal.incometax.gov.in/iec/foservicesapp/#/login' },
      { label: 'e-Verify Return', href: 'https://eportal.incometax.gov.in/iec/foservicesapp/#/login' },
    ],
  },
  {
    label: 'Tax Services',
    children: [
      { label: 'Tax Calculator', to: '/tax-calculator' },
      { label: 'Form 26AS / AIS', href: 'https://eportal.incometax.gov.in/iec/foservicesapp/#/login' },
      { label: 'Refund Status', to: '/refund-status' },
      { label: 'PAN/TAN Services', to: '/pan-tan-services' },
    ],
  },
  {
    label: 'Forms',
    children: [
      { label: 'ITR Forms', to: '/itr-forms' },
      { label: 'All Forms & Downloads', href: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-to-you' },
    ],
  },
  {
    label: 'Downloads',
    href: 'https://www.incometax.gov.in/iec/foportal/downloads',
  },
  {
    label: 'News & Updates',
    to: '/news-updates',
  },
  {
    label: 'Help & FAQ',
    href: 'https://www.incometax.gov.in/iec/foportal/help',
  },
];

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    if (item.to) {
      return (
        <Link
          to={item.to}
          className="text-white/90 hover:text-saffron text-sm font-medium transition-colors px-3 py-2 rounded hover:bg-white/10 whitespace-nowrap"
        >
          {item.label}
        </Link>
      );
    }
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/90 hover:text-saffron text-sm font-medium transition-colors px-3 py-2 rounded hover:bg-white/10 whitespace-nowrap flex items-center gap-1"
      >
        {item.label}
        <ExternalLink className="h-3 w-3 opacity-60" />
      </a>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="text-white/90 hover:text-saffron text-sm font-medium transition-colors px-3 py-2 rounded hover:bg-white/10 flex items-center gap-1 whitespace-nowrap"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-navy/20 rounded-lg shadow-lg min-w-[200px] z-50 py-1">
          {item.children.map((child) => (
            child.to ? (
              <Link
                key={child.label}
                to={child.to}
                className="block px-4 py-2 text-sm text-navy hover:bg-navy/5 hover:text-navy transition-colors"
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            ) : (
              <a
                key={child.label}
                href={child.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm text-navy hover:bg-navy/5 transition-colors"
                onClick={() => setOpen(false)}
              >
                {child.label}
                <ExternalLink className="h-3 w-3 opacity-40 ml-auto" />
              </a>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-portal-bg">
      {/* Top tricolor strip */}
      <div className="flex h-1.5 w-full">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-white" />
        <div className="flex-1" style={{ backgroundColor: '#138808' }} />
      </div>

      {/* Header */}
      <header className="bg-navy shadow-md">
        {/* Branding Row */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4 no-underline">
            <img
              src="/assets/generated/ashoka-emblem.dim_128x128.png"
              alt="Ashoka Emblem"
              className="h-16 w-16 object-contain"
            />
            <div>
              <div className="text-saffron text-xs font-semibold tracking-widest uppercase">
                Government of India
              </div>
              <div className="text-white text-xl font-bold tracking-wide leading-tight">
                Income Tax Department
              </div>
              <div className="text-white/80 text-sm tracking-wider">
                e-Filing Portal
              </div>
            </div>
          </Link>

          {/* Right side header info */}
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-white/60 text-xs">Assessment Year</span>
              <span className="text-saffron font-bold text-sm">2024-25</span>
            </div>
            <a
              href="https://eportal.incometax.gov.in/iec/foservicesapp/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-saffron text-white text-sm font-semibold px-4 py-2 rounded hover:bg-saffron-dark transition-colors"
            >
              Login to e-Filing
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <div
          className="w-full border-t border-white/10"
          style={{
            backgroundImage: 'url(/assets/generated/portal-banner-bg.dim_1200x120.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 py-1 overflow-x-auto">
              {NAV_ITEMS.map((item) => (
                <NavDropdown key={item.label} item={item} />
              ))}
            </nav>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
              <nav className="md:hidden py-2 space-y-1 border-t border-white/10">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    {item.to ? (
                      <Link
                        to={item.to}
                        className="block text-white/90 text-sm font-medium px-3 py-2 hover:bg-white/10 rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/90 text-sm font-medium px-3 py-2 hover:bg-white/10 rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    ) : (
                      <>
                        <div className="text-white/70 text-xs font-semibold uppercase tracking-wider px-3 pt-3 pb-1">
                          {item.label}
                        </div>
                        {item.children?.map((child) => (
                          child.to ? (
                            <Link
                              key={child.label}
                              to={child.to}
                              className="block text-white/80 text-sm px-6 py-1.5 hover:bg-white/10 rounded"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ) : (
                            <a
                              key={child.label}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-white/80 text-sm px-6 py-1.5 hover:bg-white/10 rounded"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.label}
                              <ExternalLink className="h-3 w-3 opacity-40" />
                            </a>
                          )
                        ))}
                      </>
                    )}
                  </div>
                ))}
                <div className="px-3 py-2">
                  <a
                    href="https://eportal.incometax.gov.in/iec/foservicesapp/#/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-saffron text-white text-sm font-semibold px-4 py-2 rounded w-full"
                  >
                    Login to e-Filing Portal
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Disclaimer Banner */}
      <DisclaimerBanner />

      {/* News Ticker */}
      <NewsTicker />

      {/* Main Content */}
      <main className="flex-1 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white/80 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="text-saffron font-semibold text-sm mb-3">Quick Links</h4>
              <ul className="space-y-1.5">
                <li><Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/tax-calculator" className="text-white/60 hover:text-white transition-colors">Tax Calculator</Link></li>
                <li><Link to="/itr-forms" className="text-white/60 hover:text-white transition-colors">ITR Forms</Link></li>
                <li><Link to="/pan-tan-services" className="text-white/60 hover:text-white transition-colors">PAN/TAN Services</Link></li>
                <li><Link to="/refund-status" className="text-white/60 hover:text-white transition-colors">Refund Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-saffron font-semibold text-sm mb-3">e-Filing Services</h4>
              <ul className="space-y-1.5">
                <li>
                  <a href="https://eportal.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                    e-Filing Portal
                  </a>
                </li>
                <li>
                  <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                    incometax.gov.in
                  </a>
                </li>
                <li>
                  <a href="https://tin.tin.nsdl.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                    NSDL TIN Portal
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-saffron font-semibold text-sm mb-3">Contact & Help</h4>
              <ul className="space-y-1.5 text-white/60">
                <li>Helpline: 1800 103 0025</li>
                <li>Helpline: 1800 419 0025</li>
                <li>
                  <a href="https://www.incometax.gov.in/iec/foportal/help" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Help & FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-center md:text-left text-white/50">
              © {new Date().getFullYear()} Income Tax Department, Government of India. All rights reserved.
            </p>
            <p className="text-white/40 text-center">
              Built with{' '}
              <span className="text-saffron">♥</span>{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'income-tax-portal')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-saffron hover:text-saffron/80 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
