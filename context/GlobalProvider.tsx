"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import jwt from "jsonwebtoken";
// Define the shape of the context state
interface User {
  firstName: string;
  lastName?: string;
  email: string;
  phone_number?: string;
  profile?: string;
  dateOfBirth?: Date;
  gender?: string;
  cart?: string[];
  orders?: string[];
  address?: string;
  role?: string;
  city?: {
    name?: string;
    code?: string;
  };
  state?: {
    name?: string;
    code?: string;
  };
  zip?: string;
  country?: string;
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
  token: string | null;
  setToken: (value: string | ((prevData: string | null) => string | null)) => void;
}

interface SessionExtended extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    favProducts?: string[];
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
  const [userData, setUserData] = useState<User | null>(user);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenTemp = localStorage.getItem("jwt");
    setToken(tokenTemp);
  }, []);

  useEffect(() => {
    if (token) {
      if(!session?.user.id)
      signIn("credentials", { token });
    }
  }, [token, session]);

  const fetchUser = useCallback(async () => {
    if (!session) {
      return;
    }
    const extendedSession = session as SessionExtended;
    if (!extendedSession.user.id) {
      console.log("session user not available: ", extendedSession);
      localStorage.removeItem("jwt");
      signOut();
      //   alert('User ID is null');
      return;
    }
    try {
      // console.log("Fetching user data using ID: ", extendedSession.user);
      const response = await fetch(`/api/users/${extendedSession.user.id}`);
      const contactResponse = await fetch(
        `/api/contact/${extendedSession.user.id}`
      );
      if (!response.ok) {
        setError("Error fetching user");
        return;
      }
      if (!contactResponse.ok) {
        setError("Error fetching contact");
        return;
      }
      const userData = await response.json();
      if(!userData) {
        console.error('User not found');
        localStorage.removeItem("jwt");
        signOut();
        return;
      }
      const contactData = await contactResponse.json();
      const userDataObj = {
        ...userData,
        ...contactData,
      };
      console.log("User data fetched: ", userDataObj);
      setUser(userDataObj);
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Error fetching user");
    }
  }, [session]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        error,
        fetchUser,
        isProfileEditing,
        setProfileEditing,
        isContactEditing,
        setContactEditing,
        userData,
        setUserData,
        token,
        setToken
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export { GlobalProvider, useGlobalContext };