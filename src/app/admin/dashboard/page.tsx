'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    verified: 0,
    rejected: 0,
  });

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (!auth) {
      router.push('/admin/login');
      return;
    }
    setAdmin(auth.user);

    const applications = adminStorage.getApplications();
    setStats({
      total: applications.length,
      pending: applications.filter((app: any) => app.status === 'under_verification').length,
      verified: applications.filter((app: any) => app.status === 'verified').length,
      rejected: applications.filter((app: any) => app.status === 'rejected').length,
    });
  }, [router]);

  if (!admin) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#0F1F3F' }}>
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F1F3F' }}>
            Total Applications
          </h3>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F1F3F' }}>
            Pending Verification
          </h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F1F3F' }}>
            Verified
          </h3>
          <p className="text-3xl font-bold text-green-600">{stats.verified}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F1F3F' }}>
            Rejected
          </h3>
          <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link href="/admin/applications">
              <Button fullWidth>View Applications</Button>
            </Link>
            <Link href="/admin/verification">
              <Button fullWidth variant="secondary">Verification Queue</Button>
            </Link>
            <Link href="/admin/lottery">
              <Button fullWidth variant="outline">Lottery Management</Button>
            </Link>
            <Link href="/admin/allotments">
              <Button fullWidth variant="outline">Allotments</Button>
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
            Management
          </h2>
          <div className="space-y-3">
            <Link href="/admin/schemes">
              <Button fullWidth variant="outline">Manage Schemes</Button>
            </Link>
            <Link href="/admin/payments">
              <Button fullWidth variant="outline">Payment Console</Button>
            </Link>
            <Link href="/admin/reports">
              <Button fullWidth variant="outline">Reports</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
