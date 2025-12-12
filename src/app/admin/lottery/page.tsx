'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';
import { initializeAdminMockData } from '@/utils/adminMockData';

export default function LotteryPage() {
  const router = useRouter();
  const [lottery, setLottery] = useState<any>(null);
  const [winners, setWinners] = useState<any[]>([]);

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    // Initialize mock data if not exists
    initializeAdminMockData();

    const lotteryData = adminStorage.getLottery();
    setLottery(lotteryData);
    if (lotteryData && typeof lotteryData === 'object' && 'winners' in lotteryData) {
      const winnerIds = Array.isArray(lotteryData.winners) ? lotteryData.winners : [];
      const applications = adminStorage.getApplications();
      const winnerApps = winnerIds.map((id: string) => 
        applications.find((app: any) => app.id === id)
      ).filter(Boolean);
      setWinners(winnerApps);
    }
  }, [router]);

  const handleRunLottery = () => {
    const applications = adminStorage.getApplications();
    const verified = applications.filter((app: any) => app.status === 'verified');
    
    if (verified.length === 0) {
      alert('No verified applications available for lottery. Please verify some applications first.');
      return;
    }
    
    // Mock lottery - randomly select up to 10 winners
    const selectedApps = verified
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(10, verified.length));
    
    const selectedIds = selectedApps.map((app: any) => app.id);

    const lotteryData = {
      id: `lottery_${Date.now()}`,
      schemeId: 'scheme_1',
      conductedAt: new Date().toISOString(),
      seedHash: `hash_${Math.random().toString(36).substr(2, 9)}`,
      winners: selectedIds,
    };

    adminStorage.setLottery(lotteryData);
    setLottery(lotteryData);
    setWinners(selectedApps);

    // Update application statuses
    selectedIds.forEach((appId: string) => {
      adminStorage.updateApplication(appId, { status: 'selected', updatedAt: new Date().toISOString() });
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          Lottery Management
        </h1>
        <Link href="/admin/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Lottery Configuration</h2>
        {!lottery ? (
          <div>
            <p className="mb-4" style={{ color: '#4B5563' }}>
              No lottery has been conducted yet. Click the button below to run the lottery.
            </p>
            <Button onClick={handleRunLottery} size="lg">
              Run Lottery
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm" style={{ color: '#4B5563' }}>Lottery ID</p>
              <p className="font-semibold">{lottery.id}</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: '#4B5563' }}>Conducted At</p>
              <p className="font-semibold">{new Date(lottery.conductedAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: '#4B5563' }}>Seed Hash</p>
              <p className="font-semibold font-mono text-sm">{lottery.seedHash}</p>
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: '#4B5563' }}>Winners ({winners.length})</p>
              <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                {winners.length === 0 ? (
                  <p className="text-sm" style={{ color: '#4B5563' }}>No winners found</p>
                ) : (
                  winners.map((winner, index) => (
                    <div key={winner.id} className="py-2 border-b last:border-b-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{index + 1}. {winner.name || 'N/A'}</p>
                          <p className="text-sm" style={{ color: '#4B5563' }}>
                            {winner.id} • {winner.category} • {winner.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <Button onClick={handleRunLottery} variant="outline">
              Re-run Lottery
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
