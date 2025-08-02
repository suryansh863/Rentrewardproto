import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useOwnerData } from '../../contexts';
import { 
  BuildingOfficeIcon, 
  UsersIcon, 
  ClockIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  PhotoIcon,
  ArrowsPointingOutIcon
} from '@heroicons/react/24/outline';
import type { Tenant, RentRecord } from '../../types';
import PaymentConfirmationModal from '../../components/common/PaymentConfirmationModal';

const OwnerDashboard = () => {
  const { owner, ownerProperties, propertyTenants, loading, acknowledgeRent } = useOwnerData();
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedRent, setSelectedRent] = useState<{
    tenant: Tenant;
    rentRecord: RentRecord;
    propertyName: string;
  } | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get('success');
    if (message) {
      setSuccessMessage(decodeURIComponent(message));
      // Clear the message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  }, [location]);

  const handleMarkAsReceived = (tenant: Tenant, rentRecord: RentRecord) => {
    const property = ownerProperties.find(p => p.id === tenant.propertyId);
    if (property) {
      setSelectedRent({
        tenant,
        rentRecord,
        propertyName: property.name
      });
      setShowConfirmationModal(true);
    }
  };

  const handleConfirmPayment = () => {
    if (selectedRent) {
      acknowledgeRent(selectedRent.tenant.id, selectedRent.rentRecord.id);
      setSelectedRent(null);
    }
  };

  const handleViewChequeImage = (chequePhoto: string | undefined) => {
    if (chequePhoto) {
      setExpandedImage(chequePhoto);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!owner) {
    return <div className="text-center text-red-500">Error loading owner data</div>;
  }

  // Count total tenants across all properties
  const totalTenants = Object.values(propertyTenants).reduce(
    (total, tenants) => total + tenants.length,
    0
  );

  // Count pending rent submissions
  const pendingRentSubmissions = Object.values(propertyTenants).reduce((total, tenants) => {
    return total + tenants.reduce((count, tenant) => {
      const pendingSubmissions = tenant.rentHistory.filter(
        rent => rent.status === 'pending' // Changed from 'submitted' to 'pending'
      ).length;
      return count + pendingSubmissions;
    }, 0);
  }, 0);

  // Generate property images
  const getPropertyImage = (propertyName: string) => {
    const images = {
      'Marina Heights': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
      'Al Reem Residency': 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80',
      'Sharjah City Centre Towers': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80'
    };
    return images[propertyName as keyof typeof images] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80';
  };

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Header */}
      <div className="card-gradient hero-pattern">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Welcome back, {owner.name}! 🏢
            </h1>
            <p className="text-gray-600 dark:text-gray-400 flex items-center">
              <ChartBarIcon className="w-4 h-4 mr-1" />
              Manage your properties and track rent payments
            </p>
          </div>
          <div className="hidden lg:block">
            <ArrowTrendingUpIcon className="w-20 h-20 text-indigo-500 animate-pulse-slow" />
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          <p className="success-text flex items-center">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {successMessage}
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-primary stat-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Properties</h3>
              <p className="text-4xl font-bold">{ownerProperties.length}</p>
              <p className="text-white/80 text-sm mt-2">Total properties managed</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <BuildingOfficeIcon className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        
        <div className="card-success stat-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Tenants</h3>
              <p className="text-4xl font-bold">{totalTenants}</p>
              <p className="text-white/80 text-sm mt-2">Active tenants</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <UsersIcon className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        
        <div className="card-warning stat-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Pending Rent</h3>
              <p className="text-4xl font-bold">{pendingRentSubmissions}</p>
              <p className="text-white/80 text-sm mt-2">Awaiting approval</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <ClockIcon className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-gradient">
        <h3 className="text-xl font-bold text-primary mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            to="/owner/add-property"
            className="flex items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors group"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
              <BuildingOfficeIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-primary group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Add Property</h4>
              <p className="text-sm text-secondary">Add a new property to your portfolio</p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">→</span>
          </Link>

          <Link 
            to="/owner/add-tenant"
            className="flex items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors group"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
              <UsersIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-primary group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Add Tenant</h4>
              <p className="text-sm text-secondary">Add a new tenant to your properties</p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">→</span>
          </Link>
        </div>
      </div>

      {/* Properties List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Your Properties</h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {ownerProperties.length} {ownerProperties.length === 1 ? 'property' : 'properties'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {ownerProperties.map(property => {
            const occupancyRate = Math.round((property.occupiedUnits / property.units) * 100);
            
            return (
              <Link 
                key={property.id} 
                to={`/owner/property/${property.id}`}
                className="property-card group"
              >
                {/* Property Image */}
                <div className="relative">
                  <img
                    src={getPropertyImage(property.name)}
                    alt={property.name}
                    className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      occupancyRate >= 80 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : occupancyRate >= 60 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {occupancyRate}%
                    </span>
                  </div>
                </div>

                {/* Property Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {property.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{property.address}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{property.units}</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">Total Units</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{property.occupiedUnits}</div>
                      <div className="text-xs text-green-600 dark:text-green-400">Occupied</div>
                    </div>
                  </div>

                  {/* Occupancy Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Occupancy</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{occupancyRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${occupancyRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Rent Submissions */}
      <div className="card-gradient">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Recent Rent Submissions</h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Latest activity
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Cheque
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {Object.entries(propertyTenants).flatMap(([propertyId, tenants]) => {
                const property = ownerProperties.find(p => p.id === propertyId);
                
                return tenants.flatMap(tenant => {
                  // Get the most recent rent submissions
                  const recentSubmissions = [...tenant.rentHistory]
                    .sort((a, b) => {
                      return new Date(b.submissionDate || '').getTime() - 
                             new Date(a.submissionDate || '').getTime();
                    })
                    .slice(0, 2);
                  
                  return recentSubmissions.map(rent => (
                    <tr key={`${tenant.id}-${rent.id}`} className="hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/owner/tenant/${tenant.id}`} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                          {tenant.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                        {property?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        AED {rent.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                        {rent.submissionDate ? new Date(rent.submissionDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`status-${rent.status}`}>
                          {rent.status === 'pending' ? 'Awaiting Confirmation' : 
                           rent.status === 'received' ? 'Confirmed' : 
                           rent.status === 'submitted' ? 'Submitted' :
                           rent.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {rent.paymentMethod === 'cheque' && rent.chequePhoto && (
                          <button
                            onClick={() => handleViewChequeImage(rent.chequePhoto)}
                            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs"
                          >
                            <PhotoIcon className="w-4 h-4 mr-1" />
                            View Cheque
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {rent.status === 'pending' && (
                          <button 
                            onClick={() => handleMarkAsReceived(tenant, rent)}
                            className="btn-success px-3 py-1 text-xs"
                          >
                            Mark as Received
                          </button>
                        )}
                        {rent.status === 'received' && (
                          <span className="text-green-600 dark:text-green-400 text-xs font-medium">
                            ✓ Confirmed
                          </span>
                        )}
                      </td>
                    </tr>
                  ));
                });
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showConfirmationModal && selectedRent && (
        <PaymentConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirmPayment}
          tenant={selectedRent.tenant}
          rentRecord={selectedRent.rentRecord}
          propertyName={selectedRent.propertyName}
        />
      )}

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={() => setExpandedImage(null)}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={expandedImage} 
              alt="Expanded cheque" 
              className="max-w-full max-h-[80vh] object-contain mx-auto"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(expandedImage, '_blank');
                }}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors inline-flex items-center"
              >
                <ArrowsPointingOutIcon className="w-4 h-4 mr-2" />
                Open in New Tab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard; 