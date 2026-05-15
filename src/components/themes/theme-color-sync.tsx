'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

/**
 * Keeps the <meta name="theme-color"> tag in sync with the active theme so
 * iOS Safari's status bar matches the page background. The previous
 * implementation only set the meta on initial load via an inline script, so
 * after a theme toggle the iOS bar stayed on the old colour until the user
 * interacted with something else and the page repainted.
 *
 * Reads the computed background colour off <body> after each theme change,
 * so any theme (Zen, Vercel, etc.) works without hardcoding values.
 */
export function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Wait one frame so the new theme's CSS variables have applied to <body>
    // before reading the computed background colour.
    const id = window.requestAnimationFrame(() => {
      const bg = window.getComputedStyle(document.body).backgroundColor;
      let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'theme-color');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', bg);
    });

    return () => window.cancelAnimationFrame(id);
  }, [resolvedTheme]);

  return null;
}
