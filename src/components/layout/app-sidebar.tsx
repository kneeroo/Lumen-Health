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
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { navGroups } from '@/config/nav-config';
import { iconTextClass, navIconColor } from '@/lib/nav-icon-colors';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
// nprogress ships without types; we only call .start(), so no full types needed.
// @ts-expect-error -- no types for nprogress in the transitive dep
import * as NProgress from 'nprogress';
import * as React from 'react';
import { Icons } from '../icons';

/**
 * router.push doesn't always trigger NextTopLoader visibly when the route
 * has been prefetched (the navigation can resolve faster than the loader's
 * own start/done cycle). We manually kick off NProgress here so the bar
 * pops immediately on every sidebar click; NextTopLoader's internal listener
 * will call NProgress.done() when the new route paints.
 */
function navigate(router: ReturnType<typeof useRouter>, url: string) {
  NProgress.start();
  router.push(url);
}

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, isMobile } = useSidebar();

  // Eagerly prefetch every nav route on mount so the first click on any nav
  // item is instant. Mirrors what Next.js Link does automatically, but we
  // are not using Link here because the asChild + Slot + Link forwarding
  // chain was shrinking the click area on some items (Messages especially).
  React.useEffect(() => {
    navGroups.forEach((g) => g.items.forEach((item) => router.prefetch(item.url)));
  }, [router]);

  return (
    <Sidebar collapsible='icon'>
      {/* Header height matches the page Header (h-16 / md:h-14) so the brand
          mark aligns vertically with the breadcrumb across the divider.
          The whole brand mark links to /home — the welcome page
          with the quick guide. */}
      <SidebarHeader className='h-18 items-center !p-0 pt-3 md:h-16 md:pt-2'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='/home'
              aria-label='Lumen Health home'
              onMouseEnter={() => router.prefetch('/home')}
              className='hover:bg-sidebar-accent/50 flex h-full w-full items-center gap-2.5 px-3 transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0'
            >
              {/* Brand mark — gets the active state styling when the user is
                  on the home page, so it reads like the other nav items.
                  Otherwise the heart shows in the green brand colour. */}
              <div
                className={
                  pathname === '/home'
                    ? 'bg-primary flex size-11 shrink-0 items-center justify-center rounded-lg text-emerald-400 dark:text-emerald-100'
                    : `border-2 border-emerald-700 bg-emerald-500/10 ${iconTextClass.green} flex size-11 shrink-0 items-center justify-center rounded-lg`
                }
              >
                <Icons.heartbeat className='size-7' strokeWidth={2.25} />
              </div>
              <div className='flex min-w-0 flex-col leading-none group-data-[collapsible=icon]:hidden'>
                <span className='text-foreground text-sm font-semibold'>Lumen Health</span>
                <span className='text-muted-foreground truncate text-xs'>
                  Your visit, in your words
                </span>
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right' align='center' hidden={state !== 'collapsed' || isMobile}>
            Home
          </TooltipContent>
        </Tooltip>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label || 'ungrouped'} className='py-0'>
            {group.label && (
              // pointer-events-none in collapsed mode: shadcn hides the label
              // with -mt-8 + opacity-0 so it overlaps the nav button above it
              // and intercepts clicks (especially the bottom-right of the last
              // item in the previous group). Disabling pointer events fixes that.
              <SidebarGroupLabel className='group-data-[collapsible=icon]:pointer-events-none'>
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                // My Visits stays active when on the patient-portal detail page
                // (which is opened from a visit card on My Visits).
                const isActive =
                  pathname === item.url ||
                  (item.url === '/visits' && pathname.startsWith('/patient-portal'));
                const iconColor = navIconColor[item.url];
                // Icon stays green in both states. Inactive uses a darker
                // emerald against the light sidebar background; active uses
                // a lighter emerald that pops on the bg-primary dark button.
                const iconClass = isActive
                  ? 'text-emerald-400 dark:text-emerald-100'
                  : iconColor
                    ? iconTextClass[iconColor]
                    : '';
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive}
                      onClick={() => navigate(router, item.url)}
                      onMouseEnter={() => router.prefetch(item.url)}
                      className='data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary data-[active=true]:hover:text-primary-foreground dark:data-[active=true]:bg-primary/85 dark:data-[active=true]:hover:bg-primary/85 gap-3 rounded-md py-5 font-medium [&>svg]:!size-5 group-data-[collapsible=icon]:!mx-auto group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!py-0 group-data-[collapsible=icon]:[&>span]:hidden'
                    >
                      <Icon className={iconClass} />
                      <span className='text-sm'>{item.title}</span>
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
            {/* DP avatar doubles as a shortcut to the profile page. */}
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  onClick={() => navigate(router, '/profile')}
                  onMouseEnter={() => router.prefetch('/profile')}
                  className='group-data-[collapsible=icon]:!mx-auto group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!p-0'
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
              </TooltipTrigger>
              <TooltipContent
                side='right'
                align='center'
                hidden={state !== 'collapsed' || isMobile}
              >
                Profile
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
