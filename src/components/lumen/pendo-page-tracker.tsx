'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Next.js App Router doesn't fire the URL-change events that Pendo's
 * auto-tracker depends on, so without an explicit pageLoad() on each
 * client navigation, Paths and Funnel reports only see the first
 * page per session. This tracker calls pendo.pageLoad() every time
 * usePathname() changes, which is exactly when the App Router has
 * finished navigating.
 *
 * Renders nothing; pure side-effect component.
 */
export function PendoPageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.pendo || typeof window.pendo.pageLoad !== 'function') return;
    window.pendo.pageLoad();
  }, [pathname]);

  return null;
}
