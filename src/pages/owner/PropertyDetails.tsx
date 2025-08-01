import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOwnerData } from '../../contexts';
import { useState } from 'react';
import { 
  UserIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  BuildingOfficeIcon, 
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import type { Tenant } from '../../types';

const PropertyDetails = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { ownerProperties, propertyTenants, loading, deleteProperty } = useOwnerData();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const property = propertyId ? ownerProperties.find(p => p.id === propertyId) : null;
  const tenants = propertyId && propertyTenants[propertyId] ? propertyTenants[propertyId] : [];

  if (!property) {
    return <div className="text-center text-red-500">Property not found</div>;
  }

  // Generate property images based on property type
  const getPropertyImage = (propertyName: string) => {
    const images = {
      'Marina Heights': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'Al Reem Residency': 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
      'Sharjah City Centre Towers': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
    };
    return images[propertyName as keyof typeof images] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80';
  };

  const occupancyRate = Math.round((property.occupiedUnits / property.units) * 100);

  const handleDeleteProperty = () => {
    if (propertyId) {
      deleteProperty(propertyId);
      navigate('/owner', { 
        state: { message: `Property "${property.name}" has been deleted successfully!` }
      });
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/owner" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
            Dashboard
          </Link>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <span className="text-gray-900 dark:text-gray-100">{property.name}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            to={`/owner/edit-property/${propertyId}`}
            className="btn-secondary flex items-center"
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit Property
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="btn bg-red-500 hover:bg-red-600 text-white flex items-center"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete Property
          </button>
        </div>
      </div>

      {/* Property Header */}
             <div className="property-card group">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Image */}
          <div className="relative">
            <img
              src={getPropertyImage(property.name)}
              alt={property.name}
              className="property-image"
            />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                occupancyRate >= 80 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : occupancyRate >= 60 
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {occupancyRate}% Occupied
              </span>
            </div>
          </div>

          {/* Property Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{property.name}</h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                <MapPinIcon className="w-5 h-5 mr-2" />
                {property.address}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Added on {new Date(property.createdDate).toLocaleDateString()}
              </div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Units</p>
                    <p className="text-2xl font-bold">{property.units}</p>
                  </div>
                  <BuildingOfficeIcon className="w-8 h-8 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm">Occupied</p>
                    <p className="text-2xl font-bold">{property.occupiedUnits}</p>
                  </div>
                  <UsersIcon className="w-8 h-8 text-emerald-200" />
                </div>
              </div>
            </div>

            {/* Occupancy Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Occupancy Rate</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{occupancyRate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${occupancyRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tenants Section */}
      <div className="card-gradient">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <UserIcon className="w-6 h-6 mr-2 text-indigo-600" />
            Tenants ({tenants.length})
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {property.units - property.occupiedUnits} units available
          </div>
        </div>
        
        {tenants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tenants.map((tenant: Tenant) => {
              const latestRent = tenant.rentHistory[tenant.rentHistory.length - 1];
              
              return (
                <Link
                  key={tenant.id}
                  to={`/owner/tenant/${tenant.id}`}
                  className="card hover:scale-105 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {tenant.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Unit {tenant.unitNumber}</p>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <PhoneIcon className="w-3 h-3 mr-1" />
                          {tenant.phone}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <EnvelopeIcon className="w-3 h-3 mr-1" />
                          {tenant.email}
                        </div>
                      </div>
                      
                      {latestRent && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Latest Rent</span>
                            <span className={`status-${latestRent.status}`}>
                              {latestRent.status}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <UserIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Tenants Yet</h3>
            <p className="text-gray-600 dark:text-gray-400">This property doesn't have any tenants currently.</p>
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrashIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Delete Property</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to delete "{property.name}"? This action cannot be undone and will also remove all associated tenants.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn-secondary flex-1 py-3"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProperty}
                className="btn bg-red-500 hover:bg-red-600 text-white flex-1 py-3"
              >
                Delete Property
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails; 