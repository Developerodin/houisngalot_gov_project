'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { userStorage } from '@/utils/localStorage';
import { generateMockUser, generateMockUserProfile } from '@/utils/mockData';

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleBypass = () => {
    const mockUser = generateMockUser();
    const mockProfile = generateMockUserProfile(mockUser.id);
    
    userStorage.setAuth({ user: mockUser, token: 'mock_token' });
    userStorage.setProfile(mockProfile);
    
    router.push('/user/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Mobile Number / Email"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="9876543210 or user@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth bypass onBypass={handleBypass}>
            Login
          </Button>
          <p className="text-center text-sm" style={{ color: '#4B5563' }}>
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
