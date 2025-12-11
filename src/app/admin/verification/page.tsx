'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';

export default function VerificationPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    const apps = adminStorage.getApplications();
    const pending = apps.filter((app: any) => 
      app.status === 'under_verification' || app.status === 'paid'
    );
    setApplications(pending);
  }, [router]);

  const handleVerify = (appId: string, verified: boolean) => {
    adminStorage.updateApplication(appId, {
      status: verified ? 'verified' : 'rejected',
      verifiedAt: new Date().toISOString(),
    });
    
    setApplications(applications.filter((app) => app.id !== appId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          Verification Queue
        </h1>
        <Link href="/admin/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="bg-white shadow-lg rounded-lg p-12 text-center">
            <p style={{ color: '#4B5563' }}>No applications pending verification</p>
          </div>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#0F1F3F' }}>
                    {app.name || 'N/A'}
                  </h3>
                  <p className="text-sm" style={{ color: '#4B5563' }}>
                    Application ID: {app.id}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleVerify(app.id, true)}
                    variant="primary"
                    size="sm"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleVerify(app.id, false)}
                    variant="danger"
                    size="sm"
                  >
                    Reject
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p style={{ color: '#4B5563' }}>Category</p>
                  <p className="font-semibold">{app.category || 'N/A'}</p>
                </div>
                <div>
                  <p style={{ color: '#4B5563' }}>Income</p>
                  <p className="font-semibold">₹{app.annualIncome || 'N/A'}</p>
                </div>
                <div>
                  <p style={{ color: '#4B5563' }}>City</p>
                  <p className="font-semibold">{app.city || 'N/A'}</p>
                </div>
                <div>
                  <Link href={`/admin/applications/${app.id}`}>
                    <Button size="sm" variant="outline">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
