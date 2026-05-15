import PageContainer from '@/components/layout/page-container';
import { MessagesView } from '@/components/lumen/messages-view';
import { threads } from '@/lib/mock-messages';

export const metadata = {
  title: 'Messages · Lumen Health'
};

export default function MessagesPage() {
  return (
    <PageContainer
      pageTitle='Messages'
      pageDescription='Conversations with your care team. Replies usually within one business day.'
    >
      <MessagesView initialThreads={threads} />
    </PageContainer>
  );
}
