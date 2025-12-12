'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { adminStorage } from '@/utils/localStorage';
import { ApplicationStatus } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { initializeAdminMockData } from '@/utils/adminMockData';

export default function ApplicationsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [filter, setFilter] = useState<ApplicationStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    // Initialize mock data if not exists
    initializeAdminMockData();

    const apps = adminStorage.getApplications();
    setApplications(apps);
  }, [router]);

  const filteredApps = applications.filter((app) => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = search === '' || 
      app.name?.toLowerCase().includes(search.toLowerCase()) ||
      app.id?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          {t('admin.applications.title')}
        </h1>
        <Link href="/admin/dashboard">
          <Button variant="outline">{t('status.backToDashboard')}</Button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label={t('common.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('admin.applications.search')}
          />
          <div>
            <label className="block text-sm font-medium mb-2">{t('admin.applications.filter')}</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">{t('admin.applications.all')}</option>
              <option value="submitted">{t('status.submitted')}</option>
              <option value="paid">{t('status.paid')}</option>
              <option value="under_verification">{t('status.underVerification')}</option>
              <option value="verified">{t('status.verified')}</option>
              <option value="rejected">{t('status.rejected')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead style={{ backgroundColor: '#F9FAFB' }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                {t('status.applicationId')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                {t('form.name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                {t('form.incomeCategory')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                {t('status.currentStatus')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                {t('common.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center" style={{ color: '#4B5563' }}>
                  {t('admin.applications.noFound')}
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#0F1F3F' }}>
                    {app.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#0F1F3F' }}>
                    {app.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#4B5563' }}>
                    {app.category || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-xs ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {t(`status.${app.status?.replace('_', '') || 'draft'}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link href={`/admin/applications/${app.id}`}>
                      <Button size="sm" variant="outline">{t('common.view')}</Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
