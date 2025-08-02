import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, UserType } from '../types';
import { tenants, owners } from '../data';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, userType: UserType) => Promise<boolean>;
  logout: () => void;
}

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  userType: null,
  userId: null,
};

const AuthContext = createContext<AuthContextType>({
  ...defaultAuthState,
  login: () => Promise.resolve(false),
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Check if user is already logged in from localStorage
    try {
      const savedAuth = localStorage.getItem('auth');
      if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);
        console.log('Found saved auth state:', parsedAuth);
        return parsedAuth;
      }
    } catch (err) {
      console.error('Error loading auth from localStorage:', err);
      localStorage.removeItem('auth');
    }
    return defaultAuthState;
  });

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    try {
      if (authState.isAuthenticated) {
        console.log('Saving auth state to localStorage:', authState);
        localStorage.setItem('auth', JSON.stringify(authState));
      } else {
        localStorage.removeItem('auth');
      }
    } catch (err) {
      console.error('Error saving auth to localStorage:', err);
    }
  }, [authState]);

  const login = async (email: string, password: string, userType: UserType): Promise<boolean> => {
    console.log('Login attempt:', { email, password, userType });
    
    try {
      // Force lowercase email for consistency
      const normalizedEmail = email.toLowerCase().trim();
      
      // Log available users for debugging
      if (userType === 'tenant') {
        console.log('Available tenants:', tenants.map(t => ({ id: t.id, email: t.email, password: t.password })));
      } else {
        console.log('Available owners:', owners.map(o => ({ id: o.id, email: o.email, password: o.password })));
      }
      
      let user = null;
      
      if (userType === 'tenant') {
        user = tenants.find(t => 
          t.email.toLowerCase() === normalizedEmail && 
          t.password === password
        );
        console.log('Found tenant:', user);
        
        if (user) {
          const newAuthState = {
            isAuthenticated: true,
            userType: 'tenant' as UserType,
            userId: user.id,
          };
          console.log('Setting tenant auth state:', newAuthState);
          setAuthState(newAuthState);
          return true;
        }
      } else if (userType === 'owner') {
        user = owners.find(o => 
          o.email.toLowerCase() === normalizedEmail && 
          o.password === password
        );
        console.log('Found owner:', user);
        
        if (user) {
          const newAuthState = {
            isAuthenticated: true,
            userType: 'owner' as UserType,
            userId: user.id,
          };
          console.log('Setting owner auth state:', newAuthState);
          setAuthState(newAuthState);
          return true;
        }
      }
      
      console.log('Login failed - no matching user found');
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('Logging out');
    setAuthState(defaultAuthState);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 