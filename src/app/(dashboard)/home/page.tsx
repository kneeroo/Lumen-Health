import PageContainer from '@/components/layout/page-container';
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
      'Current and past prescriptions. Tap a medication for dose, schedule, side effects, and what to call about.',
    href: '/medications',
    icon: 'pill'
  },
  {
    title: 'Lab Results',
    description:
      'Test results grouped by visit, with reference ranges and a colour-coded flag so you know whether a number is in target.',
    href: '/labs',
    icon: 'reportMedical'
  },
  {
    title: 'Messages',
    description:
      'Private conversations with your care team. Routine replies arrive within one business day.',
    href: '/chat',
    icon: 'chat'
  },
  {
    title: 'Notifications',
    description:
      'Lab results, message replies, appointment reminders, and action item nudges, all in one place.',
    href: '/notifications',
    icon: 'notification'
  },
  {
    title: 'Profile',
    description:
      'Your basic details and care team. Lumen Health uses these to address you correctly and route messages to the right clinician.',
    href: '/profile',
    icon: 'profile'
  }
];

export default function HomePage() {
  const latestVisit = getMostRecentVisit();

  return (
    <PageContainer>
      <div className='flex flex-col gap-5'>
        {/* Hero banner */}
        <section>
          <div className='relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-card to-emerald-50/40 px-8 py-9 md:px-12 md:py-12 dark:border-emerald-900/40 dark:from-emerald-950/40 dark:via-card dark:to-emerald-950/20'>
            <div
              aria-hidden
              className='pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl'
            />
            <div
              aria-hidden
              className='pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl'
            />

            <div className='relative md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-8'>
              <div>
                <div className='flex items-start justify-between gap-4'>
                  <h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
                    Your visit,{' '}
                    <span className='bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-200'>
                      in your words.
                    </span>
                  </h1>
                  {/* Mobile-only logo inline with the heading. Desktop uses the
                      standalone logo column below. */}
                  <div className='relative shrink-0 md:hidden'>
                    <div
                      aria-hidden
                      className='absolute inset-0 -z-10 rounded-full bg-emerald-400/30 blur-3xl'
                    />
                    <div className='rounded-2xl border border-emerald-200/70 bg-white/70 p-3 shadow-xl shadow-emerald-600/10 backdrop-blur-md dark:border-emerald-800/40 dark:bg-card/60'>
                      <Icons.heartbeat
                        className='size-12 text-emerald-600 dark:text-emerald-400'
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>
                <p className='text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed'>
                  Lumen Health is a patient-facing post-visit companion. It translates the clinical
                  note your doctor wrote into plain language, with action items you can check off,
                  medication instructions you can actually follow, and a glossary for every term you
                  did not catch.
                </p>
                <div className='mt-5 flex flex-wrap gap-3'>
                  <Button asChild className='shadow-sm shadow-emerald-600/20'>
                    <Link href={`/patient-portal?visit=${latestVisit.id}`}>
                      Open your most recent visit
                      <Icons.arrowRight className='ml-2 size-4' />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant='outline'
                    className='border-emerald-200 bg-white/70 backdrop-blur-sm hover:bg-white dark:bg-card/60'
                  >
                    <Link href='/visits'>Browse all visits</Link>
                  </Button>
                </div>
              </div>

              <div className='hidden md:flex md:justify-end'>
                <div className='relative'>
                  <div
                    aria-hidden
                    className='absolute inset-0 -z-10 rounded-full bg-emerald-400/30 blur-3xl'
                  />
                  <div className='rounded-2xl border border-emerald-200/70 bg-white/70 p-7 shadow-xl shadow-emerald-600/10 backdrop-blur-md dark:border-emerald-800/40 dark:bg-card/60'>
                    <Icons.heartbeat
                      className='size-24 text-emerald-600 dark:text-emerald-400'
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo disclaimer */}
        <section>
          <div className='rounded-md border border-amber-200 bg-amber-50/60 p-3.5 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-card dark:text-amber-300'>
            <div className='flex items-start gap-2.5'>
              <Icons.warning className='mt-0.5 size-4 shrink-0' />
              <div className='space-y-1.5'>
                <p>
                  <span className='font-semibold'>This is a demo, not a real medical record.</span>{' '}
                  Patient data and clinicians shown here are fictional. Do not use Lumen Health for
                  actual clinical care.
                </p>
                <p>
                  For emergencies, call 000 (or your local emergency number). For urgent concerns,
                  call your clinic directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick guide */}
        <section>
          <h2 className='text-lg font-semibold tracking-tight'>What is in here</h2>
          <p className='text-muted-foreground mt-0.5 text-sm'>
            Seven places to explore. Click a card to jump in.
          </p>
          <div className='mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((f) => {
              const Icon = Icons[f.icon];
              const color = navIconColor[f.href];
              const boxClass = color ? iconBoxClass[color] : 'bg-primary/10 text-primary';
              return (
                <Link key={f.href} href={f.href} className='group block'>
                  <Card className='hover:border-emerald-300 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 flex h-full flex-col gap-3 px-5 py-5 transition-colors'>
                    <div className='flex items-center gap-3'>
                      <div
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${boxClass}`}
                      >
                        <Icon className='size-6' />
                      </div>
                      <CardTitle className='text-base'>{f.title}</CardTitle>
                    </div>
                    <p className='text-muted-foreground text-sm leading-snug'>{f.description}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* About */}
        <section>
          <Card>
            <CardContent className='space-y-2 py-4'>
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
                on what could sit between a clinical scribe (like Heidi Scribe) and patient
                messaging (like Heidi Comms). Most patients forget the majority of what was said
                within minutes of leaving the consultation. Lumen Health is the consumer surface
                that translates the visit back to them in language they can act on.
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
      </div>
    </PageContainer>
  );
}
