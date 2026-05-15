import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Visit } from '@/lib/mock-visits';
import { GlossaryTooltipText } from './glossary-tooltip';

export function VisitSummary({ visit }: { visit: Visit }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What we talked about</CardTitle>
        <p className='text-muted-foreground text-sm'>
          A plain-language summary of your visit. Tap any underlined term for what it means.
        </p>
      </CardHeader>
      <CardContent>
        <p className='leading-relaxed'>
          <GlossaryTooltipText text={visit.summary} terms={visit.glossary} />
        </p>
      </CardContent>
    </Card>
  );
}
