import PageContainer from '@/components/layout/page-container';
import { ActionItems } from '@/components/lumen/action-items';
import { MedicationList } from '@/components/lumen/medication-list';
import { VisitSummary } from '@/components/lumen/visit-summary';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getMostRecentVisit, getVisit } from '@/lib/mock-visits';
import { IconMessageCircle } from '@tabler/icons-react';

export const metadata = {
  title: 'Patient Portal · Lumen Health'
};

export default async function PatientPortalPage({
  searchParams
}: {
  searchParams: Promise<{ visit?: string }>;
}) {
  const params = await searchParams;
  const visit = (params?.visit && getVisit(params.visit)) || getMostRecentVisit();

  return (
    <PageContainer
      pageTitle={visit.primaryTopic}
      pageDescription={`${visit.date} · ${visit.clinician} (${visit.clinicianTitle})`}
    >
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <div className='lg:col-span-2 space-y-4'>
          <VisitSummary visit={visit} />
          <ActionItems items={visit.actionItems} />
        </div>
        <div className='space-y-4'>
          <MedicationList items={visit.medications} />
          <Card>
            <CardContent className='space-y-3 pt-6'>
              <div>
                <div className='font-medium'>Have a question about this visit?</div>
                <p className='text-muted-foreground text-sm'>
                  Ask about anything that was discussed and get a plain-language answer.
                </p>
              </div>
              <Button variant='outline' className='w-full' disabled>
                <IconMessageCircle className='mr-2 size-4' />
                Ask a question (coming soon)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
