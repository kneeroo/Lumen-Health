'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/icons';
import { ActionStreak } from './action-streak';
import { useEffect, useMemo, useState } from 'react';
import type { AggregatedAction } from '@/app/(dashboard)/actions/page';

const ONGOING_KEY_PREFIX = 'action-done:';

function isOngoing(due: string): boolean {
  return /ongoing/i.test(due);
}

type Filter = 'all' | 'pending' | 'done' | 'ongoing';

const FILTER_LABEL: Record<Filter, string> = {
  all: 'All',
  pending: 'To do',
  done: 'Done',
  ongoing: 'Daily'
};

export function AllActionsView({ items }: { items: AggregatedAction[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<Filter>('all');

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
    if (typeof window === 'undefined') return;
    if (checked) window.localStorage.setItem(ONGOING_KEY_PREFIX + id, '1');
    else window.localStorage.removeItem(ONGOING_KEY_PREFIX + id);
  }

  const counts = useMemo(() => {
    const ongoing = items.filter((i) => isOngoing(i.due));
    const oneOff = items.filter((i) => !isOngoing(i.due));
    const doneCount = oneOff.filter((i) => done[i.id]).length;
    return {
      all: items.length,
      pending: oneOff.length - doneCount,
      done: doneCount,
      ongoing: ongoing.length
    };
  }, [items, done]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const ongoing = isOngoing(item.due);
      if (filter === 'all') return true;
      if (filter === 'ongoing') return ongoing;
      if (filter === 'pending') return !ongoing && !done[item.id];
      if (filter === 'done') return !ongoing && done[item.id];
      return true;
    });
  }, [items, filter, done]);

  // Group filtered items by visit for context
  const byVisit = useMemo(() => {
    const map = new Map<
      string,
      { date: string; topic: string; clinician: string; items: AggregatedAction[] }
    >();
    filtered.forEach((item) => {
      const existing = map.get(item.visitId);
      if (existing) existing.items.push(item);
      else
        map.set(item.visitId, {
          date: item.visitDate,
          topic: item.visitTopic,
          clinician: item.clinician,
          items: [item]
        });
    });
    return [...map.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [filtered]);

  return (
    <>
      {/* Filter tiles */}
      <div className='mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4'>
        <FilterTile
          label='All'
          count={counts.all}
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        />
        <FilterTile
          label='To do'
          count={counts.pending}
          active={filter === 'pending'}
          onClick={() => setFilter('pending')}
          accent='amber'
        />
        <FilterTile
          label='Done'
          count={counts.done}
          active={filter === 'done'}
          onClick={() => setFilter('done')}
          accent='emerald'
        />
        <FilterTile
          label='Daily'
          count={counts.ongoing}
          active={filter === 'ongoing'}
          onClick={() => setFilter('ongoing')}
          accent='blue'
        />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className='text-muted-foreground py-10 text-center text-sm'>
            Nothing in {FILTER_LABEL[filter].toLowerCase()}.
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-6'>
          {byVisit.map((g) => (
            <section key={g.topic + g.date}>
              <div className='mb-2 flex items-baseline gap-3'>
                <h3 className='text-sm font-semibold'>{g.topic}</h3>
                <span className='text-muted-foreground text-xs'>
                  {g.date} · {g.clinician}
                </span>
              </div>
              <div className='space-y-2'>
                {g.items.map((item) =>
                  isOngoing(item.due) ? (
                    <Card key={item.id}>
                      <CardContent className='px-4 py-3'>
                        <ActionStreak actionId={item.id} task={item.task} />
                      </CardContent>
                    </Card>
                  ) : (
                    <Card key={item.id}>
                      <label className='flex cursor-pointer items-start gap-3 px-4 py-3'>
                        <Checkbox
                          checked={!!done[item.id]}
                          onCheckedChange={(checked) => toggle(item.id, !!checked)}
                          className='mt-0.5'
                        />
                        <div className='min-w-0 flex-1'>
                          <div
                            className={
                              done[item.id]
                                ? 'text-muted-foreground text-sm line-through'
                                : 'text-sm'
                            }
                          >
                            {item.task}
                          </div>
                          <div className='text-muted-foreground mt-0.5 flex items-center gap-2 text-xs'>
                            <Icons.clock className='size-3' />
                            <span>{item.due}</span>
                          </div>
                        </div>
                        {done[item.id] ? (
                          <Badge
                            variant='outline'
                            className='border-emerald-200 bg-emerald-50 text-[10px] text-emerald-700'
                          >
                            Done
                          </Badge>
                        ) : (
                          <Badge variant='outline' className='text-[10px]'>
                            To do
                          </Badge>
                        )}
                      </label>
                    </Card>
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

function FilterTile({
  label,
  count,
  active,
  onClick,
  accent = 'default'
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  accent?: 'default' | 'amber' | 'emerald' | 'blue';
}) {
  const colors = {
    default: { value: 'text-foreground', ring: 'ring-foreground/40', bg: 'bg-card' },
    amber: { value: 'text-amber-600', ring: 'ring-amber-500', bg: 'bg-amber-50/40' },
    emerald: { value: 'text-emerald-600', ring: 'ring-emerald-500', bg: 'bg-emerald-50/40' },
    blue: { value: 'text-blue-600', ring: 'ring-blue-500', bg: 'bg-blue-50/40' }
  }[accent];

  return (
    <button
      type='button'
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border p-5 text-left transition-all ${colors.bg} ${
        active ? `ring-2 ${colors.ring} shadow-sm` : 'border-border/60 hover:border-border'
      }`}
    >
      <div className={`text-3xl font-bold tabular-nums ${colors.value}`}>{count}</div>
      <div className='text-foreground mt-1 text-sm font-medium'>{label}</div>
    </button>
  );
}
