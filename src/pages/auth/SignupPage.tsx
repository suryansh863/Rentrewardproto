import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useAuth } from '../../contexts/AuthContext';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupMethod, setSignupMethod] = useState<'email' | 'phone'>('email');
  const [userType, setUserType] = useState<'tenant' | 'owner'>('tenant');

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phoneNumber: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.displayName.trim()) {
      setError('Name is required');
      return false;
    }

    if (signupMethod === 'email' && !formData.email) {
      setError('Email is required');
      return false;
    }

    if (signupMethod === 'phone' && !formData.phoneNumber) {
      setError('Phone number is required');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');

      const signupData = {
        displayName: formData.displayName,
        password: formData.password,
        userType,
        ...(signupMethod === 'email' ? { email: formData.email } : { phoneNumber: formData.phoneNumber })
      };

      await signup(signupData);

      if (signupMethod === 'email') {
        navigate('/verify-email-sent');
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>

        {/* User Type Selection */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => setUserType('tenant')}
            className={`px-4 py-2 rounded-md ${
              userType === 'tenant'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Tenant
          </button>
          <button
            type="button"
            onClick={() => setUserType('owner')}
            className={`px-4 py-2 rounded-md ${
              userType === 'owner'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Owner
          </button>
        </div>

        {/* Signup Method Selection */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => setSignupMethod('email')}
            className={`px-4 py-2 rounded-md ${
              signupMethod === 'email'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setSignupMethod('phone')}
            className={`px-4 py-2 rounded-md ${
              signupMethod === 'phone'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Phone
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="displayName" className="sr-only">Full Name</label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={formData.displayName}
                onChange={handleChange}
              />
            </div>

            {/* Email/Phone Field */}
            {signupMethod === 'email' ? (
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="mb-4">
                <label htmlFor="phone" className="sr-only">Phone number</label>
                <PhoneInput
                  country={'in'}
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  inputProps={{
                    id: 'phone',
                    required: true,
                    className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                  }}
                />
              </div>
            )}

            {/* Password Fields */}
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password (min. 8 characters)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};