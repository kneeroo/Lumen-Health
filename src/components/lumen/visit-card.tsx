import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Visit } from '@/lib/mock-visits';

export function VisitCard({ visit, isLatest }: { visit: Visit; isLatest?: boolean }) {
  return (
    <Card className='gap-0 py-4'>
      <CardContent className='flex flex-wrap items-center justify-between gap-4 px-4'>
        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-center gap-2'>
            <CardTitle className='text-base'>{visit.primaryTopic}</CardTitle>
            {isLatest && (
              <Badge
                variant='secondary'
                className='shrink-0 border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-100'
              >
                Most recent
              </Badge>
            )}
          </div>
          <div className='text-muted-foreground mt-0.5 text-xs'>
            {visit.clinician} · {visit.clinicianTitle} · {visit.date} · {visit.type}
          </div>
        </div>
        <Button asChild className='shrink-0' data-pendo-id='open-patient-portal'>
          <Link href={`/patient-portal?visit=${visit.id}`}>View summary</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
