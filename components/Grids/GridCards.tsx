"use client"
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
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
  const imageRefs = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // GSAP animation for image rendering
    gsap.fromTo(imageRefs.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }
    );
  }, [currentOutfit]);

  const handleButtonClick = (index: number) => {
    setCurrentOutfit(index);
  };

  return (
    <div className='sm:h-screen '>
    <div className='h-full w-full flex flex-col justify-evenly gap-5'>
      <div className='flex flex-col md:flex-row items-start gap-2 justify-evenly md:px-20 sm:px-20 px-2 w-full sm:gap-4 md:h-[75%] sm:h-[60%] h-[85%]'>
        {/* Column 1 */}
        <div className='flex md:flex-col flex-row sm:gap-4 gap-2 md:w-[30%] w-full sm:h-[30%] h-[25%] md:h-full'>
          <div className='md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl flex items-center justify-center'>
            <Image ref={el => { if (el) imageRefs.current[0] = el; }} src={outfits[currentOutfit][0]} alt="image" width={100} height={100} className="h-auto py-1  p-1 object-contain" />
          </div>
          <div className='md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl flex items-center justify-center'>
            <Image ref={el => { if (el) imageRefs.current[1] = el; }} src={outfits[currentOutfit][1]} alt="image" width={100} height={100} className=" h-auto py-1  p-1 object-contain" />
          </div>
        </div>

        {/* Column 2 */}
        <div className='flex flex-col md:w-[40%] w-full sm:h-[57%] md:h-[103%]'>
          <div className='md:h-full md:py-10 py-4 w-full bg-[#F4F4F4] rounded-3xl flex items-center justify-center flex-col md:gap-10 gap-5'>
            <h1 className='relative capitalize font-bold overflow-hidden text-xl md:text-2xl text-wrap text-[#767676]'>Magician coat</h1>
            <Image ref={el => { if (el) imageRefs.current[2] = el; }} src={outfits[currentOutfit][2]} height={150} width={150} className=' md:p-0 sm:p-[2.8rem] xl:p-[.4rem] p-6 object-contain' alt={`image`} />
          </div>
        </div>

        {/* Column 3 */}
          <div className='flex md:flex-col flex-row sm:gap-4 gap-2 md:w-[30%] w-full sm:h-[30%] h-[25%] sm:mt-16 md:mt-0 md:h-full '>
          <div className='md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl flex items-center justify-center'>
              <Image ref={el => { if (el) imageRefs.current[3] = el; }} src={outfits[currentOutfit][3]} alt="image" width={100} height={100} className=" h-auto  py-1 p-1 object-contain" />
          </div>
          <div className='md:h-[50%] w-full bg-[#F4F4F4] rounded-3xl flex items-center justify-center'>
              <Image ref={el => { if (el) imageRefs.current[4] = el; }} src={outfits[currentOutfit][4]} alt="image" width={100} height={100} className=" h-auto  py-1 p-1 object-contain" />
          </div>
        </div>
      </div>

      <div className='flex flex-row gap-4 mt-5 md:gap-10 items-end justify-center pb-10 '>
        {outfits.map((_, index) => (
          <CircularButton pic={icon} index={index} key={index} onClick={() => handleButtonClick(index)} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default GridCards;