import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-300 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-amber-800 text-xs text-center">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
        <span>
          <strong>Disclaimer:</strong> This is an informational companion app. For official tax filing and government services, visit{' '}
          <a
            href="https://www.incometax.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:text-amber-900 transition-colors"
          >
            incometax.gov.in
          </a>
          .
        </span>
      </div>
    </div>
  );
}
