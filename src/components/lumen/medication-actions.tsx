'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/icons';
import { useState } from 'react';
import { toast } from 'sonner';

type Med = {
  name: string;
  dose: string;
  schedule: string;
  purpose: string;
  duration: string;
  clinician: string;
  visitDate: string;
};

const PHARMACIES = [
  { id: 'high-st', name: 'Lumen Pharmacy — High Street', hours: 'Open until 7 PM' },
  { id: 'central', name: 'Lumen Pharmacy — Central', hours: 'Open until 9 PM' },
  { id: 'mail', name: 'Mail to home address', hours: 'Arrives in 2–3 business days' }
];

export function RefillButton({ med }: { med: Med }) {
  const [open, setOpen] = useState(false);
  const [pharmacyId, setPharmacyId] = useState(PHARMACIES[0].id);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function submit() {
    setSubmitting(true);
    setTimeout(() => {
      const choice = PHARMACIES.find((p) => p.id === pharmacyId)?.name ?? '';
      toast.success(`Refill request sent`, {
        description: `${med.name} ${med.dose} → ${choice}. Your care team will confirm in under one business day.`
      });
      setSubmitting(false);
      setOpen(false);
      setNote('');
    }, 600);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline' className='flex-1'>
          <Icons.send className='mr-1.5 size-3' />
          Request refill
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Refill {med.name}</DialogTitle>
          <DialogDescription>
            {med.dose} · {med.schedule}. Your prescriber {med.clinician} will be notified.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-2'>
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>Where would you like to collect?</Label>
            <RadioGroup value={pharmacyId} onValueChange={setPharmacyId}>
              {PHARMACIES.map((p) => (
                <div key={p.id} className='flex items-start gap-3 rounded-md border p-3'>
                  <RadioGroupItem value={p.id} id={p.id} className='mt-0.5' />
                  <Label htmlFor={p.id} className='flex-1 cursor-pointer'>
                    <div className='text-sm font-medium'>{p.name}</div>
                    <div className='text-muted-foreground mt-0.5 text-xs font-normal'>
                      {p.hours}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='refill-note' className='text-sm font-medium'>
              Anything for your care team? (optional)
            </Label>
            <Textarea
              id='refill-note'
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder='e.g. running low, side effects to mention…'
              className='min-h-[64px] resize-none text-sm'
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='ghost' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={submitting}>
            {submitting ? 'Sending…' : 'Send refill request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DetailsButton({ med }: { med: Med }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' variant='ghost'>
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{med.name}</DialogTitle>
          <DialogDescription>
            {med.dose} · {med.schedule}
          </DialogDescription>
        </DialogHeader>
        <dl className='space-y-3 py-2 text-sm'>
          <Row label='Why you are taking it' value={med.purpose} />
          <Row label='How long' value={med.duration} />
          <Row label='Prescribed by' value={`${med.clinician} on ${med.visitDate}`} />
          <Row
            label='Common side effects'
            value='Mild stomach upset is the most common when starting. Take with food to reduce. Tell your clinician if it persists beyond two weeks.'
          />
          <Row
            label='When to call'
            value='Persistent vomiting, severe abdominal pain, or signs of low blood sugar (shakiness, sweating, confusion).'
          />
          <Row
            label='Interactions to flag'
            value='Mention this medication before any imaging that uses contrast dye, and to any new prescriber.'
          />
        </dl>
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className='text-muted-foreground text-xs font-medium uppercase tracking-wide'>{label}</dt>
      <dd className='mt-0.5 leading-relaxed'>{value}</dd>
    </div>
  );
}
