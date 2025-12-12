'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';
import { useLanguage } from '@/contexts/LanguageContext';
import { initializeAdminMockData } from '@/utils/adminMockData';

export default function AdminDashboard() {
  const { t } = useLanguage();
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
    if (!auth || typeof auth !== 'object' || !('user' in auth)) {
      router.push('/admin/login');
      return;
    }
    setAdmin((auth as { user: any }).user);

    // Initialize mock data if not exists
    initializeAdminMockData();

    const applications = adminStorage.getApplications();
    setStats({
      total: applications.length,
      pending: applications.filter((app: any) => app.status === 'under_verification').length,
      verified: applications.filter((app: any) => app.status === 'verified').length,
      rejected: applications.filter((app: any) => app.status === 'rejected').length,
    });
  }, [router]);

  if (!admin) {
    return <div className="container mx-auto px-4 py-12 text-center">{t('common.loading')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#0F1F3F' }}>
        {t('admin.dashboard.title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F1F3F' }}>
            {t('admin.dashboard.totalApplications')}
          </h3>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F1F3F' }}>
            {t('admin.dashboard.pendingVerification')}
          </h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F1F3F' }}>
            {t('admin.dashboard.verified')}
          </h3>
          <p className="text-3xl font-bold text-green-600">{stats.verified}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F1F3F' }}>
            {t('admin.dashboard.rejected')}
          </h3>
          <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
            {t('user.dashboard.quickActions')}
          </h2>
          <div className="flex flex-col gap-4">
            <Link href="/admin/applications">
              <Button fullWidth>{t('common.view')} {t('admin.dashboard.totalApplications')}</Button>
            </Link>
            <Link href="/admin/verification">
              <Button fullWidth variant="outline">{t('admin.dashboard.pendingVerification')}</Button>
            </Link>
            <Link href="/admin/lottery">
              <Button fullWidth variant="outline">{t('process.step6.title')} {t('common.actions')}</Button>
            </Link>
            <Link href="/admin/allotments">
              <Button fullWidth variant="outline">{t('process.step7.title')}</Button>
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
            {t('common.actions')}
          </h2>
          <div className="flex flex-col gap-4">
            <Link href="/admin/schemes">
              <Button fullWidth variant="outline">{t('scheme.title')} {t('common.actions')}</Button>
            </Link>
            <Link href="/admin/payments">
              <Button fullWidth variant="outline">{t('process.step4.title')} {t('common.actions')}</Button>
            </Link>
            <Link href="/admin/reports">
              <Button fullWidth variant="outline">{t('common.view')} {t('common.actions')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
