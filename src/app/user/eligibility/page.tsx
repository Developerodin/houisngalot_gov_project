'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { userStorage } from '@/utils/localStorage';

export default function EligibilityPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [hasProperty, setHasProperty] = useState('');
  const [eligible, setEligible] = useState<boolean | null>(null);

  const handleBypass = () => {
    // Mark as eligible and proceed
    router.push('/user/application');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple eligibility check
    const ageNum = parseInt(age);
    const incomeNum = parseInt(income);
    
    if (ageNum >= 18 && incomeNum < 500000 && hasProperty === 'no') {
      setEligible(true);
      setTimeout(() => {
        router.push('/user/application');
      }, 2000);
    } else {
      setEligible(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#0F1F3F' }}>
        Eligibility Checker
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-8">
        {eligible === null ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
                Step {step} of 3
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <Input
                  label="Age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  required
                />
                <Button type="button" onClick={() => setStep(2)} fullWidth bypass onBypass={handleBypass}>
                  Next
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Input
                  label="Annual Income (₹)"
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="300000"
                  required
                />
                <div className="flex gap-4">
                  <Button type="button" onClick={() => setStep(1)} variant="outline" fullWidth>
                  Back
                </Button>
                <Button type="button" onClick={() => setStep(3)} fullWidth bypass onBypass={handleBypass}>
                  Next
                </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0F1F3F' }}>
                    Do you own any property?
                  </label>
                  <select
                    value={hasProperty}
                    onChange={(e) => setHasProperty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <Button type="button" onClick={() => setStep(2)} variant="outline" fullWidth>
                    Back
                  </Button>
                  <Button type="submit" fullWidth bypass onBypass={handleBypass}>
                    Check Eligibility
                  </Button>
                </div>
              </div>
            )}
          </form>
        ) : eligible ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">You are Eligible!</h2>
            <p style={{ color: '#4B5563' }}>Redirecting to application form...</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold mb-2 text-red-600">Not Eligible</h2>
            <p style={{ color: '#4B5563' }} className="mb-4">
              Based on your inputs, you may not be eligible for this scheme.
            </p>
            <Button onClick={() => { setEligible(null); setStep(1); }} variant="outline">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
