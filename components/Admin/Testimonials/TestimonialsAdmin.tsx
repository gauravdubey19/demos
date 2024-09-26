import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TestimonialCards from "./TestimonialCards";
import TestimonialsModal from "./TestimonialsModal";

const TestimonialsAdmin = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false); 

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/Testimonials/getThings");
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const data = await response.json();
        setFiles(data.files.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh); // Toggle the refresh state variable when the data needs to be refetched
  };


  return (
    <div className="bg-white h-full text-black p-10 overflow-y-scroll ">
      <div className="text-3xl">Testimonials</div>
      <div className="pt-10 flex flex-row items-center justify-between">
        <p className="text-lg"> Total Testimonials: {files.length}</p>

        {/* Wrapping Button with DialogTrigger for TestimonialsModal */}
        <TestimonialsModal onRefresh={handleRefresh} />
      </div>
      {/* <div className="pt-10 grid-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll">
        {files.map((file, index) => (
          <div key={index} className="pt-4">
            <TestimonialCards file={file} onRefresh={handleRefresh} />
          </div>
        ))}
      </div> */}
      <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-scroll">
        {files.map((file, index) => (
          <div key={index} className="pt-4">
            <TestimonialCards file={file} onRefresh={handleRefresh} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsAdmin;