import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { ThemeModeToggle } from '../themes/theme-mode-toggle';
import { NotificationCenter } from '@/features/notifications/components/notification-center';

export default function Header() {
  return (
    <header className='bg-background/60 sticky top-0 z-20 flex h-16 shrink-0 items-center backdrop-blur-md md:h-14'>
      {/* Mirror the PageContainer / SiteFooter pattern (mx-auto max-w-7xl) so
          the breadcrumb on the left aligns with the page content, and the
          actions on the right align with the right edge of the content. */}
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-6'>
        <div className='flex items-center gap-3'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumbs />
        </div>

        <div className='flex items-center gap-2'>
          <div className='hidden md:flex'>
            <SearchInput />
          </div>
          <ThemeModeToggle />
          <NotificationCenter />
        </div>
      </div>
    </header>
  );
}
