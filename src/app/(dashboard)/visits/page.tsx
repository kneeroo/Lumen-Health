import PageContainer from '@/components/layout/page-container';
import { VisitCard } from '@/components/lumen/visit-card';
import { visits } from '@/lib/mock-visits';

export const metadata = {
  title: 'My Visits · Lumen Health'
};

export default function MyVisitsPage() {
  return (
    <PageContainer pageTitle='My Visits' pageDescription='Your recent consultations'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {visits.map((visit, i) => (
          <VisitCard key={visit.id} visit={visit} isLatest={i === 0} />
        ))}
      </div>
    </PageContainer>
  );
}
