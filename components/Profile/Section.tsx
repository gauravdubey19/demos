"use client";

import { replaceHyphensWithSpaces } from "@/lib/utils";
import { SectionProps } from "@/lib/types";
import { profileSections } from "@/lib/data";

const Section: React.FC<SectionProps> = ({ section }) => {
  return (
    <div className="w-full h-full flex flex-1 flex-col bg-white drop-shadow-lg overflow-hidden">
      <div className="flex-between border-b bg-background p-4 shadow-sm md:px-8 md:py-6">
        <h2 className="capitalize text-xl font-bold tracking-tight">
          {replaceHyphensWithSpaces(section)}
        </h2>
      </div>
      <div className="w-full h-full overflow-y-scroll over-x">
        {profileSections.map((sec) =>
          section === sec.id ? <sec.sectionNode key={sec.id} /> : null
        )}
      </div>
    </div>
  );
};

export default Section;
