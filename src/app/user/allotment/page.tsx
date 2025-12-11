'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { userStorage, adminStorage } from '@/utils/localStorage';

export default function AllotmentPage() {
  const router = useRouter();
  const [allotment, setAllotment] = useState<any>(null);
  const [application, setApplication] = useState<any>(null);

  useEffect(() => {
    const auth = userStorage.getAuth();
    if (!auth) {
      router.push('/auth/login');
      return;
    }

    const app = userStorage.getApplication();
    if (!app) {
      router.push('/user/dashboard');
      return;
    }

    setApplication(app);

    // Check if user has an allotment
    const allotments = adminStorage.getAllotments();
    const userAllotment = allotments.find((a: any) => a.applicationId === app.id);
    
    if (userAllotment) {
      setAllotment(userAllotment);
    }
  }, [router]);

  if (!application) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  if (!allotment) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#0F1F3F' }}>
          Allotment Status
        </h1>
        <p style={{ color: '#4B5563' }} className="mb-6">
          Your application has not been allotted yet. Please check back later or view your 
          application status for updates.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/user/application/status">
            <Button>View Application Status</Button>
          </Link>
          <Link href="/user/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          Allotment Letter
        </h1>
        <Button onClick={() => window.print()} variant="outline">
          Print / Download
        </Button>
      </div>

      {/* Allotment Letter */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-6 border-2 border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#0F1F3F' }}>
            ALLOTMENT LETTER
          </h2>
          <p className="text-lg" style={{ color: '#4B5563' }}>
            Affordable Housing Scheme 2024
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Allotment ID</p>
            <p className="font-semibold text-lg">{allotment.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Application ID</p>
              <p className="font-semibold">{allotment.applicationId}</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Plot Number</p>
              <p className="font-semibold text-xl text-blue-600">{allotment.plotNumber}</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Allotment Date</p>
              <p className="font-semibold">{new Date(allotment.allotmentDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Status</p>
              <span className="inline-block px-3 py-1 rounded-full text-white text-sm bg-green-500">
                {allotment.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
              Applicant Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Name</p>
                <p className="font-semibold">{application.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Category</p>
                <p className="font-semibold">{application.category || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Address</p>
                <p className="font-semibold">{application.address || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: '#4B5563' }}>City</p>
                <p className="font-semibold">{application.city || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Schedule */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
          Payment Schedule
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold" style={{ color: '#0F1F3F' }}>Initial Payment</p>
              <p className="text-sm" style={{ color: '#4B5563' }}>Due within 30 days</p>
            </div>
            <p className="font-bold text-lg">₹50,000</p>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold" style={{ color: '#0F1F3F' }}>Second Installment</p>
              <p className="text-sm" style={{ color: '#4B5563' }}>Due within 90 days</p>
            </div>
            <p className="font-bold text-lg">₹50,000</p>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold" style={{ color: '#0F1F3F' }}>Final Payment</p>
              <p className="text-sm" style={{ color: '#4B5563' }}>Due before possession</p>
            </div>
            <p className="font-bold text-lg">₹1,00,000</p>
          </div>
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div>
              <p className="font-semibold" style={{ color: '#0F1F3F' }}>Total Plot Cost</p>
            </div>
            <p className="font-bold text-xl text-blue-600">₹2,00,000</p>
          </div>
        </div>
      </div>

      {/* Possession Details */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
          Possession Details
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Expected Possession Date</p>
            <p className="font-semibold text-lg">
              {allotment.possessionDate 
                ? new Date(allotment.possessionDate).toLocaleDateString()
                : 'To be announced after final payment'}
            </p>
          </div>
          <div>
            <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Location</p>
            <p className="font-semibold">Housing Development Area, Sector 5</p>
            <p className="text-sm" style={{ color: '#4B5563' }}>
              Plot Size: 500 sq. ft. | Type: Residential
            </p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-semibold mb-1" style={{ color: '#0F1F3F' }}>
              Important Instructions:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside" style={{ color: '#4B5563' }}>
              <li>Complete all payments as per schedule to avoid cancellation</li>
              <li>Submit required documents for possession</li>
              <li>Contact office for any queries or clarifications</li>
              <li>Keep this allotment letter safe for future reference</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/user/dashboard">
          <Button variant="outline" fullWidth>Back to Dashboard</Button>
        </Link>
        <Button fullWidth>Make Payment</Button>
      </div>
    </div>
  );
}
