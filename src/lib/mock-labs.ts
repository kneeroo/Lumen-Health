// Mock lab results for the Lumen Health demo.
// Each result links to a visit so the patient can see the context in which
// the test was ordered.

export type LabFlag = 'normal' | 'borderline' | 'abnormal';

export type LabResult = {
  id: string;
  name: string;
  value: string;
  unit?: string;
  referenceRange: string;
  flag: LabFlag;
  collectedDate: string;
  visitId: string;
  visitTopic: string;
  clinician: string;
  notes?: string;
};

export const labs: LabResult[] = [
  {
    id: 'l-1',
    name: 'HbA1c (Glycated haemoglobin)',
    value: '6.2',
    unit: '%',
    referenceRange: '4.0 – 5.6',
    flag: 'borderline',
    collectedDate: '2026-05-10',
    visitId: 'v-001',
    visitTopic: 'Annual checkup + elevated A1C',
    clinician: 'Dr. Maya Chen',
    notes: 'Slightly above target. Lifestyle plan + recheck in 12 weeks discussed at visit.'
  },
  {
    id: 'l-2',
    name: 'Fasting glucose',
    value: '5.9',
    unit: 'mmol/L',
    referenceRange: '3.9 – 5.5',
    flag: 'borderline',
    collectedDate: '2026-05-10',
    visitId: 'v-001',
    visitTopic: 'Annual checkup + elevated A1C',
    clinician: 'Dr. Maya Chen'
  },
  {
    id: 'l-3',
    name: 'Total cholesterol',
    value: '4.8',
    unit: 'mmol/L',
    referenceRange: '< 5.5',
    flag: 'normal',
    collectedDate: '2026-05-10',
    visitId: 'v-001',
    visitTopic: 'Annual checkup + elevated A1C',
    clinician: 'Dr. Maya Chen'
  },
  {
    id: 'l-4',
    name: 'eGFR (kidney function)',
    value: '92',
    unit: 'mL/min/1.73m²',
    referenceRange: '> 90',
    flag: 'normal',
    collectedDate: '2026-05-10',
    visitId: 'v-001',
    visitTopic: 'Annual checkup + elevated A1C',
    clinician: 'Dr. Maya Chen'
  },
  {
    id: 'l-5',
    name: 'Blood pressure (24-hour ambulatory)',
    value: '128 / 82',
    unit: 'mmHg',
    referenceRange: '< 135 / 85',
    flag: 'normal',
    collectedDate: '2026-04-18',
    visitId: 'v-002',
    visitTopic: 'Blood pressure review',
    clinician: 'Dr. James Okafor',
    notes: 'Down from 148 / 92 in February. Current medication working as intended.'
  },
  {
    id: 'l-6',
    name: 'ECG (resting)',
    value: 'Normal sinus rhythm',
    referenceRange: 'Normal sinus rhythm',
    flag: 'normal',
    collectedDate: '2026-04-18',
    visitId: 'v-002',
    visitTopic: 'Blood pressure review',
    clinician: 'Dr. James Okafor'
  },
  {
    id: 'l-7',
    name: 'Full blood count (FBC)',
    value: 'All parameters within range',
    referenceRange: 'Reference panel',
    flag: 'normal',
    collectedDate: '2026-03-06',
    visitId: 'v-003',
    visitTopic: 'Sinus infection',
    clinician: 'Dr. Maya Chen',
    notes:
      'White cell count slightly elevated, consistent with the bacterial infection at the time.'
  }
];

export function getLabsByVisit(visitId: string): LabResult[] {
  return labs.filter((l) => l.visitId === visitId);
}

export const flagLabel: Record<LabFlag, string> = {
  normal: 'Normal',
  borderline: 'Borderline',
  abnormal: 'Abnormal'
};

export const flagColor: Record<LabFlag, string> = {
  normal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  borderline: 'bg-amber-50 text-amber-700 border-amber-200',
  abnormal: 'bg-red-50 text-red-700 border-red-200'
};
