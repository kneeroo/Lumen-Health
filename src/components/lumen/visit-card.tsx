import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Visit } from '@/lib/mock-visits';

export function VisitCard({ visit, isLatest }: { visit: Visit; isLatest?: boolean }) {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='flex flex-row items-start justify-between gap-2'>
        <div className='space-y-1'>
          <CardTitle className='text-base'>{visit.primaryTopic}</CardTitle>
          <div className='text-muted-foreground text-xs'>
            {visit.clinician} · {visit.clinicianTitle}
          </div>
          <div className='text-muted-foreground text-xs'>
            {visit.date} · {visit.type}
          </div>
        </div>
        {isLatest && (
          <Badge variant='secondary' className='shrink-0'>
            Most recent
          </Badge>
        )}
      </CardHeader>
      <CardContent className='mt-auto'>
        <Button asChild className='w-full' data-pendo-id='open-patient-portal'>
          <Link href={`/dashboard/patient-portal?visit=${visit.id}`}>View summary</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
