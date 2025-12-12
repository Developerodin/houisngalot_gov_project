/**
 * Mock data generators for bypass functionality
 */

import { Application, User, UserProfile, Document, Payment, Scheme } from '@/types';

export const generateMockUser = (): User => ({
  id: `user_${Date.now()}`,
  mobile: '9876543210',
  email: 'user@example.com',
  name: 'Rakesh Kumar',
  role: 'user',
  createdAt: new Date().toISOString(),
});

export const generateMockUserProfile = (userId: string): UserProfile => ({
  userId,
  name: 'Rakesh Kumar',
  email: 'user@example.com',
  mobile: '9876543210',
  address: '216  Road No. 12, Sector 12, Jaipur',
  city: 'Jaipur',
  state: 'Rajasthan',
  pincode: '302018',
});

export const generateMockApplication = (userId: string, schemeId: string): Partial<Application> => ({
  id: `app_${Date.now()}`,
  userId,
  schemeId,
  status: 'draft',
  name: 'Rakesh Kumar',
  aadhaar: '1234 5678 9012',
  dob: '1990-01-01',
  address: '216  Road No. 12, Sector 12, Jaipur',
  city: 'Jaipur',
  state: 'Rajasthan',
  pincode: '302018',
  familyMembers: 4,
  dependents: 2,
  annualIncome: 300000,
  category: 'LIG',
  bankAccount: '1234567890',
  ifsc: 'BANK0001234',
  bankName: 'State Bank of India',
  isEWS: false,
  isLIG: true,
  isMIG: false,
  isHIG: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const generateMockDocument = (applicationId: string, type: string): Document => ({
  id: `doc_${Date.now()}`,
  applicationId,
  type,
  fileName: `document_${type}.pdf`,
  fileSize: 1024000,
  uploadedAt: new Date().toISOString(),
  verified: false,
});

export const generateMockPayment = (applicationId: string, amount: number): Payment => ({
  id: `pay_${Date.now()}`,
  applicationId,
  amount,
  status: 'completed',
  transactionId: `TXN${Date.now()}`,
  paidAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
});

export const generateMockScheme = (): Scheme => ({
  id: `scheme_${Date.now()}`,
  name: 'Affordable Housing Scheme 2024',
  description: 'Government housing scheme for eligible citizens',
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  applicationFee: 1000,
  eligibilityCriteria: 'Annual income below 5 Lakhs',
  active: true,
});
