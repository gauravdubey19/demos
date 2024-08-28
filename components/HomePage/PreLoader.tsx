import React from "react";
import ScrollVideo from "../ScrollVideo";

const PreLoader = () => {
  return (
    <section className="w-full h-full z-50 bg-white flext-center">
      <ScrollVideo videoUrl="/assets/onScroll.mp4" />
    </section>
  );
};

export default PreLoader;
