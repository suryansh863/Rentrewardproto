import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { BuildingOfficeIcon, UserIcon, LockClosedIcon, ChartBarIcon, BuildingOffice2Icon, UsersIcon } from '@heroicons/react/24/outline';

const OwnerLogin = () => {
  const [email, setEmail] = useState('meera@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password, 'owner');
      if (success) {
        navigate('/owner');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Section */}
      <div className="relative flex-1 hidden lg:flex items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
              <BuildingOffice2Icon className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-shadow">Property Management</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Streamline your property management with powerful tools for tracking tenants, rent, and rewards.
            </p>
          </div>
          
          {/* Floating Elements */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center text-white/90">
                <ChartBarIcon className="w-6 h-6 mr-3 text-green-400" />
                <span className="text-sm font-medium">Comprehensive analytics</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center text-white/90">
                <UsersIcon className="w-6 h-6 mr-3 text-purple-400" />
                <span className="text-sm font-medium">Tenant management</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Hero */}
          <div className="lg:hidden text-center mb-8">
            <BuildingOfficeIcon className="w-20 h-20 mx-auto text-white/80 mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2 text-shadow">RentRewards</h1>
            <p className="text-white/90 text-shadow">Owner Portal</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2 text-shadow">Welcome Back</h2>
              <p className="text-white/90 text-shadow">Access your property dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2 text-shadow">
                  Email Address
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2 text-shadow">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <p className="error-text flex items-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="text-center">
                <Link 
                  to="/tenant/login" 
                  className="text-white/80 hover:text-white text-sm transition-colors"
                >
                  Are you a tenant? Sign in here
                </Link>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-white/15 backdrop-blur-sm rounded-lg border border-white/30">
                <h4 className="text-white font-medium mb-2 text-sm text-shadow">Demo Credentials</h4>
                <p className="text-white/80 text-xs text-shadow">Email: meera@example.com</p>
                <p className="text-white/80 text-xs text-shadow">Password: password123</p>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('meera@example.com');
                    setPassword('password123');
                  }}
                  className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors backdrop-blur-sm border border-white/20 text-white"
                >
                  Fill Demo Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin; 