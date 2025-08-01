# RentRewards Mock Data Structure

This document outlines the structure of mock data to be used in the RentRewards MVP1 prototype.

## Tenant Data

```json
{
  "tenants": [
    {
      "id": "t1",
      "email": "ravi@example.com",
      "password": "password123", // For demo purposes only
      "name": "Ravi Kumar",
      "phone": "9876543210",
      "propertyId": "p1",
      "unitNumber": "101",
      "joinedDate": "2023-01-15",
      "rewardPoints": 1250,
      "rentHistory": [
        {
          "id": "r1",
          "month": "April 2023",
          "amount": 15000,
          "dueDate": "2023-04-05",
          "submissionDate": "2023-04-03",
          "status": "received", // pending, submitted, received, late
          "paymentMethod": "cheque",
          "chequeNumber": "CHQ12345",
          "pointsEarned": 150
        },
        {
          "id": "r2",
          "month": "May 2023",
          "amount": 15000,
          "dueDate": "2023-05-05",
          "submissionDate": "2023-05-01",
          "status": "received",
          "paymentMethod": "cheque",
          "chequeNumber": "CHQ12346",
          "pointsEarned": 150
        }
      ],
      "referrals": [
        {
          "id": "ref1",
          "name": "Priya Singh",
          "email": "priya@example.com",
          "status": "joined", // invited, joined
          "joinedDate": "2023-02-10",
          "pointsEarned": 500
        },
        {
          "id": "ref2",
          "name": "Ajay Sharma",
          "email": "ajay@example.com",
          "status": "invited",
          "invitedDate": "2023-03-15",
          "pointsEarned": 0
        }
      ],
      "referralCode": "RAVI2023"
    },
    {
      "id": "t2",
      "email": "sunita@example.com",
      "password": "password123",
      "name": "Sunita Patel",
      "phone": "9876543211",
      "propertyId": "p1",
      "unitNumber": "102",
      "joinedDate": "2023-02-01",
      "rewardPoints": 800,
      "rentHistory": [
        {
          "id": "r3",
          "month": "April 2023",
          "amount": 12000,
          "dueDate": "2023-04-05",
          "submissionDate": "2023-04-04",
          "status": "received",
          "paymentMethod": "cheque",
          "chequeNumber": "CHQ22345",
          "pointsEarned": 120
        },
        {
          "id": "r4",
          "month": "May 2023",
          "amount": 12000,
          "dueDate": "2023-05-05",
          "submissionDate": "2023-05-06",
          "status": "received",
          "paymentMethod": "cheque",
          "chequeNumber": "CHQ22346",
          "pointsEarned": 60 // Reduced points due to late payment
        }
      ],
      "referrals": [],
      "referralCode": "SUNITA2023"
    }
  ]
}
```

## Owner Data

```json
{
  "owners": [
    {
      "id": "o1",
      "email": "meera@example.com",
      "password": "password123", // For demo purposes only
      "name": "Meera Desai",
      "phone": "9876543212",
      "joinedDate": "2022-12-01",
      "properties": ["p1", "p2"],
      "referrals": [
        {
          "id": "oref1",
          "name": "Vikram Singh",
          "email": "vikram@example.com",
          "status": "joined", // invited, joined
          "joinedDate": "2023-01-15",
          "propertiesAdded": 2,
          "tenantsOnboarded": 3,
          "bonusEarned": 1500
        }
      ],
      "referralCode": "MEERA2022"
    },
    {
      "id": "o2",
      "email": "rahul@example.com",
      "password": "password123",
      "name": "Rahul Mehta",
      "phone": "9876543213",
      "joinedDate": "2023-01-10",
      "properties": ["p3"],
      "referrals": [],
      "referralCode": "RAHUL2023"
    }
  ]
}
```

## Property Data

```json
{
  "properties": [
    {
      "id": "p1",
      "name": "Green Valley Apartments",
      "address": "123 MG Road, Bangalore",
      "ownerId": "o1",
      "units": 10,
      "occupiedUnits": 8,
      "tenants": ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"],
      "createdDate": "2022-12-05"
    },
    {
      "id": "p2",
      "name": "Sunshine Residency",
      "address": "456 Park Avenue, Mumbai",
      "ownerId": "o1",
      "units": 5,
      "occupiedUnits": 3,
      "tenants": ["t9", "t10", "t11"],
      "createdDate": "2023-01-15"
    },
    {
      "id": "p3",
      "name": "Urban Heights",
      "address": "789 Ring Road, Delhi",
      "ownerId": "o2",
      "units": 15,
      "occupiedUnits": 12,
      "tenants": ["t12", "t13", "t14", "t15", "t16", "t17", "t18", "t19", "t20", "t21", "t22", "t23"],
      "createdDate": "2023-02-01"
    }
  ]
}
```

## Rewards Catalog

```json
{
  "rewards": [
    {
      "id": "rw1",
      "name": "Amazon Gift Card",
      "description": "Rs. 500 Amazon Gift Card",
      "pointsCost": 500,
      "category": "shopping",
      "image": "amazon_gift_card.jpg"
    },
    {
      "id": "rw2",
      "name": "Starbucks Gift Card",
      "description": "Rs. 200 Starbucks Gift Card",
      "pointsCost": 200,
      "category": "food",
      "image": "starbucks_gift_card.jpg"
    },
    {
      "id": "rw3",
      "name": "Movie Tickets",
      "description": "2 Movie Tickets at PVR Cinemas",
      "pointsCost": 300,
      "category": "entertainment",
      "image": "movie_tickets.jpg"
    },
    {
      "id": "rw4",
      "name": "Uber Ride",
      "description": "Rs. 150 Uber Ride Credit",
      "pointsCost": 150,
      "category": "travel",
      "image": "uber_ride.jpg"
    },
    {
      "id": "rw5",
      "name": "Swiggy Voucher",
      "description": "Rs. 250 Swiggy Voucher",
      "pointsCost": 250,
      "category": "food",
      "image": "swiggy_voucher.jpg"
    }
  ]
}
```

## Points System Rules

```json
{
  "pointsRules": {
    "onTimeRent": {
      "basePoints": 10, // Points per 1000 rupees of rent
      "earlySubmissionBonus": 5, // Additional points if submitted 3+ days before due date
      "lateSubmissionPenalty": 5, // Points deducted if submitted after due date
      "minimumPoints": 0 // Cannot go below zero
    },
    "referrals": {
      "tenantReferral": {
        "invited": 0,
        "joined": 500
      },
      "ownerReferral": {
        "invited": 0,
        "joined": 1000,
        "perPropertyBonus": 500,
        "perTenantBonus": 100
      }
    }
  }
}
```

## Notifications (Mock)

```json
{
  "notifications": [
    {
      "id": "n1",
      "userId": "t1",
      "userType": "tenant",
      "title": "Rent Due Soon",
      "message": "Your rent for June 2023 is due in 5 days.",
      "type": "reminder",
      "isRead": false,
      "createdAt": "2023-05-30T10:00:00Z"
    },
    {
      "id": "n2",
      "userId": "t1",
      "userType": "tenant",
      "title": "Points Earned",
      "message": "You earned 150 points for your May rent payment.",
      "type": "reward",
      "isRead": true,
      "createdAt": "2023-05-01T14:30:00Z"
    },
    {
      "id": "n3",
      "userId": "o1",
      "userType": "owner",
      "title": "New Rent Submission",
      "message": "Ravi Kumar has submitted rent for May 2023.",
      "type": "rent",
      "isRead": false,
      "createdAt": "2023-05-01T14:30:00Z"
    },
    {
      "id": "n4",
      "userId": "o1",
      "userType": "owner",
      "title": "Referral Success",
      "message": "Your referral Vikram Singh has joined RentRewards.",
      "type": "referral",
      "isRead": true,
      "createdAt": "2023-01-15T09:15:00Z"
    }
  ]
}
``` 