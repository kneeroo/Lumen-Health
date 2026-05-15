'use client';

// Lumen Health: static demo user (no auth in this demo).
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function UserNav() {
  return (
    <div className='flex items-center gap-2'>
      <Avatar className='h-8 w-8'>
        <AvatarFallback className='bg-primary/10 text-primary text-xs font-medium'>
          DP
        </AvatarFallback>
      </Avatar>
      <div className='hidden text-left sm:block'>
        <div className='text-sm leading-none font-medium'>Demo Patient</div>
        <div className='text-muted-foreground text-xs leading-tight'>demo@lumenhealth.app</div>
      </div>
    </div>
  );
}
