import React from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";

interface SlideProps {
  src: string;
  alt: string;
  title1: string;
  title2: string;
  yellow?: number;
  yellowSubString?: string;
  subtitle: string;
}

const Slide: React.FC<SlideProps> = ({ src, alt, title1,title2, subtitle ,yellow,yellowSubString}) => {
  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        className="object-cover object-[80%] md:object-top w-full h-full"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black opacity-90"></div>
      <div className="absolute left-6 md:left-16 text-white">
        <div className="flex md:flex-row flex-col-reverse  md:items-center items-start gap-4">
        <h3 className={`text-[50px] lg:text-[100px] xl:text-[110px] font-montSemiBold ${yellow===1 && "text-primary"} leading-[1.2]`}>{title1}</h3>

        </div>

        <h3 className={` text-[50px] lg:text-[100px] xl:text-[110px] font-montSemiBold ${yellow===2 && "text-primary"} leading-[1.2]`}>{title2}</h3>

        <div className="mt-6 ml-2">
        {/* <span className="text-[45px] mt-6 ml-2 bebas-neue-regular">{subtitle}</span> */}
        {subtitle.split(" ").map((word, index) => (
            <span key={index} className={`text-[35px] lg:text-[45px] font-bebasNeue ${yellowSubString?.toLowerCase()===word?.toLowerCase() && "text-primary"}`}>
                {word+" "+" "}
            </span>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Slide;
