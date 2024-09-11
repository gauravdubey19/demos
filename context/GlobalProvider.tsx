"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';

// Define the shape of the context state
interface User {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
    profile?: string;
    dateOfBirth?: Date;
    gender?: string;
    cart?: string[];
    orders?: string[];
  }

  interface GlobalState {
    user: User | null;
    error: string | null;
    fetchUser: () => void;
    isProfileEditing: boolean;
    setProfileEditing: (value: boolean) => void;
    isContactEditing: boolean;
    setContactEditing: (value: boolean) => void;
    userData: User | null;
    setUserData: (value: User | ((prevData: User | null) => User | null)) => void; // Updated type
  }

interface SessionExtended extends Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  
// Create the context with a default value
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Create a provider component
const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProfileEditing, setProfileEditing] = useState(false);
  const [isContactEditing, setContactEditing] = useState(false);
  const [userData, setUserData] = useState<User |null>(user);

  const fetchUser = useCallback (async () => {
    if (!session) {
      return;
    }
    const extendedSession = session as SessionExtended;
    if (!extendedSession.user.id) {
        console.log('session user not avaiable: ', extendedSession);
        signOut();
    //   alert('User ID is null');
      return;
    }
    try {
      const response = await fetch(`/api/users/${extendedSession.user.id}`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Error fetching user');
    }
  }, [session]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    setUserData(user);
  }, [user]);
  return (
    <GlobalContext.Provider value={{ user, error, fetchUser, isProfileEditing, setProfileEditing, isContactEditing, setContactEditing, userData, setUserData
     }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export { GlobalProvider, useGlobalContext };