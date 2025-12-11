/**
 * TypeScript type definitions for the application
 */

export type UserRole = 'user' | 'admin';

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'paid'
  | 'under_verification'
  | 'verified'
  | 'rejected'
  | 'clarification'
  | 'selected'
  | 'allotted'
  | 'possession';

export type IncomeCategory = 'EWS' | 'LIG' | 'MIG' | 'HIG';

export interface User {
  id: string;
  mobile: string;
  email?: string;
  name?: string;
  role: UserRole;
  createdAt: string;
}

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  mobile: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface Application {
  id: string;
  userId: string;
  schemeId: string;
  status: ApplicationStatus;
  
  // Identity
  name: string;
  aadhaar: string;
  dob: string;
  
  // Residence
  address: string;
  city: string;
  state: string;
  pincode: string;
  
  // Family
  familyMembers: number;
  dependents: number;
  
  // Income
  annualIncome: number;
  category: IncomeCategory;
  
  // Bank
  bankAccount: string;
  ifsc: string;
  bankName: string;
  
  // Special categories
  isEWS: boolean;
  isLIG: boolean;
  isMIG: boolean;
  isHIG: boolean;
  
  // Metadata
  submittedAt?: string;
  paidAt?: string;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  applicationId: string;
  type: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  verified: boolean;
  verifiedAt?: string;
}

export interface Payment {
  id: string;
  applicationId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paidAt?: string;
  createdAt: string;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  applicationFee: number;
  eligibilityCriteria: string;
  active: boolean;
}

export interface Lottery {
  id: string;
  schemeId: string;
  category: IncomeCategory;
  conductedAt: string;
  seedHash: string;
  winners: string[]; // Application IDs
}

export interface Allotment {
  id: string;
  applicationId: string;
  lotteryId: string;
  plotNumber: string;
  allotmentDate: string;
  possessionDate?: string;
  status: 'allotted' | 'possession' | 'cancelled';
}
