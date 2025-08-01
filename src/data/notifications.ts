import type { Notification } from '../types';

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "general",
    title: "Rent Due Reminder",
    message: "Your rent payment for April 2023 is due in 3 days",
    timestamp: "2023-04-02T10:00:00Z",
    isRead: false
  },
  {
    id: "n2",
    type: "general", 
    title: "Reward Points Earned",
    message: "You've earned 75 points for submitting rent on time!",
    timestamp: "2023-04-03T14:30:00Z",
    isRead: true
  },
  {
    id: "n3",
    type: "rent_payment",
    title: "Rent Submission Confirmed",
    message: "Your March 2023 rent payment has been processed",
    timestamp: "2023-03-05T09:15:00Z",
    isRead: true,
    rentId: "r1",
    tenantId: "t1",
    amount: 3500
  },
  {
    id: "n4",
    type: "general",
    title: "New Referral Bonus",
    message: "You've earned a bonus for referring a new tenant!",
    timestamp: "2023-03-28T16:45:00Z",
    isRead: false
  },
  {
    id: "n5",
    type: "rent_payment",
    title: "New Rent Payment Received",
    message: "Priya Sharma submitted rent payment of AED 3,500 for Al Barsha Heights, Unit 101",
    timestamp: "2023-04-15T10:30:00Z",
    isRead: false,
    rentId: "r5",
    tenantId: "t1",
    amount: 3500,
    propertyId: "p1"
  }
]; 