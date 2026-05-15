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
        url: '/visits',
        icon: 'visit',
        isActive: false,
        shortcut: ['m', 'v'],
        items: []
      },
      {
        title: 'Action Items',
        url: '/actions',
        icon: 'checks',
        isActive: false,
        shortcut: ['a', 'a'],
        items: []
      },
      {
        title: 'Medications',
        url: '/medications',
        icon: 'pill',
        isActive: false,
        shortcut: ['m', 'd'],
        items: []
      },
      {
        title: 'Lab Results',
        url: '/labs',
        icon: 'reportMedical',
        isActive: false,
        shortcut: ['l', 'l'],
        items: []
      },
      {
        title: 'Messages',
        url: '/chat',
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
        url: '/profile',
        icon: 'profile',
        isActive: false,
        shortcut: ['p', 'r'],
        items: []
      },
      {
        title: 'Notifications',
        url: '/notifications',
        icon: 'notification',
        isActive: false,
        shortcut: ['n', 'n'],
        items: []
      }
    ]
  }
];
