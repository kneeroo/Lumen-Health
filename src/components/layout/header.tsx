import React from 'react';
import { SidebarTriggerWithTooltip } from './sidebar-trigger-with-tooltip';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { ThemeModeToggle } from '../themes/theme-mode-toggle';
import { NotificationCenter } from '@/features/notifications/components/notification-center';

export default function Header() {
  return (
    <header className='from-muted/80 to-background/60 sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between bg-gradient-to-b backdrop-blur-md md:h-14'>
      {/* Left padding matches the PageContainer (px-4 md:px-6) so the trigger
          and breadcrumb sit on the same vertical line as the page heading. */}
      <div className='flex items-center gap-2 px-4 md:px-6'>
        <SidebarTriggerWithTooltip />
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
