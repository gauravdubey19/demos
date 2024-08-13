"use client";

import { useEffect, useState } from "react";
interface Circle {
  x: number;
  y: number;
  size: number;
  borderColor: string;
}

const BLUE_COLOR = "#0000FF";
const RED_COLOR = "#FF0000";

const getRandomSize = () => {
  return Math.floor(Math.random() * (150 - 50 + 1)) + 50;
};

const isIntersecting = (circle1: Circle, circle2: Circle) => {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < circle1.size / 2 + circle2.size / 2;
};

export default function CircleTask() {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    // Adding event listener on mount
    window.addEventListener("mousemove", handleMouseMove);

    // Cleaning up event listener on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleClick = (event: MouseEvent) => {
    const newCircle: Circle = {
      x: event.clientX,
      y: event.clientY,
      size: getRandomSize(),
      borderColor: BLUE_COLOR, // Default color
    };

    setCircles((prevCircles) => {
      const updatedCircles = [...prevCircles, newCircle];

      if (updatedCircles.length > 3) return []; // Clear all circles

      // Checking for intersections and updating colors
      const checkedCircles = updatedCircles.map((circle, index) => {
        let isIntersected = false;
        for (let i = 0; i < updatedCircles.length; i++) {
          if (i !== index && isIntersecting(circle, updatedCircles[i])) {
            isIntersected = true;
            break;
          }
        }
        return {
          ...circle,
          borderColor: isIntersected ? RED_COLOR : BLUE_COLOR,
        };
      });

      return checkedCircles;
    });
  };

  return (
    <>
      <div
        className="relative h-screen z-20 overflow-hidden"
        onClick={() => handleClick}
      >
        <h1 className="text-xl font-bold absolute top-4 left-4">
          Cursor Tracking
        </h1>
        <p className="absolute top-16 left-4">Mouse X: {position.x}</p>
        <p className="absolute top-24 left-4">Mouse Y: {position.y}</p>
        <div
          className="absolute bg-red-700 w-2 h-2 rounded-full pointer-events-none"
          style={{ left: position.x - 8, top: position.y - 8 }}
        ></div>
        {circles.map((circle, index) => (
          <div
            key={index}
            className="absolute rounded-full border-4 transition-colors duration-300 ease-in-out"
            style={{
              left: circle.x - circle.size / 2,
              top: circle.y - circle.size / 2,
              width: circle.size,
              height: circle.size,
              borderColor: circle.borderColor, // Dynamic border color
              pointerEvents: "none",
            }}
          ></div>
        ))}
      </div>
    </>
  );
}
