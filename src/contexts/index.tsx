import type { ReactNode } from 'react';
import { TenantDataProvider } from './TenantDataContext';
import { OwnerDataProvider } from './OwnerDataContext';
import { ThemeProvider } from './ThemeContext';
import { NotificationProvider } from './NotificationContext';
import { AuthProvider } from './AuthContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <TenantDataProvider>
            <OwnerDataProvider>
              {children}
            </OwnerDataProvider>
          </TenantDataProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

// Re-export individual hooks for convenience
export { useTenantData } from './TenantDataContext';
export { useOwnerData } from './OwnerDataContext';
export { useTheme } from './ThemeContext';
export { useNotifications } from './NotificationContext';
export { useAuth } from './AuthContext';