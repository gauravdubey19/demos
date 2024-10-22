import { useGlobalContext } from '@/context/GlobalProvider';
import { toast } from '@/hooks/use-toast';
import React, { useEffect, useState } from 'react';


const MyCoupons = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { coupons, setCoupons } = useGlobalContext();
  const [deleting, setDeleting] = useState<boolean>(false);
  // Fetch all coupons from the API
  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/coupon');
      const data = await response.json();
      console.log("coupon data: ", data);
      if (response.ok) {
        setCoupons(data);
      } else {
        console.error(data.error || 'Error fetching coupons');
      }
    } catch (error) {
      console.error('An error occurred while fetching coupons', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a coupon by ID
  const deleteCoupon = async (couponCode: string) => {
    try {
        setDeleting(true);
      const response = await fetch(`/api/coupon/singleCoupon/${couponCode}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon._id !== couponCode));
        toast({
            title: 'Coupon Deleted',
            description: 'Coupon deleted successfully!',
        })
      } else {
        const data = await response.json();
        console.error(data.error || 'Error deleting coupon');
        toast({
            title: 'Error',
            description: 'An error occurred while deleting the coupon.',
            variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('An error occurred while deleting the coupon', error);
      toast({
            title: 'Error',
            description: 'An error occurred while deleting the coupon.',
            variant: 'destructive',
        })
    } finally{
        setDeleting(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4 mb-4 px-4">
      {coupons.length > 0 ? (
        coupons.map((coupon) => (
          <div key={coupon._id} className="border border-gray-300 p-4 rounded-lg bg-white">
            <div className="flex flex-row justify-between items-center">
              <p className='font-bold text-lg '>
                {coupon.code}
              </p>
              <button
                disabled={deleting}
                className='bg-red-500 text-white px-2 py-1 rounded-lg disabled:opacity-70'
                onClick={() => deleteCoupon(coupon.code)}
              >
                Delete
              </button>
            </div>
            <p>Discount Type: {coupon.discountType === 'fixed' ? 'Fixed Amount' : 'Percentage'}</p>
            <p>Discount Value: {coupon.discountValue}</p>
            <p>Expiration Date: {new Date(coupon.expirationDate).toLocaleDateString()}</p>
            <p>Min Purchase Amount: ₹{coupon.minPurchaseAmount}</p>
            {coupon.discountType === 'percentage' && coupon.maxDiscountAmount && (
              <p>Max Discount Amount: ₹{coupon.maxDiscountAmount}</p>
            )}
            <p>Usage Limit: {coupon.usageLimit}</p>
            <p>Used Cound: {coupon.usedCount}</p>
            <p>User Specific: {coupon.userSpecific ? 'Yes' : 'No'}</p>
          </div>
        ))
      ) : (
        <div>No coupons found.</div>
      )}
    </div>
  );
};

export default MyCoupons;