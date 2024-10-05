"use client";

import React, { useEffect, useRef, useState } from "react";

interface Effect {
  width: number;
  height: number;
  gap: number;
}

interface ParticleProps {
  effect: Effect;
  x: number;
  y: number;
  color: string;
  animateEase: number;
}

const createParticle = ({
  effect,
  x,
  y,
  color,
  animateEase,
}: ParticleProps) => {
  const size = effect.gap;
  const ease = animateEase;
  // let particleX = effect.width + Math.random() * 100; // Start off-screen on the right
  // let particleY = y + Math.sin(x / 10) * 20; // Wave pattern for initial Y position

  let particleX = Math.random() * effect.width;
  let particleY = Math.random() * effect.height;
  const originX = Math.floor(x);
  const originY = Math.floor(y);

  const draw = (context: CanvasRenderingContext2D) => {
    context.fillStyle = color;
    context.fillRect(particleX, particleY, size, size);
  };

  const update = () => {
    particleX += (originX - particleX) * ease;
    particleY += (originY - particleY) * ease;
  };

  return { draw, update };
};

const createEffect = (
  width: number,
  height: number,
  pixelsGap: number,
  animateEase: number
) => {
  const particlesArray: ReturnType<typeof createParticle>[] = [];
  const image = document.getElementById("image1") as HTMLImageElement;
  const centerX = width * 0.5;
  const centerY = height * 0.5;
  const x = centerX - image.width * 0.5;
  const y = centerY - image.height * 0.5;
  const gap = pixelsGap;

  const init = (context: CanvasRenderingContext2D) => {
    context.drawImage(image, x, y);
    const pixels = context.getImageData(0, 0, width, height).data;

    for (let posY = 0; posY < height; posY += gap) {
      for (let posX = 0; posX < width; posX += gap) {
        const index = (posY * width + posX) * 4;
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const alpha = pixels[index + 3];
        const color = `rgb(${red},${green},${blue})`;

        if (alpha > 0) {
          particlesArray.push(
            createParticle({
              effect: { width, height, gap },
              x: posX,
              y: posY,
              color,
              animateEase,
            })
          );
        }
      }
    }
  };

  const draw = (context: CanvasRenderingContext2D) => {
    particlesArray.forEach((particle) => particle.draw(context));
  };

  const update = () => {
    particlesArray.forEach((particle) => particle.update());
  };

  return { init, draw, update };
};

const ImagePracticles: React.FC<{
  img: string;
  pixelsGap?: number;
  animateEase?: number;
}> = ({ img, pixelsGap = 4, animateEase = 0.2 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [base64ImageString, setBase64ImageString] = useState<string>("");

  useEffect(() => {
    const convertToBase64 = async (url: string) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        setBase64ImageString(reader.result as string);
      };

      reader.readAsDataURL(blob);
    };

    if (img) {
      convertToBase64(img || "/logo.png");
    }
  }, [img]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const effect = createEffect(
      canvas.width,
      canvas.height,
      pixelsGap,
      animateEase
    );
    effect.init(ctx);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
      effect.draw(ctx);
      effect.update();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateEase, base64ImageString, pixelsGap]);

  return (
    <div className="relative w-full h-full bg-transparent overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full object-cover"></canvas>
      <img
        id="image1"
        src={base64ImageString}
        alt="Particle Image"
        onLoad={() => setIsLoaded(true)}
        className="hidden"
      />
    </div>
  );
};

export default ImagePracticles;
