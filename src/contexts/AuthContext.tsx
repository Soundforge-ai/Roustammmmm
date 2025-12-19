import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  GoogleUser,
  getCurrentUser,
  initiateGoogleLogin,
  logout as googleLogout,
  isLoggedIn as checkIsLoggedIn,
} from '@/lib/auth/google';

interface AuthContextType {
  user: GoogleUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(() => {
    initiateGoogleLogin();
  }, []);

  const logout = useCallback(() => {
    googleLogout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
