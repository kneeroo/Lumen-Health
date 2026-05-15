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

// Composite IDs ensure the same localStorage key is used here AND on the
// /actions aggregated view. Format: `${visitId}-${item.id}`.
function compositeId(visitId: string, itemId: string): string {
  return `${visitId}-${itemId}`;
}

export function ActionItems({ items, visitId }: { items: ActionItem[]; visitId: string }) {
  const [done, setDone] = useState<Record<string, boolean>>({});

  // Hydrate one-time completions from localStorage so they survive refresh.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const next: Record<string, boolean> = {};
    items.forEach((item) => {
      const key = compositeId(visitId, item.id);
      if (window.localStorage.getItem(ONGOING_KEY_PREFIX + key) === '1') {
        next[key] = true;
      }
    });
    setDone(next);
  }, [items, visitId]);

  function toggle(key: string, checked: boolean) {
    setDone((d) => ({ ...d, [key]: checked }));
    if (typeof window !== 'undefined') {
      if (checked) window.localStorage.setItem(ONGOING_KEY_PREFIX + key, '1');
      else window.localStorage.removeItem(ONGOING_KEY_PREFIX + key);
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
        {items.map((item) => {
          const key = compositeId(visitId, item.id);
          return isOngoing(item.due) ? (
            <div key={key} className='border-border/60 bg-muted/20 rounded-md border p-3'>
              <ActionStreak actionId={key} task={item.task} />
            </div>
          ) : (
            <label
              key={key}
              className='hover:bg-muted/50 flex items-start gap-3 rounded-md p-2 transition-colors'
            >
              <Checkbox
                checked={!!done[key]}
                onCheckedChange={(checked) => toggle(key, !!checked)}
                className='mt-0.5'
              />
              <div className='flex-1'>
                <div
                  className={done[key] ? 'text-muted-foreground text-sm line-through' : 'text-sm'}
                >
                  {item.task}
                </div>
                <div className='text-muted-foreground mt-0.5 text-xs'>{item.due}</div>
              </div>
            </label>
          );
        })}
      </CardContent>
    </Card>
  );
}
