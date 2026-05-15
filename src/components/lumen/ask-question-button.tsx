'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { IconMessageCircle } from '@tabler/icons-react';

export const PENDING_QUESTION_KEY = 'lumen-pending-question';

export type PendingQuestion = {
  visitId: string;
  visitTopic: string;
  visitDate: string;
  clinician: string;
  clinicianTitle: string;
};

export function AskQuestionButton({ context }: { context: PendingQuestion }) {
  const router = useRouter();

  function handleClick() {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(PENDING_QUESTION_KEY, JSON.stringify(context));
    }
    router.push('/chat');
  }

  return (
    <Button variant='outline' className='w-full' onClick={handleClick}>
      <IconMessageCircle className='mr-2 size-4' />
      Ask a question
    </Button>
  );
}
