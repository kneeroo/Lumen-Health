'use client';
import React from 'react';
import { ActiveThemeProvider } from '../themes/active-theme';
import { ThemeColorSync } from '../themes/theme-color-sync';
import QueryProvider from './query-provider';
import { PendoSnippet } from '@/components/lumen/pendo-snippet';
import { PendoPageTracker } from '@/components/lumen/pendo-page-tracker';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  return (
    <ActiveThemeProvider initialTheme={activeThemeValue}>
      <QueryProvider>{children}</QueryProvider>
      <PendoSnippet />
      <PendoPageTracker />
      <ThemeColorSync />
    </ActiveThemeProvider>
  );
}
