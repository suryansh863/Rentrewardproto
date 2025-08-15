import { Link } from 'react-router-dom';
import { 
  CreditCardIcon, 
  GiftIcon, 
  UserGroupIcon, 
  SparklesIcon, 
  TrophyIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useTenantData } from '../../contexts';

const TenantDashboard = () => {
  const { tenant, loading } = useTenantData();

  if (loading) {
    return (
      <div className="space-y-6 p-4">
        {/* Loading skeleton for welcome header */}
        <div className="card-gradient hero-pattern animate-pulse">
          <div className="h-24 flex items-center">
            <div className="space-y-3">
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* Loading skeleton for rent status */}
        <div className="card-gradient animate-pulse">
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded"></div>
          </div>
        </div>

        {/* Loading skeleton for reward points */}
        <div className="card-primary stat-card animate-pulse">
          <div className="h-32 flex items-center">
            <div className="space-y-3">
              <div className="h-6 w-40 bg-white/20 rounded"></div>
              <div className="h-10 w-24 bg-white/30 rounded"></div>
            </div>
          </div>
        </div>
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
          <div className="card-content-bg rounded-lg p-6 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <span className="text-sm text-secondary">Last Payment</span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-bold text-primary">AED {latestRent.amount.toLocaleString()}</span>
                    <span className="ml-2 text-sm text-secondary">for {latestRent.month}</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-secondary">Payment Status</span>
                  <div className="mt-2">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      latestRent.status === 'received' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      latestRent.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {latestRent.status === 'pending' && <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>}
                      {latestRent.status === 'received' && <CheckCircleIcon className="w-4 h-4 mr-2" />}
                      {latestRent.status === 'pending' ? 'Awaiting Confirmation' : 
                       latestRent.status === 'received' ? 'Payment Confirmed' : 
                       latestRent.status}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-6 md:pt-0 md:pl-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-secondary">Submission Date</span>
                    <div className="mt-1 font-medium text-primary">
                      {new Date(latestRent.submissionDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-secondary">Points Earned</span>
                    <div className="mt-1 flex items-center">
                      <SparklesIcon className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="font-medium text-primary">+{latestRent.pointsEarned} points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {latestRent.status === 'pending' && (
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Your payment is being reviewed by the property owner. You'll receive confirmation soon.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center">
              <CreditCardIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
              <p className="text-gray-600 dark:text-gray-300 mb-2">No rent history found</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Submit your first rent payment to start earning rewards</p>
            </div>
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
      <div className="card-primary stat-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Your Reward Points
                </h3>
                <div className="flex items-baseline">
                  <p className="text-5xl font-bold">{tenant.rewardPoints.toLocaleString()}</p>
                  <span className="ml-2 text-white/70">points</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link 
                  to="/tenant/rewards" 
                  className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
                >
                  Redeem Rewards
                  <GiftIcon className="ml-2 w-4 h-4" />
                </Link>
                
                <Link
                  to="/tenant/referrals"
                  className="inline-flex items-center text-white/80 hover:text-white font-medium transition-colors"
                >
                  Earn More
                  <ArrowRightIcon className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="hidden sm:flex flex-col items-center space-y-2">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <TrophyIcon className="w-12 h-12 text-yellow-300" />
              </div>
              <span className="text-sm text-white/70">Gold Tier</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/70">Progress to Platinum</span>
              <span className="text-white/90">75%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"
                style={{ width: '75%' }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-white/70">
              Earn 2,500 more points to reach Platinum tier
            </p>
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