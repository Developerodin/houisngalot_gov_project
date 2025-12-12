/**
 * Mock data for admin dashboard - Indian applicants from Jaipur, Rajasthan
 */

import { Application } from '@/types';

// Indian names (first names and last names)
const firstNames = [
  'Rajesh', 'Priya', 'Amit', 'Sunita', 'Vikram', 'Kavita', 'Ramesh', 'Anjali',
  'Manoj', 'Deepika', 'Suresh', 'Pooja', 'Anil', 'Sneha', 'Rahul', 'Neha',
  'Naresh', 'Richa', 'Vishal', 'Shweta', 'Kiran', 'Jyoti', 'Pankaj', 'Divya',
  'Sanjay', 'Meera', 'Harish', 'Swati', 'Mukesh', 'Ritu', 'Sandeep', 'Kiran',
  'Ajay', 'Preeti', 'Vinod', 'Radha', 'Dinesh', 'Shilpa', 'Gaurav', 'Anita'
];

const lastNames = [
  'Kumar', 'Sharma', 'Verma', 'Gupta', 'Singh', 'Meena', 'Yadav', 'Joshi',
  'Rajput', 'Pareek', 'Choudhary', 'Agarwal', 'Jain', 'Sharma', 'Patel', 'Shekhawat',
  'Khatri', 'Saini', 'Rathore', 'Bhardwaj', 'Gurjar', 'Dhakad', 'Chauhan', 'Solanki'
];

// Jaipur areas/locations
const jaipurAreas = [
  'Malviya Nagar', 'Vaishali Nagar', 'Sitapura', 'Bani Park', 'C-Scheme',
  'Raja Park', 'Mansarover', 'Vidyadhar Nagar', 'Shyam Nagar', 'Jhotwara',
  'Pratap Nagar', 'Tonk Road', 'Ajmer Road', 'Amer Road', 'Gopalpura',
  'Sanganer', 'Khatipura', 'Bais Godam', 'Nirman Nagar', 'Jagatpura'
];

// Jaipur pincodes
const pincodes = [
  '302001', '302002', '302003', '302004', '302012', '302013', '302014',
  '302015', '302016', '302017', '302018', '302019', '302020', '302021',
  '302022', '302023', '302024', '302025', '302026', '302027', '302028',
  '302029', '302030', '302031', '302032', '302033', '302034', '302035'
];

// Bank names common in Rajasthan
const banks = [
  'State Bank of India', 'Punjab National Bank', 'Bank of Baroda',
  'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Canara Bank', 'Union Bank of India',
  'Rajasthan Marudhara Gramin Bank', 'Punjab & Sind Bank'
];

// IFSC codes (format: BANK0XXXXX)
const generateIFSC = (bankIndex: number) => {
  const bankCodes = ['SBIN', 'PUNB', 'BARB', 'HDFC', 'ICIC', 'UTIB', 'CNRB', 'UBIN', 'RMGB', 'PSIB'];
  return `${bankCodes[bankIndex]}0${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`;
};

// Generate random Aadhaar-like number
const generateAadhaar = () => {
  return `${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`;
};

// Generate random date of birth (between 25-65 years ago)
const generateDOB = () => {
  const year = new Date().getFullYear() - Math.floor(Math.random() * 40) - 25;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

// Generate random address
const generateAddress = (area: string) => {
  const houseNumbers = Math.floor(Math.random() * 200) + 1;
  const streetTypes = ['Road', 'Street', 'Colony', 'Nagar', 'Vihar'];
  const streetType = streetTypes[Math.floor(Math.random() * streetTypes.length)];
  return `${houseNumbers}, ${area} ${streetType}, Jaipur`;
};

// Generate random income based on category
const generateIncome = (category: string) => {
  switch (category) {
    case 'EWS': return Math.floor(Math.random() * 300000) + 100000; // 1L - 4L
    case 'LIG': return Math.floor(Math.random() * 300000) + 300000; // 3L - 6L
    case 'MIG': return Math.floor(Math.random() * 500000) + 600000; // 6L - 11L
    case 'HIG': return Math.floor(Math.random() * 1000000) + 1200000; // 12L+
    default: return Math.floor(Math.random() * 500000) + 200000;
  }
};

// Generate single application
const generateApplication = (index: number, status: string): Application => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;
  
  const area = jaipurAreas[Math.floor(Math.random() * jaipurAreas.length)];
  const pincode = pincodes[Math.floor(Math.random() * pincodes.length)];
  const address = generateAddress(area);
  
  const categories: Array<'EWS' | 'LIG' | 'MIG' | 'HIG'> = ['EWS', 'LIG', 'MIG', 'HIG'];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const annualIncome = generateIncome(category);
  
  const bankIndex = Math.floor(Math.random() * banks.length);
  const bankName = banks[bankIndex];
  const ifsc = generateIFSC(bankIndex);
  const bankAccount = Math.floor(Math.random() * 9000000000) + 1000000000; // 10 digit account
  
  const isEWS = category === 'EWS';
  const isLIG = category === 'LIG';
  const isMIG = category === 'MIG';
  const isHIG = category === 'HIG';
  
  const familyMembers = Math.floor(Math.random() * 5) + 2; // 2-6 members
  const dependents = Math.floor(Math.random() * (familyMembers - 1));
  
  const now = new Date();
  const createdAt = new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString();
  const updatedAt = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
  
  const application: Application = {
    id: `APP${String(index + 1).padStart(6, '0')}`,
    userId: `USER${String(index + 1).padStart(6, '0')}`,
    schemeId: 'scheme_1',
    status: status as any,
    name,
    aadhaar: generateAadhaar(),
    dob: generateDOB(),
    address,
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode,
    familyMembers,
    dependents,
    annualIncome,
    category,
    bankAccount: bankAccount.toString(),
    ifsc,
    bankName,
    isEWS,
    isLIG,
    isMIG,
    isHIG,
    createdAt,
    updatedAt,
  };
  
  // Add status-specific timestamps
  if (status === 'submitted' || status === 'paid' || status === 'under_verification') {
    application.submittedAt = new Date(createdAt).toISOString();
  }
  
  if (status === 'paid' || status === 'under_verification' || status === 'verified') {
    application.paidAt = new Date(Date.parse(createdAt) + 2 * 24 * 60 * 60 * 1000).toISOString();
  }
  
  if (status === 'verified' || status === 'rejected') {
    application.verifiedAt = new Date(Date.parse(updatedAt)).toISOString();
  }
  
  return application;
};

// Generate mock applications with different statuses
export const generateAdminMockApplications = (): Application[] => {
  const applications: Application[] = [];
  
  // 15 verified applications (for lottery)
  for (let i = 0; i < 15; i++) {
    applications.push(generateApplication(applications.length, 'verified'));
  }
  
  // 8 pending verification applications
  for (let i = 0; i < 8; i++) {
    applications.push(generateApplication(applications.length, 'under_verification'));
  }
  
  // 5 rejected applications
  for (let i = 0; i < 5; i++) {
    applications.push(generateApplication(applications.length, 'rejected'));
  }
  
  // 10 paid applications (waiting for verification)
  for (let i = 0; i < 10; i++) {
    applications.push(generateApplication(applications.length, 'paid'));
  }
  
  // 5 submitted applications
  for (let i = 0; i < 5; i++) {
    applications.push(generateApplication(applications.length, 'submitted'));
  }
  
  // 2 selected (from previous lottery)
  for (let i = 0; i < 2; i++) {
    const app = generateApplication(applications.length, 'selected');
    app.verifiedAt = new Date(Date.parse(app.createdAt) + 5 * 24 * 60 * 60 * 1000).toISOString();
    applications.push(app);
  }
  
  // 1 allotted
  const allottedApp = generateApplication(applications.length, 'allotted');
  allottedApp.verifiedAt = new Date(Date.parse(allottedApp.createdAt) + 5 * 24 * 60 * 60 * 1000).toISOString();
  applications.push(allottedApp);
  
  return applications;
};

// Storage key for mock data initialization flag
const MOCK_DATA_INITIALIZED_KEY = 'admin_mock_data_initialized';

// Initialize mock data in localStorage if not exists
export const initializeAdminMockData = () => {
  if (typeof window === 'undefined') return;
  
  const { adminStorage, storage } = require('@/utils/localStorage');
  
  const existingApplications = adminStorage.getApplications();
  
  // Check if mock data already exists by looking for APP prefixed IDs
  const hasMockData = existingApplications.some((app: any) => 
    app.id && typeof app.id === 'string' && app.id.startsWith('APP')
  );
  
  // Only initialize if mock data doesn't exist
  // (We check actual data existence, not just flag, in case localStorage was partially cleared)
  if (!hasMockData) {
    // Generate mock applications
    const mockApplications = generateAdminMockApplications();
    
    // Get existing application IDs to avoid duplicates
    const existingIds = new Set(existingApplications.map((app: any) => app.id));
    
    // Filter out any mock apps that might already exist
    const newMockApps = mockApplications.filter((app: any) => !existingIds.has(app.id));
    
    // Merge with existing applications (user submitted ones come first, then mock data)
    const allApplications = [...existingApplications, ...newMockApps];
    adminStorage.setApplications(allApplications);
    
    // Mark as initialized
    storage.set(MOCK_DATA_INITIALIZED_KEY, true);
  }
};

