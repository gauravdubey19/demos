import React from 'react'
import star from '@/public/images/Star.png'
import Image from 'next/image';

const TestimonialCards = () => {
  return (
      <div className='w-[19rem] h-[20rem] bg-white p-2 flex items-center justify-between flex-col'>
          <video controls style={{ width: '500px', height: '500px' }}>
              <source src='https://ik.imagekit.io/ikmedia/example_video.mp4' />
          </video>
          <div className='flex flex-col items-start w-full justify-start '>
              <h2 className='font-semibold text-xl'>Adarsh Gupta</h2>
              <div className='flex flex-row justify-between w-full'>
                  <h4 className='text-sm text-[#ADADAD]'>Fullstack Dev</h4>
                  <div className='flex flex-row'>
                      <h4 className='text-sm text-[#ADADAD]'>4.9 </h4>
                      <Image height={20} width={20} src={star} alt={'star'} />
                  </div>
              </div>
              <p className='text-sm text-[#ADADAD] pt-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
          </div>
      </div>
  )
}

export default TestimonialCards