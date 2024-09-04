import Image from 'next/image'
import React from 'react'

interface CircularButtonI{
    index:any,
    pic:any
}

const CircularButton = ({ index, pic }: CircularButtonI) => {
  return (
      <div
          className='h-12 w-12 md:h-16 md:w-16 border rounded-full border-[rgb(221,221,221)] p-1 md:p-2 cursor-pointer'
      >
          <div className='h-full w-full rounded-full bg-[#e2e2e2] p-2 md:p-3 flex items-center justify-center'>
              <Image src={pic} alt={`image-${index}`} layout="responsive" width={100} height={100} />
          </div>
      </div>
  )
}

export default CircularButton