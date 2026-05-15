import PageContainer from '@/components/layout/page-container';
import { LabResultsView } from '@/components/lumen/lab-results-view';
import { labs } from '@/lib/mock-labs';

export const metadata = {
  title: 'Lab Results · Lumen Health'
};

export default function LabResultsPage() {
  return (
    <PageContainer
      pageTitle='Lab Results'
      pageDescription='Test results, grouped by visit. Tap a tile to filter.'
    >
      <LabResultsView labs={labs} />
    </PageContainer>
  );
}
