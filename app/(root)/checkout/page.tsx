import ShoppingCart from '@/components/Checkout/ShoppingCart'
import { Button } from '@/components/ui/button'
import React from 'react'

const CheckoutPage = () => {
  return (
    <div className='h-max w-full pt-20 '>
        {/* steps of completion */}
        <div className='flex items-center justify-center'>
            <h1 className='text-lg px-5 py-1 rounded-2xl bg-[#2ed396] text-white'>Cart</h1>
            <p className='text-[#8888]'>------------</p>
            <h1 className='text-lg px-5 py-1 rounded-2xl bg-[#2ed396] text-white'>Address</h1>
            <p className='text-[#8888]'>------------</p>
            <h1 className='text-lg px-5 py-1 rounded-2xl bg-[#2ed396] text-white'>Payment</h1>
        </div>
        {/* info container */}
        <div className='pt-7 px-2 w-full  flex justify-between flex-row gap-3 pb-5 '>
            {/* right */}
            <div className='w-[75%] p-5 min-h-60 max-h-max   border border-[#8888] rounded-lg '>
                  <h1 className='text-3xl  text-black'>Shopping Cart</h1>
                  <ShoppingCart/>
            </div>
            {/* left */}
              <div className='w-[25%] h-max border border-[#8888] rounded-lg text-[#888888] py-5 sticky top-20 '>
                <h1 className='text-3xl pl-5 text-black'>Subtotal details</h1>
                {/* price details */}
                <div className='space-y-2 pt-5'>
                    <div className='flex items-center justify-between px-5 text-lg'>
                        <p>Total MRP</p>
                        <p className=' text-black' >{'₹ '} 3897</p>
                    </div>
                    <div className='flex items-center justify-between px-5 text-lg'>
                          <p>Total Discount</p>
                          <p className='text-[#2ed396]' >{'- ₹ '} 150</p>
                    </div>
                    <div className='flex items-center justify-between px-5 text-lg'>
                          <p>Platform Fee</p>
                        <p className='text-black' >{'₹ '} 90</p>
                    </div>
                    <div className='flex items-center justify-between px-5 text-lg'>
                          <p>Shipping Fee</p>
                        <p className='text-black' >{'₹ '} 70</p>
                    </div>
                </div>
                <div className='px-2 pt-5'>
                      <hr className="h-[1px]  bg-[#8888] border-[#8888]" />
                </div>
                {/* total section */}
                  <div className='w-full px-3 space-y-6  pt-2'>
                      <div className='flex items-center font-semibold text-black justify-between  text-lg'>
                          <p>Total MRP</p>
                          <p  >{'₹ '} 3897</p>
                      </div>
                      {/* button */}
                      <Button className='w-full text-xl hover:bg-[#d09631] '>
                        Proceed
                      </Button>
                </div>

            </div>

        </div>
    </div>
  )
}

export default CheckoutPage