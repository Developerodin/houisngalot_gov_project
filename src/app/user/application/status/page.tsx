'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { userStorage } from '@/utils/localStorage';
import { ApplicationStatus } from '@/types';

const STATUS_STEPS: { status: ApplicationStatus; label: string; description: string }[] = [
  { status: 'draft', label: 'Draft', description: 'Application started' },
  { status: 'submitted', label: 'Submitted', description: 'Application submitted' },
  { status: 'paid', label: 'Payment Completed', description: 'Payment received' },
  { status: 'under_verification', label: 'Under Verification', description: 'Documents being verified' },
  { status: 'verified', label: 'Verified', description: 'Application verified' },
  { status: 'selected', label: 'Selected', description: 'Selected in lottery' },
  { status: 'allotted', label: 'Allotted', description: 'Plot allotted' },
  { status: 'possession', label: 'Possession', description: 'Possession granted' },
];

export default function ApplicationStatusPage() {
  const router = useRouter();
  const [application, setApplication] = useState<any>(null);

  useEffect(() => {
    const app = userStorage.getApplication();
    if (!app) {
      router.push('/user/application');
      return;
    }
    setApplication(app);
  }, [router]);

  const getStatusIndex = (status?: ApplicationStatus) => {
    return STATUS_STEPS.findIndex((s) => s.status === status) + 1;
  };

  if (!application) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  const currentStatusIndex = getStatusIndex(application.status);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#0F1F3F' }}>
        Application Status
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Application ID: {application.id}</h2>
          <p style={{ color: '#4B5563' }}>Current Status: <strong>{application.status?.replace('_', ' ').toUpperCase()}</strong></p>
        </div>

        <div className="relative">
          {STATUS_STEPS.map((step, index) => {
            const isCompleted = index < currentStatusIndex;
            const isCurrent = index === currentStatusIndex - 1;
            
            return (
              <div key={step.status} className="flex items-start mb-8">
                <div className="flex flex-col items-center mr-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  {index < STATUS_STEPS.length - 1 && (
                    <div
                      className={`w-1 h-16 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className={`font-semibold ${isCurrent ? 'text-blue-600' : ''}`}>
                    {step.label}
                  </h3>
                  <p className="text-sm" style={{ color: '#4B5563' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/user/documents">
            <Button fullWidth variant="outline">Re-upload Documents</Button>
          </Link>
          <Link href="/user/dashboard">
            <Button fullWidth variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
