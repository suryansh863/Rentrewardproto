import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts';
import { useState } from 'react';
import ThemeToggle from '../components/common/ThemeToggle';
import NotificationBell from '../components/common/NotificationBell';

const OwnerLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/owner/login');
  };

  return (
    <div className="owner-app min-h-screen">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-800 to-slate-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:inset-0`}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <div className="flex items-center">
            <BuildingOfficeIcon className="w-8 h-8 text-indigo-400 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-white">RentRewards</h1>
              <p className="text-slate-400 text-sm">Owner Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            <NavLink
              to="/owner"
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`
              }
            >
              <HomeIcon className="w-5 h-5 mr-3" />
              Dashboard
            </NavLink>

            <NavLink
              to="/owner/referrals"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`
              }
            >
              <UserGroupIcon className="w-5 h-5 mr-3" />
              Referrals
            </NavLink>
          </div>

          {/* Logout button */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm dark:bg-gray-800/80 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <div className="flex-1 lg:flex lg:items-center lg:justify-between">
              <div className="hidden lg:block">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Property Management</h2>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <NotificationBell />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout; 