'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import type { ActionItem } from '@/lib/mock-visits';
import { useEffect, useState } from 'react';
import { ActionStreak } from './action-streak';

const ONGOING_KEY_PREFIX = 'action-done:';

function isOngoing(due: string): boolean {
  return /ongoing/i.test(due);
}

export function ActionItems({ items }: { items: ActionItem[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});

  // Hydrate one-time completions from localStorage so they survive refresh.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const next: Record<string, boolean> = {};
    items.forEach((item) => {
      if (window.localStorage.getItem(ONGOING_KEY_PREFIX + item.id) === '1') {
        next[item.id] = true;
      }
    });
    setDone(next);
  }, [items]);

  function toggle(id: string, checked: boolean) {
    setDone((d) => ({ ...d, [id]: checked }));
    if (typeof window !== 'undefined') {
      if (checked) window.localStorage.setItem(ONGOING_KEY_PREFIX + id, '1');
      else window.localStorage.removeItem(ONGOING_KEY_PREFIX + id);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your action items</CardTitle>
        <p className='text-muted-foreground text-sm'>
          One-off items get checked off. Daily items track a weekly streak.
        </p>
      </CardHeader>
      <CardContent className='space-y-4'>
        {items.map((item) =>
          isOngoing(item.due) ? (
            <div key={item.id} className='border-border/60 bg-muted/20 rounded-md border p-3'>
              <ActionStreak actionId={item.id} task={item.task} />
            </div>
          ) : (
            <label
              key={item.id}
              className='hover:bg-muted/50 flex items-start gap-3 rounded-md p-2 transition-colors'
            >
              <Checkbox
                checked={!!done[item.id]}
                onCheckedChange={(checked) => toggle(item.id, !!checked)}
                className='mt-0.5'
              />
              <div className='flex-1'>
                <div
                  className={
                    done[item.id] ? 'text-muted-foreground text-sm line-through' : 'text-sm'
                  }
                >
                  {item.task}
                </div>
                <div className='text-muted-foreground mt-0.5 text-xs'>{item.due}</div>
              </div>
            </label>
          )
        )}
      </CardContent>
    </Card>
  );
}
