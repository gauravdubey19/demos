import Section from "@/components/Profile/Section";
import { ProfileSectionParams } from "@/lib/types";

export default function ProfilePage({ params }: ProfileSectionParams) {
  return <Section section={decodeURIComponent(params.section)} />;
}
