import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { getMostRecentVisit } from '@/lib/mock-visits';
import Link from 'next/link';

export const metadata = {
  title: 'Welcome · Lumen Health'
};

type Feature = {
  title: string;
  description: string;
  href: string;
  icon: keyof typeof Icons;
};

const features: Feature[] = [
  {
    title: 'My Visits',
    description:
      'Every consultation, summarised in plain language. Open a visit to see what was discussed, what you agreed to do, and what was prescribed.',
    href: '/dashboard/overview',
    icon: 'visit'
  },
  {
    title: 'Action Items',
    description:
      'Everything your care team has asked you to do, across every visit. Daily tasks track a weekly streak. One-off tasks check off.',
    href: '/dashboard/actions',
    icon: 'checks'
  },
  {
    title: 'Medications',
    description:
      'Current and past prescriptions. Tap a medication for dose, schedule, side effects, and what to call about. Request refills with one click.',
    href: '/dashboard/medications',
    icon: 'pill'
  },
  {
    title: 'Lab Results',
    description:
      'Test results grouped by visit, with the reference range and a colour-coded flag so you know whether a number is in target.',
    href: '/dashboard/labs',
    icon: 'reportMedical'
  },
  {
    title: 'Messages',
    description:
      'Private conversations with your care team. Routine replies arrive within one business day. Use Ask a Question on any visit to start a thread with context attached.',
    href: '/dashboard/chat',
    icon: 'chat'
  },
  {
    title: 'Notifications',
    description:
      'Lab results, message replies, appointment reminders, and action item nudges, all in one place.',
    href: '/dashboard/notifications',
    icon: 'notification'
  }
];

export default function HomePage() {
  const latestVisit = getMostRecentVisit();

  return (
    <PageContainer>
      {/* Hero */}
      <section className='mb-8'>
        <div className='flex items-center gap-2'>
          <Badge variant='secondary' className='text-[10px] tracking-wide uppercase'>
            Welcome to Lumen Health
          </Badge>
        </div>
        <h1 className='mt-3 text-3xl font-bold tracking-tight md:text-4xl'>
          Your visit, in your words.
        </h1>
        <p className='text-muted-foreground mt-3 leading-relaxed'>
          Lumen Health is a patient-facing post-visit companion. It translates the clinical note
          your doctor wrote into plain language, with action items you can check off, medication
          instructions you can actually follow, and a glossary for every term you did not catch.
        </p>
        <div className='mt-5 flex flex-wrap gap-3'>
          <Button asChild>
            <Link href={`/dashboard/patient-portal?visit=${latestVisit.id}`}>
              <Icons.arrowRight className='mr-2 size-4' />
              Open your most recent visit
            </Link>
          </Button>
          <Button asChild variant='outline'>
            <Link href='/dashboard/overview'>Browse all visits</Link>
          </Button>
        </div>
      </section>

      {/* Demo disclaimer */}
      <section className='mb-8'>
        <div className='rounded-md border border-amber-200 bg-amber-50/60 p-4 text-sm text-amber-900'>
          <div className='flex items-start gap-3'>
            <Icons.warning className='mt-0.5 size-4 shrink-0' />
            <div>
              <div className='font-semibold'>This is a demo, not a real medical record.</div>
              <p className='mt-1 leading-relaxed'>
                Patient data and clinicians shown here are fictional. Do not use Lumen Health for
                actual clinical care. For emergencies, call 000 (or your local emergency number).
                For urgent concerns, call your clinic directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick guide */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold tracking-tight'>What is in here</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Six places to explore. Click a card to jump in.
        </p>
        <div className='mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((f) => {
            const Icon = Icons[f.icon];
            return (
              <Link key={f.href} href={f.href} className='group block'>
                <Card className='hover:border-primary/40 hover:bg-muted/30 h-full transition-colors'>
                  <CardHeader>
                    <div className='flex items-center gap-3'>
                      <div className='bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-md'>
                        <Icon className='size-5' />
                      </div>
                      <CardTitle className='text-base'>{f.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className='text-muted-foreground text-sm leading-relaxed'>
                    {f.description}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section className='mb-4'>
        <Card>
          <CardContent className='space-y-3 py-4'>
            <div className='flex items-center gap-2'>
              <Icons.info className='text-muted-foreground size-4' />
              <span className='text-sm font-semibold'>About this project</span>
            </div>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              Lumen Health is a thought experiment by{' '}
              <a
                href='https://www.linkedin.com/in/nirooa/'
                target='_blank'
                rel='noreferrer'
                className='hover:text-foreground underline-offset-4 hover:underline'
              >
                Niroo Arjuna
              </a>{' '}
              on what could sit between a clinical scribe (like Heidi Scribe) and patient messaging
              (like Heidi Comms). Most patients forget the majority of what was said within minutes
              of leaving the consultation. Lumen Health is the consumer surface that translates the
              visit back to them in language they can act on.
            </p>
            <a
              href='https://github.com/kneeroo/Lumen-Health'
              target='_blank'
              rel='noreferrer'
              className='text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm underline-offset-4 hover:underline'
            >
              <Icons.github className='size-3.5' />
              kneeroo/Lumen-Health
            </a>
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  );
}
