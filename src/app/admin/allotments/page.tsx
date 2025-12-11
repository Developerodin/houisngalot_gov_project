'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';

export default function AllotmentsPage() {
  const router = useRouter();
  const [allotments, setAllotments] = useState<any[]>([]);

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    const allotmentsData = adminStorage.getAllotments();
    setAllotments(allotmentsData);
  }, [router]);

  const handleCreateAllotment = () => {
    const lottery = adminStorage.getLottery();
    if (!lottery || lottery.winners.length === 0) {
      alert('No lottery winners found. Please run lottery first.');
      return;
    }

    const newAllotments = lottery.winners.map((appId: string, index: number) => ({
      id: `allot_${Date.now()}_${index}`,
      applicationId: appId,
      lotteryId: lottery.id,
      plotNumber: `PLOT-${String(index + 1).padStart(4, '0')}`,
      allotmentDate: new Date().toISOString(),
      status: 'allotted',
    }));

    adminStorage.setAllotments(newAllotments);
    setAllotments(newAllotments);

    // Update application statuses
    newAllotments.forEach((allotment: any) => {
      adminStorage.updateApplication(allotment.applicationId, { status: 'allotted' });
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          Allotments
        </h1>
        <Link href="/admin/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <Button onClick={handleCreateAllotment} size="lg">
          Generate Allotments from Lottery Winners
        </Button>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead style={{ backgroundColor: '#F9FAFB' }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Plot Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Application ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Allotment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allotments.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center" style={{ color: '#4B5563' }}>
                  No allotments found. Generate allotments from lottery winners.
                </td>
              </tr>
            ) : (
              allotments.map((allotment) => (
                <tr key={allotment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold" style={{ color: '#0F1F3F' }}>
                    {allotment.plotNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#4B5563' }}>
                    {allotment.applicationId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#4B5563' }}>
                    {new Date(allotment.allotmentDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-block px-3 py-1 rounded-full text-white text-xs bg-green-500">
                      {allotment.status.toUpperCase()}
                    </span>
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
