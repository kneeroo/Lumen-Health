'use client';

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * The shadcn SidebarTrigger button wrapped in a tooltip whose label
 * reflects the current sidebar state (Expand vs Collapse).
 */
export function SidebarTriggerWithTooltip() {
  const { state } = useSidebar();
  const label = state === 'expanded' ? 'Collapse sidebar' : 'Expand sidebar';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarTrigger />
      </TooltipTrigger>
      <TooltipContent side='bottom' align='start'>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
