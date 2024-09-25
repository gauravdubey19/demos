"use client";
import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signIn } from "next-auth/react";
import { set } from "mongoose";
import { toast } from "@/hooks/use-toast";

export default function LoginForm() {
  const [otpSend, setOtpSend] = useState(false);
  const [phone_number, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sendingOTP, setSendingOTP] = useState(false);
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const {setToken} = useGlobalContext();
  const sendOTP = async () => {
    if (!phone_number) {
      console.error('Phone number is required');
      return;
    }
    if (phone_number.length !== 10) {
      console.error('Phone number should be 10 digits');
      return
    }
    try {
      setSendingOTP(true);
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phone_number }),
      });
console.log("response:", response);
      if (response.ok) {
        const data = await response.json();
        console.log('OTP sent:', data);
        if (data.otpSent) {
          setOtpSend(true);
          toast({
            title: "OTP Sent!",
            description: "Check your phone for the OTP",
            variant: "default",
          });
        } else {
          console.error('Unexpected response:', data);
        }
      } else {
        console.error('Failed to send OTP:', await response.text());
        toast({
          title: "Failed to send OTP",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setSendingOTP(false);
    }

  };

  const verifyOTP = async () => {
    if(!phone_number || !otp){
      console.error('Phone number and OTP are required');
      return;
    }
    if(otp.length !== 6){
      console.error('OTP should be 6 digits');
      return
    }
    try {
      setVerifyingOTP(true);
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phone_number, otp }),
      });
      console.log("response: ", response);
      if (response.ok) {
        const data = await response.json();
        console.log('OTP verified:', data);
        if (data.verified) {
          localStorage.setItem('jwt', data.token);
          // Add your login logic here
          setToken(data.token);
          setRedirecting(true);
          toast({
            title: "Login Successful!",
            description: "Please wait while we redirect you",
            variant: "default",
          });
        } else {
          console.error('Invalid OTP:', data.error);
          toast({
            title: "Invalid OTP",
            description: "Please try again",
            variant: "destructive",
          });
        }
      } else {
        console.error('Failed to verify OTP:', await response.text());
        toast({
          title: "Failed to verify OTP",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setVerifyingOTP(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otpSend) {
      // Send OTP
      console.log("sendOTP");
      await sendOTP();
    } else {
      // Verify OTP
      await verifyOTP();
    }
  };
  return (
    <div className="w-full h-full animate-slide-down">
      <h2 className="text-3xl text-black text-center mb-8 font-semibold">
        Login!
      </h2>
      <div className="w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col items-center "
        >
          <div className="mb-4 w-full">
            <label
              htmlFor="phone"
              className="block text-black text-sm font-bold mb-2"
            >
              Phone
            </label>
            <div className="flex flex-row border border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-white focus:ring-opacity-50 ">
              <div className="flex items-center gap-2 w-[11%]">
                <span className="text-black">+91</span>
                <span className="bg-gray-500 w-[0.5px] h-[70%]"></span>
              </div>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={phone_number}
              onChange={(e) =>{
                //validate 10 digitds only also number only
                if(e.target.value.length <= 10 && /^[0-9]*$/.test(e.target.value)){
                  setPhone(e.target.value)
                }else{
                  return;
                }
              }}
              className="w-[89%] text-black px-3 py-2 rounded-2xl focus:outline-none rounded-l-none"
              required
            />
            </div>
          </div>
          {otpSend && (
            <div className={`mb-4 w-full `}>
              <label
                htmlFor="otp"
                className="block text-black text-sm font-bold mb-2"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => {
                  //set only 6 digit otp
                  if(e.target.value.length <= 6 && /^[0-9]*$/.test(e.target.value)){
                    setOtp(e.target.value)
                  }
                }}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring focus:ring-white focus:ring-opacity-50"
                required
              />
            </div>
          )}
          <div className="w-full flex flex-row justify-end items-center">
            <button
              type="button"
              className="mb-4 text-blue-500 hover:text-blue-700 text-sm text-nowrap"
            >
              Forgot Password?
            </button>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
            disabled={sendingOTP || verifyingOTP || redirecting}
              type="submit"
              className="flex items-center gap-3 py-2 px-5 text-white bg-[#f0d464] rounded-md hover:bg-[#c5ae51] transition-colors duration-300 disabled:opacity-60"
            >
              {otpSend ? verifyingOTP?'Verifying': 'Login' : sendingOTP? 'Sending': 'Send OTP'}
              { verifyingOTP || sendingOTP ?
              "" :
               <LogIn />
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}