"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { toast } from "@/hooks/use-toast";

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
  zipCode?: string;
  country?: string;
  favProducts?: string[];
}

export interface Address {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone_number: string;
  zipCode: string;
  state: {
    name: string;
    code: string;
  };
  city: {
    name: string;
    code: string;
  };
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  createdAt: string;
}
export interface AddressClient {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  pincode: string;
  state: {
    name: string;
    code: string;
  };
  city: {
    name: string;
    code: string;
  };
}
export type Product = {
  productId: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: {
    title: string;
    color: string
  };
  timestamps: string;
  categorySlug: string;
};
export interface AllOrdersProps {
  fetchedOrders: Order[];
  isSearch?: boolean;
  fetchingOrders?: boolean;
}
export type Order = {
  _id: string;
  userId: string;
  orderedProducts: Product[];
  orderInfo: {
    customerName?: string;
    orderStatus: string;
    totalPrice: number;
    orderDate: string;
    orderID: string;
    deliveryDate?: string;
    shippingDate?: string;
    shippingAddress?: string;
    cancelledDate?: string;
    zipCode?: string;
  };
  timestamps: string;
};

export type UserDataAdmin = {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profile?: string;
  phone_number?: string;
};
export type UserDataAddress = {
  shippingAddress: string;
  zipCode: string;
}
export type OrderAdminSide = {
  _id: string;
  userId: UserDataAdmin;
  orderedProducts: Product[];
  orderInfo: {
    customerName?: string;
    orderStatus: string;
    totalPrice: number;
    orderDate: string;
    orderID: string;
    deliveryDate?: string;
    shippingDate?: string;
    shippingAddress?: string;
    cancelledDate?: string;
    zipCode?: string;
  };
  timestamps: string;
};
export interface Review {
  _id: string;
  username: string;
  userAvatar: string;
  review_descr: string;
  rating: number;
  productId: string;
  userId: string;
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
  ) => Promise<boolean>;
  sendOtpEmail: (options: SendOtpEmailOptions) => Promise<string | null>;
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;  
  addressLoading: boolean;
  setAddressLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAddresses: string[];
  setSelectedAddresses: React.Dispatch<React.SetStateAction<string[]>>;
  handleDeleteAddresses: () => void;
  editAddressData: AddressClient;
  setEditAddressData: React.Dispatch<
    React.SetStateAction<AddressClient>>;
  suggestions: Order[];
  setSuggestions: React.Dispatch<React.SetStateAction<Order[]>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  searchLoading: boolean;
  setSearchLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  fetchedOrders: Order[];
  fetchingOrders: boolean;
  fetchAddresses: (userId: string) => Promise<{ addresses: Address[] } | null>;
  setFetchingOrders: React.Dispatch<React.SetStateAction<boolean>>;
  setFetchedOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  fetchReviews: (productId: string) => Promise<Review[]>;
  deletingAddresses: boolean;
  setDeletingAddresses: React.Dispatch<React.SetStateAction<boolean>>;
  fetchOrders: () => Promise<void>;
  getAddresses: () => Promise<void>;
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
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressLoading, setAddressLoading] = useState(true);
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]); // Create selected state
  const [suggestions, setSuggestions] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState("allOrders");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deletingAddresses, setDeletingAddresses] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [fetchingOrders, setFetchingOrders] = useState<boolean>(false);
  const [fetchedOrders, setFetchedOrders] = useState<Order[]>([]);

  const [editAddressData, setEditAddressData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    state: { name: "Select a state", code: "" },
    city: { name: "Select a city", code: "" },
    pincode: "",
  });

  const fetchAddresses = async (userId: string): Promise<{ addresses: Address[] } | null> => {
    try {
      const response = await fetch(`/api/addresses/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return null;
    }
  };

  
  const getAddresses = async () => {
    setAddressLoading(true);
    if (session?.user?.id && !addresses.length) {
      console.log('Fetching addresses');
      const data = await fetchAddresses(session.user.id);
      console.log('Addresses:', data);
      if (data) {
        setAddresses(data.addresses || []);
      }
    }
    setAddressLoading(false);
  };
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
    if(user){
      return;
    }
    try {
      const response = await fetch(`/api/users/${extendedSession.user.id}`);
      const contactResponse = await fetch(
        `/api/contact/${extendedSession.user.id}`
      );
      if (!response.ok) {
        setError("Error fetching user");
        signOut();
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
      toast({
        title: "Error fetching user",
        description: "Please try again",
        variant: "destructive",
      });
      signOut();
      setError("Error fetching user");
    }
  }, [session,user]);

      // utils/fetchReviews.ts
      const fetchReviews = async (productId: string) => {
        try {
          const res = await fetch(
            `/api/reviews/get/getReviewsProduct?productId=${productId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
      
          if (!res.ok) {
            throw new Error("Failed to fetch reviews");
          }
      
          const data = await res.json();
          return data.reviews;
        } catch (error) {
          console.error("Error fetching reviews:", error);
          throw error;
        }
      };

      const fetchOrders = async () => {
        console.log("Fetching Orders real");
        const userId = session?.user?.id;
        try{
        setFetchingOrders(true);
        const response = await fetch(`/api/orders/${userId}`);
        const data = await response.json();
        console.log("Data orders:",data);
        setFetchedOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setFetchingOrders(false);
        }
      }
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
    ): Promise<boolean> => {
      if (!phone_number || !otp) {
        console.error("Phone number and OTP are required");
        return false;
      }
      if (otp.length !== 6) {
        console.error("OTP should be 6 digits");
        return false;
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
            return true;
          } else {
            console.error("Invalid OTP:", data.error);
            toast({
              title: "Invalid OTP",
              description: "Please try again",
              variant: "destructive",
            });
            return false;
          }
        } else {
          console.error("Failed to verify OTP:", await response.text());
          toast({
            title: "Failed to verify OTP",
            description: "Please try again",
            variant: "destructive",
          });
          return false;
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast({
          title: "Failed to verify OTP",
          description: "Please try again",
          variant: "destructive",
        });
        return false;
      } finally {
        setVerifyingOTP(false);
      }
    };
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
const handleDeleteAddresses = async () => {
    if (selectedAddresses.length === 0) {
      toast({
        title: "No addresses selected",
        description: "Please select addresses to delete",
        variant: "destructive",
      });
      return;
    }
    console.log("Deleting addresses:", selectedAddresses);
    try {
      setDeletingAddresses(true);
      const response = await fetch(`/api/addresses/${session?.user?.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addressIds: selectedAddresses }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Success",
          description: data.message,
        });
        const updatedAddresses = addresses.filter(
          (address) => !selectedAddresses.includes(address._id)
        );
        setAddresses(updatedAddresses);
        setSelectedAddresses([]);
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData?.error || "Error deleting addresses",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting addresses:", error);
      toast({
        title: "Error",
        description: "Error deleting addresses",
        variant: "destructive",
      });
    } finally {
      setDeletingAddresses(false);
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
        setToken, sendOTP, verifyOTP, sendOtpEmail,
        addresses, setAddresses, addressLoading,
        selectedAddresses, setSelectedAddresses,
        handleDeleteAddresses, editAddressData, setEditAddressData, suggestions, setSuggestions, activeTab, setActiveTab,
        searchLoading, setSearchLoading,
        searchQuery, setSearchQuery, fetchedOrders, fetchingOrders, setFetchingOrders, setFetchedOrders,
        fetchReviews, deletingAddresses, setDeletingAddresses,
        setAddressLoading,fetchAddresses, fetchOrders,
        getAddresses
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