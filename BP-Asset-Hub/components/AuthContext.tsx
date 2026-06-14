'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, code: string, username?: string) => Promise<void>;
  logout: () => Promise<void>;
  createAccount: (email: string, username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedToken = localStorage.getItem('bp_auth_token');
    if (storedToken) {
      verifyToken(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(token);
      } else {
        localStorage.removeItem('bp_auth_token');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('bp_auth_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, code: string, username?: string) => {
    const response = await fetch('/api/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, username }),
    });
    const data = await response.json();
    if (data.success && data.user && data.token) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('bp_auth_token', data.token);
    } else {
      throw new Error(data.error || 'Login failed');
    }
  };

  const logout = async () => {
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('bp_auth_token');
  };

  const createAccount = async (email: string, username: string) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username }),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Signup failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, createAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
