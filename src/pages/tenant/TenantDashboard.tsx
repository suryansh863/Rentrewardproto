import { Link } from 'react-router-dom';
import { CreditCardIcon, GiftIcon, UserGroupIcon, SparklesIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useTenantData } from '../../contexts';

const TenantDashboard = () => {
  const { tenant, loading } = useTenantData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!tenant) {
    return <div className="text-center text-red-500">Error loading tenant data</div>;
  }

  // Find the latest rent record
  const latestRent = tenant.rentHistory.length > 0 
    ? tenant.rentHistory[tenant.rentHistory.length - 1] 
    : null;

  // Calculate due date for next month
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 5);
  const nextMonthFormatted = nextMonth.toLocaleDateString('default', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6 p-4">
      {/* Welcome Header with gradient */}
      <div className="card-gradient hero-pattern">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome back, {tenant.name}! 👋
            </h2>
            <p className="text-gray-600 flex items-center">
              <SparklesIcon className="w-4 h-4 mr-1" />
              Unit {tenant.unitNumber} • Member since {new Date(tenant.joinedDate).getFullYear()}
            </p>
          </div>
          <div className="hidden sm:block">
            <TrophyIcon className="w-16 h-16 text-yellow-500 animate-pulse-slow" />
          </div>
        </div>
      </div>

      {/* Rent Status Card */}
      <div className="card-gradient">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-primary flex items-center">
            <CreditCardIcon className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            Rent Status
          </h3>
          <Link 
            to="/tenant/submit-rent" 
            className="btn-primary px-4 py-2 text-sm"
          >
            Submit Rent
          </Link>
        </div>

        {latestRent ? (
          <div className="card-content-bg rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-secondary">Last Payment</span>
                <div className="text-xl font-bold text-primary">AED {latestRent.amount.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-sm text-secondary">Month</span>
                <div className="font-semibold text-primary">{latestRent.month}</div>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm text-secondary">Status</span>
              <div className="flex items-center space-x-2">
                <span className={`status-${latestRent.status}`}>
                  {latestRent.status === 'pending' ? 'Awaiting Confirmation' : 
                   latestRent.status === 'received' ? 'Confirmed' : 
                   latestRent.status}
                </span>
                {latestRent.status === 'pending' && (
                  <span className="text-xs text-yellow-600 dark:text-yellow-400">⏳</span>
                )}
                {latestRent.status === 'received' && (
                  <span className="text-xs text-green-600 dark:text-green-400">✓</span>
                )}
              </div>
            </div>
            {latestRent.status === 'pending' && (
              <div className="mt-3 p-3 info-box rounded-lg">
                <p className="text-xs info-box-text flex items-center">
                  <span className="mr-2">ℹ️</span>
                  Your payment is being reviewed by the property owner. You'll receive confirmation soon.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center text-secondary mb-4">
            No rent history found
          </div>
        )}

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800/50">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Next Due Date</span>
            <span className="font-bold text-green-800 dark:text-green-200">{nextMonthFormatted}</span>
          </div>
        </div>
      </div>

      {/* Reward Points - Enhanced */}
      <div className="card-primary stat-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <SparklesIcon className="w-5 h-5 mr-2" />
              Your Reward Points
            </h3>
            <p className="text-4xl font-bold mb-4">{tenant.rewardPoints.toLocaleString()}</p>
            <Link 
              to="/tenant/rewards" 
              className="inline-flex items-center text-white/90 hover:text-white font-medium transition-colors"
            >
              Redeem Rewards <GiftIcon className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="hidden sm:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <GiftIcon className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link 
          to="/tenant/submit-rent" 
          className="card-gradient hover:scale-105 transition-transform duration-200 group"
        >
          <div className="flex items-center p-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <CreditCardIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">Submit Rent</h4>
              <p className="text-sm text-secondary">Pay your monthly rent</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/tenant/referrals" 
          className="card-gradient hover:scale-105 transition-transform duration-200 group"
        >
          <div className="flex items-center p-2">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <UserGroupIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">Refer & Earn</h4>
              <p className="text-sm text-secondary">Invite friends for rewards</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      {tenant.rentHistory.length > 0 && (
        <div className="card-gradient">
          <h3 className="text-lg font-semibold text-primary mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {tenant.rentHistory.slice(-3).reverse().map((rent) => (
              <div key={rent.id} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                    <CreditCardIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-primary">{rent.month}</div>
                    <div className="text-sm text-secondary">AED {rent.amount.toLocaleString()}</div>
                  </div>
                </div>
                <span className={`status-${rent.status}`}>{rent.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDashboard; 