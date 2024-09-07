

import React from "react";
import TestimonialCards from "./TestimonialCards";



const TestimonialContainer = () => {
  return (
    <div  className="md:px-20 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">Our Testimonies</h1>

      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 md:bg-gradient-to-r from-white to-transparent w-8 z-10"></div>
        <div className="absolute inset-y-0 right-0 md:bg-gradient-to-l from-white to-transparent w-8 z-10"></div>

        <div  className="w-full flex gap-4 px-4 overflow-x-scroll">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="panel w-screen ">
              <TestimonialCards />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialContainer;
