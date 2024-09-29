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
import { toast } from "@/hooks/use-toast";
import { transporter } from "@/app/api/newsletter/core";
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
  sendOTP: (
    phone_number: string,
    setSendingOTP: (sending: boolean) => void,
    setOtpSend: (sent: boolean) => void
  ) => void;
  verifyOTP: (
    phone_number: string,
    otp: string,
    setVerifyingOTP: (verifying: boolean) => void,
    setIsAccountVerified: (verified: boolean) => void,
    successDescription?: string
  ) => void;
  sendOtpEmail: (options: SendOtpEmailOptions) => Promise<string | null>;
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
interface SendOtpEmailOptions {
  to: string;
  subject: string;
  from?: string;
  setSendingOTP: (sending: boolean) => void;
  setOtpSend: (sent: boolean) => void;
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
      console.log("Fetching user data using ID: ", extendedSession.user);
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
      // console.log("User data fetched: ", userDataObj);
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

  const sendOTP = async (
    phone_number: string,
    setSendingOTP: (sending: boolean) => void,
    setOtpSend: (sent: boolean) => void
  ) => {
    if (!phone_number) {
      console.error("Phone number is required");
      return;
    }
    if (phone_number.length !== 10) {
      console.error("Phone number should be 10 digits");
      return;
    }
    try {
      setSendingOTP(true);
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number }),
      });
      console.log("response:", response);
      if (response.ok) {
        const data = await response.json();
        console.log("OTP sent:", data);
        if (data.otpSent) {
          setOtpSend(true);
          toast({
            title: "OTP Sent!",
            description: "Check your phone for the OTP",
            variant: "default",
          });
        } else {
          console.error("Unexpected response:", data);
        }
      } else {
        console.error("Failed to send OTP:", await response.text());
        toast({
          title: "Failed to send OTP",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setSendingOTP(false);
    }
  };
  const verifyOTP = async (
    phone_number: string,
    otp: string,
    setVerifyingOTP: (verifying: boolean) => void,
    setIsAccountVerified: (verified: boolean) => void,
    successDescription: string = "You can now proceed",
  ) => {
    if (!phone_number || !otp) {
      console.error("Phone number and OTP are required");
      return;
    }
    if (otp.length !== 6) {
      console.error("OTP should be 6 digits");
      return;
    }
    try {
      setVerifyingOTP(true);
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number, otp }),
      });
      console.log("response: ", response);
      if (response.ok) {
        const data = await response.json();
        console.log("OTP verified:", data);
        if (data.verified) {
          setIsAccountVerified(true);
          toast({
            title: "Account Verified!",
            description: successDescription,
            variant: "default",
          });
        } else {
          console.error("Invalid OTP:", data.error);
          toast({
            title: "Invalid OTP",
            description: "Please try again",
            variant: "destructive",
          });
        }
      } else {
        console.error("Failed to verify OTP:", await response.text());
        toast({
          title: "Failed to verify OTP",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setVerifyingOTP(false);
    }
  };
  // const sendEmail = async (options: EmailOptions,toastDetails:ToastOptions) => {
  //   const { successTitle, successDescription } = toastDetails;
  //   try {
  //     const info = await transporter.sendMail(options);
  //     toast({
  //       title: successTitle || "Email Sent!",
  //       description: successDescription || "Check your inbox",
  //       variant: "default",
  //     });
  //     return { success: true, info };
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     toast({
  //       title: "Failed to send email",
  //       description: "Please try again",
  //       variant: "destructive",
  //     });
  //     return { success: false, error };
  //   }
  // };


  const sendOtpEmail = async ({ to,setSendingOTP,setOtpSend, subject, from ='"CSK Textiles" <CSK@gmail.com>' }: SendOtpEmailOptions) => {
    try {
      setSendingOTP(true);
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, from }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast({
          title: 'OTP Sent!',
          description: 'Check your email for the OTP',
          variant: 'default',
        });
        setOtpSend(true);
        if (data.otp)
        return data.otp;
      } else {
        toast({
          title: 'Failed to send OTP',
          description: data.message || 'Please try again',
          variant: 'destructive',
        });
        return null;
      }
    } catch (error) {
      console.error('Error sending OTP email:', error);
      toast({
        title: 'Failed to send OTP',
        description: 'Please try again',
        variant: 'destructive',
      });
      return null;
    } finally{
      setSendingOTP(false);
    }
  };
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
        setToken, sendOTP, verifyOTP, sendOtpEmail
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