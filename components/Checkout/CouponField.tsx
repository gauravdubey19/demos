import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useCart } from '@/context/CartProvider';

const CouponField = () => {
    const { finalTotalAmount, setfinalCouponDiscount,setfinalCouponCode,finalCouponCode } = useCart();
  const [couponCode, setCouponCode] = useState(finalCouponCode);
  const [error, setError] = useState('');
  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState(finalCouponCode ? true : false);
  useEffect(() => {
    setCouponCode(finalCouponCode);
    setValidated(finalCouponCode ? true : false);
  }, [finalCouponCode]);

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 8) setCouponCode(e.target.value);
  };

  const validateCoupon = async () => {
    setError('');
    if (!couponCode) {
      setError('Please enter a coupon code.');
      return;
    }

    try {
      setValidating(true);
      console.log("finalTotalAmount: ", finalTotalAmount);
      const response = await fetch(`/api/coupon/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: couponCode, userId: 'someUserId', cartTotal: finalTotalAmount }), // Add correct `userId` and `cartTotal`
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to validate coupon');
      }
      setValidating(false);
      setValidated(true);
        setfinalCouponCode(couponCode);
      console.log("coupon data: ", data);
      if (data.discountType === 'fixed') {
        setfinalCouponDiscount(data.discountValue);
      } else {
        setfinalCouponDiscount((data.discountValue / 100) * finalTotalAmount);
        if(data.maxDiscountAmount && data.maxDiscountAmount < (data.discountValue / 100) * finalTotalAmount){
          setfinalCouponDiscount(data.maxDiscountAmount);
        }
      }

    } catch (err: any) {
      console.log("error while validating coupon: ", err);
      setError(err.message || 'Error validating coupon');
    } finally {
      setValidating(false);
    }
  };

  const handleApplyClick = async () => {
    if (couponCode.length !== 8) {
      setError('Please enter a valid coupon code.');
      return;
    }
    // First, validate the coupon
    await validateCoupon();

    // If discount details exist (validation succeeded), apply the coupon
  };

  const handleCancelClick = () => {
    setCouponCode('');
    setValidated(false);
    setfinalCouponDiscount(0);
    setfinalCouponCode('');
  };

  return (
    <div className='flex flex-col mb-4 gap-2'>
      <label htmlFor="coupon" className="text-sm font-medium text-gray-700">Coupon Code</label>
      <div className="flex items-center justify-between w-full gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={handleCouponChange}
          placeholder="Enter Coupon Code"
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-[white] focus:border-[white]"
          disabled={validated || validating}
        />
        <Button className='disabled:opacity-70' onClick={handleApplyClick} disabled={validated || validating}>
          {validating ? 'Validating...' : 'Validate'}
        </Button>
        {validated && (
          <Button className='disabled:opacity-70 bg-red-500' onClick={handleCancelClick}>
            Cancel
          </Button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {validating && <p className="text-emerald-500 text-sm">{"Validating coupon..."}</p>}
      {validated && <p className="text-emerald-500 text-sm">{"Coupon validated successfully!"}</p>}
    </div>
  );
};

export default CouponField;