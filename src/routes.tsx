import { createBrowserRouter, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from './contexts';

// Layouts
import TenantLayout from './layouts/TenantLayout';
import OwnerLayout from './layouts/OwnerLayout';

// Tenant Pages
import TenantLogin from './pages/tenant/TenantLogin';
import TenantDashboard from './pages/tenant/TenantDashboard';
import SubmitRent from './pages/tenant/SubmitRent';
import TenantRewards from './pages/tenant/TenantRewards';
import TenantReferrals from './pages/tenant/TenantReferrals';
import TenantProfile from './pages/tenant/TenantProfile';

// Owner Pages
import OwnerLogin from './pages/owner/OwnerLogin';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import PropertyDetails from './pages/owner/PropertyDetails';
import TenantDetails from './pages/owner/TenantDetails';
import OwnerReferrals from './pages/owner/OwnerReferrals';
import AddProperty from './pages/owner/AddProperty';
import AddTenant from './pages/owner/AddTenant';
import EditProperty from './pages/owner/EditProperty';
import EditTenant from './pages/owner/EditTenant';

// Protected Route Component
const ProtectedRoute = ({ 
  children, 
  requiredUserType 
}: { 
  children: ReactNode; 
  requiredUserType: 'tenant' | 'owner' 
}) => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={`/${requiredUserType}/login`} replace />;
  }

  if (userType !== requiredUserType) {
    return <Navigate to={`/${userType}`} replace />;
  }

  return <>{children}</>;
};

// Routes Configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/tenant/login" replace />
  },
  
  // Tenant Routes
  {
    path: '/tenant',
    element: (
      <ProtectedRoute requiredUserType="tenant">
        <TenantLayout />
      </ProtectedRoute>
    ),
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
  {
    path: '/tenant/login',
    element: <TenantLogin />
  },
  
  // Owner Routes
  {
    path: '/owner',
    element: (
      <ProtectedRoute requiredUserType="owner">
        <OwnerLayout />
      </ProtectedRoute>
    ),
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
  {
    path: '/owner/login',
    element: <OwnerLogin />
  },
  
  // Catch-all route
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]); 