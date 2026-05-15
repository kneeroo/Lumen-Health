import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { visits } from '@/lib/mock-visits';

export const metadata = {
  title: 'Medications · Lumen Health'
};

type EnrichedMed = {
  name: string;
  dose: string;
  schedule: string;
  purpose: string;
  duration: string;
  visitId: string;
  visitTopic: string;
  visitDate: string;
  clinician: string;
};

function aggregateMedications(): EnrichedMed[] {
  return visits.flatMap((v) =>
    v.medications.map((m) => ({
      ...m,
      visitId: v.id,
      visitTopic: v.primaryTopic,
      visitDate: v.date,
      clinician: v.clinician
    }))
  );
}

function isActiveMed(duration: string): boolean {
  return !/days?|weeks?\b/i.test(duration);
}

export default function MedicationsPage() {
  const all = aggregateMedications();
  const active = all.filter((m) => isActiveMed(m.duration));
  const past = all.filter((m) => !isActiveMed(m.duration));

  return (
    <PageContainer
      pageTitle='Medications'
      pageDescription='Everything you are currently taking, plus medications from past visits.'
    >
      <section className='space-y-3'>
        <div className='flex items-baseline justify-between'>
          <h3 className='text-base font-semibold'>Currently taking</h3>
          <span className='text-muted-foreground text-xs tabular-nums'>{active.length} active</span>
        </div>
        {active.length === 0 ? (
          <Card>
            <CardContent className='text-muted-foreground pt-6 text-sm'>
              No active medications.
            </CardContent>
          </Card>
        ) : (
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
            {active.map((m, i) => (
              <Card key={`${m.visitId}-${m.name}-${i}`}>
                <CardHeader className='pb-3'>
                  <div className='flex items-baseline justify-between gap-2'>
                    <CardTitle className='text-base'>{m.name}</CardTitle>
                    <Badge variant='secondary'>{m.dose}</Badge>
                  </div>
                  <p className='text-muted-foreground text-xs'>{m.schedule}</p>
                </CardHeader>
                <CardContent className='space-y-3 pt-0'>
                  <p className='text-sm'>{m.purpose}</p>
                  <div className='border-border/60 space-y-1 border-t pt-3'>
                    <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                      <Icons.clock className='size-3' />
                      <span>{m.duration}</span>
                    </div>
                    <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                      <Icons.stethoscope className='size-3' />
                      <span>
                        Prescribed by {m.clinician} at {m.visitDate}
                      </span>
                    </div>
                  </div>
                  <div className='flex gap-2 pt-1'>
                    <Button size='sm' variant='outline' className='flex-1'>
                      <Icons.send className='mr-1.5 size-3' />
                      Request refill
                    </Button>
                    <Button size='sm' variant='ghost'>
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className='mt-8 space-y-3'>
          <div className='flex items-baseline justify-between'>
            <h3 className='text-base font-semibold'>Past medications</h3>
            <span className='text-muted-foreground text-xs tabular-nums'>{past.length}</span>
          </div>
          <div className='space-y-2'>
            {past.map((m, i) => (
              <Card key={`past-${m.visitId}-${m.name}-${i}`}>
                <CardContent className='flex items-baseline justify-between pt-6'>
                  <div className='space-y-1'>
                    <div className='text-sm font-medium'>
                      {m.name} <span className='text-muted-foreground font-normal'>· {m.dose}</span>
                    </div>
                    <div className='text-muted-foreground text-xs'>
                      {m.purpose} · {m.duration}
                    </div>
                    <div className='text-muted-foreground text-xs'>
                      Prescribed by {m.clinician} at {m.visitDate}
                    </div>
                  </div>
                  <Badge variant='outline' className='text-xs'>
                    Completed
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </PageContainer>
  );
}
