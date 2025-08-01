import { useState } from 'react';
import { useTenantData } from '../../contexts';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  HomeIcon, 
  CalendarIcon, 
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  GiftIcon
} from '@heroicons/react/24/outline';
import ThemeToggle from '../../components/common/ThemeToggle';
import { useAuth } from '../../contexts';
import { useNavigate } from 'react-router-dom';

const TenantProfile = () => {
  const { tenant } = useTenantData();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  if (!tenant) {
    return <div className="text-center text-red-500">Error loading tenant data</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/tenant/login');
  };

  const handleChangePassword = () => {
    // Placeholder for change password functionality
    alert('Change Password feature will be implemented in a future update.');
  };

  const handlePrivacySettings = () => {
    // Placeholder for privacy settings functionality
    alert('Privacy Settings feature will be implemented in a future update.');
  };

  const handleDataExport = () => {
    // Placeholder for data export functionality
    alert('Data Export feature will be implemented in a future update.');
  };

  return (
    <div className="space-y-6 p-4">
      {/* Profile Header */}
      <div className="card-primary stat-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{tenant.name}</h2>
              <p className="text-white/90 flex items-center font-medium">
                <HomeIcon className="w-4 h-4 mr-1" />
                Unit {tenant.unitNumber}
              </p>
              <p className="text-white/80 text-sm flex items-center mt-1 font-medium">
                <CalendarIcon className="w-4 h-4 mr-1" />
                Member since {new Date(tenant.joinedDate).toLocaleDateString()}
              </p>
              {/* Mobile reward points */}
              <div className="sm:hidden mt-3 p-2 bg-white/10 rounded-lg">
                <div className="text-lg font-bold text-white">{tenant.rewardPoints.toLocaleString()}</div>
                <div className="text-white/90 text-xs font-medium">Reward Points</div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{tenant.rewardPoints.toLocaleString()}</div>
              <div className="text-white/80 text-sm">Reward Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="card-gradient">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
          <UserIcon className="w-6 h-6 mr-2" />
          Account Information
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <EnvelopeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">Email Address</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{tenant.email}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <PhoneIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">Phone Number</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{tenant.phone}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <HomeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">Unit Number</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{tenant.unitNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="card-gradient">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
          <CogIcon className="w-6 h-6 mr-2" />
          App Settings
        </h3>
        
        <div className="space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-indigo-600 dark:text-indigo-400 text-lg">🎨</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Theme</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred theme</p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3">
                <BellIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Push Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive app notifications</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Email Updates */}
          <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mr-3">
                <EnvelopeIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Email Updates</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive email notifications</p>
              </div>
            </div>
            <button
              onClick={() => setEmailUpdates(!emailUpdates)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailUpdates ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailUpdates ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Account Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card-success">
          <h3 className="text-lg font-semibold mb-1">Total Rent Paid</h3>
          <p className="text-3xl font-bold">
            AED {tenant.rentHistory.reduce((sum, rent) => sum + rent.amount, 0).toLocaleString()}
          </p>
          <p className="text-white/80 text-sm mt-2">Lifetime payments</p>
        </div>
        
        <div className="card-warning">
          <h3 className="text-lg font-semibold mb-1">Payments Made</h3>
          <p className="text-3xl font-bold">{tenant.rentHistory.length}</p>
          <p className="text-white/80 text-sm mt-2">Total transactions</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-gradient">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/tenant/referrals')}
            className="flex items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors group"
          >
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mr-4">
              <UserGroupIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">Referrals</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Invite friends and earn rewards</p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">→</span>
          </button>

          <button
            onClick={() => navigate('/tenant/rewards')}
            className="flex items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors group"
          >
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mr-4">
              <GiftIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">Rewards Store</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Redeem your reward points</p>
            </div>
            <span className="text-gray-400 dark:text-gray-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">→</span>
          </button>
        </div>
      </div>

      {/* Recent Rent History */}
      <div className="card-gradient">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
          <CalendarIcon className="w-6 h-6 mr-2" />
          Recent Rent Payments
        </h3>
        
        {tenant.rentHistory.length > 0 ? (
          <div className="space-y-4">
            {tenant.rentHistory
              .sort((a, b) => new Date(b.submissionDate || '').getTime() - new Date(a.submissionDate || '').getTime())
              .slice(0, 5)
              .map((rent) => (
                <div key={rent.id} className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{rent.month}</h4>
                      <span className="font-bold text-gray-900 dark:text-gray-100">AED {rent.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600 dark:text-gray-400">
                          Due: {new Date(rent.dueDate).toLocaleDateString()}
                        </span>
                        {rent.submissionDate && (
                          <span className="text-gray-600 dark:text-gray-400">
                            Submitted: {new Date(rent.submissionDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`status-${rent.status}`}>
                          {rent.status === 'pending' ? 'Awaiting Confirmation' : 
                           rent.status === 'received' ? 'Confirmed' : 
                           rent.status}
                        </span>
                        {rent.status === 'received' && (
                          <span className="text-green-600 dark:text-green-400 text-xs">
                            +{rent.pointsEarned} pts
                          </span>
                        )}
                      </div>
                    </div>
                    {rent.status === 'pending' && (
                      <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <p className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center">
                          <span className="mr-2">⏳</span>
                          Your payment is being reviewed by the property owner
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CalendarIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No rent payments yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your payment history will appear here</p>
          </div>
        )}
      </div>

      {/* Security & Privacy */}
      <div className="card-gradient">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
          <ShieldCheckIcon className="w-6 h-6 mr-2" />
          Security & Privacy
        </h3>
        
        <div className="space-y-3">
          <button onClick={handleChangePassword} className="w-full text-left p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Change Password</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
              </div>
              <span className="text-gray-400 dark:text-gray-500">→</span>
            </div>
          </button>

          <button onClick={handlePrivacySettings} className="w-full text-left p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Privacy Settings</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your privacy preferences</p>
              </div>
              <span className="text-gray-400 dark:text-gray-500">→</span>
            </div>
          </button>

          <button onClick={handleDataExport} className="w-full text-left p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Data Export</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Download your account data</p>
              </div>
              <span className="text-gray-400 dark:text-gray-500">→</span>
            </div>
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="card-gradient border-2 border-red-200 dark:border-red-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
          <span className="font-semibold">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default TenantProfile; 