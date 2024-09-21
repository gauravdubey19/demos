import React, { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';

interface PaymentI{
  handlePlaceOrder:()=>void
}

const Payment = ({ handlePlaceOrder }: PaymentI) => {
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState('');

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="mb-2 pt-7">
      <h2 id="cash-on-delivery-heading">
        <button
          type="button"
          className={`flex items-center justify-between w-full py-3 md:py-5 px-6 font-medium text-sm md:text-xl text-black gap-2 md:gap-3 transition-all duration-300 ease-in-out bg-white border border-[#888888] rounded-t-md ${!isOpen ? 'rounded-b-md' : ''
            }`}
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
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border-x border-b border-[#888888] rounded-b-md ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="p-4 space-y-3">
          <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900">
            Enter OTP:
          </label>
          <input
            type="number"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="bg-gray-50 border w-[40] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[white] focus:border-[white] block  p-2.5"
            placeholder="Enter OTP"
            required
          />
          <Button className='text-lg' onClick={handlePlaceOrder}>
              Place Order
            </Button>
        </div>

      </div>

    </div>
  );
};

export default Payment


