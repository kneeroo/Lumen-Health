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
 * Roster of mock demo patients. Each browser session is randomly assigned
 * one of these so the Pendo dashboard fills with multiple distinct
 * visitors over time — critical for Paths and Funnel reports, which look
 * empty when only one visitor exists.
 *
 * All identities are fictional. AU postcodes / states match real cities
 * so geo segments work. created_at dates are staggered to populate
 * "Time on platform" segments.
 */
type DemoPatient = {
  id: string;
  email: string;
  full_name: string;
  state: string;
  postcode: string;
  age: number;
  created_at: string;
};

const PATIENT_ROSTER: DemoPatient[] = [
  {
    id: 'demo-patient-001',
    email: 'daniella.patrick@demo.lumenhealth.app',
    full_name: 'Daniella Patrick',
    state: 'VIC',
    postcode: '3000',
    age: 37,
    created_at: '2024-01-15'
  },
  {
    id: 'demo-patient-002',
    email: 'james.okafor@demo.lumenhealth.app',
    full_name: 'James Okafor',
    state: 'NSW',
    postcode: '2000',
    age: 52,
    created_at: '2024-03-22'
  },
  {
    id: 'demo-patient-003',
    email: 'maya.chen@demo.lumenhealth.app',
    full_name: 'Maya Chen',
    state: 'QLD',
    postcode: '4000',
    age: 29,
    created_at: '2024-06-08'
  },
  {
    id: 'demo-patient-004',
    email: 'sam.taylor@demo.lumenhealth.app',
    full_name: 'Sam Taylor',
    state: 'WA',
    postcode: '6000',
    age: 44,
    created_at: '2024-08-30'
  },
  {
    id: 'demo-patient-005',
    email: 'priya.naidoo@demo.lumenhealth.app',
    full_name: 'Priya Naidoo',
    state: 'SA',
    postcode: '5000',
    age: 61,
    created_at: '2024-11-12'
  },
  {
    id: 'demo-patient-006',
    email: 'ethan.wright@demo.lumenhealth.app',
    full_name: 'Ethan Wright',
    state: 'TAS',
    postcode: '7000',
    age: 33,
    created_at: '2025-02-04'
  },
  {
    id: 'demo-patient-007',
    email: 'aroha.mitchell@demo.lumenhealth.app',
    full_name: 'Aroha Mitchell',
    state: 'ACT',
    postcode: '2600',
    age: 48,
    created_at: '2025-04-18'
  },
  {
    id: 'demo-patient-008',
    email: 'liam.osullivan@demo.lumenhealth.app',
    full_name: 'Liam O’Sullivan',
    state: 'VIC',
    postcode: '3141',
    age: 26,
    created_at: '2025-07-09'
  }
];

/**
 * Picks a patient for the current browser session. Stored in
 * sessionStorage so reloading the same tab keeps the same visitor
 * (segments work within session), but closing the tab or opening a new
 * one assigns a fresh visitor.
 */
function getSessionPatient(): DemoPatient {
  if (typeof window === 'undefined') return PATIENT_ROSTER[0];
  const KEY = 'lumen-pendo-session-patient';
  const stored = window.sessionStorage.getItem(KEY);
  if (stored) {
    const found = PATIENT_ROSTER.find((p) => p.id === stored);
    if (found) return found;
  }
  const picked = PATIENT_ROSTER[Math.floor(Math.random() * PATIENT_ROSTER.length)];
  window.sessionStorage.setItem(KEY, picked.id);
  return picked;
}

export function PendoSnippet() {
  useEffect(() => {
    if (!PENDO_API_KEY || !window.pendo) return;
    const patient = getSessionPatient();
    window.pendo.initialize({
      visitor: {
        id: patient.id,
        email: patient.email,
        full_name: patient.full_name,
        role: 'patient',
        created_at: patient.created_at,
        state: patient.state,
        postcode: patient.postcode,
        age: patient.age,
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
