import Image from 'next/image'
import React from 'react'
import icon from '@/public/images/icon.png'
import pic1 from '@/public/images/1.png'
import pic2 from '@/public/images/2.png'
import pic3 from '@/public/images/3.png'
import pic4 from '@/public/images/4.png'
import pic5 from '@/public/images/5.png'
import CircularButton from './CircularButton'

const images = [icon, icon, icon, icon];

const GridCards = () => {
  return (
    <div className='md:h-screen w-full'>
      <div className='flex flex-col md:flex-row items-start justify-between md:px-20 sm:px-5 px-1 w-full gap-2 sm:gap-4 h-[75%]'>
        {/* Column 1 */}
        <div className='flex md:flex-col flex-row sm:gap-4 gap-2 md:w-[30%] w-full h-full'>
          <div className='h-[50%] w-full bg-[#F4F4F4] rounded-3xl  flex items-center justify-center'>
            <Image src={pic1} alt="image" width={100} height={100} className="w-full h-auto md:p-[6rem] p-11 object-contain" />
          </div>
          <div className='h-[50%] w-full bg-[#F4F4F4] rounded-3xl   flex items-center justify-center'>
            <Image src={pic2} alt="image" width={100} height={100} className="w-full h-auto md:p-[6rem] p-11 object-contain" />
          </div>
        </div>

        {/* Column 2 */}
        <div className='flex flex-col md:w-[40%] w-full h-[103%] '>
          <div className='md:h-full py-10 w-full bg-[#F4F4F4] rounded-3xl  flex items-center justify-center flex-col gap-10'>
            <h1 className='capitalize font-bold text-xl md:text-2xl text-wrap text-[#767676]'>Magician coat</h1>
            <Image src={pic3} className='md:w-[150px]  w-[120px] ' alt={`image`} />
          </div>
        </div>

        {/* Column 3 */}
        <div className='flex md:flex-col flex-row sm:gap-4 gap-2 md:w-[30%] w-full md:h-full'>
          <div className='h-[50%] w-full bg-[#F4F4F4] rounded-3xl  flex items-center justify-center'>
            <Image src={pic4} alt="image"  width={100} height={100} className="w-full h-auto md:p-[6rem] p-11 object-contain" />
          </div>
          <div className='h-[50%] w-full bg-[#F4F4F4] rounded-3xl  flex items-center justify-center'>
            <Image src={pic5} alt="image"  width={100} height={100} className="w-full h-auto md:p-[6rem] p-11 object-contain" />
          </div>
        </div>
      </div>

      <div className='flex flex-row gap-4 md:gap-10 items-end justify-center mt-6 md:mt-20'>
        {images.map((pic, index) => (
          <CircularButton pic={pic} index={index} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default GridCards