import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, CreditCardIcon, GiftIcon, ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts';

const TenantLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/tenant/login');
  };

  return (
    <div className="tenant-app min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">RentRewards</h1>
              <p className="text-indigo-100 text-sm">Tenant Portal</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-20 min-h-screen">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto">
          <div className="bg-white/90 backdrop-blur-lg border-t border-white/50 shadow-2xl">
            <div className="grid grid-cols-4 gap-1 px-2 py-2">
              <NavLink
                to="/tenant"
                end
                className={({ isActive }) =>
                  `nav-link flex-col py-2 ${isActive ? 'nav-link-active text-indigo-600' : 'nav-link-inactive'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <HomeIcon className={`w-6 h-6 mb-1 ${isActive ? 'text-indigo-600' : ''}`} />
                    <span className="text-xs font-medium">Home</span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/tenant/submit-rent"
                className={({ isActive }) =>
                  `nav-link flex-col py-2 ${isActive ? 'nav-link-active text-indigo-600' : 'nav-link-inactive'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <CreditCardIcon className={`w-6 h-6 mb-1 ${isActive ? 'text-indigo-600' : ''}`} />
                    <span className="text-xs font-medium">Pay Rent</span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/tenant/rewards"
                className={({ isActive }) =>
                  `nav-link flex-col py-2 ${isActive ? 'nav-link-active text-indigo-600' : 'nav-link-inactive'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <GiftIcon className={`w-6 h-6 mb-1 ${isActive ? 'text-indigo-600' : ''}`} />
                    <span className="text-xs font-medium">Rewards</span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/tenant/profile"
                className={({ isActive }) =>
                  `nav-link flex-col py-2 ${isActive ? 'nav-link-active text-indigo-600' : 'nav-link-inactive'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <UserIcon className={`w-6 h-6 mb-1 ${isActive ? 'text-indigo-600' : ''}`} />
                    <span className="text-xs font-medium">Profile</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TenantLayout; 