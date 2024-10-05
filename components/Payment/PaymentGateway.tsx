"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BsShieldLock } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";
// import { Label } from "@/components/ui/label";
// import { Icons } from "@/components/ui/icons";

export default function PaymentGateway({ amount = 1000 }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment processed successfully!");
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="bg-blue-50">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-blue-700">Complete Your Payment</CardTitle>
          <Image src="/logo.png" alt="CSKTextile" width={40} height={40} />
        </div>
        <CardDescription className="text-blue-600">
          You are paying CSK Textile
        </CardDescription>
        <p className="text-sm text-blue-500 mt-2">Thanks for your purchase</p>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="card">
          <TabsList className="grid w-full grid-cols-3 bg-blue-100">
            <TabsTrigger
              value="card"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700"
            >
              Card
            </TabsTrigger>
            <TabsTrigger
              value="upi"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700"
            >
              UPI
            </TabsTrigger>
            <TabsTrigger
              value="wallet"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700"
            >
              Wallet
            </TabsTrigger>
          </TabsList>
          <TabsContent value="card" className="animate-slide-down">
            <form onSubmit={handlePayment}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="card-number" className="text-blue-700">
                    Card Number
                  </label>
                  <Input
                    type="number"
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    required
                    className="custom-number-input border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expiry" className="text-blue-700">
                      Expiry Date
                    </label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      required
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cvv" className="text-blue-700">
                      CVV
                    </label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      required
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                type="submit"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <ImSpinner3 className="mr-2 h-3 w-3 animate-spin" />
                    Processing
                  </>
                ) : (
                  `Pay ₹${amount}`
                )}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="upi" className="animate-slide-down">
            <form onSubmit={handlePayment}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="upi-id" className="text-blue-700">
                    UPI ID
                  </label>
                  <Input
                    id="upi-id"
                    placeholder="yourname@upi"
                    required
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                type="submit"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <ImSpinner3 className="mr-2 h-3 w-3 animate-spin" />
                    Processing
                  </>
                ) : (
                  `Pay ₹${amount}`
                )}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="wallet" className="animate-slide-down">
            <div className="space-y-4">
              <Button
                className="w-full bg-white text-blue-700 border-blue-200 hover:bg-blue-50 flex items-center justify-start"
                variant="outline"
                onClick={handlePayment}
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Paytm_logo.jpg"
                  alt="PayTM Logo"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Pay with PayTM
              </Button>
              <Button
                className="w-full bg-white text-blue-700 border-blue-200 hover:bg-blue-50 flex items-center justify-start"
                variant="outline"
                onClick={handlePayment}
              >
                <Image
                  src="https://www.phonepe.com/webstatic/7888/static/2a45180808d78ef097db0118995d3f7c/54610/photo.png"
                  alt="PhonePe Logo"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Pay with PhonePe
              </Button>
              <Button
                className="w-full bg-white text-blue-700 border-blue-200 hover:bg-blue-50 flex items-center justify-start"
                variant="outline"
                onClick={handlePayment}
              >
                <Image
                  src="https://i.pinimg.com/564x/8d/ec/e1/8dece15cc40aaf66ed47f6591b639d06.jpg"
                  alt="Google Pay Logo"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Pay with Google Pay
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-between bg-blue-50">
        <div className="text-sm text-blue-600 mt-3 -mb-3">
          Secured by <span className="font-semibold">CSK Textile</span>
        </div>
        <div className="flex-center space-x-2 mt-3 -mb-3">
          <BsShieldLock className="h-3 w-3 -mr-1 text-blue-600" />
          <span className="text-sm text-blue-600">SSL Encrypted</span>
        </div>
      </CardFooter>
    </Card>
  );
}
