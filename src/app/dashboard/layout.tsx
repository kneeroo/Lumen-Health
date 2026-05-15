import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { InfoSidebar } from '@/components/layout/info-sidebar';
import { InfobarProvider } from '@/components/ui/infobar';
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
  // collapse it via the rail; that preference is then remembered in the
  // cookie. (Previously the cookie check defaulted to closed when no
  // cookie was set, which hid all the nav labels on first visit.)
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get('sidebar_state')?.value;
  const defaultOpen = cookieValue === undefined ? true : cookieValue === 'true';
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <InfobarProvider defaultOpen={false}>
            {children}
            <InfoSidebar side='right' />
          </InfobarProvider>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
