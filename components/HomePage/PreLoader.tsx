import React from "react";
import ScrollVideo from "../ScrollVideo";

const PreLoader = () => {
  return (
    <section className="w-full h-full flext-center bg-white">
      <ScrollVideo videoUrl="/macpro.mp4" />
    </section>
  );
};

export default PreLoader;
