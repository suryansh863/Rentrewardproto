import type { Owner } from '../types';

export const owners: Owner[] = [
  {
    id: "o1",
    email: "meera@example.com",
    password: "password123", // For demo purposes only
    name: "Meera Desai",
    phone: "9876543212",
    joinedDate: "2022-12-01",
    properties: ["p1", "p2"],
    referrals: [
      {
        id: "oref1",
        name: "Vikram Singh",
        email: "vikram@example.com",
        status: "joined", // invited, joined
        joinedDate: "2023-01-15",
        propertiesAdded: 2,
        tenantsOnboarded: 3,
        bonusEarned: 1500
      },
      {
        id: "oref2",
        name: "Priya Sharma",
        email: "priya@example.com",
        status: "joined",
        joinedDate: "2023-03-20",
        propertiesAdded: 1,
        tenantsOnboarded: 2,
        bonusEarned: 800
      },
      {
        id: "oref3",
        name: "Ahmed Al-Rashid",
        email: "ahmed@example.com",
        status: "joined",
        joinedDate: "2023-05-10",
        propertiesAdded: 3,
        tenantsOnboarded: 5,
        bonusEarned: 2200
      },
      {
        id: "oref4",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        status: "invited",
        joinedDate: undefined,
        propertiesAdded: 0,
        tenantsOnboarded: 0,
        bonusEarned: 0
      }
    ],
    referralCode: "MEERA2022"
  },
  {
    id: "o2",
    email: "rahul@example.com",
    password: "password123",
    name: "Rahul Mehta",
    phone: "9876543213",
    joinedDate: "2023-01-10",
    properties: ["p3"],
    referrals: [
      {
        id: "oref5",
        name: "Lisa Chen",
        email: "lisa@example.com",
        status: "joined",
        joinedDate: "2023-06-01",
        propertiesAdded: 1,
        tenantsOnboarded: 1,
        bonusEarned: 500
      }
    ],
    referralCode: "RAHUL2023"
  }
]; 