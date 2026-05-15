import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import type { NotificationStatus, NotificationAction } from '@/components/ui/notification-card';

export type Notification = {
  id: string;
  title: string;
  body: string;
  status: NotificationStatus;
  createdAt: string;
  actions?: NotificationAction[];
};

type NotificationState = {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'status'>) => void;
  unreadCount: () => number;
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Lab results ready',
    body: 'Your A1C blood test results from 12 May are now available in your patient portal.',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    actions: [
      {
        id: 'open-portal',
        label: 'View results',
        type: 'redirect',
        style: 'primary'
      }
    ]
  },
  {
    id: '2',
    title: 'Message from Dr. Maya Chen',
    body: 'Just checking in on how the walking is going since our last visit. Any side effects from the metformin so far?',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    actions: [
      {
        id: 'open-messages',
        label: 'Open messages',
        type: 'redirect',
        style: 'primary'
      }
    ]
  },
  {
    id: '3',
    title: 'Prescription refill ready',
    body: 'Your metformin (500 mg) refill is ready for collection at Lumen Pharmacy, High Street branch.',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    actions: [
      {
        id: 'open-portal',
        label: 'View medications',
        type: 'redirect',
        style: 'primary'
      }
    ]
  },
  {
    id: '4',
    title: 'Appointment reminder',
    body: 'Cardiology follow-up with Dr. James Okafor on 14 October at 10:30 AM. Reception will confirm closer to the date.',
    status: 'read',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    actions: [
      {
        id: 'open-portal',
        label: 'View visit',
        type: 'redirect',
        style: 'primary'
      }
    ]
  },
  {
    id: '5',
    title: 'Action item due soon',
    body: 'Reminder: book a repeat A1C blood test for the week of 12 August (within 12 weeks of your last visit).',
    status: 'read',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    actions: [
      {
        id: 'open-portal',
        label: 'View action items',
        type: 'redirect',
        style: 'primary'
      }
    ]
  }
];

export const useNotificationStore = create<NotificationState>()(
  // To enable persistence across refreshes, uncomment the persist wrapper below:
  // persist(
  (set, get) => ({
    notifications: mockNotifications,

    markAsRead: (id) =>
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, status: 'read' as const } : n
        )
      })),

    markAllAsRead: () =>
      set((state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          status: 'read' as const
        }))
      })),

    removeNotification: (id) =>
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
      })),

    addNotification: (notification) =>
      set((state) => ({
        notifications: [{ ...notification, status: 'unread' as const }, ...state.notifications]
      })),

    unreadCount: () => get().notifications.filter((n) => n.status === 'unread').length
  })
  //   ,
  //   { name: 'notifications' }
  // )
);
