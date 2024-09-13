import Image from "next/image";
import React from "react";

interface CircularButtonProps {
  index: number;
  pic: any;
  onClick: (index: number) => void;
  isActive: boolean;
}

const CircularButton: React.FC<CircularButtonProps> = ({
  index,
  pic,
  onClick,
  isActive,
}) => {
  return (
    <div
      className={`h-12 w-12 md:h-16 md:w-16 rounded-full border ${
        isActive ? "border-primary" : "border-slate-200"
      } p-1 md:p-2 cursor-pointer hover:shadow-xl hover:scale-105 ease-in-out duration-300`}
      onClick={() => onClick(index)}
    >
      <div className="h-full w-full rounded-full bg-zinc-200 p-2 md:p-3 flex items-center justify-center">
        <Image src={pic} alt={`image-${index}`} width={100} height={100} />
      </div>
    </div>
  );
};

export default CircularButton;
