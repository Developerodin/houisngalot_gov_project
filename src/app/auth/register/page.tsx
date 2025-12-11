'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { userStorage } from '@/utils/localStorage';
import { generateMockUser, generateMockUserProfile } from '@/utils/mockData';

export default function RegisterPage() {
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
          Register
        </h1>

        {step === 'mobile' && (
          <form onSubmit={handleMobileSubmit} className="space-y-4">
            <Input
              label="Mobile Number"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="9876543210"
              required
            />
            <Button type="submit" fullWidth bypass onBypass={handleBypass}>
              Send OTP
            </Button>
            <p className="text-center text-sm" style={{ color: '#4B5563' }}>
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <Input
              label="Enter OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              required
            />
            <Button type="submit" fullWidth bypass onBypass={handleBypass}>
              Verify OTP
            </Button>
            <button
              type="button"
              onClick={() => setStep('mobile')}
              className="text-sm text-blue-600 hover:underline w-full text-center"
            >
              Change Mobile Number
            </button>
          </form>
        )}

        {step === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Create Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" fullWidth bypass onBypass={handleBypass}>
              Create Account
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
