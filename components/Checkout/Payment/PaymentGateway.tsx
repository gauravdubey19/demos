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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReactCountUp from "@/components/ui/ReactCountUp";
import { toast } from "@/hooks/use-toast";

export const PaymentGateway = ({
  amount = 1000,
  handlePlaceOrder,
  isOpen,
  handleClose,
}: {
  amount?: number;
  isOpen: boolean;
  handleClose: () => void;
  handlePlaceOrder: () => void;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState("");

  const upiPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/;

  const handleUpi = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUpiId(input);
    if (input == "") {
      setError("");
    } else if (!upiPattern.test(input)) {
      setError("Invaild UPI ID, reference: csk@icici");
    } else {
      setError("");
    }
  };
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      handleClose();
      handlePlaceOrder();
      toast({
        title: "Payment processed and done successfully!",
        description: "Now you can view the orders in your profile...",
      });
      // alert("Payment processed successfully!");
    }, 2000);
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-md mx-auto bg-white shadow-lg p-0 overflow-hidden">
        <DialogHeader className="bg-yellow-50 p-2">
          <DialogTitle className="text-primary mb-4">
            Complete Your Payment
          </DialogTitle>
          <DialogDescription className="text-yellow-600 flex-between">
            <div>
              You are paying CSK Textile
              <p className="text-sm text-yellow-500 mt-2">
                Thanks for your purchase
              </p>
            </div>
            <Image src="/logo.png" alt="CSKTextile" width={40} height={40} />
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="card" className="px-4">
          <TabsList className="grid w-full grid-cols-3 bg-yellow-100">
            <TabsTrigger
              value="card"
              className="data-[state=active]:bg-white data-[state=active]:text-primary"
            >
              Card
            </TabsTrigger>
            <TabsTrigger
              value="upi"
              className="data-[state=active]:bg-white data-[state=active]:text-primary"
            >
              UPI
            </TabsTrigger>
            <TabsTrigger
              value="wallet"
              className="data-[state=active]:bg-white data-[state=active]:text-primary"
            >
              Wallet
            </TabsTrigger>
          </TabsList>
          <TabsContent value="card" className="animate-slide-down">
            <form onSubmit={handlePayment}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="card-number" className="text-primary">
                    Card Number
                  </label>
                  <Input
                    type="number"
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    required
                    className="custom-number-input border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expiry" className="text-primary">
                      Expiry Date
                    </label>
                    <Input
                      id="expiry"
                      type="number"
                      placeholder="MM/YY"
                      required
                      className="custom-number-input border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cvv" className="text-primary">
                      CVV
                    </label>
                    <Input
                      id="cvv"
                      type="number"
                      placeholder="123"
                      required
                      className="custom-number-input border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                    />
                  </div>
                </div>
              </div>
              <Button
                className="w-full mt-4"
                type="submit"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <ImSpinner3 className="mr-2 h-3 w-3 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    Pay <ReactCountUp prefix="₹" amt={amount} decimals={true} />
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="upi" className="animate-slide-down">
            <form onSubmit={handlePayment}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="upi-id" className="text-primary">
                    UPI ID
                  </label>
                  <Input
                    id="upi-id"
                    value={upiId}
                    onChange={handleUpi}
                    placeholder="yourname@upi"
                    pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/"
                    required
                    className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                  />
                  <div className="w-fit h-fit py-1 overflow-hidden">
                    {error && (
                      <span className="animate-slide-up text-[red]">
                        {error}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button
                className="w-full mt-4"
                type="submit"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <ImSpinner3 className="mr-2 h-3 w-3 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    Pay <ReactCountUp prefix="₹" amt={amount} decimals={true} />
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="wallet" className="animate-slide-down">
            <div className="space-y-4">
              <Button
                className="w-full bg-white text-primary border-yellow-200 hover:bg-yellow-50 flex items-center justify-start"
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
                className="w-full bg-white text-primary border-yellow-200 hover:bg-yellow-50 flex items-center justify-start"
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
                className="w-full bg-white text-primary border-yellow-200 hover:bg-yellow-50 flex items-center justify-start"
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
        <CardFooter className="flex-between bg-yellow-50">
          <div className="text-sm text-primary mt-3 -mb-3">
            Secured by <span className="font-semibold">Voltsec</span>
          </div>
          <div className="flex-center space-x-2 mt-3 -mb-3">
            <BsShieldLock className="h-3 w-3 -mr-1 text-primary" />
            <span className="text-sm text-primary">SSL Encrypted</span>
          </div>
        </CardFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentGateway;
