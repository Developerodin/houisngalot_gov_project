'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';

export default function ReportsPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (!auth) {
      router.push('/admin/login');
      return;
    }
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          Reports & Analytics
        </h1>
        <Link href="/admin/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
            Application Reports
          </h3>
          <Button fullWidth variant="outline">Generate Application Report</Button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
            Payment Reports
          </h3>
          <Button fullWidth variant="outline">Generate Payment Report</Button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
            Category-wise Analytics
          </h3>
          <Button fullWidth variant="outline">View Analytics</Button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
            Export Data
          </h3>
          <Button fullWidth variant="outline">Export to Excel</Button>
        </div>
      </div>
    </div>
  );
}
