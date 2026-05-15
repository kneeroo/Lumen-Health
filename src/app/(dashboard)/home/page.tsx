import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { getMostRecentVisit } from '@/lib/mock-visits';
import { iconBoxClass, navIconColor } from '@/lib/nav-icon-colors';
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
    href: '/visits',
    icon: 'visit'
  },
  {
    title: 'Action Items',
    description:
      'Everything your care team has asked you to do, across every visit. Daily tasks track a weekly streak. One-off tasks check off.',
    href: '/actions',
    icon: 'checks'
  },
  {
    title: 'Medications',
    description:
      'Current and past prescriptions. Tap a medication for dose, schedule, side effects, and what to call about. Request refills with one click.',
    href: '/medications',
    icon: 'pill'
  },
  {
    title: 'Lab Results',
    description:
      'Test results grouped by visit, with the reference range and a colour-coded flag so you know whether a number is in target.',
    href: '/labs',
    icon: 'reportMedical'
  },
  {
    title: 'Messages',
    description:
      'Private conversations with your care team. Routine replies arrive within one business day. Use Ask a Question on any visit to start a thread with context attached.',
    href: '/chat',
    icon: 'chat'
  },
  {
    title: 'Notifications',
    description:
      'Lab results, message replies, appointment reminders, and action item nudges, all in one place.',
    href: '/notifications',
    icon: 'notification'
  }
];

export default function HomePage() {
  const latestVisit = getMostRecentVisit();

  return (
    <PageContainer>
      {/* Hero banner */}
      <section className='mb-8'>
        <div className='relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-card to-emerald-50/40 px-6 py-12 md:px-12 md:py-16 dark:border-emerald-900/40 dark:from-emerald-950/40 dark:via-card dark:to-emerald-950/20'>
          {/* Decorative blurs */}
          <div
            aria-hidden
            className='pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl'
          />
          <div
            aria-hidden
            className='pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl'
          />

          <div className='relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center'>
            <div>
              <Badge className='border-emerald-200 bg-emerald-100 text-[10px] tracking-wide text-emerald-800 uppercase hover:bg-emerald-100/80 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'>
                Welcome to Lumen Health
              </Badge>
              <h1 className='mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
                Your visit,
                <br className='hidden sm:block' />{' '}
                <span className='bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-200'>
                  in your words.
                </span>
              </h1>
              <p className='text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed md:text-lg'>
                Lumen Health is a patient-facing post-visit companion. It translates the clinical
                note your doctor wrote into plain language, with action items you can check off,
                medication instructions you can actually follow, and a glossary for every term you
                did not catch.
              </p>
              <div className='mt-7 flex flex-wrap gap-3'>
                <Button asChild size='lg' className='shadow-md shadow-emerald-600/20'>
                  <Link href={`/patient-portal?visit=${latestVisit.id}`}>
                    Open your most recent visit
                    <Icons.arrowRight className='ml-2 size-4' />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='border-emerald-200 bg-white/70 backdrop-blur-sm hover:bg-white dark:bg-card/60'
                >
                  <Link href='/visits'>Browse all visits</Link>
                </Button>
              </div>
            </div>

            {/* Decorative heartbeat artwork on the right */}
            <div className='hidden justify-center lg:flex'>
              <div className='relative'>
                <div
                  aria-hidden
                  className='absolute inset-0 -z-10 rounded-full bg-emerald-400/30 blur-3xl'
                />
                <div className='rounded-3xl border border-emerald-200/70 bg-white/70 p-10 shadow-2xl shadow-emerald-600/10 backdrop-blur-md dark:border-emerald-800/40 dark:bg-card/60'>
                  <Icons.heartbeat
                    className='size-32 text-emerald-600 dark:text-emerald-400'
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
          </div>
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
                actual clinical care.
              </p>
              <p className='mt-2 leading-relaxed'>
                For emergencies, call 000 (or your local emergency number). For urgent concerns,
                call your clinic directly.
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
            const color = navIconColor[f.href];
            const boxClass = color ? iconBoxClass[color] : 'bg-primary/10 text-primary';
            return (
              <Link key={f.href} href={f.href} className='group block'>
                <Card className='hover:border-primary/40 hover:bg-muted/30 h-full transition-colors'>
                  <CardHeader>
                    <div className='flex items-center gap-3'>
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-md ${boxClass}`}
                      >
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
