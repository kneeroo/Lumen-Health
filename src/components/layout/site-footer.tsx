import { Icons } from '@/components/icons';

export function SiteFooter() {
  return (
    <footer className='border-border/60 mt-auto border-t'>
      {/* Three-column footer on desktop:
            [attribution]   [github]   [UI credit]
          justify-between pins the first child to the left edge, the last
          child to the right edge, and the github sits centered between them.
          min-h-16 matches the sidebar footer height (SidebarMenuButton
          size=lg + p-2 wrapper = 48 + 16 = 64px) so the DP avatar aligns
          vertically with this row. */}
      <div className='flex w-full flex-col items-center gap-3 px-4 py-3 text-center text-xs sm:min-h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0 sm:text-left md:px-6'>
        <div className='text-muted-foreground'>
          <span className='font-medium'>Lumen Health</span>, a thought experiment by{' '}
          <a
            href='https://www.linkedin.com/in/nirooa/'
            target='_blank'
            rel='noreferrer'
            className='hover:text-foreground underline-offset-4 hover:underline'
          >
            Niroo Arjuna
          </a>
          . Demo only. Not real PHI, not for clinical use.
        </div>
        <a
          href='https://github.com/kneeroo/Lumen-Health'
          target='_blank'
          rel='noreferrer'
          className='text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center gap-1.5 underline-offset-4 hover:underline'
        >
          <Icons.github className='size-3.5' />
          kneeroo/Lumen-Health
        </a>
        <span className='text-muted-foreground'>
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
    </footer>
  );
}
