'use client';

import Script from 'next/script';
import { useUser } from '@clerk/nextjs';
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
 * The agent script is loaded via next/script with strategy="afterInteractive".
 * pendo.initialize() runs once Clerk has resolved the visitor identity, so
 * visitor.id and account.id are always defined before the first event fires.
 */
export function PendoSnippet() {
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (!PENDO_API_KEY || !isLoaded || !window.pendo) return;
    const visitorId = user?.id ?? 'anonymous-' + Math.random().toString(36).slice(2, 10);
    window.pendo.initialize({
      visitor: {
        id: visitorId,
        email: user?.primaryEmailAddress?.emailAddress
      },
      account: {
        id: 'lumen-health-demo',
        name: 'Lumen Health Demo'
      }
    });
  }, [isLoaded, user]);

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
