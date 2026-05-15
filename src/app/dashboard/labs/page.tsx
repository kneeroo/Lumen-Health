import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { flagColor, flagLabel, labs } from '@/lib/mock-labs';

export const metadata = {
  title: 'Lab Results · Lumen Health'
};

type Group = { date: string; visitTopic: string; clinician: string; items: typeof labs };

function groupByCollection(): Group[] {
  const map = new Map<string, Group>();
  labs.forEach((l) => {
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

export default function LabResultsPage() {
  const groups = groupByCollection();
  const counts = labs.reduce(
    (acc, l) => {
      acc[l.flag] += 1;
      return acc;
    },
    { normal: 0, borderline: 0, abnormal: 0 }
  );

  return (
    <PageContainer
      pageTitle='Lab Results'
      pageDescription='All your test results, grouped by visit. Each result shows the reference range so you know whether it is in target.'
    >
      <div className='mb-6 grid grid-cols-3 gap-3'>
        <Card>
          <CardContent className='pt-6 text-center'>
            <div className='text-2xl font-semibold tabular-nums text-emerald-600'>
              {counts.normal}
            </div>
            <div className='text-muted-foreground mt-1 text-xs'>Normal</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6 text-center'>
            <div className='text-2xl font-semibold tabular-nums text-amber-600'>
              {counts.borderline}
            </div>
            <div className='text-muted-foreground mt-1 text-xs'>Borderline</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6 text-center'>
            <div className='text-2xl font-semibold tabular-nums text-red-600'>
              {counts.abnormal}
            </div>
            <div className='text-muted-foreground mt-1 text-xs'>Abnormal</div>
          </CardContent>
        </Card>
      </div>

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
                  <CardContent className='pt-6'>
                    <div className='flex items-start justify-between gap-3'>
                      <div className='min-w-0 flex-1'>
                        <div className='flex items-center gap-2'>
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
                      </div>
                      <Icons.reportMedical className='text-muted-foreground size-5 shrink-0' />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageContainer>
  );
}
