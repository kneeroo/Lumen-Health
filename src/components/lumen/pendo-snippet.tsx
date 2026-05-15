'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    pendo?: {
      initialize: (opts: Record<string, unknown>) => void;
    };
  }
}

const PENDO_API_KEY = process.env.NEXT_PUBLIC_PENDO_API_KEY;

/**
 * Pendo agent loader.
 *
 * Add NEXT_PUBLIC_PENDO_API_KEY to .env.local (and Vercel env vars) to enable.
 * Without the key, this component is a no-op so local dev still works.
 *
 * For the public demo we generate a stable per-browser visitor ID stored in
 * localStorage. account.id is hardcoded so all events roll up to one account.
 */
function getOrCreateVisitorId(): string {
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
      visitor: { id: getOrCreateVisitorId() },
      account: { id: 'lumen-health-demo', name: 'Lumen Health Demo' }
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
