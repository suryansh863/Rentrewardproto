import type { Tenant } from '../types';
import { 
  chequeImage1, 
  chequeImage2, 
  chequeImage3, 
  chequeImage4, 
  chequeImage5, 
  receiptImage1, 
  receiptImage2 
} from '../utils/sampleImages';

// Sample tenant data
export const tenants: Tenant[] = [
  {
    id: 't1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // For demo purposes only
    phone: '555-123-4567',
    propertyId: 'p1',
    unitNumber: '101',
    joinedDate: '2023-01-01',
    rewardPoints: 250,
    rentHistory: [
      {
        id: '1',
        month: 'June 2023',
        amount: 1200,
        dueDate: '2023-06-01',
        submissionDate: '2023-06-01',
        status: 'submitted',
        paymentMethod: 'cheque',
        chequeNumber: 'CH123456',
        chequePhoto: chequeImage1,
        pointsEarned: 12
      },
      {
        id: '2',
        month: 'July 2023',
        amount: 1200,
        dueDate: '2023-07-01',
        submissionDate: '2023-07-01',
        status: 'received',
        paymentMethod: 'cheque',
        chequeNumber: 'CH123457',
        chequePhoto: chequeImage2,
        pointsEarned: 12
      }
    ],
    referrals: [
      {
        id: 'r1',
        name: 'Mike Wilson',
        email: 'mike@example.com',
        status: 'joined',
        joinedDate: '2023-05-15',
        invitedDate: '2023-05-01',
        pointsEarned: 100
      },
      {
        id: 'r2',
        name: 'Sarah Brown',
        email: 'sarah@example.com',
        status: 'invited',
        invitedDate: '2023-06-10',
        pointsEarned: 0
      }
    ],
    referralCode: 'JOHND123'
  },
  {
    id: 't2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123', // For demo purposes only
    phone: '555-987-6543',
    propertyId: 'p1',
    unitNumber: '102',
    joinedDate: '2023-02-01',
    rewardPoints: 150,
    rentHistory: [
      {
        id: '3',
        month: 'June 2023',
        amount: 1100,
        dueDate: '2023-06-01',
        submissionDate: '2023-06-01',
        status: 'received',
        paymentMethod: 'cheque',
        chequeNumber: 'CH789012',
        chequePhoto: chequeImage3,
        pointsEarned: 11
      },
      {
        id: '4',
        month: 'July 2023',
        amount: 1100,
        dueDate: '2023-07-01',
        submissionDate: '2023-07-05',
        status: 'late',
        paymentMethod: 'cheque',
        chequeNumber: 'CH789013',
        chequePhoto: chequeImage4,
        pointsEarned: 5
      }
    ],
    referrals: [
      {
        id: 'r3',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        status: 'joined',
        joinedDate: '2023-04-20',
        invitedDate: '2023-04-10',
        pointsEarned: 100
      }
    ],
    referralCode: 'JANES123'
  },
  {
    id: 't3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password123',
    phone: '555-555-5555',
    propertyId: 'p1',
    unitNumber: '103',
    joinedDate: '2023-03-01',
    rewardPoints: 180,
    rentHistory: [
      {
        id: '5',
        month: 'June 2023',
        amount: 1300,
        dueDate: '2023-06-01',
        submissionDate: '2023-05-28',
        status: 'received',
        paymentMethod: 'cheque',
        chequeNumber: 'CH345678',
        chequePhoto: chequeImage5,
        pointsEarned: 15
      },
      {
        id: '6',
        month: 'July 2023',
        amount: 1300,
        dueDate: '2023-07-01',
        submissionDate: '2023-07-01',
        status: 'pending',
        paymentMethod: 'cheque',
        chequeNumber: 'CH345679',
        chequePhoto: receiptImage1,
        pointsEarned: 0
      }
    ],
    referrals: [],
    referralCode: 'BOBJO123'
  },
  {
    id: 't4',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    password: 'password123',
    phone: '555-444-3333',
    propertyId: 'p2',
    unitNumber: '201',
    joinedDate: '2023-02-15',
    rewardPoints: 220,
    rentHistory: [
      {
        id: '7',
        month: 'June 2023',
        amount: 1250,
        dueDate: '2023-06-01',
        submissionDate: '2023-06-02',
        status: 'received',
        paymentMethod: 'cheque',
        chequeNumber: 'CH567890',
        chequePhoto: receiptImage2,
        pointsEarned: 12
      },
      {
        id: '8',
        month: 'July 2023',
        amount: 1250,
        dueDate: '2023-07-01',
        submissionDate: '2023-07-01',
        status: 'received',
        paymentMethod: 'cheque',
        chequeNumber: 'CH567891',
        chequePhoto: chequeImage1,
        pointsEarned: 13
      }
    ],
    referrals: [],
    referralCode: 'MARIGA123'
  },
  {
    id: 't5',
    name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    password: 'password123',
    phone: '555-222-1111',
    propertyId: 'p2',
    unitNumber: '202',
    joinedDate: '2023-01-10',
    rewardPoints: 300,
    rentHistory: [
      {
        id: '9',
        month: 'June 2023',
        amount: 1350,
        dueDate: '2023-06-01',
        submissionDate: '2023-05-29',
        status: 'received',
        paymentMethod: 'cheque',
        chequeNumber: 'CH901234',
        chequePhoto: chequeImage2,
        pointsEarned: 14
      },
      {
        id: '10',
        month: 'July 2023',
        amount: 1350,
        dueDate: '2023-07-01',
        submissionDate: '2023-07-01',
        status: 'received',
        paymentMethod: 'cheque',
        chequeNumber: 'CH901235',
        chequePhoto: chequeImage3,
        pointsEarned: 14
      }
    ],
    referrals: [
      {
        id: 'r4',
        name: 'Fatima Khan',
        email: 'fatima@example.com',
        status: 'joined',
        joinedDate: '2023-03-15',
        invitedDate: '2023-03-01',
        pointsEarned: 100
      }
    ],
    referralCode: 'AHMALI123'
  }
];
