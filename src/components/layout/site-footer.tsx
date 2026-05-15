import { Icons } from '@/components/icons';

export function SiteFooter() {
  return (
    <footer className='border-border/60 mt-auto border-t'>
      <div className='mx-auto flex flex-col gap-3 px-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between md:px-6'>
        <div className='text-muted-foreground'>
          <span className='font-medium'>Lumen Health</span> — a thought experiment by{' '}
          <a
            href='https://www.linkedin.com/in/nirooa/'
            target='_blank'
            rel='noreferrer'
            className='hover:text-foreground underline-offset-4 hover:underline'
          >
            Niroo Arjuna
          </a>
          . Demo only — not real PHI, not for clinical use.
        </div>
        <div className='text-muted-foreground flex flex-wrap items-center gap-3'>
          <a
            href='https://github.com/kneeroo/Lumen-Health'
            target='_blank'
            rel='noreferrer'
            className='hover:text-foreground inline-flex items-center gap-1.5 underline-offset-4 hover:underline'
          >
            <Icons.github className='size-3.5' />
            kneeroo/Lumen-Health
          </a>
          <span aria-hidden>·</span>
          <span>
            UI built on{' '}
            <a
              href='https://github.com/Kiranism/next-shadcn-dashboard-starter'
              target='_blank'
              rel='noreferrer'
              className='hover:text-foreground underline-offset-4 hover:underline'
            >
              Kiranism / next-shadcn-dashboard-starter
            </a>{' '}
            (MIT)
          </span>
        </div>
      </div>
    </footer>
  );
}
