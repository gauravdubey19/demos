"use client";
import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signIn } from "next-auth/react";
import { set } from "mongoose";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";

export default function LoginForm() {
  const [otpSend, setOtpSend] = useState(false);
  const [phone_number, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sendingOTP, setSendingOTP] = useState(false);
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { setToken } = useGlobalContext();
  const sendOTP = async () => {
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
      const response = await fetch("/api/authOtp/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: phone_number }),
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

  const verifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const response = await fetch("/api/authOtp/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: phone_number, otp }),
      });
      console.log("response: ", response);
      if (response.ok) {
        const data = await response.json();
        console.log("OTP verified:", data);
        if (data.verified) {
          localStorage.setItem("jwt", data.token);
          // Add your login logic here
          setToken(data.token);
          setRedirecting(true);
          signIn("credentials", { token: data.token });

          toast({
            title: "Login Successful!",
            description: "Please wait while we redirect you",
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otpSend) {
      // Send OTP
      console.log("sendOTP");
      await sendOTP();
    } else {
      // Verify OTP
      await verifyOTP(e);
    }
  };
  return (
    <div className="w-full h-fit animate-slide-down">
      <div className="w-full flex-center mb-4">
        <Image
          src="/logo.png"
          alt="LoGo"
          width={200}
          height={200}
          objectFit="cover"
          className="md:hidden w-20 h-20 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] overflow-hidden"
        />
      </div>
      <h2 className="text-3xl text-black text-balanc text-center mb-8 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
        Welcome To CSK Textile!
      </h2>
      <div className="w-full flex-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col items-center"
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
                <span className="text-black ml-1.5">+91</span>
                <span className="bg-gray-500 w-[0.5px] h-[70%]"></span>
              </div>
              <input
                type="phone"
                id="phone"
                name="phone"
                value={phone_number}
                onChange={(e) => {
                  //validate 10 digitds only also number only
                  if (
                    e.target.value.length <= 10 &&
                    /^[0-9]*$/.test(e.target.value)
                  ) {
                    setPhone(e.target.value);
                  } else {
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
                  if (
                    e.target.value.length <= 6 &&
                    /^[0-9]*$/.test(e.target.value)
                  ) {
                    setOtp(e.target.value);
                  }
                }}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring focus:ring-white focus:ring-opacity-50"
                required
              />
            </div>
          )}
          <div className="flex items-center justify-end w-full">
            <Button
              disabled={sendingOTP || verifyingOTP || redirecting}
              type="submit"
              className="text-black bg-transparent hover:bg-primary hover:text-white br"
            >
              {otpSend
                ? verifyingOTP
                  ? "Verifying"
                  : "Login"
                : sendingOTP
                ? "Sending"
                : "Send OTP"}
              {verifyingOTP || sendingOTP ? "" : <LogIn className="ml-1" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
