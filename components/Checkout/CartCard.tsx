"use client"
import React, { useState } from 'react'
import ProductImg from '@/public/productImg.png'
import { X } from 'lucide-react';
import ReactStars from 'react-stars'
import Dropdown from './dropdownSelect';
import ColorSelector from './colorSelect';
import Image from 'next/image'


const sizeOptions = ['M', 'L', 'XL', '2xl']
const QuantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const colors = [
    { id: 1, color: 'bg-red-500' },
    { id: 2, color: 'bg-blue-500' },
    { id: 3, color: 'bg-green-500' },
    { id: 4, color: 'bg-yellow-500' },
    { id: 5, color: 'bg-purple-500' }
];

const CartCard = () => {
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(2);

  return (
      <div >
          {/* saperator */}
          <hr className="h-[1px]  bg-[#8888] border-[#8888]" />
          <div className='p-5 px-10 h-max w-full '>
              {/* checkbox */}
              <div className='flex items-center justify-between'>
                  <input type="checkbox" className=" h-5 w-5 rounded-xl form-checkbox accent-[#2ed396] focus:accent-[#2ed396]" id="myCheckbox" />
                  <X />
              </div>
              {/* inner card */}
              <div className='w-full flex items-center flex-row gap-10' >
                  <Image height={130} width={130} src={ProductImg} alt='img' />
                  <div className='w-full'>
                      {/* title */}
                      <div>
                          <h1 className='text-xl '>Product heading</h1>
                          {/* stars and reviews */}
                          {/* <div className='flex flex-row items-center gap-4 text-sm'>
                              <ReactStars value={4} count={5} edit={false} size={12} color2={'#ffd700'} />
                              {'|'}
                              <p className='text-[#8888]'>7.5k reviews</p>
                          </div> */}
                      </div>
                      {/* size and color */}
                      <div className='space-y-2 pt-3'>
                          <div className='flex flex-row gap-5 items-center'>
                              <Dropdown title='Size' option={sizeOptions} selected={selectedSize} setSelected={setSelectedSize} />
                              <Dropdown title='Quantity' option={QuantityOptions} selected={selectedQuantity} setSelected={setSelectedQuantity} />
                          </div>
                          {/* <ColorSelector colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} /> */}
                      </div>
                      {/* price */}
                      <div className='flex items-center gap-2 text-lg pt-3'>
                          <p>Price:</p>
                          <p  >{'₹ '} 3,897</p>
                          <p className='text-sm text-[#8888] line-through ' >{'₹ '} 1,350</p>
                          <p className='text-[#2ed396]' >20% off</p>
                      </div>

                  </div>
              </div>

          </div>

      </div>
  )
}

export default CartCard