import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiRequest } from '../config/api';

type UserType = 'tenant' | 'owner' | null;

interface AuthContextType {
  userId: string | null;
  userType: UserType;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<boolean>;
  signup: (data: {
    email?: string;
    phoneNumber?: string;
    password: string;
    displayName: string;
    userType: UserType;
  }) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  logout: () => void;
  isVerified: boolean;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  userType: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const { userId, userType, isVerified } = JSON.parse(storedAuth);
      setUserId(userId);
      setUserType(userType);
      setIsAuthenticated(true);
      setIsVerified(isVerified);
    }
  }, []);

  const login = async (identifier: string, password: string): Promise<boolean> => {
    try {
      // Input validation
      if (!identifier || !password) {
        throw new Error('Please provide all required fields');
      }

      // First, test the API connection
      try {
        const testResponse = await apiRequest('/api/test');
        console.debug('API Test Response:', testResponse);
      } catch (testError) {
        console.error('API Test Failed:', testError);
        throw new Error('Unable to connect to server. Please check your connection.');
      }

      // Proceed with login
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
      });

      if (!data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }
      
      // Store authentication state and JWT token
      const authData = {
        userId: data.data.userId,
        userType: data.data.userType,
        isVerified: data.data.isVerified,
      };
      localStorage.setItem('auth', JSON.stringify(authData));
      localStorage.setItem('token', data.data.token);

      setUserId(data.data.userId);
      setUserType(data.data.userType);
      setIsAuthenticated(true);
      setIsVerified(data.data.isVerified);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  };

  const signup = async (data: {
    email?: string;
    phoneNumber?: string;
    password: string;
    displayName: string;
    userType: UserType;
  }): Promise<boolean> => {
    try {
      // Input validation
      if (!data.password || data.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      if (!data.email && !data.phoneNumber) {
        throw new Error('Either email or phone number is required');
      }

      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        throw new Error('Invalid email format');
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Log response status for debugging
      console.debug('Signup response status:', response.status);

      let responseData;
      try {
        const text = await response.text();
        console.debug('Raw response:', text);
        responseData = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.error || 'Signup failed');
      }

      // Store email temporarily if verification is needed
      if (data.email) {
        localStorage.setItem('pendingVerificationEmail', data.email);
      }
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      if (!token) {
        throw new Error('Verification token is required');
      }

      const response = await fetch(`/api/auth/verify/${token}`);
      
      // Log response status for debugging
      console.debug('Verification response status:', response.status);

      let data;
      try {
        const text = await response.text();
        console.debug('Raw response:', text);
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Verification failed');
      }
      
      // Update verification status if user is currently logged in
      if (userId === data.userId) {
        setIsVerified(true);
        const currentAuth = JSON.parse(localStorage.getItem('auth') || '{}');
        localStorage.setItem('auth', JSON.stringify({ ...currentAuth, isVerified: true }));
      }

      // Clear stored email after successful verification
      localStorage.removeItem('pendingVerificationEmail');

      return true;
    } catch (error) {
      console.error('Verification error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    setUserId(null);
    setUserType(null);
    setIsAuthenticated(false);
    setIsVerified(false);
  };

  return (
    <AuthContext.Provider value={{
      userId,
      userType,
      isAuthenticated,
      isVerified,
      login,
      signup,
      verifyEmail,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};