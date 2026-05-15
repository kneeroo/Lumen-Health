'use client';

import { Card, CardContent } from '@/components/ui/card';
import { flagColor, flagLabel, type LabFlag, type LabResult } from '@/lib/mock-labs';
import { useMemo, useState } from 'react';

type Filter = 'all' | LabFlag;

type Group = {
  date: string;
  visitTopic: string;
  clinician: string;
  items: LabResult[];
};

function groupByCollection(items: LabResult[]): Group[] {
  const map = new Map<string, Group>();
  items.forEach((l) => {
    const key = `${l.collectedDate}|${l.visitId}`;
    const existing = map.get(key);
    if (existing) {
      existing.items.push(l);
    } else {
      map.set(key, {
        date: l.collectedDate,
        visitTopic: l.visitTopic,
        clinician: l.clinician,
        items: [l]
      });
    }
  });
  return [...map.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
}

const TILE_STYLES: Record<Filter, { value: string; ring: string; valueColor: string; bg: string }> =
  {
    all: {
      value: 'text-foreground',
      ring: 'ring-foreground/40',
      valueColor: 'text-foreground',
      bg: 'bg-card'
    },
    normal: {
      value: 'text-emerald-600',
      ring: 'ring-emerald-500',
      valueColor: 'text-emerald-600',
      bg: 'bg-emerald-50/40'
    },
    borderline: {
      value: 'text-amber-600',
      ring: 'ring-amber-500',
      valueColor: 'text-amber-600',
      bg: 'bg-amber-50/40'
    },
    abnormal: {
      value: 'text-red-600',
      ring: 'ring-red-500',
      valueColor: 'text-red-600',
      bg: 'bg-red-50/40'
    }
  };

export function LabResultsView({ labs }: { labs: LabResult[] }) {
  const [filter, setFilter] = useState<Filter>('all');

  const counts = useMemo(
    () =>
      labs.reduce(
        (acc, l) => {
          acc[l.flag] += 1;
          acc.all += 1;
          return acc;
        },
        { all: 0, normal: 0, borderline: 0, abnormal: 0 } as Record<Filter, number>
      ),
    [labs]
  );

  const filtered = useMemo(
    () => (filter === 'all' ? labs : labs.filter((l) => l.flag === filter)),
    [labs, filter]
  );

  const groups = groupByCollection(filtered);

  return (
    <>
      {/* Filter tiles */}
      <div className='mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4'>
        <FilterTile
          label='All results'
          count={counts.all}
          active={filter === 'all'}
          onClick={() => setFilter('all')}
          variant='all'
        />
        <FilterTile
          label='Normal'
          count={counts.normal}
          active={filter === 'normal'}
          onClick={() => setFilter('normal')}
          variant='normal'
        />
        <FilterTile
          label='Borderline'
          count={counts.borderline}
          active={filter === 'borderline'}
          onClick={() => setFilter('borderline')}
          variant='borderline'
        />
        <FilterTile
          label='Abnormal'
          count={counts.abnormal}
          active={filter === 'abnormal'}
          onClick={() => setFilter('abnormal')}
          variant='abnormal'
        />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className='text-muted-foreground py-10 text-center text-sm'>
            No results match this filter.
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-6'>
          {groups.map((g) => (
            <section key={`${g.date}-${g.visitTopic}`}>
              <div className='mb-3 flex items-baseline gap-3'>
                <h3 className='text-sm font-semibold'>{g.date}</h3>
                <span className='text-muted-foreground text-xs'>
                  {g.visitTopic} · {g.clinician}
                </span>
              </div>
              <div className='space-y-2'>
                {g.items.map((l) => (
                  <Card key={l.id}>
                    <CardContent className='px-4 py-4'>
                      <div className='flex flex-wrap items-center gap-2'>
                        <span className='font-medium'>{l.name}</span>
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${flagColor[l.flag]}`}
                        >
                          {flagLabel[l.flag]}
                        </span>
                      </div>
                      <div className='mt-2 flex items-baseline gap-3'>
                        <div className='text-2xl font-semibold tabular-nums'>{l.value}</div>
                        {l.unit && <div className='text-muted-foreground text-sm'>{l.unit}</div>}
                      </div>
                      <div className='text-muted-foreground mt-1 text-xs'>
                        Reference range: {l.referenceRange}
                        {l.unit ? ` ${l.unit}` : ''}
                      </div>
                      {l.notes && (
                        <p className='border-border/60 mt-3 border-t pt-3 text-sm'>{l.notes}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
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
  variant
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  variant: Filter;
}) {
  const styles = TILE_STYLES[variant];
  return (
    <button
      type='button'
      onClick={onClick}
      aria-pressed={active}
      className={`group rounded-lg border p-5 text-left transition-all ${styles.bg} ${
        active ? `ring-2 ${styles.ring} shadow-sm` : 'border-border/60 hover:border-border'
      }`}
    >
      <div className={`text-3xl font-bold tabular-nums ${styles.valueColor}`}>{count}</div>
      <div className='text-foreground mt-1 text-sm font-medium'>{label}</div>
    </button>
  );
}
