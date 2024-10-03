

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useGlobalContext } from '@/context/GlobalProvider';
import { set } from 'mongoose';

interface PaymentI {
  handlePlaceOrder: () => void;
  placingOrder: boolean;
  selectedAddress: {
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
};
setInitiatedProcess: (v: boolean) => void;
}

const Payment = ({ handlePlaceOrder,placingOrder,selectedAddress,setInitiatedProcess }: PaymentI) => {
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [onlinePayment, setOnlinePayment] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [sentOtp, setSentOtp] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const handleOnlinePaymentToggle = () => setOnlinePayment(!onlinePayment);
  const {sendOTP,verifyOTP} = useGlobalContext();

  const handleOTPSend = async () => {

    if(selectedAddress.phone_number){
      setInitiatedProcess(true);
      try {
        sendOTP(selectedAddress.phone_number,setSendingOtp,setSentOtp);
      } catch (error) {
        console.log("Error while sending OTP: ",error);
      }
    }
  }
const handleVerifyOTP = async () => {
  try {
    const result = await verifyOTP(selectedAddress.phone_number,otp,setVerifyingOtp,setVerifiedOtp,"OTP verified successfully");
    console.log("OTP verification result: ",result);
    if(result){
      console.log("Placing Order after otp verification");
      handlePlaceOrder();
    }else{
      console.log("OTP verification failed");
      setOtp('');
      setSentOtp(false);
      setVerifiedOtp(false);
    }
  } catch (error) {
    console.log("Error while verifying OTP: ",error);
  }
}
  return (
    <div className="mb-2 pt-7 ">
      <h2 id="cash-on-delivery-heading">
        <button
          type="button"
          className={`flex items-center justify-between w-full py-3 md:py-5 px-6 font-medium text-sm md:text-xl text-black gap-2 md:gap-3 transition-all duration-300 ease-in-out bg-white border border-[#888888] rounded-t-md ${!isOpen ? 'rounded-b-md' : ''}`}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls="cash-on-delivery-body"
        >
          <span>Cash on Delivery</span>
          {isOpen ? <ChevronUp className="w-3 h-3 md:w-5 md:h-5" /> : <ChevronDown className="w-3 h-3 md:w-5 md:h-5" />}
        </button>
      </h2>
      <div
        id="cash-on-delivery-body"
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border-x border-b border-[#888888] rounded-b-md ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 space-y-3">
          <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900">
            Enter OTP sent to +91 {selectedAddress.phone_number}:
          </label>
          {verifiedOtp && <p className="text-green bg-emerald-50 p-2">OTP verified successfully</p>}
          <input
            type="text"
            id="otp"
            disabled={!sentOtp}
            value={otp}
            onChange={(e) => {
              // Accept only 6 digit number OTP
              const value = e.target.value;
              if (value.length <= 6 && !isNaN(Number(value))) {
                setOtp(value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleVerifyOTP();
              }}
            }
            className={`bg-gray-50 border w-[40] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[white] focus:border-[white] block  p-2.5 disabled:opacity-70 ${!sentOtp && 'hidden'}`}
            placeholder="Enter OTP"
            required
          />
          {sentOtp ?
          <Button className='text-lg disabled:opacity-70' onClick={handleVerifyOTP} disabled={placingOrder||verifyingOtp||placingOrder ||verifiedOtp}>
            {verifyingOtp?'Verifying OTP':placingOrder ? 'Placing Order' : 'Place Order'}
          </Button>:
          <Button className='text-lg disabled:opacity-70' onClick={handleOTPSend} disabled={sendingOtp}>
            {sendingOtp ? 'Sending OTP' : 'Send OTP'}
          </Button>
          }
        </div>
      </div>

      <h2 id="online-payment-heading" className='mt-4'>
        <button
          type="button"
          className={`flex items-center justify-between w-full py-3 md:py-5 px-6 font-medium text-sm md:text-xl text-black gap-2 md:gap-3 transition-all duration-300 ease-in-out bg-white border border-[#888888] rounded-t-md ${!onlinePayment ? 'rounded-b-md' : ''}`}
          onClick={handleOnlinePaymentToggle}
          aria-expanded={onlinePayment}
          aria-controls="online-payment-body"
        >
          <span>Online Payment</span>
          {onlinePayment ? <ChevronUp className="w-3 h-3 md:w-5 md:h-5" /> : <ChevronDown className="w-3 h-3 md:w-5 md:h-5" />}
        </button>
      </h2>
      <div
        id="online-payment-body"
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border-x border-b border-[#888888] rounded-b-md ${onlinePayment ? 'max-h-96 opacity-50' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-500">Coming soon...</p>
          <ul className="list-none mb-4">
            <li className="flex items-center mb-2">
              <input type="radio" id="card" name="online-payment" />
              <label htmlFor="card" className="ml-2 text-sm text-gray-900">Card</label>
            </li>
            <li className="flex items-center mb-2">
              <input type="radio" id="upi" name="online-payment" />
              <label htmlFor="upi" className="ml-2 text-sm text-gray-900">UPI</label>
            </li>
            <li className="flex items-center mb-2">
              <input type="radio" id="netbanking" name="online-payment" />
              <label htmlFor="netbanking" className="ml- 2 text-sm text-gray-900">Net Banking</label>
            </li>
          </ul>
          {sentOtp ?
          <Button className='text-lg disabled:opacity-70' onClick={handleVerifyOTP} disabled={placingOrder}>
            {placingOrder ? 'Placing Order...' : 'Place Order'}
          </Button>:
          <Button className='text-lg disabled:opacity-70' onClick={handleOTPSend} disabled={sendingOtp}>
            {sendingOtp ? 'Sending OTP' : 'Send OTP'}
          </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default Payment;