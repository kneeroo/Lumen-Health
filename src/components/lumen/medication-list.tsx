import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Medication } from '@/lib/mock-visits';

export function MedicationList({ items }: { items: Medication[] }) {
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>
            No medications were prescribed at this visit.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medications</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {items.map((m) => (
          <div key={m.name} className='border-border/50 rounded-md border p-3'>
            <div className='flex items-baseline justify-between gap-2'>
              <div className='font-medium'>{m.name}</div>
              <div className='text-muted-foreground text-xs'>{m.dose}</div>
            </div>
            <div className='text-muted-foreground mt-1 text-sm'>{m.schedule}</div>
            <div className='mt-2 text-sm'>{m.purpose}</div>
            <div className='text-muted-foreground mt-1 text-xs'>{m.duration}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
