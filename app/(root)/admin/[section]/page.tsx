"use client";

import { ProfileSectionParams } from "@/lib/types";
import { adminSections } from "@/lib/section";

export default function ProfilePage({ params }: ProfileSectionParams) {
  return (
    <div className="w-full lg:w-[75%] xl:w-[82%] h-full overflow-hidden">
      {adminSections.map((sec) =>
        sec.subSections
          ? sec.subSections.map(
              (subSection, index) =>
                params.section === subSection.id && (
                  <subSection.sectionNode key={sec.id} />
                )
            )
          : params.section === sec.id && <sec.sectionNode key={sec.id} />
      )}
    </div>
  );
}
