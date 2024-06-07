"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User, getIdTokenResult } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  isDriver: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  isDriver: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDriver, setIsDriver] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const tokenResult = await getIdTokenResult(user);
        const driver = tokenResult.claims.driver as boolean; // Assuming you have a custom claim 'driver'
        setIsDriver(driver);
        if (driver) {
          router.push('/pages/routeselect/driver');
        } else {
          router.push('/pages/routeselect/user');
        }
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    await auth.signOut();
    setIsDriver(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, isDriver, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
