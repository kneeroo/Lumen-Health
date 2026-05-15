import { NavGroup } from '@/types';

/**
 * Lumen Health navigation.
 * Patient-facing post-visit companion.
 */
export const navGroups: NavGroup[] = [
  {
    label: 'Your care',
    items: [
      {
        title: 'My Visits',
        url: '/dashboard/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['m', 'v'],
        items: []
      },
      {
        title: 'Patient Portal',
        url: '/dashboard/patient-portal',
        icon: 'product',
        isActive: false,
        shortcut: ['p', 'p'],
        items: []
      },
      {
        title: 'Messages',
        url: '/dashboard/chat',
        icon: 'chat',
        isActive: false,
        shortcut: ['m', 'm'],
        items: []
      }
    ]
  },
  {
    label: 'Account',
    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'profile',
        isActive: false,
        shortcut: ['p', 'r'],
        items: []
      },
      {
        title: 'Notifications',
        url: '/dashboard/notifications',
        icon: 'notification',
        isActive: false,
        shortcut: ['n', 'n'],
        items: []
      }
    ]
  }
];
