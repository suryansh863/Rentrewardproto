import type { Tenant } from '../types';

export const tenants: Tenant[] = [
  {
    id: "t1",
    email: "ravi@example.com",
    password: "password123", // For demo purposes only
    name: "Ravi Kumar",
    phone: "9876543210",
    propertyId: "p1",
    unitNumber: "101",
    joinedDate: "2023-01-15",
    rewardPoints: 1250,
    rentHistory: [
      {
        id: "r1",
        month: "April 2023",
        amount: 5500, // Updated to AED equivalent
        dueDate: "2023-04-05",
        submissionDate: "2023-04-03",
        status: "received", // pending, submitted, received, late
        paymentMethod: "cheque",
        chequeNumber: "CHQ12345",
        pointsEarned: 150
      },
      {
        id: "r2",
        month: "May 2023",
        amount: 5500, // Updated to AED equivalent
        dueDate: "2023-05-05",
        submissionDate: "2023-05-01",
        status: "received",
        paymentMethod: "cheque",
        chequeNumber: "CHQ12346",
        pointsEarned: 150
      },
      {
        id: "r3",
        month: "January 2024",
        amount: 5500,
        dueDate: "2024-01-05",
        submissionDate: "2024-01-03",
        status: "pending", // Awaiting owner confirmation
        paymentMethod: "cheque",
        chequeNumber: "CHQ12347",
        pointsEarned: 150
      }
    ],
    referrals: [
      {
        id: "ref1",
        name: "Priya Singh",
        email: "priya@example.com",
        status: "joined", // invited, joined
        joinedDate: "2023-02-10",
        pointsEarned: 500
      },
      {
        id: "ref2",
        name: "Ajay Sharma",
        email: "ajay@example.com",
        status: "invited",
        invitedDate: "2023-03-15",
        pointsEarned: 0
      }
    ],
    referralCode: "RAVI2023"
  },
  {
    id: "t2",
    email: "sunita@example.com",
    password: "password123",
    name: "Sunita Patel",
    phone: "9876543211",
    propertyId: "p1",
    unitNumber: "102",
    joinedDate: "2023-02-01",
    rewardPoints: 800,
    rentHistory: [
      {
        id: "r3",
        month: "April 2023",
        amount: 4400, // Updated to AED equivalent
        dueDate: "2023-04-05",
        submissionDate: "2023-04-04",
        status: "received",
        paymentMethod: "cheque",
        chequeNumber: "CHQ22345",
        pointsEarned: 120
      },
      {
        id: "r4",
        month: "May 2023",
        amount: 4400, // Updated to AED equivalent
        dueDate: "2023-05-05",
        submissionDate: "2023-05-06",
        status: "received",
        paymentMethod: "cheque",
        chequeNumber: "CHQ22346",
        pointsEarned: 60 // Reduced points due to late payment
      }
    ],
    referrals: [],
    referralCode: "SUNITA2023"
  }
]; 