'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { userStorage } from '@/utils/localStorage';
import { ApplicationStatus } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

export default function UserDashboard() {
  const { t } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [application, setApplication] = useState<any>(null);

  useEffect(() => {
    const auth = userStorage.getAuth();
    if (!auth || typeof auth !== 'object' || !('user' in auth)) {
      router.push('/auth/login');
      return;
    }
    setUser((auth as { user: any }).user);
    
    const app = userStorage.getApplication();
    setApplication(app);
  }, [router]);

  const getStatusColor = (status?: ApplicationStatus) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-500',
      submitted: 'bg-yellow-500',
      paid: 'bg-blue-500',
      under_verification: 'bg-purple-500',
      verified: 'bg-green-500',
      rejected: 'bg-red-500',
      selected: 'bg-indigo-500',
      allotted: 'bg-teal-500',
      possession: 'bg-emerald-500',
    };
    return colors[status || 'draft'] || 'bg-gray-500';
  };

  if (!user) {
    return <div className="container mx-auto px-4 py-12 text-center">{t('common.loading')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#0F1F3F' }}>
        {t('user.dashboard.welcome')} {user.name || 'User'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F1F3F' }}>
            {t('user.dashboard.applicationStatus')}
          </h3>
          {application ? (
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-white text-sm ${getStatusColor(
                  application.status
                )}`}
              >
                {t(`status.${application.status?.replace('_', '') || 'draft'}`)}
              </span>
            </div>
          ) : (
            <p style={{ color: '#4B5563' }}>{t('user.dashboard.noApplication')}</p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F1F3F' }}>
            {t('user.dashboard.quickActions')}
          </h3>
          <div className="space-y-2">
            {!application && (
              <Link href="/user/eligibility">
                <Button fullWidth size="sm">{t('user.dashboard.checkEligibility')}</Button>
              </Link>
            )}
            {!application && (
              <Link href="/user/application">
                <Button fullWidth size="sm" variant="secondary">{t('user.dashboard.startApplication')}</Button>
              </Link>
            )}
            {application && (
              <Link href="/user/application/status">
                <Button fullWidth size="sm">{t('user.dashboard.viewStatus')}</Button>
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F1F3F' }}>
            {t('user.dashboard.profile')}
          </h3>
          <Link href="/user/profile">
            <Button fullWidth size="sm" variant="outline">{t('user.dashboard.editProfile')}</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
          {t('user.dashboard.applicationFlow')}
        </h2>
        <div className="space-y-4">
          <Link href="/user/eligibility">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <span style={{ color: '#4B5563' }}>{t('user.dashboard.step1')}</span>
              <Button size="sm" variant="outline">{t('user.dashboard.go')}</Button>
            </div>
          </Link>
          <Link href="/user/application">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <span style={{ color: '#4B5563' }}>{t('user.dashboard.step2')}</span>
              <Button size="sm" variant="outline">{t('user.dashboard.go')}</Button>
            </div>
          </Link>
          <Link href="/user/documents">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <span style={{ color: '#4B5563' }}>{t('user.dashboard.step3')}</span>
              <Button size="sm" variant="outline">{t('user.dashboard.go')}</Button>
            </div>
          </Link>
          <Link href="/user/payment">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <span style={{ color: '#4B5563' }}>{t('user.dashboard.step4')}</span>
              <Button size="sm" variant="outline">{t('user.dashboard.go')}</Button>
            </div>
          </Link>
          <Link href="/user/application/status">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <span style={{ color: '#4B5563' }}>{t('user.dashboard.step5')}</span>
              <Button size="sm" variant="outline">{t('user.dashboard.go')}</Button>
            </div>
          </Link>
          <Link href="/user/lottery-results">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <span style={{ color: '#4B5563' }}>{t('user.dashboard.step6')}</span>
              <Button size="sm" variant="outline">{t('user.dashboard.go')}</Button>
            </div>
          </Link>
          <Link href="/user/allotment">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <span style={{ color: '#4B5563' }}>{t('user.dashboard.step7')}</span>
              <Button size="sm" variant="outline">{t('user.dashboard.go')}</Button>
            </div>
          </Link>
          <Link href="/user/refund-status">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <span style={{ color: '#4B5563' }}>{t('user.dashboard.step8')}</span>
              <Button size="sm" variant="outline">{t('user.dashboard.go')}</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
