"use client";

import { useState } from "react";

interface MagneticDivProps {
  children: React.ReactNode;
  className: string;
}

const MagneticDiv: React.FC<MagneticDivProps> = ({ children, className }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width) * 2 - 1;
    const y = ((clientY - top) / height) * 2 - 1;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <>
      <div
        className={`hidden lg:flex-center ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate(${offset.x * 20}px, ${offset.y * 20}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {children}
      </div>
      <div className={`flex-center lg:hidden ${className}`}>{children}</div>
    </>
  );
};

export default MagneticDiv;
