'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { adminStorage } from '@/utils/localStorage';
import { ApplicationStatus } from '@/types';

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [filter, setFilter] = useState<ApplicationStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    const apps = adminStorage.getApplications();
    setApplications(apps);
  }, [router]);

  const filteredApps = applications.filter((app) => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = search === '' || 
      app.name?.toLowerCase().includes(search.toLowerCase()) ||
      app.id?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status?: ApplicationStatus) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-500',
      submitted: 'bg-yellow-500',
      paid: 'bg-blue-500',
      under_verification: 'bg-purple-500',
      verified: 'bg-green-500',
      rejected: 'bg-red-500',
      selected: 'bg-indigo-500',
      allotted: 'bg-teal-500',
      possession: 'bg-emerald-500',
    };
    return colors[status || 'draft'] || 'bg-gray-500';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          Applications
        </h1>
        <Link href="/admin/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or ID..."
          />
          <div>
            <label className="block text-sm font-medium mb-2">Filter by Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All</option>
              <option value="submitted">Submitted</option>
              <option value="paid">Paid</option>
              <option value="under_verification">Under Verification</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead style={{ backgroundColor: '#F9FAFB' }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Application ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#4B5563' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center" style={{ color: '#4B5563' }}>
                  No applications found
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#0F1F3F' }}>
                    {app.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#0F1F3F' }}>
                    {app.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#4B5563' }}>
                    {app.category || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-xs ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status?.replace('_', ' ').toUpperCase() || 'DRAFT'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link href={`/admin/applications/${app.id}`}>
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
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
