'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';
import { ApplicationStatus } from '@/types';
import { initializeAdminMockData } from '@/utils/adminMockData';

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [application, setApplication] = useState<any>(null);
  const [status, setStatus] = useState<ApplicationStatus>('draft');

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    // Initialize mock data if not exists
    initializeAdminMockData();

    const apps = adminStorage.getApplications();
    const app = apps.find((a: any) => a.id === params.id);
    
    if (!app) {
      // If not found in admin storage, check user storage (for demo)
      const userApp = require('@/utils/localStorage').userStorage.getApplication();
      if (userApp && userApp.id === params.id) {
        setApplication(userApp);
        setStatus(userApp.status);
      } else {
        router.push('/admin/applications');
      }
    } else {
      setApplication(app);
      setStatus(app.status);
    }
  }, [params.id, router]);

  const handleStatusUpdate = (newStatus: ApplicationStatus) => {
    adminStorage.updateApplication(application.id, { status: newStatus });
    setApplication({ ...application, status: newStatus });
    setStatus(newStatus);
  };

  if (!application) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          Application Details
        </h1>
        <Link href="/admin/applications">
          <Button variant="outline">Back to List</Button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Application Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm" style={{ color: '#4B5563' }}>Application ID</p>
            <p className="font-semibold">{application.id}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: '#4B5563' }}>Status</p>
            <p className="font-semibold">{application.status?.replace('_', ' ').toUpperCase()}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: '#4B5563' }}>Name</p>
            <p className="font-semibold">{application.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: '#4B5563' }}>Category</p>
            <p className="font-semibold">{application.category || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: '#4B5563' }}>Annual Income</p>
            <p className="font-semibold">₹{application.annualIncome || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: '#4B5563' }}>City</p>
            <p className="font-semibold">{application.city || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Update Status</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => handleStatusUpdate('under_verification')}
            variant={status === 'under_verification' ? 'primary' : 'outline'}
            size="sm"
          >
            Under Verification
          </Button>
          <Button
            onClick={() => handleStatusUpdate('verified')}
            variant={status === 'verified' ? 'primary' : 'outline'}
            size="sm"
          >
            Verified
          </Button>
          <Button
            onClick={() => handleStatusUpdate('rejected')}
            variant={status === 'rejected' ? 'primary' : 'outline'}
            size="sm"
          >
            Rejected
          </Button>
          <Button
            onClick={() => handleStatusUpdate('selected')}
            variant={status === 'selected' ? 'primary' : 'outline'}
            size="sm"
          >
            Selected
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        <p style={{ color: '#4B5563' }}>Document verification section would go here.</p>
      </div>
    </div>
  );
}
