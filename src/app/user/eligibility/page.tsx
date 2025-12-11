'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { userStorage } from '@/utils/localStorage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EligibilityPage() {
  const { t } = useLanguage();
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
        {t('eligibility.checker.title')}
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-8">
        {eligible === null ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#0F1F3F' }}>
                {t('eligibility.checker.step')} {step} {t('eligibility.checker.of')} 3
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
                  label={t('eligibility.checker.age')}
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={t('eligibility.checker.agePlaceholder')}
                  required
                />
                <Button type="button" onClick={() => setStep(2)} fullWidth bypass onBypass={handleBypass}>
                  {t('eligibility.checker.next')}
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Input
                  label={t('eligibility.checker.annualIncome')}
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder={t('eligibility.checker.incomePlaceholder')}
                  required
                />
                <div className="flex gap-4">
                  <Button type="button" onClick={() => setStep(1)} variant="outline" fullWidth>
                  {t('eligibility.checker.back')}
                </Button>
                <Button type="button" onClick={() => setStep(3)} fullWidth bypass onBypass={handleBypass}>
                  {t('eligibility.checker.next')}
                </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0F1F3F' }}>
                    {t('eligibility.checker.ownProperty')}
                  </label>
                  <select
                    value={hasProperty}
                    onChange={(e) => setHasProperty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">{t('eligibility.checker.select')}</option>
                    <option value="yes">{t('eligibility.checker.yes')}</option>
                    <option value="no">{t('eligibility.checker.no')}</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <Button type="button" onClick={() => setStep(2)} variant="outline" fullWidth>
                    {t('eligibility.checker.back')}
                  </Button>
                  <Button type="submit" fullWidth bypass onBypass={handleBypass}>
                    {t('eligibility.checker.check')}
                  </Button>
                </div>
              </div>
            )}
          </form>
        ) : eligible ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">{t('eligibility.checker.eligible')}</h2>
            <p style={{ color: '#4B5563' }}>{t('eligibility.checker.redirecting')}</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold mb-2 text-red-600">{t('eligibility.checker.notEligible')}</h2>
            <p style={{ color: '#4B5563' }} className="mb-4">
              {t('eligibility.checker.notEligibleDesc')}
            </p>
            <Button onClick={() => { setEligible(null); setStep(1); }} variant="outline">
              {t('eligibility.checker.tryAgain')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
