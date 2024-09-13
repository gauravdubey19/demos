"use client";

import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

const Goback = () => {
  const navigate = useRouter();
  return (
    <>
      <div
        onClick={() => navigate.back()}
        className="fixed group left-3 top-[70px] backdrop-blur-md p-2 rounded-full cursor-pointer shadow-[0_0_5px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <IoMdArrowRoundBack
          size={25}
          className="group-hover:scale-110 fill-primary group-active:-translate-x-1 ease-in-out duration-200"
        />
      </div>
    </>
  );
};

export default Goback;