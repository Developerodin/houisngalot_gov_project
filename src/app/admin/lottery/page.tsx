'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';

export default function LotteryPage() {
  const router = useRouter();
  const [lottery, setLottery] = useState<any>(null);
  const [winners, setWinners] = useState<string[]>([]);

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    const lotteryData = adminStorage.getLottery();
    setLottery(lotteryData);
    if (lotteryData && typeof lotteryData === 'object' && 'winners' in lotteryData) {
      setWinners(Array.isArray(lotteryData.winners) ? lotteryData.winners : []);
    }
  }, [router]);

  const handleRunLottery = () => {
    const applications = adminStorage.getApplications();
    const verified = applications.filter((app: any) => app.status === 'verified');
    
    // Mock lottery - randomly select 10 winners
    const selected = verified
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(10, verified.length))
      .map((app: any) => app.id);

    const lotteryData = {
      id: `lottery_${Date.now()}`,
      schemeId: 'scheme_1',
      conductedAt: new Date().toISOString(),
      seedHash: `hash_${Math.random().toString(36).substr(2, 9)}`,
      winners: selected,
    };

    adminStorage.setLottery(lotteryData);
    setLottery(lotteryData);
    setWinners(selected);

    // Update application statuses
    selected.forEach((appId: string) => {
      adminStorage.updateApplication(appId, { status: 'selected' });
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
                {winners.map((winnerId, index) => (
                  <div key={winnerId} className="py-2 border-b last:border-b-0">
                    {index + 1}. {winnerId}
                  </div>
                ))}
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
