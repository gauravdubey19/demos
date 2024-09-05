// import React from 'react'
// import { MoveRight } from 'lucide-react';
// import Image from 'next/image';
// import TestimonialCards from './TestimonialCards';
// import Sliders from './Sliders';
// const TestimonialContainer = () => {
//   return (
//     <div className='px-20'>
//           <h1 className="text-4xl font-bold text-center">Our Testimonies</h1>

//               <div className='bg-[#FFBC49] h-[60vh] w-full mt-10 overflow-hidden flex items-center  px-10'>
//                   <h1 className='w-[20%] text-4xl font-semibold text-white  '>What our customers Says  <MoveRight className='-mt-[3.5rem]' height={80} width={300} /></h1>
//               {/*  card*/}
//                    <div className='h-full py-20 '>
//                     <Sliders>
//                       <TestimonialCards />
//                       <TestimonialCards />
//                       <TestimonialCards />
//                       <TestimonialCards />
//                       <TestimonialCards />
//                     </Sliders>
//                    </div>
//               </div>
//     </div>
//   )
// }

// export default TestimonialContainer


"use client"
import React, { useState } from 'react';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import TestimonialCards from './TestimonialCards';
import Sliders from './Sliders';

const TestimonialContainer = () => {
    const [activeSlide, setActiveSlide] = useState<number>(0);
    return (
        <div className='px-20'>
            <h1 className="text-4xl font-bold text-center">Our Testimonies</h1>

            <div className='bg-[#FFBC49] h-[60vh] w-full mt-10 overflow-hidden flex items-center px-10'>
                <h1 className='w-[20%] text-4xl font-semibold text-white flex items-center'>
                    What our customers Say
                    <MoveRight className='ml-4' height={80} width={80} />
                </h1>
                {/* Slider Container */}
                <div className='h-full w-[80%] flex-1 py-20 px-1'>
                    <Sliders setActiveSlide={setActiveSlide}>
                        <TestimonialCards  />
                        <TestimonialCards  />
                        <TestimonialCards  />
                    </Sliders>
                </div>
            </div>
        </div>
    );
};

export default TestimonialContainer;
