import React from 'react'
import Google from '@/public/google.png'
import Facebook from '@/public/facebook.png'
import Github from '@/public/github.png'
import Image from 'next/image'

const SocialsLogin = () => {
  return (
    <div className='w-full mt-10' >
        <div className='flex flex-row items-center gap-2 px-10'>
            <div className='h-[1px] w-full bg-black'/>
            <h1 className='text-black '>or</h1>
            <div className='h-[1px] w-full bg-black'/>
        </div>

        <div className='flex flex-row items-center justify-center gap-10 mt-10'>
              <div className='h-10 p-2 text-black w-10 border-black rounded-xl border  cursor-pointer'>
                  <Image src={Google} alt='social_icons' />
              </div>
              <div className='h-10 p-2 text-black w-10 border-black rounded-xl border cursor-pointer'>
                  <Image src={Facebook} alt='social_icons' />
              </div>
              <div className='h-10 p-2 text-black w-10 border-black rounded-xl border  cursor-pointer'>
                  <Image src={Github} alt='social_icons' />
              </div>
        </div>
      
    </div>
  )
}

export default SocialsLogin