import PageContainer from '@/components/layout/page-container';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export const metadata = {
  title: 'Messages · Lumen Health'
};

type Thread = {
  id: string;
  from: string;
  role: string;
  initials: string;
  preview: string;
  date: string;
  unread?: boolean;
  topic: string;
};

const threads: Thread[] = [
  {
    id: 't-1',
    from: 'Dr. Maya Chen',
    role: 'GP, Lumen Family Practice',
    initials: 'MC',
    preview:
      'Just checking in on how the walking is going since our last visit. Any side effects from the metformin so far?',
    date: 'Yesterday, 4:12 PM',
    unread: true,
    topic: 'Annual checkup follow-up'
  },
  {
    id: 't-2',
    from: 'Lumen Pharmacy',
    role: 'Prescription team',
    initials: 'LP',
    preview:
      'Your metformin refill is ready for collection at the High Street branch. Open until 7 PM today.',
    date: '2 days ago',
    unread: true,
    topic: 'Prescription refill'
  },
  {
    id: 't-3',
    from: 'Dr. James Okafor',
    role: 'Cardiologist, Heart Health Centre',
    initials: 'JO',
    preview:
      'Confirming our next review for October. Reception will call to lock in a time closer to the date.',
    date: 'Last week',
    topic: 'Blood pressure review'
  },
  {
    id: 't-4',
    from: 'Lumen Front Desk',
    role: 'Reception',
    initials: 'LF',
    preview: 'Reminder: please complete the pre-visit symptoms form before your next appointment.',
    date: '2 weeks ago',
    topic: 'Admin'
  }
];

export default function MessagesPage() {
  return (
    <PageContainer
      pageTitle='Messages'
      pageDescription='Conversations with your care team. Replies usually within one business day.'
    >
      <div className='space-y-3'>
        {threads.map((t) => (
          <Card key={t.id} className='hover:bg-muted/30 transition-colors'>
            <CardContent className='flex items-start gap-4 pt-6'>
              <Avatar className='h-10 w-10'>
                <AvatarFallback className='bg-primary/10 text-primary text-xs font-medium'>
                  {t.initials}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <div className='flex items-baseline justify-between gap-2'>
                  <div className='flex items-baseline gap-2'>
                    <span className='font-medium'>{t.from}</span>
                    {t.unread && (
                      <Badge variant='secondary' className='text-xs'>
                        New
                      </Badge>
                    )}
                  </div>
                  <span className='text-muted-foreground text-xs'>{t.date}</span>
                </div>
                <div className='text-muted-foreground mt-0.5 text-xs'>
                  {t.role} · {t.topic}
                </div>
                <p className='mt-2 text-sm leading-relaxed'>{t.preview}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className='text-muted-foreground flex items-center justify-center gap-2 pt-4 text-xs'>
          <Icons.lock className='size-3' />
          End-to-end encrypted. Your care team typically replies within one business day.
        </div>
      </div>
    </PageContainer>
  );
}
