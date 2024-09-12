

"use client";

import React, { useEffect, useState } from "react";
import TestimonialCards from "./TestimonialCards";

const TestimonialContainer = () => {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/Testimonials/getThings');
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const data = await response.json();
        console.log(data.files.files);
        setFiles(data.files.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    getData();
  }, []);

  return (
    <div className="md:px-20 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">Our Testimonies</h1>

      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 md:bg-gradient-to-r from-white to-transparent w-8 z-10"></div>
        <div className="absolute inset-y-0 right-0 md:bg-gradient-to-l from-white to-transparent w-8 z-10"></div>

        <div className="w-full flex gap-4 px-4 overflow-x-scroll">
          {files?.map((file, index) => (
            <div key={index} className="panel w-screen">
              <TestimonialCards file={file} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialContainer;