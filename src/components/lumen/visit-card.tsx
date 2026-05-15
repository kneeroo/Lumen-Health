import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Visit } from '@/lib/mock-visits';

export function VisitCard({ visit, isLatest }: { visit: Visit; isLatest?: boolean }) {
  return (
    <Card className='flex flex-col'>
      <CardHeader>
        <div className='flex flex-wrap items-center gap-2'>
          <CardTitle className='text-base'>{visit.primaryTopic}</CardTitle>
          {isLatest && (
            <Badge variant='secondary' className='shrink-0'>
              Most recent
            </Badge>
          )}
        </div>
        <div className='text-muted-foreground mt-1 text-xs'>
          {visit.clinician} · {visit.clinicianTitle}
        </div>
        <div className='text-muted-foreground text-xs'>
          {visit.date} · {visit.type}
        </div>
      </CardHeader>
      <CardContent className='mt-auto'>
        <Button asChild className='w-full' data-pendo-id='open-patient-portal'>
          <Link href={`/dashboard/patient-portal?visit=${visit.id}`}>View summary</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
