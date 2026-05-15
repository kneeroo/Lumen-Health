'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import type { ActionItem } from '@/lib/mock-visits';
import { useState } from 'react';

export function ActionItems({ items }: { items: ActionItem[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your action items</CardTitle>
        <p className='text-muted-foreground text-sm'>Check things off as you complete them.</p>
      </CardHeader>
      <CardContent className='space-y-3'>
        {items.map((item) => (
          <label
            key={item.id}
            className='hover:bg-muted/50 flex items-start gap-3 rounded-md p-2 transition-colors'
          >
            <Checkbox
              checked={!!done[item.id]}
              onCheckedChange={(checked) => setDone((d) => ({ ...d, [item.id]: !!checked }))}
              className='mt-0.5'
            />
            <div className='flex-1'>
              <div
                className={done[item.id] ? 'text-muted-foreground text-sm line-through' : 'text-sm'}
              >
                {item.task}
              </div>
              <div className='text-muted-foreground mt-0.5 text-xs'>{item.due}</div>
            </div>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}
