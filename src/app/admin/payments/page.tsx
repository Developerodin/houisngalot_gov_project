'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';

export default function PaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    // Mock payments data
    const mockPayments = [
      {
        id: 'pay_1',
        applicationId: 'app_1',
        amount: 1000,
        status: 'completed',
        transactionId: 'TXN123456',
        paidAt: new Date().toISOString(),
      },
    ];
    setPayments(mockPayments);
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          Payment Console
        </h1>
        <Link href="/admin/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead style={{ backgroundColor: '#F9FAFB' }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Application ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center" style={{ color: '#4B5563' }}>
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono" style={{ color: '#0F1F3F' }}>
                    {payment.transactionId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#4B5563' }}>
                    {payment.applicationId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold" style={{ color: '#0F1F3F' }}>
                    ₹{payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-xs ${
                        payment.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                    >
                      {payment.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#4B5563' }}>
                    {new Date(payment.paidAt).toLocaleDateString()}
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
