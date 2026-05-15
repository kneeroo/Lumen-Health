import PageContainer from '@/components/layout/page-container';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export const metadata = {
  title: 'Profile · Lumen Health'
};

type Field = { label: string; value: string };

const personal: Field[] = [
  { label: 'Full name', value: 'Demo Patient' },
  { label: 'Date of birth', value: '14 March 1989 (37)' },
  { label: 'Sex assigned at birth', value: 'Female' },
  { label: 'Preferred pronouns', value: 'she / her' }
];

const contact: Field[] = [
  { label: 'Email', value: 'demo@lumenhealth.app' },
  { label: 'Mobile', value: '+61 412 555 088' },
  { label: 'Address', value: 'Melbourne, Victoria 3000' }
];

const careTeam: Field[] = [
  { label: 'Primary GP', value: 'Dr. Maya Chen, Lumen Family Practice' },
  { label: 'Cardiologist', value: 'Dr. James Okafor, Heart Health Centre' },
  { label: 'Preferred pharmacy', value: 'Lumen Pharmacy, High Street' }
];

const emergency: Field[] = [
  { label: 'Name', value: 'Jamie Patel (sister)' },
  { label: 'Mobile', value: '+61 412 555 042' }
];

export default function ProfilePage() {
  return (
    <PageContainer
      pageTitle='Profile'
      pageDescription='Your basic details and care team. Lumen Health uses these to address you correctly and route messages to the right clinician.'
    >
      <div className='grid items-start gap-4 lg:grid-cols-[280px_1fr]'>
        {/* Identity card — items-start on the grid + self-start here keeps it
            from stretching to match the height of the detail column. */}
        <Card className='self-start py-4'>
          <CardContent className='flex flex-col items-center gap-2 text-center'>
            <Avatar className='size-16 rounded-2xl'>
              <AvatarFallback className='bg-primary/10 text-primary rounded-2xl text-xl font-semibold'>
                DP
              </AvatarFallback>
            </Avatar>
            <div>
              <div className='text-base font-semibold'>Demo Patient</div>
              <div className='text-muted-foreground text-xs'>demo@lumenhealth.app</div>
            </div>
          </CardContent>
        </Card>

        {/* Detail sections */}
        <div className='space-y-4'>
          <ProfileSection title='Personal' fields={personal} />
          <ProfileSection title='Contact' fields={contact} />
          <ProfileSection title='Care team' fields={careTeam} />
          <ProfileSection title='Emergency contact' fields={emergency} />
        </div>
      </div>
    </PageContainer>
  );
}

function ProfileSection({ title, fields }: { title: string; fields: Field[] }) {
  return (
    <Card className='gap-3 py-4'>
      <CardHeader className='!pb-0'>
        <CardTitle className='text-base'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className='grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2'>
          {fields.map((f) => (
            <div key={f.label}>
              <dt className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
                {f.label}
              </dt>
              <dd className='mt-0.5 text-sm'>{f.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
