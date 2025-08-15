import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import TenantLayout from './layouts/TenantLayout';
import OwnerLayout from './layouts/OwnerLayout';

// Home Page
import HomePage from './pages/HomePage';

// Tenant Pages
import TenantDashboard from './pages/tenant/TenantDashboard';
import SubmitRent from './pages/tenant/SubmitRent';
import TenantRewards from './pages/tenant/TenantRewards';
import TenantReferrals from './pages/tenant/TenantReferrals';
import TenantProfile from './pages/tenant/TenantProfile';

// Owner Pages
import OwnerDashboard from './pages/owner/OwnerDashboard';
import PropertyDetails from './pages/owner/PropertyDetails';
import TenantDetails from './pages/owner/TenantDetails';
import OwnerReferrals from './pages/owner/OwnerReferrals';
import AddProperty from './pages/owner/AddProperty';
import AddTenant from './pages/owner/AddTenant';
import EditProperty from './pages/owner/EditProperty';
import EditTenant from './pages/owner/EditTenant';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { VerifyEmailSentPage } from './pages/auth/VerifyEmailSentPage';

// Routes Configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  // Auth Routes
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/verify-email-sent',
    element: <VerifyEmailSentPage />
  },
  
  // Tenant Routes
  {
    path: '/tenant',
    element: <TenantLayout />,
    children: [
      {
        index: true,
        element: <TenantDashboard />
      },
      {
        path: 'submit-rent',
        element: <SubmitRent />
      },
      {
        path: 'rewards',
        element: <TenantRewards />
      },
      {
        path: 'referrals',
        element: <TenantReferrals />
      },
      {
        path: 'profile',
        element: <TenantProfile />
      }
    ]
  },
  
  // Owner Routes
  {
    path: '/owner',
    element: <OwnerLayout />,
    children: [
      {
        index: true,
        element: <OwnerDashboard />
      },
      {
        path: 'property/:propertyId',
        element: <PropertyDetails />
      },
      {
        path: 'tenant/:tenantId',
        element: <TenantDetails />
      },
      {
        path: 'referrals',
        element: <OwnerReferrals />
      },
      {
        path: 'add-property',
        element: <AddProperty />
      },
      {
        path: 'add-tenant',
        element: <AddTenant />
      },
      {
        path: 'edit-property/:propertyId',
        element: <EditProperty />
      },
      {
        path: 'edit-tenant/:tenantId',
        element: <EditTenant />
      }
    ]
  },
  
  // Catch-all route
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);