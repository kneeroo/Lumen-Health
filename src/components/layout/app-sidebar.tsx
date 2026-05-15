'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { navGroups } from '@/config/nav-config';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar
      collapsible='icon'
      // Wider collapsed mode (5rem) so the 40x40 active icon has 20px of
      // breathing room on each side, not just 12px. Stops the dark active
      // button from appearing to clip into the page content.
      style={{ ['--sidebar-width-icon' as string]: '5rem' }}
    >
      {/* Header height matches the page Header (h-16 / md:h-14) so the brand
          mark aligns vertically with the breadcrumb across the divider.
          The whole brand mark links to /dashboard/home — the welcome page
          with the quick guide. */}
      <SidebarHeader className='h-16 justify-center !p-0 md:h-14'>
        <Link
          href='/dashboard/home'
          aria-label='Lumen Health home'
          className='hover:bg-sidebar-accent/50 flex h-full items-center gap-2.5 px-3 transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0'
        >
          {/* Brand mark, softer treatment so it doesn't read as an active nav state. */}
          <div className='border-primary/20 bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-md border'>
            <Icons.heartbeat className='size-5' />
          </div>
          <div className='flex min-w-0 flex-col leading-none group-data-[collapsible=icon]:hidden'>
            <span className='text-foreground text-sm font-semibold'>Lumen Health</span>
            <span className='text-muted-foreground truncate text-xs'>
              Your visit, in your words
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label || 'ungrouped'} className='py-0'>
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                // My Visits stays active when on the patient-portal detail page
                // (which is opened from a visit card on My Visits).
                const isActive =
                  pathname === item.url ||
                  (item.url === '/dashboard/overview' &&
                    pathname.startsWith('/dashboard/patient-portal'));
                return (
                  <SidebarMenuItem key={item.title}>
                    {/* asChild + Link: Link prefetches the route as soon as it
                        mounts, so clicking feels instant. onMouseEnter also
                        triggers an eager prefetch as a fallback in case the
                        viewport prefetch hasn't happened yet. */}
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className='data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary/90 data-[active=true]:hover:text-primary-foreground gap-3 rounded-md py-5 font-medium [&>svg]:!size-5 group-data-[collapsible=icon]:!mx-auto group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!py-0 group-data-[collapsible=icon]:[&>span]:hidden'
                    >
                      <Link href={item.url} prefetch onMouseEnter={() => router.prefetch(item.url)}>
                        <Icon />
                        <span className='text-sm'>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {/* Asymmetric vertical padding (less on top, more on bottom) so the
          avatar's vertical center aligns more closely with the site footer
          text baseline. Symmetric padding made the avatar visually sit
          slightly lower than the text because the avatar is taller than
          the text line height. */}
      <SidebarFooter className='!pt-1 !pb-3'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              className='cursor-default group-data-[collapsible=icon]:!mx-auto group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!p-0'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarFallback className='bg-primary/10 text-primary rounded-lg text-xs font-medium'>
                  DP
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col leading-none group-data-[collapsible=icon]:hidden'>
                <span className='text-sm font-medium'>Demo Patient</span>
                <span className='text-muted-foreground text-xs'>demo@lumenhealth.app</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
