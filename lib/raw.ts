export const a = "b";

// "use client";

// import { VideoScroll } from "react-video-scroll";

// interface VideoProps {
//     playbackConst: number;
//     videoUrl: string;
//     className?: string
// }

// const ScrollVideo: React.FC<VideoProps> = ({ playbackConst, videoUrl, className }) => {

//     return (
//         <section className={`${className} relative h-full overflow-hidden`}>
//             {/* <div className="w-full h-[500vh]"> */}
//             <VideoScroll playbackRate={playbackConst}>
//                 <video className="w-full h-full object-cover">
//                     <source type="video/mp4" src={videoUrl} />
//                 </video>
//             </VideoScroll>
//             {/* </div> */}
//         </section>
//     );
// };

// export default ScrollVideo;

//https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4

// playbackConst={0}
// className={`h-[500vh] w-full overflow-hidden`}

// const gifsVid1 = [
//     "/hero/c1.gif",
//     "/hero/c2.gif",
//     "/hero/c3.gif",
//     "/hero/c4.gif",
//     "/hero/c5.gif",
//   ];

//   const gifsVid2 = [
//     "/hero/w1.gif",
//     "/hero/w2.gif",
//     "/hero/w3.gif",
//     "/hero/w4.gif",
//     "/hero/w5.gif",
//   ];

// "use client";

// import { img } from "@/lib/data";
// import React, { useEffect, useRef } from "react";

// interface Particle {
//   x: number;
//   y: number;
//   size: number;
//   speed: number;
//   velocity: number;
//   angle: number;
//   color: string;
//   brightness: number;
//   targetX: number;
//   targetY: number;
//   arrived: boolean;
// }

// const HeroThree: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const particlesArray = useRef<Particle[]>([]);
//   const numberOfParticles = 5000;
//   const detail = 1;
//   const particlesMerged = useRef(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const image = new Image();
//     image.src = "/logo.png"; // Your image path
//     // image.src = "/hero/main.png"; // Your image path
//     image.onload = function () {
//       canvas.width = 522; // Width of your image
//       canvas.height = 353; // Height of your image

//       ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
//       const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

//       // Clear the canvas after getting image data
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const grid: {
//         color: string;
//         brightness: number;
//         x: number;
//         y: number;
//       }[][] = [];
//       for (let y = 0; y < canvas.height; y += detail) {
//         const row = [];
//         for (let x = 0; x < canvas.width; x += detail) {
//           const red = pixels.data[y * 4 * pixels.width + x * 4];
//           const green = pixels.data[y * 4 * pixels.width + x * 4 + 1];
//           const blue = pixels.data[y * 4 * pixels.width + x * 4 + 2];
//           const color = `rgb(${red},${green},${blue})`;
//           const brightness = calculateBrightness(red, green, blue) / 100;
//           row.push({ color, brightness, x, y });
//         }
//         grid.push(row);
//       }

//       class Particle {
//         x: number;
//         y: number;
//         size: number;
//         speed: number;
//         velocity: number;
//         angle: number;
//         color: string;
//         brightness: number;
//         targetX: number;
//         targetY: number;
//         arrived: boolean;

//         constructor(
//           targetX: number,
//           targetY: number,
//           color: string,
//           brightness: number
//         ) {
//           this.x = canvas.width + Math.random() * 200; // Start from the right side
//           this.y = Math.random() * canvas.height;
//           this.size = Math.random() * 2 + 0.5;
//           this.speed = 0;
//           this.velocity = Math.random() * 0.5 + 0.5;
//           this.angle = 0;
//           this.arrived = false;
//           this.color = color;
//           this.brightness = brightness;
//           this.targetX = targetX;
//           this.targetY = targetY;
//         }

//         update() {
//           const dx = this.targetX - this.x;
//           const dy = this.targetY - this.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);
//           this.speed = distance * 0.03;
//           this.x += dx * this.speed * 0.1;
//           this.y += dy * this.speed * 0.1;

//           if (distance < 1) {
//             this.arrived = true;
//           }
//         }

//         draw(ctx: CanvasRenderingContext2D) {
//           ctx.beginPath();
//           ctx.fillStyle = this.color;
//           ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//           ctx.fill();
//         }
//       }

//       function initParticles() {
//         particlesArray.current = [];
//         for (let y = 0; y < grid.length; y++) {
//           for (let x = 0; x < grid[y].length; x++) {
//             const { color, brightness, x: targetX, y: targetY } = grid[y][x];
//             particlesArray.current.push(
//               new Particle(targetX, targetY, color, brightness)
//             );
//           }
//         }
//       }
//       initParticles();

//       function animateParticles() {
//         ctx.globalAlpha = 0.05;
//         ctx.fillStyle = "rgb(0, 0, 0)";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);

//         ctx.globalAlpha = 0.2;
//         let allArrived = true;
//         for (let i = 0; i < particlesArray.current.length; i++) {
//           const particle = particlesArray.current[i];
//           particle.update();
//           particle.draw(ctx);
//           if (!particle.arrived) {
//             allArrived = false;
//           }
//         }

//         if (allArrived && !particlesMerged.current) {
//           particlesMerged.current = true;
//           ctx.globalAlpha = 1;
//           ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
//           ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Draw the final image
//         } else {
//           requestAnimationFrame(animateParticles);
//         }
//       }
//       animateParticles();

//       function calculateBrightness(red: number, green: number, blue: number) {
//         return Math.sqrt(
//           red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
//         );
//       }
//     };
//   }, []);

//   return (
//     <div className="relative w-full h-[calc(100vh-60px)] flex-center">
//       <canvas ref={canvasRef} className="w-[60vh] h-[50vh]" />
//     </div>
//   );
// };

// export default HeroThree;

// "use client";

// import React, { useEffect, useRef } from "react";
// import { cardList } from "@/lib/data";
// import { usePreload } from "@/context/PreloaderProvider";
// import ProductSection from "../product/ProductSection";
// import Hero from "./Hero";
// import PreLoader from "./PreLoader";
// import gsap from "gsap";
// import HeroThree from "./HeroThree";

// const Home = () => {
//   const { activePreload } = usePreload();
//   const preloaderRef = useRef<HTMLDivElement>(null);
//   const mainRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!activePreload) {
//       const timeline = gsap.timeline();

//       timeline
//         .to(preloaderRef.current, {
//           y: "-100%",
//           duration: 1,
//           ease: "power2.inOut",
//           onComplete: () => {
//             preloaderRef.current?.remove();
//           },
//         })
//         .fromTo(
//           mainRef.current,
//           { opacity: 0 },
//           { opacity: 1, duration: 1, ease: "power2.inOut" }
//         );
//     }
//   }, [activePreload]);

//   return (
//     <>
//       <HeroThree />
//       {/* {activePreload ? (
//         <div ref={preloaderRef}>
//           <PreLoader />
//         </div>
//       ) : (
//         <main ref={mainRef} className="opacity-0">
//           <Hero />
//           <div className="z-50 bg-white">
//             <ProductSection
//               category="Product Category 1"
//               href={"/Product Category 1"}
//               carousel={cardList}
//             />
//             <ProductSection
//               category="Product Category 2"
//               href={"/Product Category 2"}
//               carousel={cardList}
//             />
//             <ProductSection
//               category="Product Category 3"
//               href={"/Product Category 3"}
//               carousel={cardList}
//             />
//           </div>
//         </main>
//       )} */}
//     </>
//   );
// };

// export default Home;

// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useCursor } from "@/context/CursorProvider";
// import { links } from "@/lib/data";
// import MobileNav from "./MobileNav";
// import { IoCart } from "react-icons/io5";
// import Image from "next/image";

// const Navbar: React.FC<{ appName: string }> = ({ appName }) => {
//   const [active, setActive] = useState<string>(links[0].head);
//   const { showTxt, setShowTxt, showVideo, setShowVideo } = useCursor();
//   const handleHero = (id: number) => {
//     if (id === 1) {
//       setShowTxt(true);
//       if (showVideo) setShowVideo(false);
//     } else if (id === 2) {
//       if (showTxt) setShowTxt(false);
//       setShowVideo(true);
//     } else {
//       setShowTxt(false);
//       setShowVideo(false);
//     }
//   };
//   return (
//     <>
//       {/* shadow-[0_0_5px_black] */}
//       <div className="sticky top-0 z-[9999] h-[60px] w-full flex-between bg-white text-black p-2 px-3 md:p-4 lg:p-6 overflow-hidden">
//         <Link href="/" className="text-2xl lg:text-3xl font-black">
//           {appName}
//         </Link>
//         <MobileNav />
//         <nav className="hidden md:flex items-center gap-2 md:gap-4 lg:gap-8 text-md md:text-lg lg:text-xl font-normal">
//           {links.map((link, index) => (
//             <Link
//               href={link.href}
//               key={index}
//               onClick={() => setActive(link.head)}
//               className={`capitalize cursor-pointer ${
//                 active === link.head
//                   ? "text-primary font-semibold"
//                   : "hover:border-b hover:border-b-primary active:translate-y-0.5"
//               } ease-in-out duration-200`}
//             >
//               <button onClick={() => handleHero(link.id)}>{link.head}</button>
//             </Link>
//           ))}
//           <div className="ml-2 flex gap-3">
//             <Link
//               href={"/#cart"}
//               className="relative w-10 h-10 rounded-full border border-[#D3D3D3] flex-center"
//             >
//               <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-primary rounded-full"></div>
//               <IoCart size={25} className="fill-[#717171]" />
//             </Link>
//             <Link
//               href={"/profile/personal-information"}
//               className="w-10 h-10 rounded-full overflow-hidden"
//             >
//               <Image
//                 src="/assets/card.jpeg"
//                 alt="profile"
//                 width={200}
//                 height={200}
//                 className="w-full h-full"
//               />
//             </Link>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Navbar;

// by AdarshGzz -

// "use client"
// import React from "react";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import { Button } from "@/components/ui/button";
// import pic1 from '@/public/images/pic1.png'
// import pic2 from '@/public/images/pic2.png'
// import pic3 from '@/public/images/pic3.png'
// import Image from "next/image";

// const CenterMode = () => {
//     const settings = {
//         className: "center",
//         centerMode: true,
//         infinite: true,
//         centerPadding: "60px",
//         slidesToShow: 3,
//         speed: 500,
//         responsive: [
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 1,
//                     centerPadding: "30px",
//                 }
//             }
//         ]
//     };

//     const carouselItems = [
//         { id: 1, imageUrl: pic1 },
//         { id: 2, imageUrl: pic2 },
//         { id: 3, imageUrl: pic3 },
//         { id: 4, imageUrl: pic1 },
//         { id: 5, imageUrl: pic2 },
//         { id: 6, imageUrl: pic3 },
//     ];

//     return (

//         <div className="slider-container max-w-7xl mx-auto px-4 w-screen" style={{color:'#333'}}>
//             <Slider {...settings}>
//                 {carouselItems.map((item) => (
//                     <div key={item.id} className="px-2">
//                         <div className="relative transition-all duration-300 group opacity-50 group-[.slick-center]:opacity-100">
//                             <Image
//                                 src={item.imageUrl}
//                                 alt={`Slide ${item.id}`}
//                                 className="w-full h-[19rem] transition-all duration-300 group-[.slick-center]:scale-110"
//                             />
//                             <Button
//                                 className="mt-4 w-full transition-all duration-300 group-[.slick-center]:scale-110"
//                             >
//                                 Explore
//                             </Button>
//                         </div>
//                     </div>
//                 ))}
//             </Slider>
//         </div>

//     );
// };

// export default CenterMode;

// by adarsh

// import React from 'react'
// import { MoveRight } from 'lucide-react';
// import Image from 'next/image';
// import TestimonialCards from './TestimonialCards';
// import Sliders from './Sliders';
// const TestimonialContainer = () => {
//   return (
//     <div className='px-20'>
//           <h1 className="text-4xl font-bold text-center">Our Testimonies</h1>

//               <div className='bg-[#FFBC49] h-[60vh] w-full mt-10 overflow-hidden flex items-center  px-10'>
//                   <h1 className='w-[20%] text-4xl font-semibold text-white  '>What our customers Says  <MoveRight className='-mt-[3.5rem]' height={80} width={300} /></h1>
//               {/*  card*/}
//                    <div className='h-full py-20 '>
//                     <Sliders>
//                       <TestimonialCards />
//                       <TestimonialCards />
//                       <TestimonialCards />
//                       <TestimonialCards />
//                       <TestimonialCards />
//                     </Sliders>
//                    </div>
//               </div>
//     </div>
//   )
// }

// export default TestimonialContainer

// import React from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// interface CategoryCard {
//   item: any;
//   activeSlide: any;
//   index: any;
// }

// const CategoryCard = ({ item, activeSlide, index }: CategoryCard) => {
//   return (
//     <div className="px-2">
//       <div
//         className={`relative transition-all flex items-center justify-center flex-col  duration-300 ${
//           activeSlide === index
//             ? "opacity-100 scale-140"
//             : "opacity-50 scale-50"
//         }`}
//       >
//         <Image
//           src={item.imageUrl}
//           alt={`Slide ${item.id}`}
//           width={800}
//           height={500}
//           className={`w-fit h-[20rem] transition-all duration-300`}
//         />
//         <div className="flex items-center flex-col gap-3 w-[70%]">
//           <div className="flex items-center flex-col  ">
//             <h1 className="text-lg ">Vibrant checks Shirt</h1>
//             <p className="text-[#a1a1a1]">
//               classic full-sleeve men{"'"}s shirt red and blue check pattern.
//             </p>
//           </div>

//           <Button
//             className={`mt-4 w-full transition-all duration-300 bg-primary rounded-none`}
//           >
//             View More
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCard;
