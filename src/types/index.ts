// Tenant Types
export type RentStatus = 'pending' | 'submitted' | 'received' | 'late';
export type ReferralStatus = 'invited' | 'joined';

export interface RentRecord {
  id: string;
  month: string;
  amount: number;
  dueDate: string;
  submissionDate?: string;
  status: RentStatus;
  paymentMethod: string;
  chequeNumber?: string;
  pointsEarned: number;
}

export interface Referral {
  id: string;
  name: string;
  email: string;
  status: ReferralStatus;
  joinedDate?: string;
  invitedDate?: string;
  pointsEarned: number;
}

export interface Tenant {
  id: string;
  email: string;
  password: string; // For demo purposes only
  name: string;
  phone: string;
  propertyId: string;
  unitNumber: string;
  joinedDate: string;
  rewardPoints: number;
  rentHistory: RentRecord[];
  referrals: Referral[];
  referralCode: string;
}

// Owner Types
export interface OwnerReferral {
  id: string;
  name: string;
  email: string;
  status: ReferralStatus;
  joinedDate?: string;
  propertiesAdded?: number;
  tenantsOnboarded?: number;
  bonusEarned?: number;
}

export interface Owner {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  joinedDate: string;
  properties: string[];
  referrals: OwnerReferral[];
  referralCode: string;
}

// Property Types
export interface Property {
  id: string;
  name: string;
  address: string;
  ownerId: string;
  units: number;
  occupiedUnits: number;
  tenants: string[];
  createdDate: string;
}

// Reward Types
export type RewardCategory = 'shopping' | 'food' | 'entertainment' | 'travel';

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: RewardCategory;
  image: string;
}

// Points System Rules
export interface PointsRules {
  onTimeRent: {
    basePoints: number;
    earlySubmissionBonus: number;
    lateSubmissionPenalty: number;
    minimumPoints: number;
  };
  referrals: {
    tenantReferral: {
      invited: number;
      joined: number;
    };
    ownerReferral: {
      invited: number;
      joined: number;
      perPropertyBonus: number;
      perTenantBonus: number;
    };
  };
}

// Notification Types
export type UserType = 'tenant' | 'owner';

export interface Notification {
  id: string;
  type: 'rent_payment' | 'new_tenant' | 'general';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  rentId?: string;
  tenantId?: string;
  amount?: number;
  propertyId?: string;
}

// Auth Types
export interface AuthState {
  isAuthenticated: boolean;
  userType: UserType | null;
  userId: string | null;
} 