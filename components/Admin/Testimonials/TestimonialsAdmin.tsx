"use client"
import React, { useState, useEffect } from "react";
import TestimonialCards from "./TestimonialCards";
import TestimonialsModal from "./TestimonialsModal";
import { Skeleton } from "@/components/ui/skeleton";

interface Testimonial {
  _id: string;
  fullName: string;
  personTitle: string;
  testimony: string;
  rating: number;
  videoLink?: string;
}

const TestimonialsAdmin: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  // console.log(testimonials)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/Testimonials/get");
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="bg-white h-full text-black p-10 overflow-y-scroll ">
      <div className="text-3xl">Testimonials</div>
      <div className="pt-10 flex flex-row items-center justify-between">
        <p className="text-lg"> Total Testimonials: {testimonials?.length || 0}</p>
        <TestimonialsModal onRefresh={handleRefresh} />
      </div>
      {loading ? (
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-scroll">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="pt-4">
              <Skeleton className="bg-gray-200 rounded-lg p-4 h-[17rem] md:h-[20rem] w-full animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-scroll">
          {testimonials?.map((testimonial: Testimonial, index: number) => (
            <div key={index} className="pt-4">
              <TestimonialCards testimonial={testimonial} onRefresh={handleRefresh} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsAdmin;