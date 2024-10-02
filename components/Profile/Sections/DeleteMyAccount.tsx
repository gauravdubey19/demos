"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from "next/image";
import brokenHeartImage from "../../../public/images/brokenHeartSad.png";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { toast } from '@/hooks/use-toast';
import { useGlobalContext } from '@/context/GlobalProvider';
import { set } from 'mongoose';
interface SessionExtended extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    phone_number?: string | null;
    favProducts?: string[];
    role?: string;
  };
}

const DeleteMyAccount = () => {
  const {sendOTP, verifyOTP,sendOtpEmail} = useGlobalContext();
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [isOtpSend, setOtpSend] = useState(false);
  const [sendingOtp, setSendingOTP] = useState(false);
  const [verifyingOtp, setVerifyingOTP] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [otp, setOtp] = useState('');
  const {data: session} = useSession();
  const [emailOtp, setEmailOtp] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  useEffect(() => {
    if (session) {
      const sessionExt = session as SessionExtended;
      setPhoneNumber(sessionExt?.user?.phone_number || '');
      setIsPhoneLogin(!!sessionExt?.user?.phone_number);
    }
  }, [session]);
    
  useEffect(() => {
    console.log('Phone number:', isPhoneLogin);
  }, [isPhoneLogin]);

  const handleDeleteAccount = async () => {
    if (!session) {
      toast({
        title: "Session expired",
        description: "Please sign in again",
        variant: "destructive",
      });
      return;
    }

    const extendedSession = session as SessionExtended;
    if(!extendedSession.user.id) {
      toast({
        title: "Invalid User",
        description: "Please sign in again",
        variant: "destructive",
      });
      return;
    }
    try {
      setDeletingAccount(true);
      const response = await fetch(`/api/users/${extendedSession.user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("jwt");
        signOut();
        toast({
          title: "Account Deleted",
          description: "Your account has been deleted successfully. Please wait while we sign you out.",
          variant: "default",
        });

      } else {
        const errorData = await response.json();
        console.error("Error deleting account:", errorData);
        toast({
          title: "Failed to delete account",
          description: errorData.error || "Please try again",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Failed to delete account",
        description: "Please try again",
        variant: "destructive",
      });
    } finally{
      setDeletingAccount(false);
      setIsOtpOpen(false);
      setOtp('');
      setOtpSend(false);
      setIsAccountVerified(false);
      setEmailOtp('');
    }
  };

  // Handler when the delete button is clicked
  const handleDeleteClick = () => {
    setIsOtpOpen(true); // Trigger OTP dialog
  };

  const handleOtpSubmit =async (e: FormEvent) => {
    e.preventDefault();
    if(isPhoneLogin){
      if (!isOtpSend) {
        sendOTP( phone_number,setSendingOTP,setOtpSend);
      } else if (!isAccountVerified) {
        verifyOTP(phone_number, otp, setVerifyingOTP, setIsAccountVerified,"You can now delete your account");
      } else {
        handleDeleteAccount();
      }
  }else{
      if(!isOtpSend){
        const otp = await sendOtpEmail({
          to: session?.user?.email || '',
          setSendingOTP,
          setOtpSend,
          subject:'OTP for Account Deletion'
        });
        if(!otp){
          toast({
            title: "Failed to send OTP",
            description: "Please try again",
            variant: "destructive",
          });
          return;
        }
        setEmailOtp(otp);
      } else if (!isAccountVerified) {
        if(otp===emailOtp){
          setIsAccountVerified(true);
        }else {
          toast({
            title: "Invalid OTP",
            description: "Please enter the correct OTP",
            variant: "destructive",
          });
        }
      } else {
        handleDeleteAccount();
      }
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <div className="mt-5 text-3xl capitalize text-center px-4 pb-4">
        <div className="flex flex-row items-center justify-center">
          <Image
            src={brokenHeartImage}
            alt="sad image"
            className="object-cover object-center"
            width={300}
            height={300}
          />
        </div>
        <div>
          <h4 className="font-semibold text-xl text-left">
            Do you really want to leave us? Are you sure you don&apos;t want to reconsider? 😢
          </h4>
        </div>

        <div className="text-left mt-4 text-base text-color-tertiary font-dmSans tracking-wide">
          <p className="mb-4">
            We&apos;re sad to see you go! By deleting your account, you&apos;ll miss out on all the amazing
            outfits, exclusive deals, and personalized shopping experiences that we&apos;ve tailored just
            for you. Before you go, please take a moment to reconsider:
          </p>
          <ul className="list-disc list-inside my-4 px-6 ">
            <li className="mb-2">
              <strong>You&apos;ll lose your order history, saved addresses, favorite outfits, and any loyalty points or rewards you&apos;ve earned.</strong>
              Once your account is deleted, this information will no longer be available, and you cannot recover it.
            </li>
            <li className="mb-2">
              <strong>Any pending orders, exchanges, or returns will no longer be accessible.</strong> 
              We will do our best to process any open transactions over the next 30 days, but we cannot guarantee
              tracking once your account is deleted.
            </li>
            <li className="mb-2">
              <strong>If you create a new account using the same email or mobile number, some benefits, such
                as New User discounts, may not be extended to your new account.</strong>
            </li>
            <li className="mb-2">
              <strong>We may delay the account deletion process if you have any pending orders or grievances related to orders, cancellations, or returns.</strong>
            </li>
            <li className="mb-2">
              <strong>Certain data may be retained for legal reasons, such as fraud prevention, abuse detection, regulatory compliance, or legal claims, in accordance with applicable laws.</strong>
            </li>
          </ul>

          <p className="mb-4">
            If you still want to proceed, we understand and respect your decision. Thank you for being
            part of our journey. ❤️
          </p>

          <div className="flex flex-col space-y-4 mt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="mr-2"
                required
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms" className="text-sm">
                I agree to all terms and conditions. *
              </label>
            </div>

            <div className="flex flex-row justify-start gap-x-2 mt-4">
              <Button
                onClick={handleDeleteClick}
                className="bg-white border-1 border-red-500 text-red-500 border px-4 py-2 rounded-md cursor-pointer hover:bg-red-500 hover:text-white transition"
                disabled={!isChecked}
              >
                Delete Account Anyway
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Dialog */}
      <Dialog open={isOtpOpen} onOpenChange={setIsOtpOpen}>
        <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
          <DialogHeader className="w-full">
            <DialogTitle className="text-xl font-normal text-center w-full mb-2">Verify With OTP</DialogTitle>
            <p className="text-base text-gray-600 text-center mb-4" style={{marginBottom:"0.5rem"}}>
              To make sure that it&apos;s you, enter the verification code sent to your {isPhoneLogin?"mobile number ending in ":"email: "} {isPhoneLogin? `XXXXXX${phone_number?.slice(-4)}`:session?.user?.email}.
            </p>
            <div className='text-sm font-semibold' style={{marginBottom:"0.5rem"}}>
              <p>Send Code To:</p>
              {isPhoneLogin?
              <p className="font-normal">+91-XXXXXX{phone_number?.slice(-4)}</p>:
              <p className="font-normal">{session?.user?.email}</p>
            }
            </div>
            <form onSubmit={handleOtpSubmit} className="space-y-4 text-sm">
              {isOtpSend && (
                <>
              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="otp">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="Enter Otp"
                className="border border-gray-300 text-sm rounded-lg focus:ring-[#ffb433] focus:border-[#ffb433] block w-full p-2.5"
                required
                style={{marginTop: '0'}}
                value={otp}
                onChange={(e) => {
                  //allow to enter 6 digit numbers only
                  if (e.target.value.length <= 6 && !isNaN(Number(e.target.value))) {
                    setOtp(e.target.value);
                  }
                }}
              />
              </>
            )}
              <div className="flex justify-center pt-4">
                <Button type="submit" variant={'default'} className={`w-full bg-[#ffb433] font-semibold hover:bg-[#9c6d1b] ${isAccountVerified?
                "bg-red-500 text-white hover:bg-white hover:text-red-500 border  border-red-500":""}`}
                disabled={sendingOtp || verifyingOtp || deletingAccount || !isChecked }
                >
                  {
                    deletingAccount?
                    "Deleting":
                     isAccountVerified
                    ? "Confirm Deletion":
                     isOtpSend?
                     "Verify OTP":
                      verifyingOtp?
                      sendingOtp?
                      "Sending":
                     "Verifying"
                    : "Send OTP"
                  }
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteMyAccount;