import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { BuildingOffice2Icon, UserIcon, LockClosedIcon, BuildingOfficeIcon, SparklesIcon, TrophyIcon } from '@heroicons/react/24/outline';

const TenantLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User already authenticated, redirecting to dashboard');
      navigate('/tenant');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoginAttempted(true);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const success = await login(formData.email, formData.password, 'tenant');
      
      if (success) {
        navigate('/tenant');
      } else {
        setErrors({
          general: 'Invalid email or password. Please check your credentials and try again.'
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors({
        general: 'Login failed. Please try again later.'
      });
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
              <BuildingOfficeIcon className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-shadow">Welcome to RentRewards</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Your gateway to earning rewards for every rent payment. Join thousands of tenants who are maximizing their rental experience.
            </p>
          </div>
          
          {/* Floating Elements */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center text-white/90">
                <SparklesIcon className="w-6 h-6 mr-3 text-yellow-400" />
                <span className="text-sm font-medium">Earn points with every payment</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center text-white/90">
                <TrophyIcon className="w-6 h-6 mr-3 text-blue-400" />
                <span className="text-sm font-medium">Redeem exclusive rewards</span>
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
              <BuildingOffice2Icon className="w-20 h-20 mx-auto text-white/80 mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2 text-shadow">RentRewards</h1>
              <p className="text-white/90 text-shadow">Tenant Portal</p>
            </div>

            {/* Login Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2 text-shadow">Welcome Back</h2>
                <p className="text-white/90 text-shadow">Access your rewards dashboard</p>
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
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                        errors.email ? 'border-red-500' : 'border-white/30'
                      }`}
                      placeholder="Enter your email"
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
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
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                        errors.password ? 'border-red-500' : 'border-white/30'
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                    )}
                  </div>
                </div>

                {errors.general && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-red-400 flex items-center">
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.general}
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                    <p className="text-indigo-400 flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Authenticating...
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/80 text-sm">
                  Are you a property owner?{' '}
                  <Link to="/owner/login" className="text-yellow-300 hover:text-yellow-200 font-semibold transition-colors">
                    Owner Login
                  </Link>
                </p>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-white/15 backdrop-blur-sm rounded-lg border border-white/30">
                <h4 className="text-white font-medium mb-2 text-sm text-shadow">Demo Credentials</h4>
                <p className="text-white/80 text-xs text-shadow">Email: john@example.com</p>
                <p className="text-white/80 text-xs text-shadow">Password: password123</p>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('john@example.com');
                    setPassword('password123');
                  }}
                  className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors backdrop-blur-sm border border-white/20 text-white"
                >
                  Fill Demo Credentials
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default TenantLogin; 