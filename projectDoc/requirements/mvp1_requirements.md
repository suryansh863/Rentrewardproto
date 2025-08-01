# RentRewards Prototype (MVP 1) Requirements

## Core Principle
**"Turn Rent into Rewards"**

RentRewards is a platform that rewards tenants for submitting rent (simulated via cheque), while allowing property owners to track rent records and referrals.

## System Overview

This is a **front-end-only** interactive prototype built using **React + Vite**, simulating the core flows of the **RentRewards** platform. It uses **mock data only** — no backend, no database, and no real authentication.

## Technical Stack

| Layer | Tech Used |
|-------|-----------|
| Frontend | React + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router DOM |
| State | useState / useContext / Zustand |
| Mocking | Static mock data (JSON) |
| Auth Sim | LocalStorage (role-based switch) |

## User Roles

### 1. Tenant
- Mobile-first PWA-style interface
- Accessible via `/tenant` route

### 2. Property Owner
- Desktop-first Dashboard interface
- Accessible via `/owner` route

## Feature Requirements

### Tenant App Features

#### Simulated Onboarding/Login
- Use a hardcoded tenant email to "log in"
- Store authentication state in localStorage

#### Submit Rent via Cheque
- Form to simulate cheque submission (amount + date)
- Submitting updates the rent status 
- Adds reward points upon submission

#### View Reward Points & Catalog
- Display earned reward points
- Browse a dummy catalog of rewards

#### Referral Tracking
- Display sample referral link (non-functional)
- Show referred friends and referral points

### Owner App Features

#### Login with Owner Credentials
- Simulate login using hardcoded owner email
- Store authentication state in localStorage

#### Dashboard Overview
- View linked properties and associated tenants
- Display rent statuses for each tenant

#### Acknowledge Rent (Manual Cheque Mode)
- Mark rent submissions as "Received"
- Simulate rent record keeping for cheque-based flow

#### Referral Analytics
- View referred owners (mocked data)
- Display impact and potential bonuses

## Demo Walkthrough Flow

### Tenant Flow
1. Navigate to `/tenant`
2. Simulate login (hardcoded, e.g., ravi@example.com)
3. Submit Rent
   - Click "Submit Rent"
   - Enter amount/date
   - Confirm submission
   - See updated rent status and added reward points
4. View Rewards
   - Go to "Rewards"
   - Browse dummy offers (Amazon, Starbucks, etc.)
5. Check Referrals
   - View mock referral data and points

### Owner Flow
1. Navigate to `/owner`
2. Simulate login as meera@example.com
3. Review Properties
   - View linked properties and associated tenants
   - Click a tenant to see rent status and details
4. Mark Rent as Received
   - Acknowledge cheque submission from tenant
   - See status update reflected
5. View Referral Impact
   - Visit referral tab to see mock analytics

## Notes
- No backend — all data is local and refreshed on reload
- Perfect for stakeholder/internal demos
- Optimized for PWA-style mobile view (tenant) and desktop view (owner)
- Admin panel is omitted in this version

## Future Scope (MVP 2)
- Real authentication & authorization
- Integration with card payments / BNPL APIs
- Live merchant reward redemption
- Analytics dashboards and admin portal 