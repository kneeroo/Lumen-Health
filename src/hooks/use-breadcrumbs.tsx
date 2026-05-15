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
  '/home': [{ title: 'Home', link: '/home' }],
  '/visits': [{ title: 'My Visits', link: '/visits' }],
  '/actions': [{ title: 'Action Items', link: '/actions' }],
  '/medications': [{ title: 'Medications', link: '/medications' }],
  '/labs': [{ title: 'Lab Results', link: '/labs' }],
  '/chat': [{ title: 'Messages', link: '/chat' }],
  '/profile': [{ title: 'Profile', link: '/profile' }],
  '/notifications': [{ title: 'Notifications', link: '/notifications' }],
  '/patient-portal': [
    { title: 'My Visits', link: '/visits' },
    { title: 'Visit Summary', link: '/patient-portal' }
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
        const path = `/${arr.slice(0, index + 1).join('/')}`;
        return {
          title: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
          link: path
        };
      });
  }, [pathname]);

  return breadcrumbs;
}
