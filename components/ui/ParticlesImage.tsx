"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  velocity: number;
  size: number;
  position1: number;
  position2: number;
  angle: number;
  update(): void;
  draw(): void;
}

const ParticlesImage: React.FC<{ img: string }> = ({ img }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = img;

    const handleLoad = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx) return;

      canvas.width = 522;
      canvas.height = 353;

      const particlesArray: Particle[] = [];
      const numberOfParticles = 5000;
      const detail = 1;

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grid = createGrid(pixels, canvas.width, canvas.height, detail);

      const createParticle = (): Particle => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height + canvas.height,
        speed: 0,
        velocity: Math.random() * 0.4,
        size: Math.random() * 2 + 0.5,
        position1: Math.floor((Math.random() * canvas.height) / detail),
        position2: Math.floor((Math.random() * canvas.width) / detail),
        angle: 0,

        update() {
          this.position1 = Math.floor(this.y / detail);
          this.position2 = Math.floor(this.x / detail);
          const gridCell = grid[this.position1]?.[this.position2];
          if (gridCell) {
            this.speed = gridCell.brightness;
          }
          this.angle += this.speed / 20;
          const movement = 2.5 - this.speed + this.velocity;
          this.y -= movement - Math.cos(this.angle) * 2;
          this.x += Math.cos(this.angle) * 2;
          if (this.y <= -this.size) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
          }
        },

        draw() {
          ctx.beginPath();
          ctx.fillStyle = this.y < this.size * 6 ? "black" : "white";
          const gridCell = grid[this.position1]?.[this.position2];
          if (gridCell) {
            ctx.fillStyle = gridCell.color;
          }
          ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
          ctx.fill();
        },
      });

      const initParticles = () => {
        for (let i = 0; i < numberOfParticles; i++) {
          particlesArray.push(createParticle());
        }
      };
      initParticles();

      const animate = () => {
        if (!ctx) return;
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        particlesArray.forEach((particle) => {
          particle.update();
          ctx.globalAlpha = particle.speed * 0.3;
          particle.draw();
        });
        requestAnimationFrame(animate);
      };
      animate();
    };

    image.addEventListener("load", handleLoad);

    return () => {
      image.removeEventListener("load", handleLoad);
    };
  }, [img]);

  const createGrid = (
    pixels: ImageData,
    width: number,
    height: number,
    detail: number
  ): { color: string; brightness: number }[][] => {
    const grid: { color: string; brightness: number }[][] = [];
    for (let y = 0; y < height; y += detail) {
      const row: { color: string; brightness: number }[] = [];
      for (let x = 0; x < width; x += detail) {
        const red = pixels.data[y * 4 * width + x * 4];
        const green = pixels.data[y * 4 * width + (x * 4 + 1)];
        const blue = pixels.data[y * 4 * width + (x * 4 + 2)];
        const color = `rgb(${red},${green},${blue})`;
        const brightness = calculateBrightness(red, green, blue) / 100;
        row.push({ color, brightness });
      }
      grid.push(row);
    }
    return grid;
  };

  const calculateBrightness = (red: number, green: number, blue: number) => {
    return Math.sqrt(
      red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
    );
  };

  return (
    <section className="w-full h-full bg-transparent overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full bg-transparent"></canvas>
    </section>
  );
};

export default ParticlesImage;
