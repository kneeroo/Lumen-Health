import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    description: 'Every consultation, in plain language.',
    href: '/visits',
    icon: 'visit'
  },
  {
    title: 'Action Items',
    description: 'What your care team asked you to do.',
    href: '/actions',
    icon: 'checks'
  },
  {
    title: 'Medications',
    description: 'Dose, schedule, side effects, refills.',
    href: '/medications',
    icon: 'pill'
  },
  {
    title: 'Lab Results',
    description: 'Numbers with reference ranges and flags.',
    href: '/labs',
    icon: 'reportMedical'
  },
  {
    title: 'Messages',
    description: 'Private threads with your care team.',
    href: '/chat',
    icon: 'chat'
  },
  {
    title: 'Notifications',
    description: 'Reminders and alerts, all in one place.',
    href: '/notifications',
    icon: 'notification'
  }
];

export default function HomePage() {
  const latestVisit = getMostRecentVisit();

  return (
    <PageContainer>
      <div className='flex flex-col gap-4'>
        {/* Hero banner — compact */}
        <section>
          <div className='relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-card to-emerald-50/40 px-6 py-6 md:px-10 md:py-8 dark:border-emerald-900/40 dark:from-emerald-950/40 dark:via-card dark:to-emerald-950/20'>
            <div
              aria-hidden
              className='pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl'
            />
            <div
              aria-hidden
              className='pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl'
            />

            <div className='relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center'>
              <div>
                <Badge className='border-emerald-700 bg-emerald-100 text-[10px] tracking-wide text-emerald-800 uppercase hover:bg-emerald-100/80 dark:border-emerald-400 dark:bg-emerald-900/40 dark:text-emerald-200'>
                  Welcome to Lumen Health
                </Badge>
                <h1 className='mt-3 text-3xl font-bold tracking-tight md:text-4xl'>
                  Your visit,{' '}
                  <span className='bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-200'>
                    in your words.
                  </span>
                </h1>
                <p className='text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed md:text-base'>
                  A patient-facing post-visit companion. Plain-language summaries, action items you
                  can check off, and medication instructions you can actually follow.
                </p>
                <div className='mt-4 flex flex-wrap gap-2'>
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

              <div className='hidden justify-center lg:flex'>
                <div className='relative'>
                  <div
                    aria-hidden
                    className='absolute inset-0 -z-10 rounded-full bg-emerald-400/30 blur-3xl'
                  />
                  <div className='rounded-2xl border border-emerald-200/70 bg-white/70 p-5 shadow-xl shadow-emerald-600/10 backdrop-blur-md dark:border-emerald-800/40 dark:bg-card/60'>
                    <Icons.heartbeat
                      className='size-20 text-emerald-600 dark:text-emerald-400'
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact disclaimer pill */}
        <section>
          <div className='flex flex-wrap items-center gap-2 rounded-md border border-amber-200 bg-amber-50/60 dark:bg-card dark:border-amber-900/50 dark:text-amber-300 px-3 py-2 text-xs text-amber-900'>
            <Icons.warning className='size-3.5 shrink-0' />
            <span>
              <span className='font-semibold'>Demo only.</span> Not real PHI. For emergencies call
              000 or your clinic directly.
            </span>
          </div>
        </section>

        {/* Quick guide — compact grid */}
        <section>
          <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6'>
            {features.map((f) => {
              const Icon = Icons[f.icon];
              const color = navIconColor[f.href];
              const boxClass = color ? iconBoxClass[color] : 'bg-primary/10 text-primary';
              return (
                <Link key={f.href} href={f.href} className='group block'>
                  <Card className='hover:border-emerald-300 hover:bg-emerald-50/30 h-full gap-0 py-3 transition-colors'>
                    <CardContent className='px-3'>
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-md ${boxClass}`}
                      >
                        <Icon className='size-5' />
                      </div>
                      <div className='mt-2 text-sm font-semibold'>{f.title}</div>
                      <div className='text-muted-foreground mt-1 text-xs leading-snug'>
                        {f.description}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
