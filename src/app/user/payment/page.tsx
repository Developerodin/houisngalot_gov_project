'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import { userStorage } from '@/utils/localStorage';
import { generateMockPayment } from '@/utils/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PaymentPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [application, setApplication] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');

  useEffect(() => {
    const app = userStorage.getApplication();
    if (!app) {
      router.push('/user/application');
      return;
    }
    setApplication(app);
  }, [router]);

  const handleBypass = () => {
    const app = userStorage.getApplication();
    if (!app || typeof app !== 'object' || !('id' in app)) return;

    const appWithId = app as { id: string };
    const payment = generateMockPayment(appWithId.id, 1000);
    userStorage.addPayment(payment);
    
    const updatedApp = { ...app, status: 'paid', paidAt: new Date().toISOString() };
    userStorage.setApplication(updatedApp);
    
    router.push('/user/application/status');
  };

  const handlePayment = () => {
    setPaymentStatus('processing');
    
    setTimeout(() => {
      const app = userStorage.getApplication();
      if (!app || typeof app !== 'object' || !('id' in app)) return;

      const appWithId = app as { id: string };
      const payment = generateMockPayment(appWithId.id, 1000);
      userStorage.addPayment(payment);
      
      const updatedApp = { ...app, status: 'paid', paidAt: new Date().toISOString() };
      userStorage.setApplication(updatedApp);
      
      setPaymentStatus('completed');
      
      setTimeout(() => {
        router.push('/user/application/status');
      }, 2000);
    }, 2000);
  };

  if (!application) {
    return <div className="container mx-auto px-4 py-12 text-center">{t('common.loading')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#0F1F3F' }}>
        {t('payment.title')}
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-8">
        {paymentStatus === 'pending' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">{t('payment.title')} {t('common.view')}</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span style={{ color: '#4B5563' }}>{t('payment.amount')}:</span>
                  <span className="font-semibold">₹1,000</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold" style={{ color: '#0F1F3F' }}>{t('payment.total')}:</span>
                  <span className="font-bold text-xl">₹1,000</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">{t('info.fees.payment')}</h3>
              <div className="space-y-2">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" value="card" className="mr-3" defaultChecked />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" value="netbanking" className="mr-3" />
                  <span>Net Banking</span>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" value="upi" className="mr-3" />
                  <span>UPI</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => router.push('/user/documents')}
                variant="outline"
                fullWidth
              >
                {t('common.back')}
              </Button>
              <Button onClick={handlePayment} fullWidth bypass onBypass={handleBypass}>
                {t('payment.payNow')} ₹1,000
              </Button>
            </div>
          </>
        )}

        {paymentStatus === 'processing' && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-medium" style={{ color: '#0F1F3F' }}>
              {t('payment.processing')}
            </p>
          </div>
        )}

        {paymentStatus === 'completed' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">{t('payment.completed')}</h2>
            <p style={{ color: '#4B5563' }}>{t('payment.redirecting')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
