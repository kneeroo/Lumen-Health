import PageContainer from '@/components/layout/page-container';
import { AllActionsView } from '@/components/lumen/all-actions-view';
import { visits, type ActionItem } from '@/lib/mock-visits';

export const metadata = {
  title: 'Action Items · Lumen Health'
};

export type AggregatedAction = ActionItem & {
  visitId: string;
  visitTopic: string;
  visitDate: string;
  clinician: string;
};

function aggregate(): AggregatedAction[] {
  return visits.flatMap((v) =>
    v.actionItems.map((a) => ({
      ...a,
      // Make IDs globally unique across visits while keeping a stable
      // localStorage key shape that matches what ActionStreak / ActionItems use.
      id: `${v.id}-${a.id}`,
      visitId: v.id,
      visitTopic: v.primaryTopic,
      visitDate: v.date,
      clinician: v.clinician
    }))
  );
}

export default function ActionItemsPage() {
  const items = aggregate();
  return (
    <PageContainer
      pageTitle='Action Items'
      pageDescription='Everything your care team has asked you to do, across all your visits.'
    >
      <AllActionsView items={items} />
    </PageContainer>
  );
}
