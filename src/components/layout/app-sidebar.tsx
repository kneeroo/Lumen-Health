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
import * as React from 'react';
import { Icons } from '../icons';

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='group-data-[collapsible=icon]:pt-4'>
        <div className='flex items-center gap-2.5 px-2 py-2 group-data-[collapsible=icon]:justify-center'>
          {/* Brand mark — softer treatment so it doesn't read as an active nav state. */}
          <div className='border-primary/20 bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-md border'>
            <Icons.heartbeat className='size-5' />
          </div>
          <div className='flex min-w-0 flex-col leading-none group-data-[collapsible=icon]:hidden'>
            <span className='text-foreground text-sm font-semibold'>Lumen Health</span>
            <span className='text-muted-foreground truncate text-xs'>
              Your visit, in your words
            </span>
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
                // My Visits stays active when on the patient-portal detail page
                // (which is opened from a visit card on My Visits).
                const isActive =
                  pathname === item.url ||
                  (item.url === '/dashboard/overview' &&
                    pathname.startsWith('/dashboard/patient-portal'));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className='data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary/90 data-[active=true]:hover:text-primary-foreground gap-3 rounded-md py-5 font-medium group-data-[collapsible=icon]:!size-10 group-data-[collapsible=icon]:!p-0 [&>svg]:!size-5'
                    >
                      <Link href={item.url}>
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
