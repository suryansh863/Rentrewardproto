import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Owner, Property, Tenant, RentRecord, RentStatus } from '../types';
import { owners, properties, tenants, pointsRules } from '../data';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

interface OwnerDataContextType {
  owner: Owner | null;
  ownerProperties: Property[];
  propertyTenants: Record<string, Tenant[]>;
  loading: boolean;
  acknowledgeRent: (tenantId: string, rentId: string) => void;
  addProperty: (propertyData: Omit<Property, 'id' | 'ownerId' | 'createdDate' | 'tenants'>) => void;
  addTenant: (tenantData: Omit<Tenant, 'id' | 'joinedDate' | 'rewardPoints' | 'rentHistory' | 'referrals' | 'referralCode'>) => void;
  editProperty: (propertyId: string, propertyData: Omit<Property, 'id' | 'ownerId' | 'createdDate' | 'tenants'>) => void;
  editTenant: (tenantId: string, tenantData: Omit<Tenant, 'id' | 'joinedDate' | 'rewardPoints' | 'rentHistory' | 'referrals' | 'referralCode'>) => void;
  deleteProperty: (propertyId: string) => void;
  deleteTenant: (tenantId: string) => void;
}

const OwnerDataContext = createContext<OwnerDataContextType>({
  owner: null,
  ownerProperties: [],
  propertyTenants: {},
  loading: true,
  acknowledgeRent: () => {},
  addProperty: () => {},
  addTenant: () => {},
  editProperty: () => {},
  editTenant: () => {},
  deleteProperty: () => {},
  deleteTenant: () => {},
});

export const useOwnerData = () => useContext(OwnerDataContext);

interface OwnerDataProviderProps {
  children: ReactNode;
}

export const OwnerDataProvider = ({ children }: OwnerDataProviderProps) => {
  const { userId, userType } = useAuth();
  const [owner, setOwner] = useState<Owner | null>(null);
  const [ownerProperties, setOwnerProperties] = useState<Property[]>([]);
  const [propertyTenants, setPropertyTenants] = useState<Record<string, Tenant[]>>({});
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  // Load owner data
  useEffect(() => {
    if (userType === 'owner' && userId) {
      const foundOwner = owners.find(o => o.id === userId);
      setOwner(foundOwner || null);
      
      if (foundOwner) {
        // Load properties
        const ownerProps = properties.filter(p => foundOwner.properties.includes(p.id));
        setOwnerProperties(ownerProps);
        
        // Load tenants for each property
        const propTenants: Record<string, Tenant[]> = {};
        ownerProps.forEach(property => {
          propTenants[property.id] = tenants.filter(t => t.propertyId === property.id);
        });
        setPropertyTenants(propTenants);
      }
      setLoading(false);
    } else if (userType === null) {
      setOwner(null);
      setOwnerProperties([]);
      setPropertyTenants({});
      setLoading(false);
    }
  }, [userId, userType]);

  const acknowledgeRent = (tenantId: string, rentId: string) => {
    // Find tenant and rent record
    const tenant = tenants.find(t => t.id === tenantId);
    const rent = tenant?.rentHistory.find(r => r.id === rentId);
    
    if (!tenant || !rent) return;

    // Calculate points for this rent payment
    const pointsEarned = Math.floor((rent.amount / 1000) * pointsRules.onTimeRent.basePoints);

    // Update tenant's rent record status and points
    const updatedTenant = {
      ...tenant,
      rewardPoints: tenant.rewardPoints + pointsEarned,
      rentHistory: tenant.rentHistory.map((r: RentRecord) => 
        r.id === rentId 
          ? { ...r, status: 'received' as RentStatus, pointsEarned }
          : r
      )
    };

    // Update tenants in localStorage
    const updatedTenants = tenants.map(t => 
      t.id === tenantId ? updatedTenant : t
    );
    localStorage.setItem('tenants', JSON.stringify(updatedTenants));

    // Update local state
    setPropertyTenants(prevTenants => {
      const newTenants = { ...prevTenants };
      Object.keys(newTenants).forEach(propertyId => {
        newTenants[propertyId] = newTenants[propertyId].map(t => 
          t.id === tenantId ? updatedTenant : t
        );
      });
      return newTenants;
    });

    // Optional: Add a notification confirming the action (for owner)
    addNotification({
      type: 'general',
      title: 'Payment Confirmed',
      message: `Rent payment of AED ${rent.amount.toLocaleString()} from ${tenant.name} has been confirmed. ${pointsEarned} points awarded.`,
      tenantId,
      amount: rent.amount,
      propertyId: tenant.propertyId,
    });
  };

  const addProperty = (propertyData: Omit<Property, 'id' | 'ownerId' | 'createdDate' | 'tenants'>) => {
    if (!owner) return;
    
    const newProperty: Property = {
      ...propertyData,
      id: `p${Date.now()}`, // Generate unique ID
      ownerId: owner.id,
      createdDate: new Date().toISOString().split('T')[0],
      tenants: [], // Start with empty tenants array
    };
    
    // Update local state
    setOwnerProperties(prev => [...prev, newProperty]);
    
    // Update owner's properties list
    const updatedOwner = {
      ...owner,
      properties: [...owner.properties, newProperty.id]
    };
    setOwner(updatedOwner);
    
    // In a real app, this would be an API call
    // For demo purposes, we'll store in localStorage
    const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    localStorage.setItem('properties', JSON.stringify([...storedProperties, newProperty]));
    
    const storedOwners = JSON.parse(localStorage.getItem('owners') || '[]');
    const updatedOwners = storedOwners.map((o: Owner) => 
      o.id === owner.id ? updatedOwner : o
    );
    localStorage.setItem('owners', JSON.stringify(updatedOwners));
  };

  const addTenant = (tenantData: Omit<Tenant, 'id' | 'joinedDate' | 'rewardPoints' | 'rentHistory' | 'referrals' | 'referralCode'>) => {
    const newTenant: Tenant = {
      ...tenantData,
      id: `t${Date.now()}`, // Generate unique ID
      joinedDate: new Date().toISOString().split('T')[0],
      rewardPoints: 0,
      rentHistory: [],
      referrals: [],
      referralCode: `${tenantData.name.toUpperCase().replace(/\s+/g, '')}${new Date().getFullYear()}`,
    };
    
    // Update local state - add tenant to the appropriate property
    setPropertyTenants(prev => ({
      ...prev,
      [tenantData.propertyId]: [...(prev[tenantData.propertyId] || []), newTenant]
    }));
    
    // In a real app, this would be an API call
    // For demo purposes, we'll store in localStorage
    const storedTenants = JSON.parse(localStorage.getItem('tenants') || '[]');
    localStorage.setItem('tenants', JSON.stringify([...storedTenants, newTenant]));
  };

  const editProperty = (propertyId: string, propertyData: Omit<Property, 'id' | 'ownerId' | 'createdDate' | 'tenants'>) => {
    if (!owner) return;
    
    // Update local state
    setOwnerProperties(prev => prev.map(property => 
      property.id === propertyId 
        ? { ...property, ...propertyData }
        : property
    ));
    
    // In a real app, this would be an API call
    const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    const updatedProperties = storedProperties.map((p: Property) => 
      p.id === propertyId ? { ...p, ...propertyData } : p
    );
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  const editTenant = (tenantId: string, tenantData: Omit<Tenant, 'id' | 'joinedDate' | 'rewardPoints' | 'rentHistory' | 'referrals' | 'referralCode'>) => {
    // Update local state
    setPropertyTenants(prev => {
      const newPropertyTenants = { ...prev };
      Object.keys(newPropertyTenants).forEach(propId => {
        newPropertyTenants[propId] = newPropertyTenants[propId].map(tenant => 
          tenant.id === tenantId ? { ...tenant, ...tenantData } : tenant
        );
      });
      return newPropertyTenants;
    });
    
    // In a real app, this would be an API call
    const storedTenants = JSON.parse(localStorage.getItem('tenants') || '[]');
    const updatedTenants = storedTenants.map((t: Tenant) => 
      t.id === tenantId ? { ...t, ...tenantData } : t
    );
    localStorage.setItem('tenants', JSON.stringify(updatedTenants));
  };

  const deleteProperty = (propertyId: string) => {
    if (!owner) return;
    
    // Remove property from local state
    setOwnerProperties(prev => prev.filter(property => property.id !== propertyId));
    
    // Remove property from owner's properties list
    const updatedOwner = {
      ...owner,
      properties: owner.properties.filter(id => id !== propertyId)
    };
    setOwner(updatedOwner);
    
    // Remove all tenants from this property
    setPropertyTenants(prev => {
      const newPropertyTenants = { ...prev };
      delete newPropertyTenants[propertyId];
      return newPropertyTenants;
    });
    
    // In a real app, this would be an API call
    const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    const filteredProperties = storedProperties.filter((p: Property) => p.id !== propertyId);
    localStorage.setItem('properties', JSON.stringify(filteredProperties));
    
    // Update owner in localStorage
    const storedOwners = JSON.parse(localStorage.getItem('owners') || '[]');
    const updatedOwners = storedOwners.map((o: Owner) => 
      o.id === owner.id ? updatedOwner : o
    );
    localStorage.setItem('owners', JSON.stringify(updatedOwners));
    
    // Remove tenants from this property
    const storedTenants = JSON.parse(localStorage.getItem('tenants') || '[]');
    const filteredTenants = storedTenants.filter((t: Tenant) => t.propertyId !== propertyId);
    localStorage.setItem('tenants', JSON.stringify(filteredTenants));
  };

  const deleteTenant = (tenantId: string) => {
    // Remove tenant from local state
    setPropertyTenants(prev => {
      const newPropertyTenants = { ...prev };
      Object.keys(newPropertyTenants).forEach(propId => {
        newPropertyTenants[propId] = newPropertyTenants[propId].filter(tenant => tenant.id !== tenantId);
      });
      return newPropertyTenants;
    });
    
    // In a real app, this would be an API call
    const storedTenants = JSON.parse(localStorage.getItem('tenants') || '[]');
    const filteredTenants = storedTenants.filter((t: Tenant) => t.id !== tenantId);
    localStorage.setItem('tenants', JSON.stringify(filteredTenants));
  };

  return (
    <OwnerDataContext.Provider value={{ 
      owner, 
      ownerProperties, 
      propertyTenants, 
      loading, 
      acknowledgeRent,
      addProperty,
      addTenant,
      editProperty,
      editTenant,
      deleteProperty,
      deleteTenant
    }}>
      {children}
    </OwnerDataContext.Provider>
  );
}; 