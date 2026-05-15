// Mock care-team conversations for the Messages page.

export type Sender = 'patient' | 'careTeam';

export type Message = {
  id: string;
  sender: Sender;
  body: string;
  sentAt: string;
};

export type Thread = {
  id: string;
  from: string;
  role: string;
  initials: string;
  topic: string;
  lastDate: string;
  unread?: boolean;
  messages: Message[];
};

export const threads: Thread[] = [
  {
    id: 't-1',
    from: 'Dr. Maya Chen',
    role: 'GP, Lumen Family Practice',
    initials: 'MC',
    topic: 'Annual checkup follow-up',
    lastDate: 'Yesterday, 4:12 PM',
    unread: true,
    messages: [
      {
        id: 'm-1',
        sender: 'careTeam',
        body: 'Hi — just sent through your A1C and glucose results. Have a look in the lab results tab when you have a moment.',
        sentAt: '3 days ago, 9:02 AM'
      },
      {
        id: 'm-2',
        sender: 'patient',
        body: 'Thanks, I saw them. Both a bit above range. Should I be worried?',
        sentAt: '3 days ago, 12:48 PM'
      },
      {
        id: 'm-3',
        sender: 'careTeam',
        body: 'Not worried, but worth taking seriously. Borderline now is the easiest time to turn it around. The walking and the metformin should both help. We will recheck in 12 weeks.',
        sentAt: '3 days ago, 2:11 PM'
      },
      {
        id: 'm-4',
        sender: 'careTeam',
        body: 'Just checking in on how the walking is going since our last visit. Any side effects from the metformin so far?',
        sentAt: 'Yesterday, 4:12 PM'
      }
    ]
  },
  {
    id: 't-2',
    from: 'Lumen Pharmacy',
    role: 'Prescription team',
    initials: 'LP',
    topic: 'Prescription refill',
    lastDate: '2 days ago',
    unread: true,
    messages: [
      {
        id: 'm-1',
        sender: 'careTeam',
        body: 'Your metformin refill is ready for collection at the High Street branch. Open until 7 PM today.',
        sentAt: '2 days ago, 8:30 AM'
      }
    ]
  },
  {
    id: 't-3',
    from: 'Dr. James Okafor',
    role: 'Cardiologist, Heart Health Centre',
    initials: 'JO',
    topic: 'Blood pressure review',
    lastDate: 'Last week',
    messages: [
      {
        id: 'm-1',
        sender: 'careTeam',
        body: 'Confirming our next review for October. Reception will call to lock in a time closer to the date.',
        sentAt: 'Last week'
      },
      {
        id: 'm-2',
        sender: 'patient',
        body: 'Sounds good — thank you.',
        sentAt: 'Last week'
      }
    ]
  },
  {
    id: 't-4',
    from: 'Lumen Front Desk',
    role: 'Reception',
    initials: 'LF',
    topic: 'Admin',
    lastDate: '2 weeks ago',
    messages: [
      {
        id: 'm-1',
        sender: 'careTeam',
        body: 'Reminder: please complete the pre-visit symptoms form before your next appointment.',
        sentAt: '2 weeks ago'
      }
    ]
  }
];
