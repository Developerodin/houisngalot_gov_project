'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LotteryResultsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [lottery, setLottery] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const lotteryData = adminStorage.getLottery();
    if (lotteryData && typeof lotteryData === 'object' && 'winners' in lotteryData) {
      setLottery(lotteryData);
      
      // Get application details for winners
      const allApps = adminStorage.getApplications();
      const lotteryWithWinners = lotteryData as { winners: string[] };
      const winnerApps = allApps.filter((app: any) => 
        lotteryWithWinners.winners.includes(app.id)
      );
      setApplications(winnerApps);
    }
  }, []);

  const maskPII = (text: string) => {
    if (!text) return 'N/A';
    if (text.length <= 4) return text;
    return text.substring(0, 2) + '****' + text.substring(text.length - 2);
  };

  const filteredWinners = applications.filter((app) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      app.id?.toLowerCase().includes(search) ||
      app.name?.toLowerCase().includes(search) ||
      app.category?.toLowerCase().includes(search)
    );
  });

  if (!lottery) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#0F1F3F' }}>
          {t('lottery.title')}
        </h1>
        <p style={{ color: '#4B5563' }} className="mb-6">
          {t('lottery.title')} {t('common.loading')}
        </p>
        <Link href="/user/dashboard">
          <Button variant="outline">{t('status.backToDashboard')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          {t('lottery.title')}
        </h1>
        <Link href="/user/dashboard">
          <Button variant="outline">{t('status.backToDashboard')}</Button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
          {t('lottery.information')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm" style={{ color: '#4B5563' }}>{t('lottery.id')}</p>
            <p className="font-semibold">{lottery.id}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: '#4B5563' }}>{t('lottery.conductedOn')}</p>
            <p className="font-semibold">{new Date(lottery.conductedAt).toLocaleString()}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm mb-2" style={{ color: '#4B5563' }}>{t('lottery.seedHash')}</p>
            <p className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
              {lottery.seedHash}
            </p>
            <p className="text-xs mt-1" style={{ color: '#4B5563' }}>
              {t('lottery.seedHashDesc')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold" style={{ color: '#0F1F3F' }}>
            {t('lottery.winnersList')} ({filteredWinners.length})
          </h2>
          <div className="w-64">
            <Input
              placeholder={t('lottery.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#F9FAFB' }}>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                  {t('lottery.rank')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                  {t('lottery.applicationId')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                  {t('lottery.nameMasked')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                  {t('lottery.category')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                  {t('lottery.status')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredWinners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center" style={{ color: '#4B5563' }}>
                    {t('lottery.noWinners')}
                  </td>
                </tr>
              ) : (
                filteredWinners.map((app, index) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-semibold text-lg" style={{ color: '#0F1F3F' }}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono" style={{ color: '#4B5563' }}>
                      {app.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm" style={{ color: '#4B5563' }}>
                      {maskPII(app.name)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm" style={{ color: '#4B5563' }}>
                      {app.category || 'N/A'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-block px-3 py-1 rounded-full text-white text-xs bg-green-500">
                        {t('status.selected')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold mb-2" style={{ color: '#0F1F3F' }}>
          {t('lottery.privacyNote')}
        </h3>
        <p className="text-sm" style={{ color: '#4B5563' }}>
          {t('lottery.privacyDesc')}
        </p>
      </div>
    </div>
  );
}
