import { CardProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardDetails {
  card: CardProps;
}

const Card: React.FC<CardDetails> = ({ card }) => {
  return (
    <>
      <div className="w-[250px] h-[380px] scale-95 bg-gray-950 rounded-xl cursor-grab text-[rgb(31,48,91) active:cursor-grabbing hover:scale-100 hover:shadow-[0_0_5px_rgb(31,48,91)] ease-in-out duration-300 overflow-hidden">
        <div className="h-[45%] w-full bg-gray-700 rounded-t-xl flex-center select-none overflow-hidden">
          <Image
            src={card.img}
            alt={card.head}
            width={400}
            height={400}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-[55%] w-full flex justify-between flex-col gap-1 rounded-b-xl p-3 overflow-hidden">
          <div className="">
            <div className="h-fit w-full text-lg font-semibold line-clamp-1">
              {card.head}
            </div>
            <div className="h-fit w-full text-sm text-zinc-300 text-balance text-justify line-clamp-5">
              {card.description}
            </div>
          </div>
          <Link
            href={card.href}
            className="w-fit bg-slate-900 text-center p-2 px-6 rounded-md cursor-pointer hover:bg-slate-800 active:translate-y-0.5 ease-in-out duration-200"
          >
            View More
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
