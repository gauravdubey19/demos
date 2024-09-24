import React from "react";
import SearchForm from "./SearchBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FAQ from "./FAccordian";
import FaqModal from "./FaqModal";

const FaqAdmin = () => {
  return (
    <div className="w-full h-full p-5">
      <div className="text-3xl">Testimonials</div>
      <div className="flex flex-row items-center pt-10 justify-between">
        <div className="text-xl">Total FAQ{"'"}s: 07</div>
        <div className="flex flex-row gap-2">
          <SearchForm />
          <FaqModal variant="create" />
        </div>
      </div>
      <div className="w-full h-[65vh] overflow-y-scroll">
        <FAQ />
      </div>
    </div>
  );
};

export default FaqAdmin;
