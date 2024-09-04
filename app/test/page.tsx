import GsapHero from "@/components/HomePage/GsapHero";
import ImagePracticles from "@/components/ui/ImagePracticles";
import { img } from "@/lib/data";
import React from "react";

export default function TestPage() {
  return <ImagePracticles img={img} pixelsGap={2} animateEase={0.2} />;
}
