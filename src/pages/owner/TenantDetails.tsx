import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOwnerData } from '../../contexts';
import { useState } from 'react';
import { 
  UserIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  BuildingOfficeIcon, 
  CalendarIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import type { Tenant, Property } from '../../types';

const TenantDetails = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const { propertyTenants, ownerProperties, loading, acknowledgeRent, deleteTenant } = useOwnerData();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  // Find the tenant in all properties
  let tenant: Tenant | null = null;
  let property: Property | null = null;

  for (const propId in propertyTenants) {
    const foundTenant = propertyTenants[propId].find(t => t.id === tenantId);
    if (foundTenant) {
      tenant = foundTenant;
      property = ownerProperties.find(p => p.id === propId) || null;
      break;
    }
  }

  if (!tenant) {
    return <div className="text-center text-red-500">Tenant not found</div>;
  }

  // Sort rent history by date (newest first)
  const sortedRentHistory = [...tenant.rentHistory].sort((a, b) => {
    return new Date(b.submissionDate || '').getTime() - 
           new Date(a.submissionDate || '').getTime();
  });

  const handleDeleteTenant = () => {
    if (tenantId) {
      deleteTenant(tenantId);
      navigate('/owner', { 
        state: { message: `Tenant "${tenant.name}" has been removed successfully!` }
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link to="/owner" className="text-primary text-sm hover:underline mb-2 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold">{tenant.name}</h1>
            <p className="text-gray-600">Tenant Details</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              to={`/owner/edit-tenant/${tenantId}`}
              className="btn-secondary flex items-center"
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              Edit Tenant
            </Link>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="btn bg-red-500 hover:bg-red-600 text-white flex items-center"
            >
              <TrashIcon className="w-4 h-4 mr-2" />
              Remove Tenant
            </button>
          </div>
        </div>
      </div>

      {/* Tenant Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card col-span-1">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <UserIcon className="h-12 w-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-1">{tenant.name}</h3>
            <p className="text-gray-600 mb-4">Tenant since {new Date(tenant.joinedDate).toLocaleDateString()}</p>
            
            <div className="w-full space-y-2">
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span>{tenant.phone}</span>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span>{tenant.email}</span>
              </div>
              {property && (
                <div className="flex items-center">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span>
                    {property.name}, Unit {tenant.unitNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="card col-span-2">
          <h3 className="text-lg font-semibold mb-4">Rent History</h3>
          
          {sortedRentHistory.length > 0 ? (
            <div className="space-y-4">
              {sortedRentHistory.map(rent => (
                <div key={rent.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{rent.month}</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {rent.submissionDate ? 
                          `Submitted on ${new Date(rent.submissionDate).toLocaleDateString()}` : 
                          'Not submitted yet'
                        }
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">AED {rent.amount.toLocaleString()}</div>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className={`status-${rent.status}`}>
                          {rent.status === 'pending' ? 'Awaiting Confirmation' : 
                           rent.status === 'received' ? 'Confirmed' : 
                           rent.status}
                        </span>
                        {rent.status === 'received' && (
                          <span className="text-green-600 text-xs">✓</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {rent.paymentMethod === 'cheque' && rent.chequeNumber && (
                          <span>Cheque #{rent.chequeNumber}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {rent.status === 'pending' && (
                    <div className="mt-4 pt-3 border-t">
                      <button
                        onClick={() => acknowledgeRent(tenant!.id, rent.id)}
                        className="btn-success py-2 px-4 text-sm"
                      >
                        Mark as Received
                      </button>
                      <p className="text-xs text-gray-600 mt-2">
                        Click to confirm that you have received this payment
                      </p>
                    </div>
                  )}
                  
                  {rent.status === 'received' && (
                    <div className="mt-4 pt-3 border-t">
                      <div className="flex items-center text-green-600">
                        <span className="text-sm font-medium">✓ Payment confirmed</span>
                        <span className="ml-2 text-xs">
                          Tenant earned {rent.pointsEarned} reward points
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No rent history found</p>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrashIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Remove Tenant</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to remove "{tenant.name}" from your properties? This action cannot be undone and will remove all their rent history.
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
                onClick={handleDeleteTenant}
                className="btn bg-red-500 hover:bg-red-600 text-white flex-1 py-3"
              >
                Remove Tenant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDetails; 