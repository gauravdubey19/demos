"use client";

import { ProfileSectionParams } from "@/lib/types";
import { adminSections } from "@/lib/section";

export default function ProfilePage({ params }: ProfileSectionParams) {
  return (
    <div className="w-full max-w-[80%] h-full overflow-y-scroll over-x">
      {adminSections.map((sec) =>
        params.section === sec.id ? <sec.sectionNode key={sec.id} /> : null
      )}
    </div>
  );
}
