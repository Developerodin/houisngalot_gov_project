'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';
import { initializeAdminMockData } from '@/utils/adminMockData';
import { Application, ApplicationStatus, IncomeCategory } from '@/types';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ReportsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [showApplicationReport, setShowApplicationReport] = useState(false);
  const [showPaymentReport, setShowPaymentReport] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    // Initialize mock data if not exists
    initializeAdminMockData();

    const apps = adminStorage.getApplications();
    setApplications(apps);
  }, [router]);

  // Calculate application statistics
  const getApplicationStats = () => {
    const stats = {
      total: applications.length,
      byStatus: {} as Record<ApplicationStatus, number>,
      byCategory: {} as Record<IncomeCategory, number>,
      byCity: {} as Record<string, number>,
    };

    applications.forEach((app) => {
      // Count by status
      stats.byStatus[app.status] = (stats.byStatus[app.status] || 0) + 1;

      // Count by category
      stats.byCategory[app.category] = (stats.byCategory[app.category] || 0) + 1;

      // Count by city
      const city = app.city || 'Unknown';
      stats.byCity[city] = (stats.byCity[city] || 0) + 1;
    });

    return stats;
  };

  // Calculate payment statistics
  const getPaymentStats = () => {
    const paidApps = applications.filter((app) => 
      ['paid', 'under_verification', 'verified', 'selected', 'allotted', 'possession'].includes(app.status)
    );

    const paymentAmount = 500; // Application fee
    const totalAmount = paidApps.length * paymentAmount;
    const refundedAmount = applications.filter((app) => app.status === 'rejected').length * paymentAmount;

    return {
      totalPaid: paidApps.length,
      totalAmount,
      refundedAmount,
      netAmount: totalAmount - refundedAmount,
      byStatus: {
        paid: applications.filter((app) => app.status === 'paid').length,
        verified: applications.filter((app) => app.status === 'verified').length,
        rejected: applications.filter((app) => app.status === 'rejected').length,
      },
    };
  };

  // Calculate category-wise analytics
  const getCategoryAnalytics = () => {
    const analytics: Record<IncomeCategory, any> = {
      EWS: { count: 0, verified: 0, rejected: 0, avgIncome: 0, totalIncome: 0 },
      LIG: { count: 0, verified: 0, rejected: 0, avgIncome: 0, totalIncome: 0 },
      MIG: { count: 0, verified: 0, rejected: 0, avgIncome: 0, totalIncome: 0 },
      HIG: { count: 0, verified: 0, rejected: 0, avgIncome: 0, totalIncome: 0 },
    };

    applications.forEach((app) => {
      const cat = app.category;
      if (analytics[cat]) {
        analytics[cat].count++;
        analytics[cat].totalIncome += app.annualIncome || 0;
        if (app.status === 'verified') analytics[cat].verified++;
        if (app.status === 'rejected') analytics[cat].rejected++;
      }
    });

    // Calculate averages
    Object.keys(analytics).forEach((cat) => {
      const key = cat as IncomeCategory;
      analytics[key].avgIncome = 
        analytics[key].count > 0 
          ? Math.round(analytics[key].totalIncome / analytics[key].count) 
          : 0;
    });

    return analytics;
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'Application ID',
      'Name',
      'Category',
      'Status',
      'Annual Income',
      'City',
      'State',
      'Pincode',
      'Family Members',
      'Bank Name',
      'Created At',
    ];

    const rows = applications.map((app) => [
      app.id,
      app.name || 'N/A',
      app.category,
      app.status,
      app.annualIncome?.toString() || '0',
      app.city || 'N/A',
      app.state || 'N/A',
      app.pincode || 'N/A',
      app.familyMembers?.toString() || '0',
      app.bankName || 'N/A',
      new Date(app.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `applications_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const appStats = getApplicationStats();
  const paymentStats = getPaymentStats();
  const categoryAnalytics = getCategoryAnalytics();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0F1F3F' }}>
          Reports & Analytics
        </h1>
        <Link href="/admin/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
            Application Reports
          </h3>
          <p className="text-sm mb-4" style={{ color: '#4B5563' }}>
            View detailed statistics about all applications
          </p>
          <Button 
            fullWidth 
            variant="outline"
            onClick={() => setShowApplicationReport(!showApplicationReport)}
          >
            {showApplicationReport ? 'Hide' : 'Generate'} Application Report
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
            Payment Reports
          </h3>
          <p className="text-sm mb-4" style={{ color: '#4B5563' }}>
            View payment statistics and financial summaries
          </p>
          <Button 
            fullWidth 
            variant="outline"
            onClick={() => setShowPaymentReport(!showPaymentReport)}
          >
            {showPaymentReport ? 'Hide' : 'Generate'} Payment Report
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
            Category-wise Analytics
          </h3>
          <p className="text-sm mb-4" style={{ color: '#4B5563' }}>
            Analyze applications by income category (EWS, LIG, MIG, HIG)
          </p>
          <Button 
            fullWidth 
            variant="outline"
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            {showAnalytics ? 'Hide' : 'View'} Analytics
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
            Export Data
          </h3>
          <p className="text-sm mb-4" style={{ color: '#4B5563' }}>
            Download all application data as CSV file
          </p>
          <Button 
            fullWidth 
            variant="outline"
            onClick={exportToCSV}
          >
            Export to Excel (CSV)
          </Button>
        </div>
      </div>

      {/* Application Report Modal */}
      {showApplicationReport && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" style={{ color: '#0F1F3F' }}>
              Application Report
            </h2>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowApplicationReport(false)}
            >
              Close
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm" style={{ color: '#4B5563' }}>Total Applications</p>
              <p className="text-2xl font-bold text-blue-600">{appStats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm" style={{ color: '#4B5563' }}>Verified</p>
              <p className="text-2xl font-bold text-green-600">
                {appStats.byStatus.verified || 0}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm" style={{ color: '#4B5563' }}>Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {appStats.byStatus.rejected || 0}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Status Breakdown Pie Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#0F1F3F' }}>
                Status Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(appStats.byStatus)
                      .filter(([_, count]) => count > 0)
                      .map(([status, count]) => ({
                        name: status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        value: count,
                      }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(appStats.byStatus)
                      .filter(([_, count]) => count > 0)
                      .map((_, index) => {
                        const colors = ['#3B82F6', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#6366F1'];
                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                      })}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Breakdown Bar Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#0F1F3F' }}>
                Category Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={Object.entries(appStats.byCategory).map(([category, count]) => ({
                    name: category,
                    count: count,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* City Breakdown Bar Chart */}
          {Object.keys(appStats.byCity).length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#0F1F3F' }}>
                Applications by City
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={Object.entries(appStats.byCity)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 10)
                    .map(([city, count]) => ({
                      name: city,
                      Applications: count,
                    }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Applications" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Detailed Statistics Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#0F1F3F' }}>
                Status Details
              </h3>
              <div className="space-y-2">
                {Object.entries(appStats.byStatus)
                  .sort(([, a], [, b]) => b - a)
                  .map(([status, count]) => (
                    <div key={status} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="capitalize" style={{ color: '#4B5563' }}>
                        {status.replace('_', ' ')}
                      </span>
                      <span className="font-semibold" style={{ color: '#0F1F3F' }}>{count}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#0F1F3F' }}>
                Category Details
              </h3>
              <div className="space-y-2">
                {Object.entries(appStats.byCategory)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, count]) => (
                    <div key={category} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span style={{ color: '#4B5563' }}>{category}</span>
                      <span className="font-semibold" style={{ color: '#0F1F3F' }}>{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Report Modal */}
      {showPaymentReport && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" style={{ color: '#0F1F3F' }}>
              Payment Report
            </h2>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowPaymentReport(false)}
            >
              Close
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm" style={{ color: '#4B5563' }}>Total Paid</p>
              <p className="text-2xl font-bold text-blue-600">{paymentStats.totalPaid}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm" style={{ color: '#4B5563' }}>Total Amount</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{paymentStats.totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm" style={{ color: '#4B5563' }}>Refunded</p>
              <p className="text-2xl font-bold text-yellow-600">
                ₹{paymentStats.refundedAmount.toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm" style={{ color: '#4B5563' }}>Net Amount</p>
              <p className="text-2xl font-bold text-purple-600">
                ₹{paymentStats.netAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#0F1F3F' }}>
              Payment Status Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm" style={{ color: '#4B5563' }}>Paid (Pending Verification)</p>
                <p className="text-xl font-bold" style={{ color: '#0F1F3F' }}>
                  {paymentStats.byStatus.paid}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm" style={{ color: '#4B5563' }}>Verified</p>
                <p className="text-xl font-bold" style={{ color: '#0F1F3F' }}>
                  {paymentStats.byStatus.verified}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm" style={{ color: '#4B5563' }}>Rejected (Refunded)</p>
                <p className="text-xl font-bold" style={{ color: '#0F1F3F' }}>
                  {paymentStats.byStatus.rejected}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Analytics Modal */}
      {showAnalytics && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" style={{ color: '#0F1F3F' }}>
              Category-wise Analytics
            </h2>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowAnalytics(false)}
            >
              Close
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['EWS', 'LIG', 'MIG', 'HIG'] as IncomeCategory[]).map((category) => {
              const data = categoryAnalytics[category];
              return (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#0F1F3F' }}>
                    {category}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#4B5563' }}>Total</span>
                      <span className="font-semibold">{data.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#4B5563' }}>Verified</span>
                      <span className="font-semibold text-green-600">{data.verified}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#4B5563' }}>Rejected</span>
                      <span className="font-semibold text-red-600">{data.rejected}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#4B5563' }}>Avg Income</span>
                      <span className="font-semibold">₹{data.avgIncome.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#0F1F3F' }}>
              Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm" style={{ color: '#4B5563' }}>
                  Total Applications across all categories
                </p>
                <p className="text-2xl font-bold" style={{ color: '#0F1F3F' }}>
                  {Object.values(categoryAnalytics).reduce((sum, cat) => sum + cat.count, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm" style={{ color: '#4B5563' }}>
                  Total Verified across all categories
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {Object.values(categoryAnalytics).reduce((sum, cat) => sum + cat.verified, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
