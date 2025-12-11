'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { userStorage } from '@/utils/localStorage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProfilePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    const auth = userStorage.getAuth();
    if (!auth) {
      router.push('/auth/login');
      return;
    }

    const savedProfile = userStorage.getProfile();
    if (savedProfile && typeof savedProfile === 'object') {
      const profile = savedProfile as { name?: string; email?: string; mobile?: string; address?: string; city?: string; state?: string; pincode?: string };
      setProfile(savedProfile);
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        mobile: profile.mobile || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        pincode: profile.pincode || '',
      });
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile = { ...profile, ...formData };
    userStorage.setProfile(updatedProfile);
    alert(t('profile.updateSuccess'));
  };

  if (!profile) {
    return <div className="container mx-auto px-4 py-12 text-center">{t('common.loading')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#0F1F3F' }}>
        {t('profile.title')}
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('form.name')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label={t('profile.email')}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label={t('profile.mobile')}
            type="tel"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            required
          />
          <Input
            label={t('form.address')}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('form.city')}
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <Input
              label={t('form.state')}
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
          </div>
          <Input
            label={t('form.pincode')}
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
          />
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => router.push('/user/dashboard')}
              variant="outline"
              fullWidth
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit" fullWidth>
              {t('profile.save')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
