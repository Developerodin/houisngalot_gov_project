'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { userStorage, adminStorage } from '@/utils/localStorage';
import { generateMockApplication } from '@/utils/mockData';

const TOTAL_STEPS = 8;

export default function ApplicationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const saved = userStorage.getApplication();
    if (saved) {
      setFormData(saved);
    }
  }, []);

  const handleBypass = () => {
    const auth = userStorage.getAuth();
    if (!auth) {
      router.push('/auth/login');
      return;
    }

    const mockApp = generateMockApplication(auth.user.id, 'scheme_1');
    const finalApp = {
      ...mockApp,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    userStorage.setApplication(finalApp);
    // Sync to admin storage
    adminStorage.addApplication(finalApp);
    router.push('/user/documents');
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    userStorage.setApplication({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    userStorage.setApplication(finalData);
    // Sync to admin storage
    adminStorage.addApplication(finalData);
    router.push('/user/documents');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Identity Details</h2>
            <Input
              label="Full Name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
            <Input
              label="Aadhaar Number"
              value={formData.aadhaar || ''}
              onChange={(e) => handleChange('aadhaar', e.target.value)}
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dob || ''}
              onChange={(e) => handleChange('dob', e.target.value)}
              required
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Residence Details</h2>
            <Input
              label="Address"
              value={formData.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              required
            />
            <Input
              label="City"
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              required
            />
            <Input
              label="State"
              value={formData.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
              required
            />
            <Input
              label="Pincode"
              value={formData.pincode || ''}
              onChange={(e) => handleChange('pincode', e.target.value)}
              required
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Family Details</h2>
            <Input
              label="Number of Family Members"
              type="number"
              value={formData.familyMembers || ''}
              onChange={(e) => handleChange('familyMembers', e.target.value)}
              required
            />
            <Input
              label="Number of Dependents"
              type="number"
              value={formData.dependents || ''}
              onChange={(e) => handleChange('dependents', e.target.value)}
              required
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Income Details</h2>
            <Input
              label="Annual Income (₹)"
              type="number"
              value={formData.annualIncome || ''}
              onChange={(e) => handleChange('annualIncome', e.target.value)}
              required
            />
            <div>
              <label className="block text-sm font-medium mb-2">Income Category</label>
              <select
                value={formData.category || ''}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Category</option>
                <option value="EWS">EWS</option>
                <option value="LIG">LIG</option>
                <option value="MIG">MIG</option>
                <option value="HIG">HIG</option>
              </select>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
            <Input
              label="Bank Account Number"
              value={formData.bankAccount || ''}
              onChange={(e) => handleChange('bankAccount', e.target.value)}
              required
            />
            <Input
              label="IFSC Code"
              value={formData.ifsc || ''}
              onChange={(e) => handleChange('ifsc', e.target.value)}
              required
            />
            <Input
              label="Bank Name"
              value={formData.bankName || ''}
              onChange={(e) => handleChange('bankName', e.target.value)}
              required
            />
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Special Categories</h2>
            <div className="space-y-2">
              {['EWS', 'LIG', 'MIG', 'HIG'].map((cat) => (
                <label key={cat} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData[`is${cat}`] || false}
                    onChange={(e) => handleChange(`is${cat}`, e.target.checked)}
                    className="mr-2"
                  />
                  <span style={{ color: '#4B5563' }}>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Declarations</h2>
            <div className="space-y-4">
              <label className="flex items-start">
                <input type="checkbox" required className="mt-1 mr-2" />
                <span style={{ color: '#4B5563' }}>
                  I declare that all information provided is true and correct.
                </span>
              </label>
              <label className="flex items-start">
                <input type="checkbox" required className="mt-1 mr-2" />
                <span style={{ color: '#4B5563' }}>
                  I understand that false information may lead to rejection.
                </span>
              </label>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Category:</strong> {formData.category}</p>
              <p><strong>Income:</strong> ₹{formData.annualIncome}</p>
              <p><strong>City:</strong> {formData.city}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#0F1F3F' }}>
        Application Form
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of {TOTAL_STEPS}</span>
            <span className="text-sm" style={{ color: '#4B5563' }}>
              {Math.round((step / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}

        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button onClick={handleBack} variant="outline" fullWidth>
              Back
            </Button>
          )}
          {step < TOTAL_STEPS ? (
            <Button onClick={handleNext} fullWidth bypass onBypass={handleBypass}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} fullWidth bypass onBypass={handleBypass}>
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
