'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { userStorage } from '@/utils/localStorage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function RefundStatusPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [application, setApplication] = useState<any>(null);
  const [refund, setRefund] = useState<any>(null);

  useEffect(() => {
    const auth = userStorage.getAuth();
    if (!auth) {
      router.push('/auth/login');
      return;
    }

    const app = userStorage.getApplication();
    if (!app || typeof app !== 'object' || !('status' in app) || !('id' in app)) {
      router.push('/user/dashboard');
      return;
    }

    setApplication(app);

    // Check if application was rejected and refund is due
    const appWithStatus = app as { status: string; id: string };
    if (appWithStatus.status === 'rejected') {
      const payments = userStorage.getPayments();
      const payment = payments.find((p: any) => p.applicationId === appWithStatus.id);
      
      if (payment && payment.status === 'completed') {
        setRefund({
          id: `refund_${app.id}`,
          applicationId: app.id,
          amount: payment.amount,
          status: 'processing', // or 'completed', 'pending'
          requestedAt: new Date().toISOString(),
          processedAt: null,
        });
      }
    }
  }, [router]);

  if (!application) {
    return <div className="container mx-auto px-4 py-12 text-center">{t('common.loading')}</div>;
  }

  if (!application || typeof application !== 'object' || !('status' in application) || (application as { status: string }).status !== 'rejected') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#0F1F3F' }}>
          {t('refund.title')}
        </h1>
        <p style={{ color: '#4B5563' }} className="mb-6">
          {t('refund.notEligible')}
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/user/application/status">
            <Button>{t('allotment.viewStatus')}</Button>
          </Link>
          <Link href="/user/dashboard">
            <Button variant="outline">{t('status.backToDashboard')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!refund) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#0F1F3F' }}>
          {t('refund.title')}
        </h1>
        <p style={{ color: '#4B5563' }} className="mb-6">
          {t('refund.noRecord')}
        </p>
        <Link href="/user/dashboard">
          <Button variant="outline">{t('status.backToDashboard')}</Button>
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'pending':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Refund Completed';
      case 'processing':
        return 'Processing Refund';
      case 'pending':
        return 'Refund Pending';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          Refund Status
        </h1>
        <Link href="/user/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#0F1F3F' }}>
          {t('refund.information')}
        </h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span style={{ color: '#4B5563' }}>{t('refund.status')}</span>
            <span className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${getStatusColor(refund.status)}`}>
              {getStatusText(refund.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm mb-1" style={{ color: '#4B5563' }}>{t('refund.refundId')}</p>
              <p className="font-semibold">{refund.id}</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: '#4B5563' }}>{t('status.applicationId')}</p>
              <p className="font-semibold">{refund.applicationId}</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: '#4B5563' }}>{t('refund.amount')}</p>
              <p className="font-bold text-2xl text-green-600">₹{refund.amount}</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: '#4B5563' }}>{t('refund.requestedAt')}</p>
              <p className="font-semibold">{new Date(refund.requestedAt).toLocaleDateString()}</p>
            </div>
            {refund.processedAt && (
              <div>
                <p className="text-sm mb-1" style={{ color: '#4B5563' }}>{t('refund.processedAt')}</p>
                <p className="font-semibold">{new Date(refund.processedAt).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Refund Timeline */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: '#0F1F3F' }}>
          {t('refund.timeline')}
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                ✓
              </div>
            </div>
            <div className="ml-4">
              <p className="font-semibold" style={{ color: '#0F1F3F' }}>{t('refund.applicationRejected')}</p>
              <p className="text-sm" style={{ color: '#4B5563' }}>
                {t('refund.rejectedDesc')}
              </p>
              <p className="text-xs mt-1" style={{ color: '#4B5563' }}>
                {new Date(application.verifiedAt || application.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                refund.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
              } text-white`}>
                {refund.status === 'completed' ? '✓' : '⏳'}
              </div>
            </div>
            <div className="ml-4">
              <p className="font-semibold" style={{ color: '#0F1F3F' }}>
                {refund.status === 'completed' ? t('refund.processed') : t('refund.processing')}
              </p>
              <p className="text-sm" style={{ color: '#4B5563' }}>
                {refund.status === 'completed' 
                  ? t('refund.creditedDesc')
                  : t('refund.processingDesc')}
              </p>
            </div>
          </div>

          {refund.status === 'completed' && (
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                  ✓
                </div>
              </div>
              <div className="ml-4">
                <p className="font-semibold" style={{ color: '#0F1F3F' }}>{t('refund.credited')}</p>
                <p className="text-sm" style={{ color: '#4B5563' }}>
                  Amount has been credited to your registered bank account
                </p>
                {refund.processedAt && (
                  <p className="text-xs mt-1" style={{ color: '#4B5563' }}>
                    {new Date(refund.processedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
          {t('refund.bankDetails')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm mb-1" style={{ color: '#4B5563' }}>{t('refund.accountNumber')}</p>
            <p className="font-semibold">{application.bankAccount || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm mb-1" style={{ color: '#4B5563' }}>{t('form.bankName')}</p>
            <p className="font-semibold">{application.bankName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm mb-1" style={{ color: '#4B5563' }}>{t('form.ifsc')}</p>
            <p className="font-semibold">{application.ifsc || 'N/A'}</p>
          </div>
        </div>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm" style={{ color: '#4B5563' }}>
            <strong>{t('common.view')}:</strong> {t('refund.bankNote')}
          </p>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <h3 className="font-semibold mb-2" style={{ color: '#0F1F3F' }}>
          {t('refund.needHelp')}
        </h3>
        <p className="text-sm mb-4" style={{ color: '#4B5563' }}>
          {t('refund.helpDesc')}
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" size="sm">{t('refund.contactSupport')}</Button>
          <Link href="/user/dashboard">
            <Button variant="outline" size="sm">{t('status.backToDashboard')}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
