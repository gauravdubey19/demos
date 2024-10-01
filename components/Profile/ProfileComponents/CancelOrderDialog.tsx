import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSession } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';
import { useGlobalContext } from '@/context/GlobalProvider';
import { SessionExtended } from '@/app/api/auth/[...nextauth]/route';

interface CancelOrderDialogProps {
  orderId: string;
  onClose: () => void;
  onOrderCancelled: (orderId: string) => void;
}

const CancelOrderDialog: React.FC<CancelOrderDialogProps> = ({ orderId, onClose, onOrderCancelled }) => {
  const { sendOTP, verifyOTP, sendOtpEmail } = useGlobalContext();
  const [isOtpSend, setOtpSend] = useState(false);
  const [sendingOtp, setSendingOTP] = useState(false);
  const [verifyingOtp, setVerifyingOTP] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const { data: session } = useSession();
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);

  useEffect(() => {
    if (session) {
      const sessionExt = session as SessionExtended;
      setPhoneNumber(sessionExt?.user?.phone_number || '');
      setIsPhoneLogin(!!sessionExt?.user?.phone_number);
    }
  }, [session]);

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isPhoneLogin) {
      if (!isOtpSend) {
        sendOTP(phone_number, setSendingOTP, setOtpSend);
      } else if (!isAccountVerified) {
        verifyOTP(phone_number, otp, setVerifyingOTP, setIsAccountVerified, "You can now cancel your order");
      } else {
        handleCancelOrder();
      }
    } else {
      if (!isOtpSend) {
        const otp = await sendOtpEmail({
          to: session?.user?.email || '',
          setSendingOTP,
          setOtpSend,
          subject: 'OTP for Order Cancellation'
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
        } else {
          toast({
            title: "Invalid OTP",
            description: "Please enter the correct OTP",
            variant: "destructive",
          });
        }
      } else {
        handleCancelOrder();
      }
    }
  };

  const handleCancelOrder = async () => {
    if (!session?.user?.id) return;

    const userId = session?.user?.id;
    try {
      const response = await fetch(`/api/orders/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, orderStatus: 'cancelled' }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order cancelled successfully:', data);
        onOrderCancelled(orderId);
        toast({ title: 'Order cancelled successfully' });
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Failed to cancel order:', errorData);
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
        <DialogHeader className="w-full">
          <DialogTitle className="text-xl font-normal text-center w-full mb-2">Verify With OTP</DialogTitle>
          <p className="text-base text-gray-600 text-center mb-4" style={{ marginBottom: "0.5rem" }}>
            To make sure that it&apos;s you, enter the verification code sent to your {isPhoneLogin ? "mobile number ending in " : "email: "} {isPhoneLogin ? `XXXXXX${phone_number?.slice(-4)}` : session?.user?.email}.
          </p>
          <div className='text-sm font-semibold' style={{ marginBottom: "0.5rem" }}>
            <p>Send Code To:</p>
            {isPhoneLogin ?
              <p className="font-normal">+91-XXXXXX{phone_number?.slice(-4)}</p> :
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
                disabled={sendingOtp || verifyingOtp}
              >
                {
                  isAccountVerified
                    ? "Confirm Cancellation"
                    : isOtpSend
                      ? "Verify OTP"
                      : sendingOtp
                        ? "Sending"
                        : "Send OTP"
                }
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderDialog;