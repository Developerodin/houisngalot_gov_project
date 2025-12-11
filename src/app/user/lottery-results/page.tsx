'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';

export default function LotteryResultsPage() {
  const router = useRouter();
  const [lottery, setLottery] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const lotteryData = adminStorage.getLottery();
    if (lotteryData) {
      setLottery(lotteryData);
      
      // Get application details for winners
      const allApps = adminStorage.getApplications();
      const winnerApps = allApps.filter((app: any) => 
        lotteryData.winners.includes(app.id)
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
          Lottery Results
        </h1>
        <p style={{ color: '#4B5563' }} className="mb-6">
          Lottery has not been conducted yet. Results will be published here once the lottery is completed.
        </p>
        <Link href="/user/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          Lottery Results
        </h1>
        <Link href="/user/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
          Lottery Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm" style={{ color: '#4B5563' }}>Lottery ID</p>
            <p className="font-semibold">{lottery.id}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: '#4B5563' }}>Conducted On</p>
            <p className="font-semibold">{new Date(lottery.conductedAt).toLocaleString()}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm mb-2" style={{ color: '#4B5563' }}>Seed Hash (for verification)</p>
            <p className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
              {lottery.seedHash}
            </p>
            <p className="text-xs mt-1" style={{ color: '#4B5563' }}>
              This hash can be used to verify the integrity of the lottery results
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold" style={{ color: '#0F1F3F' }}>
            Winners List ({filteredWinners.length})
          </h2>
          <div className="w-64">
            <Input
              placeholder="Search by Application ID or Name..."
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
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                  Application ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                  Name (Masked)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredWinners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center" style={{ color: '#4B5563' }}>
                    No winners found
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
                        SELECTED
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
          Note on Privacy
        </h3>
        <p className="text-sm" style={{ color: '#4B5563' }}>
          Personal Identifiable Information (PII) has been masked in the public results 
          to protect privacy. Selected applicants will be notified individually and can 
          view their full details in their dashboard.
        </p>
      </div>
    </div>
  );
}
