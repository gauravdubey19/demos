import Section from "@/components/Profile/Section";
import { ProfileSectionParams } from "@/lib/types";
import { profileSections } from "@/lib/section";

export default function ProfilePage({ params }: ProfileSectionParams) {
  return (
    <Section
      section={decodeURIComponent(params.section)}
      sections={profileSections}
    />
  );
}
