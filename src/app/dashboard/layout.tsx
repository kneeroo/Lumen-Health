import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SiteFooter } from '@/components/layout/site-footer';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Lumen Health',
  description: 'Your visit, in your words.',
  robots: {
    index: false,
    follow: false
  }
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Sidebar defaults to expanded so labels are visible. The user can
  // collapse it via the rail; that preference is remembered in the cookie.
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get('sidebar_state')?.value;
  const defaultOpen = cookieValue === undefined ? true : cookieValue === 'true';

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className='flex min-h-[calc(100svh-3.5rem)] flex-col'>
            <div className='flex-1'>{children}</div>
            <SiteFooter />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
