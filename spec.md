# Specification

## Summary
**Goal:** Build a frontend replica of the India Income Tax Portal (incometax.gov.in) with full navigation, a tax calculator, and official redirect links for all government services.

**Planned changes:**
- Create a homepage mirroring incometax.gov.in with navy/saffron branding, Ashoka emblem header, scrolling news ticker, and quick-access service tiles (e-Filing, Tax Calculator, Forms, PAN/TAN, Refund Status)
- Add a top navigation bar with dropdown menus (Home, About Us, e-Filing, Tax Services, Forms, Downloads, Help & FAQ) where each action opens the corresponding incometax.gov.in URL in a new tab
- Build a Tax Calculator page for FY 2024-25 supporting Old and New Regime with age-based exemptions, deductions (80C/80D/80TTA/HRA), surcharge, 4% cess, Section 87A rebate, and side-by-side regime comparison
- Create an ITR Forms Directory page listing ITR-1 through ITR-7 with descriptions and official download links
- Create a PAN/TAN Services page with cards for each service (Apply PAN, Corrections, Link Aadhaar, Verification, TAN) linking to official government URLs
- Create a Refund Status page with step-by-step instructions, helpline numbers (1800 103 0025 / 1800 419 0025), and links to the NSDL refund portal and incometax.gov.in
- Add a News & Updates section as a homepage ticker and a full page with static realistic announcements and a "View All" link to incometax.gov.in
- Add a prominent "Login to e-Filing Portal" button and "Register" link in the homepage and navigation redirecting to the official eportal.incometax.gov.in URLs in a new tab
- Add new TanStack Router routes: /, /tax-calculator, /itr-forms, /pan-tan-services, /refund-status, /news-updates wrapped in a PortalLayout
- Add a sitewide disclaimer banner (amber/yellow) stating this is an informational app with a link to incometax.gov.in

**User-visible outcome:** Users see a faithful replica of the Income Tax India portal with working navigation, a functional tax calculator comparing Old vs New Regime, and all government service actions redirecting to the correct official government URLs in a new tab.
