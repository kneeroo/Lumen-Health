import PageContainer from '@/components/layout/page-container';
import { ActionItems } from '@/components/lumen/action-items';
import { AskQuestionButton } from '@/components/lumen/ask-question-button';
import { MedicationList } from '@/components/lumen/medication-list';
import { VisitSummary } from '@/components/lumen/visit-summary';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { getMostRecentVisit, getVisit } from '@/lib/mock-visits';

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
        <div className='space-y-4 lg:col-span-2'>
          <VisitSummary visit={visit} />
          <ActionItems items={visit.actionItems} visitId={visit.id} />
        </div>
        <div className='space-y-4'>
          <MedicationList items={visit.medications} />
          <Card>
            <CardContent className='space-y-3 pt-6'>
              <div>
                <div className='font-medium'>Have a question about this visit?</div>
                <p className='text-muted-foreground text-sm'>
                  Send a message to your care team and get a reply within one business day.
                </p>
              </div>
              <AskQuestionButton
                context={{
                  visitId: visit.id,
                  visitTopic: visit.primaryTopic,
                  visitDate: visit.date,
                  clinician: visit.clinician,
                  clinicianTitle: visit.clinicianTitle
                }}
              />
              <div className='flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50/60 dark:bg-card dark:border-amber-900/50 dark:text-amber-300 p-3 text-xs leading-relaxed text-amber-900'>
                <Icons.warning className='mt-0.5 size-3.5 shrink-0' />
                <p>
                  Lumen Health messages are for non-urgent questions and follow-ups. If something
                  feels serious, like chest pain, severe symptoms, or a medical emergency, call 000
                  or your clinic directly rather than waiting for a reply.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
