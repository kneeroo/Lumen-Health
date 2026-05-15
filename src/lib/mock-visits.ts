// Mock SOAP-derived visit data for the Lumen Health demo.
// In a real product these come from the clinician's documentation tool
// (e.g. Heidi Scribe) and are translated into patient-facing language.

export type ActionItem = {
  id: string;
  task: string;
  due: string;
};

export type Medication = {
  name: string;
  dose: string;
  schedule: string;
  purpose: string;
  duration: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
};

export type Visit = {
  id: string;
  date: string;
  clinician: string;
  clinicianTitle: string;
  type: string;
  primaryTopic: string;
  summary: string;
  actionItems: ActionItem[];
  medications: Medication[];
  glossary: GlossaryTerm[];
};

export const visits: Visit[] = [
  {
    id: 'v-001',
    date: '2026-05-12',
    clinician: 'Dr. Maya Chen',
    clinicianTitle: 'GP, Lumen Family Practice',
    type: 'In-person consultation',
    primaryTopic: 'Annual checkup + elevated A1C',
    summary:
      'We talked about your recent blood test results. Your blood sugar is a little higher than the target range, which means your body is having trouble managing sugar over time. This is not diabetes yet, but it is a sign to take action now to keep it from getting worse. We agreed on a plan to check it again in three months. In the meantime, daily walks and cutting back on sugary drinks will make the biggest difference. We also briefly discussed your sleep quality - we will revisit this next visit.',
    actionItems: [
      {
        id: 'a-1',
        task: 'Book a repeat A1C blood test for the week of 12 August',
        due: 'Within 12 weeks'
      },
      {
        id: 'a-2',
        task: 'Walk for 30 minutes, five days a week',
        due: 'Ongoing'
      },
      {
        id: 'a-3',
        task: 'Replace one sugary drink per day with water or unsweetened tea',
        due: 'Ongoing'
      }
    ],
    medications: [
      {
        name: 'Metformin',
        dose: '500 mg',
        schedule: 'Once daily with dinner',
        purpose: 'Helps your body use sugar more effectively',
        duration: 'Review in 12 weeks'
      }
    ],
    glossary: [
      {
        term: 'A1C',
        definition: 'A blood test that shows your average blood sugar over the last 2-3 months.'
      },
      {
        term: 'Metformin',
        definition: 'A common, well-tolerated medication used to lower blood sugar.'
      },
      {
        term: 'Pre-diabetes',
        definition:
          'A state where blood sugar is higher than normal but not high enough to be diabetes - reversible with lifestyle changes.'
      }
    ]
  },
  {
    id: 'v-002',
    date: '2026-04-22',
    clinician: 'Dr. James Okafor',
    clinicianTitle: 'Cardiologist, Heart Health Centre',
    type: 'Specialist follow-up',
    primaryTopic: 'Blood pressure review',
    summary:
      'Your blood pressure has come down nicely since we started treatment in February. The current dose is doing its job. We talked about staying on the same medication and rechecking in six months unless you notice symptoms like dizziness or headaches. If you decide to start a new exercise routine, message me through the portal first so we can adjust the plan if needed.',
    actionItems: [
      {
        id: 'a-1',
        task: 'Continue current blood pressure medication, no change',
        due: 'Ongoing'
      },
      {
        id: 'a-2',
        task: 'Book a follow-up cardiology review',
        due: 'In 6 months (October 2026)'
      },
      {
        id: 'a-3',
        task: 'Message the portal before starting any new exercise programme',
        due: 'As needed'
      }
    ],
    medications: [
      {
        name: 'Perindopril',
        dose: '5 mg',
        schedule: 'Once daily, morning',
        purpose: 'Lowers blood pressure',
        duration: 'Continue indefinitely'
      }
    ],
    glossary: [
      {
        term: 'Perindopril',
        definition:
          'A blood pressure medication that helps blood vessels relax so the heart does not work as hard.'
      },
      {
        term: 'Hypertension',
        definition:
          'The medical word for high blood pressure - a long-term condition that raises the risk of heart attack and stroke.'
      }
    ]
  },
  {
    id: 'v-003',
    date: '2026-03-08',
    clinician: 'Dr. Maya Chen',
    clinicianTitle: 'GP, Lumen Family Practice',
    type: 'Telehealth',
    primaryTopic: 'Sinus infection',
    summary:
      'You came in with a blocked nose, facial pressure, and a low fever that had lasted just over a week. The pattern was consistent with a bacterial sinus infection rather than a regular cold. We agreed on a short course of antibiotics. You should feel meaningfully better within three days. If you do not, or if symptoms get worse, contact the practice rather than waiting it out.',
    actionItems: [
      {
        id: 'a-1',
        task: 'Finish the full course of antibiotics, even if you feel better',
        due: 'Within 7 days'
      },
      {
        id: 'a-2',
        task: 'Drink extra water and rest while recovering',
        due: 'Ongoing this week'
      },
      {
        id: 'a-3',
        task: 'Contact the practice if symptoms worsen after 72 hours',
        due: 'If needed'
      }
    ],
    medications: [
      {
        name: 'Amoxicillin',
        dose: '500 mg',
        schedule: 'Three times daily',
        purpose: 'Antibiotic to clear the bacterial infection',
        duration: '7 days'
      }
    ],
    glossary: [
      {
        term: 'Sinus infection',
        definition:
          'Inflammation of the air-filled spaces around your nose and forehead, often caused by bacteria after a cold.'
      },
      {
        term: 'Amoxicillin',
        definition:
          'A common antibiotic used to treat bacterial infections, including some sinus infections.'
      }
    ]
  }
];

export function getVisit(id: string): Visit | undefined {
  return visits.find((v) => v.id === id);
}

export function getMostRecentVisit(): Visit {
  return visits[0];
}
