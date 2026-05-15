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
import { usePathname } from 'next/navigation';
// Link still needed for nav menu items below.
import * as React from 'react';
import { Icons } from '../icons';

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='group-data-[collapsible=icon]:pt-4'>
        <div className='flex items-center gap-2 px-2 py-1.5 group-data-[collapsible=icon]:justify-center'>
          <div className='bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md'>
            <Icons.heartbeat className='size-5' />
          </div>
          <div className='flex flex-col leading-none group-data-[collapsible=icon]:hidden'>
            <span className='text-sm font-semibold'>Lumen Health</span>
            <span className='text-muted-foreground text-xs'>Your visit, in your words</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label || 'ungrouped'} className='py-0'>
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                // My Visits is the active item when on its own page OR on the
                // patient-portal detail page (which is opened from a visit card).
                const isActive =
                  pathname === item.url ||
                  (item.url === '/dashboard/overview' &&
                    pathname.startsWith('/dashboard/patient-portal'));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                      <Link href={item.url}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' className='cursor-default'>
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
