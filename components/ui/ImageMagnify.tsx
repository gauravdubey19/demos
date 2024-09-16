"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface ImageMagnifyProps {
  src: string;
  alt: string;
  zoomFactor?: number;
  width?: string;
  height?: string;
  className?: string;
  imageFit?: string;
}

const ImageMagnify: React.FC<ImageMagnifyProps> = ({
  src,
  alt,
  zoomFactor = 2,
  width = "300px",
  height = "300px",
  className = "",
  imageFit = "contain",
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();

    let x = (e.pageX - left) / width;
    let y = (e.pageY - top) / height;

    // ensuring zoom box doesn't move out of the image's bounds
    const zoomBoxSize = 1 / zoomFactor;
    x = Math.max(zoomBoxSize / 2, Math.min(1 - zoomBoxSize / 2, x));
    y = Math.max(zoomBoxSize / 2, Math.min(1 - zoomBoxSize / 2, y));

    setZoomPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // calculating the zoom box size based on zoom-factor
  const zoomBoxSize = `${100 / zoomFactor}%`;

  return (
    <div
      className={`relative flex ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={imageRef}
    >
      {/* main image */}
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit={imageFit}
        className={`${
          isHovering && "opacity-70"
        } pointer-events-none transition-opacity duration-300`}
      />

      {/* semi-transparent overlay */}
      {/* <div
        className={`absolute inset-0 z-10 bg-black ${
          isHovering ? "opacity-30" : "opacity-0"
        } pointer-events-none transition-opacity duration-300`}
      /> */}

      {/* zoom box */}
      {isHovering && (
        <div
          className={`absolute z-50`}
          style={{
            width: zoomBoxSize,
            height: zoomBoxSize,
            top: `${zoomPosition.y * 100}%`,
            left: `${zoomPosition.x * 100}%`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `${zoomPosition.x * 100}% ${
              zoomPosition.y * 100
            }%`,
            backgroundSize: `${zoomFactor * 100}% ${zoomFactor * 100}%`,
          }}
        />
      )}

      {/* zoomed-in image */}
      {isHovering && (
        <div
          className="absolute top-0 z-50 left-full ml-4 backdrop-blur-sm overflow-hidden"
          style={{
            width,
            height,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `${zoomPosition.x * 100}% ${
              zoomPosition.y * 100
            }%`,
            backgroundSize: `${zoomFactor * 100}% ${zoomFactor * 100}%`,
            objectFit: "contain",
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnify;
