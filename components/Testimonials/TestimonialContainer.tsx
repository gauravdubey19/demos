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

import React from 'react';
import TestimonialCards from './TestimonialCards';

const TestimonialContainer = () => {
    return (
        <div className="md:px-20">
            <h1 className="text-4xl font-bold text-center mb-10">Our Testimonies</h1>

            <div className="relative w-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 md:bg-gradient-to-r from-white to-transparent w-8 z-10"></div>
                <div className="absolute inset-y-0 right-0 md:bg-gradient-to-l from-white to-transparent w-8 z-10"></div>

                <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex gap-4 w-max px-4">
                        {[...Array(8)].map((_, index) => (
                            <TestimonialCards key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialContainer;