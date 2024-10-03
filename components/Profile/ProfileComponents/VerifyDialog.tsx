import React, { useState, useEffect, FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';
import { useGlobalContext } from '@/context/GlobalProvider';
import { set } from 'mongoose';

interface VerifyDialogProps {
  onClose: () => void;
  setIsPhoneVerified: (v: boolean) => void;
  setIsEmailVerified: (v: boolean) => void;
  phoneNumberToVerify?: string;
  emailToVerify?: string;
  verifyType: 'phone' | 'email';
  setIsCancelDialogOpen: (v: boolean) => void;
}

const VerifyDialog: React.FC<VerifyDialogProps> = ({ onClose, setIsPhoneVerified, phoneNumberToVerify, emailToVerify, verifyType, setIsCancelDialogOpen,setIsEmailVerified }) => {
  const { sendOTP, verifyOTP, sendOtpEmail } = useGlobalContext();
  const [isOtpSend, setOtpSend] = useState(false);
  const [sendingOtp, setSendingOTP] = useState(false);
  const [verifyingOtp, setVerifyingOTP] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [apiCalled, setApiCalled] = useState(false); // Flag to prevent multiple API calls

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (apiCalled){
        console.log("API call in progress");
        return;
        }
    setApiCalled(true);
    setVerifying(true);

    // Check if the user already exists
    const queryParam = verifyType === 'phone' ? `phone_number=${phoneNumberToVerify}` : `email=${emailToVerify}`;
    const res = await fetch(`/api/users/ifUserExists?${queryParam}`);
    const data = await res.json();
    setVerifying(false);
    setApiCalled(false); // Reset the flag

    if (data.exists) {
      toast({
        title: "User already exists",
        description: `A user with this ${verifyType} already exists. Please try with another ${verifyType}`,
        variant: "destructive",
      });
      return;
    }

    if (verifyType === 'phone') {
      if (!isOtpSend) {
        sendOTP(phoneNumberToVerify!, setSendingOTP, setOtpSend);
      } else if (!isAccountVerified) {
        verifyOTP(phoneNumberToVerify!, otp, setVerifyingOTP, setIsAccountVerified, "You can now change your phone number");
      } else {
        setIsPhoneVerified(true);
        setIsCancelDialogOpen(false);
      }
    } else {
      if (!isOtpSend) {
        const otp = await sendOtpEmail({
          to: emailToVerify!,
          setSendingOTP,
          setOtpSend,
          subject: 'OTP for Email Verification'
        });
        if (!otp) {
          toast({
            title: "Failed to send OTP",
            description: "Please try again",
            variant: "destructive",
          });
          return;
        }
        setEmailOtp(otp);
      } else if (!isAccountVerified) {
        if (otp === emailOtp) {
          setIsAccountVerified(true);
          setIsEmailVerified(true);
          setIsCancelDialogOpen(false);
        } else {
          toast({
            title: "Invalid OTP",
            description: "Please enter the correct OTP",
            variant: "destructive",
          });
        }
      } else {
        setIsAccountVerified(true);
        setIsEmailVerified(true);
        setIsCancelDialogOpen(false);
      }
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
        <DialogHeader className="w-full">
          <DialogTitle className="text-xl font-normal text-center w-full mb-2">Verify With OTP</DialogTitle>
          <p className="text-base text-gray-600 text-center mb-4" style={{ marginBottom: "0.5rem" }}>
            To make sure that it&apos;s you, enter the verification code sent to your {verifyType === 'phone' ? "mobile number ending in " : "email: "} {verifyType === 'phone' ? `XXXXXX${phoneNumberToVerify?.slice(-4)}` : emailToVerify}.
          </p>
          <div className='text-sm font-semibold' style={{ marginBottom: "0.5rem" }}>
            <p>Send Code To:</p>
            {verifyType === 'phone' ?
              <p className="font-normal">+91-XXXXXX{phoneNumberToVerify?.slice(-4)}</p> :
              <p className="font-normal">{emailToVerify}</p>
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
                  style={{ marginTop: '0' }}
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
              <Button type="submit" variant={'default'} className={`w-full bg-[#ffb433] font-semibold hover:bg-[#9c6d1b] ${isAccountVerified ?
                "bg-red-500 text-white hover:bg-white hover:text-red-500 border  border-red-500" : ""}`}
                disabled={sendingOtp || verifyingOtp || verifying}
              >
                {
                  isAccountVerified
                    ? "Proceed"
                    : isOtpSend
                      ? "Verify OTP"
                      : sendingOtp
                        ? "Sending OTP"
                        : verifying ? "Verifying" :
                        "Verify"
                }
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyDialog;