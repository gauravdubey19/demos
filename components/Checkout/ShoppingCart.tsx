
import React, { useState } from 'react'
import CartCard from './CartCard'

const ShoppingCart = () => {
    

    return (
        <div>
            {/* select */}
            <div className='flex flex-row justify-between text-xl py-5'>
                <div className='flex flex-row gap-3 items-center '>
                    <input type="checkbox" className=" h-6 w-6 rounded-xl form-checkbox accent-[#2ed396] focus:accent-[#2ed396]" id="myCheckbox" />
                    <p>2/2 items selected</p>
                </div>
                <div className='text-red-500'>Remove all</div>
            </div>
            {/* cards */}
            <div>
                <CartCard/>
                <CartCard/>
                <CartCard/>
                <CartCard/>
            </div>
            
        </div>
    )
}

export default ShoppingCart
