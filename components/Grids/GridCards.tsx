
"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import icon from '@/public/images/icon.png'
import pic1 from '@/public/images/1.png'
import pic2 from '@/public/images/2.png'
import pic3 from '@/public/images/3.png'
import pic4 from '@/public/images/4.png'
import pic5 from '@/public/images/5.png'
import CircularButton from './CircularButton'

const outfits = [
  [pic1, pic2, pic3, pic4, pic5], 
  [pic2, pic4, pic3, pic5, pic1], 
  [pic5, pic4, pic3, pic1, pic2], 
  [pic4, pic5, pic3, pic2, pic1], 
];

const GridCards = () => {
  const [currentOutfit, setCurrentOutfit] = useState(0);

  const handleButtonClick = (index:any) => {
    setCurrentOutfit(index);
  };

  return (
    <div className='md:h-screen w-full'>
      <div className='flex flex-col md:flex-row items-start justify-between md:px-20 sm:px-5 px-1 w-full gap-2 sm:gap-4 h-[75%]'>
        {/* Column 1 */}
        <div className='flex md:flex-col flex-row sm:gap-4 gap-2 md:w-[30%] w-full h-[30%] md:h-full'>
          <div className='md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl  flex items-center justify-center'>
            <Image src={outfits[currentOutfit][0]} alt="image" width={100} height={100} className="w-full h-auto md:p-[6rem] xl:p-[8rem] p-9 object-contain" />
          </div>
          <div className='md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl flex items-center justify-center'>
            <Image src={outfits[currentOutfit][1]} alt="image" width={100} height={100} className="w-full h-auto md:p-[6rem] xl:p-[8rem] p-9 object-contain" />
          </div>
        </div>

        {/* Column 2 */}
        <div className='flex flex-col md:w-[40%] w-full h-[40%] md:h-[103%]'>
          <div className='md:h-full py-10 w-full bg-[#F4F4F4] rounded-3xl flex items-center justify-center flex-col gap-10'>
            <h1 className='capitalize font-bold text-xl md:text-2xl text-wrap text-[#767676]'>Magician coat</h1>
            <Image src={outfits[currentOutfit][2]} className='md:w-[150px] w-[120px]' alt={`image`} />
          </div>
        </div>

        {/* Column 3 */}
        <div className='flex md:flex-col flex-row sm:gap-4 gap-2 md:w-[30%] h-[30%] w-full md:h-full'>
          <div className='md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl flex items-center justify-center'>
            <Image src={outfits[currentOutfit][3]} alt="image" width={100} height={100} className="w-full h-auto md:p-[6rem] xl:p-[8rem] p-9 object-contain" />
          </div>
          <div className='md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl flex items-center h-full justify-center'>
            <Image src={outfits[currentOutfit][4]} alt="image" width={100} height={100} className="w-full h-auto md:p-[6rem] xl:p-[8rem] p-9 object-contain" />
          </div>
        </div>
      </div>

      <div className='flex flex-row gap-4 md:gap-10 items-end justify-center mt-6 md:mt-20'>
        {outfits.map((_, index) => (
          <CircularButton pic={icon} index={index} key={index} onClick={() => handleButtonClick(index)} />
        ))}
      </div>
    </div>
  )
}

export default GridCards;
