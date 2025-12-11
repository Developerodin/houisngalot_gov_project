'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';

export default function SchemesPage() {
  const router = useRouter();
  const [schemes, setSchemes] = useState<any[]>([]);

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    const schemesData = adminStorage.getSchemes();
    if (schemesData.length === 0) {
      // Add default scheme
      const defaultScheme = {
        id: 'scheme_1',
        name: 'Affordable Housing Scheme 2024',
        description: 'Government housing scheme for eligible citizens',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        applicationFee: 1000,
        eligibilityCriteria: 'Annual income below 5 Lakhs',
        active: true,
      };
      adminStorage.setSchemes([defaultScheme]);
      setSchemes([defaultScheme]);
    } else {
      setSchemes(schemesData);
    }
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          Manage Schemes
        </h1>
        <div className="flex gap-2">
          <Button>Create New Scheme</Button>
          <Link href="/admin/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#0F1F3F' }}>
              {scheme.name}
            </h3>
            <p className="mb-4" style={{ color: '#4B5563' }}>
              {scheme.description}
            </p>
            <div className="space-y-2 text-sm mb-4">
              <p><strong>Application Fee:</strong> ₹{scheme.applicationFee}</p>
              <p><strong>Start Date:</strong> {new Date(scheme.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(scheme.endDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {scheme.active ? 'Active' : 'Inactive'}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Edit</Button>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
