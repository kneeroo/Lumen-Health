import React from 'react';
import Link from 'next/link';
import { SidebarTriggerWithTooltip } from './sidebar-trigger-with-tooltip';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { ThemeModeToggle } from '../themes/theme-mode-toggle';
import { Icons } from '../icons';
import { NotificationCenter } from '@/features/notifications/components/notification-center';

export default function Header() {
  return (
    <header className='from-muted/80 to-background/60 sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between bg-gradient-to-b backdrop-blur-md md:h-14'>
      {/* Left padding matches the PageContainer (px-4 md:px-6) so the trigger
          and breadcrumb sit on the same vertical line as the page heading. */}
      <div className='flex items-center gap-2 px-4 md:px-6'>
        <SidebarTriggerWithTooltip />
        {/* Mobile-only home shortcut: the sidebar brand mark isn't visible
            on small screens until the user opens the drawer, so surface a
            tap target right next to the trigger that links back to /home. */}
        <Link
          href='/home'
          aria-label='Lumen Health home'
          className='border-emerald-700 bg-emerald-500/10 flex size-8 shrink-0 items-center justify-center rounded-md border-2 text-emerald-700 transition-colors hover:bg-emerald-500/20 md:hidden dark:border-emerald-600 dark:text-emerald-300'
        >
          <Icons.heartbeat className='size-5' strokeWidth={2.25} />
        </Link>
        <Separator orientation='vertical' className='h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4 md:px-6'>
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <ThemeModeToggle />
        <NotificationCenter />
      </div>
    </header>
  );
}
