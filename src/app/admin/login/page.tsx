'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { adminStorage } from '@/utils/localStorage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AdminLoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleBypass = () => {
    adminStorage.setAuth({
      user: { id: 'admin_1', username: 'admin', role: 'admin' },
      token: 'admin_token',
    });
    router.push('/admin/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    adminStorage.setAuth({
      user: { id: 'admin_1', username: 'admin', role: 'admin' },
      token: 'admin_token',
    });
    
    router.push('/admin/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#0F1F3F' }}>
          {t('admin.login.title')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('admin.login.username')}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            required
          />
          <Input
            label={t('admin.login.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth bypass onBypass={handleBypass}>
            {t('admin.login.submit')}
          </Button>
        </form>
      </div>
    </div>
  );
}
