'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

// Lumen Health: friendly breadcrumb labels per route. The "Dashboard"
// segment is always stripped so the crumb only shows where the user is.
const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/dashboard/home': [{ title: 'Home', link: '/dashboard/home' }],
  '/dashboard/overview': [{ title: 'My Visits', link: '/dashboard/overview' }],
  '/dashboard/actions': [{ title: 'Action Items', link: '/dashboard/actions' }],
  '/dashboard/medications': [{ title: 'Medications', link: '/dashboard/medications' }],
  '/dashboard/labs': [{ title: 'Lab Results', link: '/dashboard/labs' }],
  '/dashboard/chat': [{ title: 'Messages', link: '/dashboard/chat' }],
  '/dashboard/notifications': [{ title: 'Notifications', link: '/dashboard/notifications' }],
  '/dashboard/patient-portal': [
    { title: 'My Visits', link: '/dashboard/overview' },
    { title: 'Visit Summary', link: '/dashboard/patient-portal' }
  ]
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    // Fallback: derive from path, but skip the leading "Dashboard" segment.
    const segments = pathname.split('/').filter(Boolean);
    return segments
      .filter((s) => s.toLowerCase() !== 'dashboard')
      .map((segment, index, arr) => {
        const path = `/dashboard/${arr.slice(0, index + 1).join('/')}`;
        return {
          title: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
          link: path
        };
      });
  }, [pathname]);

  return breadcrumbs;
}
