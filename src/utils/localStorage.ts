/**
 * localStorage utility functions for state management
 * Handles all data persistence without backend
 */

// Storage keys
export const STORAGE_KEYS = {
  USER_AUTH: 'user_auth',
  USER_PROFILE: 'user_profile',
  USER_APPLICATION: 'user_application',
  USER_DOCUMENTS: 'user_documents',
  USER_PAYMENTS: 'user_payments',
  ADMIN_AUTH: 'admin_auth',
  ADMIN_APPLICATIONS: 'admin_applications',
  ADMIN_SCHEMES: 'admin_schemes',
  ADMIN_LOTTERY: 'admin_lottery',
  ADMIN_ALLOTMENTS: 'admin_allotments',
} as const;

/**
 * Generic localStorage operations
 */
export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

/**
 * User-specific storage helpers
 */
export const userStorage = {
  getAuth: () => storage.get(STORAGE_KEYS.USER_AUTH),
  setAuth: (auth: any) => storage.set(STORAGE_KEYS.USER_AUTH, auth),
  clearAuth: () => storage.remove(STORAGE_KEYS.USER_AUTH),

  getProfile: () => storage.get(STORAGE_KEYS.USER_PROFILE),
  setProfile: (profile: any) => storage.set(STORAGE_KEYS.USER_PROFILE, profile),

  getApplication: () => storage.get(STORAGE_KEYS.USER_APPLICATION),
  setApplication: (application: any) => storage.set(STORAGE_KEYS.USER_APPLICATION, application),
  clearApplication: () => storage.remove(STORAGE_KEYS.USER_APPLICATION),

  getDocuments: () => storage.get(STORAGE_KEYS.USER_DOCUMENTS) || [],
  setDocuments: (documents: any[]) => storage.set(STORAGE_KEYS.USER_DOCUMENTS, documents),
  addDocument: (document: any) => {
    const docs = userStorage.getDocuments();
    docs.push(document);
    userStorage.setDocuments(docs);
  },

  getPayments: () => storage.get(STORAGE_KEYS.USER_PAYMENTS) || [],
  setPayments: (payments: any[]) => storage.set(STORAGE_KEYS.USER_PAYMENTS, payments),
  addPayment: (payment: any) => {
    const payments = userStorage.getPayments();
    payments.push(payment);
    userStorage.setPayments(payments);
  },
};

/**
 * Admin-specific storage helpers
 */
export const adminStorage = {
  getAuth: () => storage.get(STORAGE_KEYS.ADMIN_AUTH),
  setAuth: (auth: any) => storage.set(STORAGE_KEYS.ADMIN_AUTH, auth),
  clearAuth: () => storage.remove(STORAGE_KEYS.ADMIN_AUTH),

  getApplications: () => storage.get(STORAGE_KEYS.ADMIN_APPLICATIONS) || [],
  setApplications: (applications: any[]) => storage.set(STORAGE_KEYS.ADMIN_APPLICATIONS, applications),
  addApplication: (application: any) => {
    const apps = adminStorage.getApplications();
    apps.push(application);
    adminStorage.setApplications(apps);
  },
  updateApplication: (id: string, updates: any) => {
    const apps = adminStorage.getApplications();
    const index = apps.findIndex((app: any) => app.id === id);
    if (index !== -1) {
      apps[index] = { ...apps[index], ...updates };
      adminStorage.setApplications(apps);
    }
  },

  getSchemes: () => storage.get(STORAGE_KEYS.ADMIN_SCHEMES) || [],
  setSchemes: (schemes: any[]) => storage.set(STORAGE_KEYS.ADMIN_SCHEMES, schemes),

  getLottery: () => storage.get(STORAGE_KEYS.ADMIN_LOTTERY),
  setLottery: (lottery: any) => storage.set(STORAGE_KEYS.ADMIN_LOTTERY, lottery),

  getAllotments: () => storage.get(STORAGE_KEYS.ADMIN_ALLOTMENTS) || [],
  setAllotments: (allotments: any[]) => storage.set(STORAGE_KEYS.ADMIN_ALLOTMENTS, allotments),
};
