'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    pendo?: {
      initialize: (opts: Record<string, unknown>) => void;
      pageLoad: () => void;
      identify: (opts: Record<string, unknown>) => void;
      validateEnvironment?: () => unknown;
    };
  }
}

const PENDO_API_KEY = process.env.NEXT_PUBLIC_PENDO_API_KEY;

/**
 * Pendo agent loader for Lumen Health.
 *
 * Without NEXT_PUBLIC_PENDO_API_KEY this component is a no-op so local
 * dev continues to work. With the key set, it loads the Pendo agent
 * and initializes a structured demo visitor + account so segments,
 * Paths reports and Guides all work against a real-looking identity
 * instead of an anonymous random ID.
 *
 * The demo patient identity is hardcoded because Lumen Health is a
 * public, login-less demo — there's no auth context to read from.
 */
function getOrCreateAnonId(): string {
  if (typeof window === 'undefined') return 'ssr';
  const KEY = 'lumen-pendo-visitor-id';
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id = 'demo-' + Math.random().toString(36).slice(2, 10);
    window.localStorage.setItem(KEY, id);
  }
  return id;
}

export function PendoSnippet() {
  useEffect(() => {
    if (!PENDO_API_KEY || !window.pendo) return;
    window.pendo.initialize({
      visitor: {
        id: 'demo-patient-001',
        email: 'demo@lumenhealth.app',
        full_name: 'Demo Patient',
        role: 'patient',
        created_at: '2024-01-15',
        anonymous_session_id: getOrCreateAnonId(),
        state: 'VIC',
        country: 'AU',
        is_demo_user: true
      },
      account: {
        id: 'lumen-health-demo',
        name: 'Lumen Health Demo',
        plan_level: 'demo',
        region: 'ANZ',
        industry: 'Healthcare',
        is_demo_account: true
      }
    });
  }, []);

  if (!PENDO_API_KEY) return null;

  return (
    <Script
      id='pendo-agent'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `
          (function(apiKey){
            (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
            v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
              o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
              y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
              z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
          })('${PENDO_API_KEY}');
        `
      }}
    />
  );
}
