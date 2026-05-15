'use client';

import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function startOfWeek(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay(); // 0=Sun..6=Sat
  const diff = day === 0 ? -6 : 1 - day; // Monday as week start
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function loadCompletions(actionId: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(`streak:${actionId}`);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveCompletions(actionId: string, set: Set<string>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(`streak:${actionId}`, JSON.stringify([...set]));
}

export function ActionStreak({ actionId, task }: { actionId: string; task: string }) {
  const [completions, setCompletions] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCompletions(loadCompletions(actionId));
  }, [actionId]);

  const today = new Date();
  const thisWeekStart = startOfWeek(today);
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  const thisWeekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(thisWeekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const lastWeekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lastWeekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const thisWeekDone = thisWeekDays.filter((d) => completions.has(ymd(d))).length;
  const lastWeekDone = lastWeekDays.filter((d) => completions.has(ymd(d))).length;

  function toggle(d: Date) {
    if (d > today) return;
    const key = ymd(d);
    const next = new Set(completions);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setCompletions(next);
    saveCompletions(actionId, next);
  }

  const todayKey = ymd(today);

  return (
    <div className='space-y-2'>
      <div className='text-sm'>{task}</div>
      <div className='flex items-center gap-3'>
        <div className='flex gap-1'>
          {thisWeekDays.map((d, i) => {
            const key = ymd(d);
            const isFuture = d > today;
            const isDone = completions.has(key);
            const isToday = key === todayKey;
            return (
              <button
                key={key}
                type='button'
                disabled={isFuture}
                onClick={() => toggle(d)}
                aria-label={`${DAY_LABELS[i]} ${d.toLocaleDateString()}`}
                className={[
                  'flex h-8 w-8 flex-col items-center justify-center rounded-md text-[10px] leading-none font-medium transition-colors',
                  isFuture
                    ? 'bg-muted/40 text-muted-foreground/40 cursor-not-allowed'
                    : isDone
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-muted hover:bg-muted/70 text-muted-foreground',
                  isToday && !isDone ? 'ring-primary/40 ring-2' : ''
                ].join(' ')}
              >
                <span>{DAY_LABELS[i]}</span>
              </button>
            );
          })}
        </div>
        <div className='text-muted-foreground text-xs tabular-nums'>{thisWeekDone}/7 this week</div>
      </div>
      <div className='text-muted-foreground flex items-center gap-2 text-xs'>
        <Badge variant='outline' className='text-[10px]'>
          Last week
        </Badge>
        <span className='tabular-nums'>{lastWeekDone}/7 days</span>
        {lastWeekDone >= 5 && <span className='text-emerald-600'>· on track</span>}
        {lastWeekDone === 0 && <span>· no activity logged</span>}
      </div>
    </div>
  );
}
