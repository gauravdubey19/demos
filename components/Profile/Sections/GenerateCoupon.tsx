import { useGlobalContext } from '@/context/GlobalProvider';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function GenerateCoupon() {
const {setCoupons} = useGlobalContext();
const [couponData, setCouponData] = useState({
  code: '',
  discountType: 'fixed', // default to 'fixed'
  discountValue: 0,
  expirationDate: '',
  minPurchaseAmount: 0,
  maxDiscountAmount: 0,
  usageLimit: 1,
  userSpecific: false,
});
const [creating, setCreating] = useState(false);
const [message, setMessage] = useState('');
const router = useRouter();
// Helper function to set the message and display the toast
const setErrorMessage = (msg: string) => {
  setMessage(msg);
  toast({
    title: 'Error',
    description: msg,
    variant: 'destructive',
  });
};

// Validation function
const validateForm = () => {
  if (couponData.code.length !== 8) {
    setErrorMessage('Coupon code must be exactly 8 characters long');
    return false;
  }
  if (couponData.discountValue <= 0) {
    setErrorMessage('Discount value must be greater than zero');
    return false;
  }
  if (!couponData.expirationDate) {
    setErrorMessage('Expiration date is required');
    return false;
  }
  if (couponData.expirationDate < new Date().toISOString().split('T')[0]) {
    setErrorMessage('Expiration date must be in the future');
    return false;
  }
  if (couponData.minPurchaseAmount < 0) {
    setErrorMessage('Minimum purchase amount cannot be negative');
    return false;
  }
  if (couponData.discountType === 'percentage' && couponData.maxDiscountAmount < 0) {
    setErrorMessage('Max discount amount cannot be negative');
    return false;
  }
  return true;
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;

  if (type === 'checkbox') {
    setCouponData({
      ...couponData,
      [name]: (e.target as HTMLInputElement).checked, // explicitly cast to HTMLInputElement for checkboxes
    });
  } else {
    setCouponData({
      ...couponData,
      [name]: value,
    });
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage(''); // Clear previous messages

  // Perform validation
  if (!validateForm()) {
    return; // Stop if validation fails
  }

  try {
    setCreating(true);
    const response = await fetch('/api/coupon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(couponData),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Coupon created successfully!');
      setCouponData({
        code: '',
        discountType: 'fixed',
        discountValue: 0,
        expirationDate: '',
        minPurchaseAmount: 0,
        maxDiscountAmount: 0,
        usageLimit: 1,
        userSpecific: false,
      });
      setCoupons((prev) => [...prev, data.coupon]);
      toast({
        title: 'Coupon Created',
        description: 'Coupon created successfully!',
      });
        router.push('/profile/my-coupons');
    } else {
      setErrorMessage(data.error || 'Error creating coupon');
    }
  } catch (error) {
    console.error('Error creating coupon:', error);
    setErrorMessage('An error occurred while creating the coupon.');
  } finally {
    setCreating(false);
  }
};

  return (
    <div className="max-w-lg mx-auto mt-8">
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className='overflow-y-auto'>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Coupon Code</label>
          <input
            type="text"
            name="code"
            value={couponData.code}
            onChange={handleInputChange}
            maxLength={8} // Restrict to 8 characters
            pattern="[A-Za-z0-9]{8}" // Ensure only alphanumeric characters
            className="w-full p-2 border rounded"
            placeholder="Enter 8-character Coupon Code"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Discount Type</label>
          <select
            name="discountType"
            value={couponData.discountType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="fixed">Fixed</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            {couponData.discountType === 'fixed' ? 'Discount Amount' : 'Discount Percentage'}
          </label>
          <input
            type="number"
            name="discountValue"
            value={couponData.discountValue}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Discount Value"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            value={couponData.expirationDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Min Purchase Amount</label>
          <input
            type="number"
            name="minPurchaseAmount"
            value={couponData.minPurchaseAmount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Minimum Purchase Amount"
            required
          />
        </div>

        {couponData.discountType === 'percentage' && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Max Discount Amount</label>
            <input
              type="number"
              name="maxDiscountAmount"
              value={couponData.maxDiscountAmount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Maximum Discount Amount"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Usage Limit</label>
          <input
            type="number"
            name="usageLimit"
            value={couponData.usageLimit}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Usage Limit"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-70"
            disabled={creating}
        >
          {creating ? 'Creating...' : 'Create Coupon'}
        </button>
      </form>

    </div>
  );
}

export default GenerateCoupon;
