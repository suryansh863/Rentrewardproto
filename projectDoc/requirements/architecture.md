# RentRewards MVP1 Architecture

## Project Structure

```
RentRewardProto/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, icons, etc.
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Shared components
│   │   ├── tenant/          # Tenant-specific components
│   │   └── owner/           # Owner-specific components
│   ├── contexts/            # React contexts for state management
│   ├── data/                # Mock data (JSON)
│   ├── hooks/               # Custom React hooks
│   ├── layouts/             # Layout components
│   │   ├── TenantLayout.jsx # Mobile-first layout for tenants
│   │   └── OwnerLayout.jsx  # Desktop-first layout for owners
│   ├── pages/               # Page components
│   │   ├── tenant/          # Tenant pages
│   │   └── owner/           # Owner pages
│   ├── services/            # Mock service functions
│   ├── store/               # Zustand store(s)
│   ├── styles/              # Global styles
│   ├── types/               # TypeScript types/interfaces
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── routes.jsx           # Route definitions
├── .eslintrc.js             # ESLint configuration
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.js           # Vite configuration
```

## Component Architecture

### Tenant App

```
TenantApp
├── TenantLayout
│   ├── Header
│   ├── Navigation
│   └── Footer
├── Pages
│   ├── Login
│   ├── Dashboard
│   │   ├── RentStatus
│   │   └── PointsSummary
│   ├── SubmitRent
│   │   ├── RentForm
│   │   └── ConfirmationModal
│   ├── Rewards
│   │   ├── PointsBalance
│   │   └── RewardsCatalog
│   └── Referrals
│       ├── ReferralLink
│       └── ReferralsList
└── Shared
    ├── AuthContext
    ├── TenantDataContext
    └── NotificationSystem
```

### Owner App

```
OwnerApp
├── OwnerLayout
│   ├── Header
│   ├── Sidebar
│   └── Footer
├── Pages
│   ├── Login
│   ├── Dashboard
│   │   ├── PropertiesSummary
│   │   └── TenantsOverview
│   ├── PropertyDetails
│   │   ├── PropertyInfo
│   │   └── TenantsList
│   ├── TenantDetails
│   │   ├── TenantInfo
│   │   ├── RentHistory
│   │   └── RentActions
│   └── Referrals
│       ├── ReferralStats
│       └── ReferralImpact
└── Shared
    ├── AuthContext
    ├── OwnerDataContext
    └── NotificationSystem
```

## Data Flow

1. **Authentication Flow**
   - Mock login with hardcoded credentials
   - Store auth state in localStorage
   - Protect routes based on role

2. **Tenant Rent Submission**
   - Tenant submits rent form
   - Update local mock data
   - Update points balance
   - Show confirmation

3. **Owner Rent Acknowledgment**
   - Owner views pending submissions
   - Marks rent as received
   - Updates tenant rent status

4. **Rewards System**
   - Points awarded based on rent amount
   - Display catalog of available rewards
   - No actual redemption in MVP1

5. **Referral System**
   - Display referral statistics
   - Show mock referred users
   - Calculate referral points

## State Management

- **Local Component State**: For UI-specific state
- **Context API**: For shared state within specific flows
- **Zustand**: For global application state
- **LocalStorage**: For persisting authentication and user preferences

## Responsive Design

- **Tenant App**: Mobile-first design (320px - 768px)
- **Owner App**: Desktop-first design (1024px+)
- **Breakpoints**:
  - Small: 320px - 639px
  - Medium: 640px - 1023px
  - Large: 1024px - 1279px
  - XL: 1280px+ 