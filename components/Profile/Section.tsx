"use client";
import { Button } from "@/components/ui/button";
import PersonalInformation from "./PersonalInformation";
import { replaceHyphensWithSpaces } from "@/lib/utils";
import { SectionProps } from "@/lib/types";
import { useGlobalContext } from "@/context/GlobalProvider";

const Section: React.FC<SectionProps> = ({ section }) => {

  return (
    <div className="w-full h-full flex flex-1 flex-col bg-white drop-shadow-lg overflow-hidden">
      <div className="flex-between border-b bg-background p-4 shadow-sm md:px-8 md:py-6">
        <h2 className="capitalize text-xl font-bold tracking-tight">
          {replaceHyphensWithSpaces(section)}
        </h2>

      </div>
      <div className="w-full h-full overflow-y-scroll over-x">
        {section === "personal-information" && <PersonalInformation />}
        {section === "order-history" && (
          <div className="mt-5 text-3xl capitalize text-center">
            {replaceHyphensWithSpaces(section)}
          </div>
        )}
        {section === "wishlist" && (
          <div className="mt-5 text-3xl capitalize text-center">
            {replaceHyphensWithSpaces(section)}
          </div>
        )}
        {section === "payment-methods" && (
          <div className="mt-5 text-3xl capitalize text-center">
            {replaceHyphensWithSpaces(section)}
          </div>
        )}
        {section === "customer-support-&-help" && (
          <div className="mt-5 text-3xl capitalize text-center">
            {replaceHyphensWithSpaces(section)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;

// | "personal-information"
// | "order-history"
// | "payment-methods"
// | "account-settings"
// | "customer-support-&-help"
