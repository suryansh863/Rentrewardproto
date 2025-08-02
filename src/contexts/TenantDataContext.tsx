import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Tenant, RentRecord, RentStatus } from '../types';
import { tenants, properties, pointsRules, owners } from '../data';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

interface TenantDataContextType {
  tenant: Tenant | null;
  loading: boolean;
  submitRent: (amount: number, chequeNumber: string, chequePhoto?: string) => boolean;
}

const TenantDataContext = createContext<TenantDataContextType>({
  tenant: null,
  loading: true,
  submitRent: () => false,
});

export const useTenantData = () => useContext(TenantDataContext);

interface TenantDataProviderProps {
  children: ReactNode;
}

export const TenantDataProvider = ({ children }: TenantDataProviderProps) => {
  const { userId, userType } = useAuth();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  // Fetch tenant data
  useEffect(() => {
    if (userType === 'tenant' && userId) {
      const foundTenant = tenants.find(t => t.id === userId);
      setTenant(foundTenant || null);
      setLoading(false);
    } else if (userType === null) {
      setTenant(null);
      setLoading(false);
    }
  }, [userId, userType]);

  const calculatePoints = (amount: number): number => {
    // Base points: 10 points per 1000 AED
    return Math.floor((amount / 1000) * pointsRules.onTimeRent.basePoints);
  };

  const submitRent = (amount: number, chequeNumber: string, chequePhoto?: string): boolean => {
    if (!tenant) return false;

    try {
      // Ensure we have a valid cheque photo
      if (!chequePhoto) {
        console.error("Cheque photo is required");
        return false;
      }

      // Validate the image string
      if (!chequePhoto.startsWith('data:image/')) {
        console.error("Invalid image format");
        return false;
      }

      const newRent: RentRecord = {
        id: `r${Date.now()}`,
        month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        amount,
        dueDate: new Date().toISOString().split('T')[0],
        submissionDate: new Date().toISOString().split('T')[0],
        status: 'submitted', // Changed from 'pending' to 'submitted' to match expected flow
        paymentMethod: 'cheque',
        chequeNumber,
        chequePhoto,
        pointsEarned: calculatePoints(amount),
      };

      const updatedTenant: Tenant = {
        ...tenant,
        rentHistory: [...tenant.rentHistory, newRent],
        rewardPoints: tenant.rewardPoints + newRent.pointsEarned
      };

      setTenant(updatedTenant);

      // Update local storage to persist changes
      try {
        const updatedTenants = tenants.map(t =>
          t.id === tenant.id ? updatedTenant : t
        );
        localStorage.setItem('tenants', JSON.stringify(updatedTenants));
      } catch (err) {
        console.error("Failed to update localStorage:", err);
        // Continue execution even if localStorage fails
      }

      // Find the property and owner to send notification
      const tenantProperty = properties.find(p => p.id === tenant.propertyId);
      const propertyOwner = owners.find(o => o.properties.includes(tenant.propertyId));

      if (tenantProperty && propertyOwner) {
        // Add notification for owner about rent payment
        try {
          addNotification({
            type: 'rent_payment',
            title: 'New Rent Payment Received',
            message: `${tenant.name} submitted rent payment of AED ${amount.toLocaleString()} for ${tenantProperty.name}, Unit ${tenant.unitNumber}`,
            rentId: newRent.id,
            tenantId: tenant.id,
            amount: amount,
            propertyId: tenant.propertyId,
          });
        } catch (err) {
          console.error("Failed to add notification:", err);
          // Continue execution even if notification fails
        }
      }
      
      return true;
    } catch (err) {
      console.error("Error in submitRent:", err);
      return false;
    }
  };

  return (
    <TenantDataContext.Provider value={{ tenant, loading, submitRent }}>
      {children}
    </TenantDataContext.Provider>
  );
}; 