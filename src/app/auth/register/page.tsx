'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { userStorage } from '@/utils/localStorage';
import { generateMockUser, generateMockUserProfile } from '@/utils/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

export default function RegisterPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [step, setStep] = useState<'mobile' | 'otp' | 'password'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleBypass = () => {
    const mockUser = generateMockUser();
    const mockProfile = generateMockUserProfile(mockUser.id);
    
    userStorage.setAuth({ user: mockUser, token: 'mock_token' });
    userStorage.setProfile(mockProfile);
    
    router.push('/user/dashboard');
  };

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock OTP - just move to next step
    setStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('password');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const mockUser = generateMockUser();
    const mockProfile = generateMockUserProfile(mockUser.id);
    
    userStorage.setAuth({ user: mockUser, token: 'mock_token' });
    userStorage.setProfile(mockProfile);
    
    router.push('/user/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#0F1F3F' }}>
          {t('auth.register.title')}
        </h1>

        {step === 'mobile' && (
          <form onSubmit={handleMobileSubmit} className="space-y-4">
            <Input
              label={t('auth.register.mobile')}
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder={t('auth.register.mobilePlaceholder')}
              required
            />
            <Button type="submit" fullWidth bypass onBypass={handleBypass}>
              {t('auth.register.sendOtp')}
            </Button>
            <p className="text-center text-sm" style={{ color: '#4B5563' }}>
              {t('auth.register.haveAccount')}{' '}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                {t('auth.login.title')}
              </Link>
            </p>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <Input
              label={t('auth.register.enterOtp')}
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder={t('auth.register.otpPlaceholder')}
              required
            />
            <Button type="submit" fullWidth bypass onBypass={handleBypass}>
              {t('auth.register.verifyOtp')}
            </Button>
            <button
              type="button"
              onClick={() => setStep('mobile')}
              className="text-sm text-blue-600 hover:underline w-full text-center"
            >
              {t('auth.register.changeMobile')}
            </button>
          </form>
        )}

        {step === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label={t('auth.register.createPassword')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label={t('auth.register.confirmPassword')}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" fullWidth bypass onBypass={handleBypass}>
              {t('auth.register.createAccount')}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
