'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userStorage, adminStorage } from '@/utils/localStorage';

export function useUserAuth() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = userStorage.getAuth();
    if (auth && typeof auth === 'object' && 'user' in auth) {
      setUser((auth as { user: any }).user);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    userStorage.clearAuth();
    setUser(null);
    router.push('/');
  };

  return { user, loading, logout };
}

export function useAdminAuth() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = adminStorage.getAuth();
    if (auth && typeof auth === 'object' && 'user' in auth) {
      setAdmin((auth as { user: any }).user);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    adminStorage.clearAuth();
    setAdmin(null);
    router.push('/');
  };

  return { admin, loading, logout };
}
