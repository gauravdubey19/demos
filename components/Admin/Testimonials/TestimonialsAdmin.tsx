"use client";
import React, { useState, useEffect } from "react";
import TestimonialCards from "./TestimonialCards";
import TestimonialsModal from "./TestimonialsModal";
import { Skeleton } from "@/components/ui/skeleton";
import ReactCountUp from "@/components/ui/ReactCountUp";

export interface Testimonial {
  _id: string;
  fullName: string;
  personTitle: string;
  testimony: string;
  rating: number;
  videoLink: string;
}

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials/get-delete", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        console.log(data);

        setTestimonials(data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    if (testimonials?.length === 0) fetchTestimonials();
  }, [refresh, testimonials]);
  // console.log(testimonials)

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <section className="w-full h-full overflow-hidden select-none">
        <header className="w-full h-fit space-y-2 p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Testimonials
          </h2>
          <div className="w-full h-fit flex-between gap-2">
            <h2 className="capitalize text-md md:text-lg lg:text-xl">
              Total Testimonials:{" "}
              <ReactCountUp amt={testimonials?.length || 0} />
            </h2>
            <TestimonialsModal onRefresh={handleRefresh} />
          </div>
        </header>
        <div className="w-full h-[calc(100vh-130px)] space-y-2 py-4 px-3 overflow-hidden">
          <div className="relative w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-1 overflow-auto">
            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                  <div key={index} className="pt-4">
                    <Skeleton className="bg-gray-200 rounded-lg p-4 h-[17rem] md:h-[20rem] w-full animate-pulse" />
                  </div>
                ))
              : testimonials?.map((testimonial: Testimonial, index: number) => (
                  <div key={index} className="pt-4">
                    <TestimonialCards
                      testimonial={testimonial}
                      onRefresh={handleRefresh}
                    />
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsAdmin;
