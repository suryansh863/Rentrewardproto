import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export const VerifyEmailSentPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState('');

  const handleResendEmail = async () => {
    try {
      setResending(true);
      setMessage('');
      
      // Call the resend verification endpoint
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: localStorage.getItem('pendingVerificationEmail') }),
      });

      if (response.ok) {
        setMessage('Verification email has been resent!');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to resend verification email');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to resend verification email');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent you a verification email. Please check your inbox and click the verification link.
          </p>
        </div>

        {message && (
          <div className={`rounded-md p-4 ${
            message.includes('Failed') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            <p className="text-sm">{message}</p>
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleResendEmail}
            disabled={resending}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              resending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {resending ? 'Resending...' : 'Resend verification email'}
          </button>

          <button
            onClick={() => navigate('/login')}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};