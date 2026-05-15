import PageContainer from '@/components/layout/page-container';
import { MessagesView } from '@/components/lumen/messages-view';
import { Icons } from '@/components/icons';
import { threads } from '@/lib/mock-messages';

export const metadata = {
  title: 'Messages · Lumen Health'
};

export default function MessagesPage() {
  return (
    <PageContainer pageTitle='Messages' pageDescription='Conversations with your care team.'>
      <div className='mb-4 rounded-md border border-amber-200 bg-amber-50/60 dark:bg-card dark:border-amber-900/50 dark:text-amber-300 p-4 text-sm text-amber-900'>
        <div className='flex items-start gap-3'>
          <Icons.warning className='mt-0.5 size-4 shrink-0' />
          <div className='space-y-1.5'>
            <div>
              <span className='font-semibold'>Emergency:</span> call 000 (or your local emergency
              number) or go to the nearest emergency department.
            </div>
            <div>
              <span className='font-semibold'>Urgent but not an emergency:</span> call your clinic
              directly.
            </div>
            <div>
              <span className='font-semibold'>Routine questions:</span> use this form, replies
              usually within one business day.
            </div>
          </div>
        </div>
      </div>
      <MessagesView initialThreads={threads} />
    </PageContainer>
  );
}
