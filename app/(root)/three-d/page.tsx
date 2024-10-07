"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { useRouter } from "next/navigation";
import { IoArrowForwardSharp } from "react-icons/io5";

gsap.registerPlugin(Draggable);

const ThreeDPage: React.FC = () => {
  const router = useRouter();
  const draggableRef = useRef<HTMLDivElement>(null);
  //   const { backRef } = useCursor();

  useEffect(() => {
    const draggableElement = draggableRef.current;

    if (draggableElement) {
      const draggableRefWidth = draggableElement.offsetWidth;

      Draggable.create(draggableElement, {
        type: "x",
        bounds: { minX: -draggableRefWidth, maxX: 0 },
        onDragEnd() {
          if (this.x >= 50) {
            router.push("/");
          }
        },
      });
    }
  }, [router]);

  return (
    <div className="mt-[60px] relative w-full h-[calc(100vh-60px)] flex-center text-3xl select-none bg-zinc-400 overflow-hidden">
      <div
        ref={draggableRef}
        className="absolute z-50 right-2 w-60 h-full group"
      >
        <div
          //   ref={backRef}
          className="w-full h-full z-50 flex items-center justify-end"
        >
          <div className="w-fit h-fit flex-center bg-white rounded-full p-1 group-hover:animate-motion-right">
            <IoArrowForwardSharp size={40} className="text-primary" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-4">3D Page</div>
      </div>
    </div>
  );
};

export default ThreeDPage;
