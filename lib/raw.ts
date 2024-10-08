export const a = "b";

// section.tsx
{
  /* {section === "my-profile" && <MyProfile />}
        {section === "order-history" && <OrderHistory />}
        {section === "shipping-addresses" && <ShippingAddresses />}
        {section === "payment-methods" && <PaymentMethods />}
        {section === "delete-my-account" && <DeleteMyAccount />} */
}

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

// // 1
// 0
// "https://adamoonline.com/cdn/shop/files/DSC06018_5ed0cbde-f231-4414-a31d-51f258c4a94b.jpg?v=1724672204&width=2800"
// 1
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREGjQIQIeOSOqfFqJT4un7L93fnneY-6EqQiIqBC9PagK0cYeqFP0YVrlSbuu-JcA9MdE&usqp=CAU"
// 2
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLFYkB4nzTYB-deGXdB2NH_Z3IaVA6cjUapy6Dkh7l9I5HCy9_4tDXnngrSAGJEH-P2Pk&usqp=CAU"
// 3
// "https://adamoonline.com/cdn/shop/files/DSC06018_5ed0cbde-f231-4414-a31d-51f258c4a94b.jpg?v=1724672204&width=2800"
// 4
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLFYkB4nzTYB-deGXdB2NH_Z3IaVA6cjUapy6Dkh7l9I5HCy9_4tDXnngrSAGJEH-P2Pk&usqp=CAU"

// // 2
// 0
// "https://adamoonline.com/cdn/shop/files/DSC06662.jpg?v=1722584839&width=2800"

// 1
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkCLdrnNJLEy57VD3yof4N3b1jlmBPUIKFzNRAwQq6fSSWPkK4-s7kztQiU-mrHn340gg&usqp=CAU"

// 2
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRRlMmjZBa249gXbP4rm5YrvJVqKGlypXvkzC0rqSfJsvMOLBkCB0MtcP0PYkmUEABEQ4&usqp=CAU"

// 3
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkCLdrnNJLEy57VD3yof4N3b1jlmBPUIKFzNRAwQq6fSSWPkK4-s7kztQiU-mrHn340gg&usqp=CAU"

// 4
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-O35cMgDf1I1bihH7sWxce3Ne4KFWcPhftk1_E1SDKulfNVX8a4qpX_pTB6dZwrTe1Y&usqp=CAU"

// 3

// 0;
// "https://www.chinaecofiber.com/uploads/image/20210126/13/mens-corduroy-shirts.jpg"
// 1;
// "https://www.chinaecofiber.com/uploads/image/20210126/13/mens-corduroy-shirts_1611640617.jpg"
// 2;
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNSx47n8C5DatSa5C--uW8isy3wX6_5PQTcdNUvbaMFoumr57eKMe_YQ9LKfm-4mGM13Y&usqp=CAU"
// 3;
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI7wMMrsJedyZE9i0QGsBy0ADE6EQWFcmV6-OXHRSnBr27oPH_UWz4c7Ow4Yj3qBR-yIo&usqp=CAU"

// 4

// 0;
// "https://www.green-shirts.com/media/image/9c/a6/4f/W-GB1340-PAM-Hemd-aus-Leinen-Nachhaltige-Mode-Frauen-MASVIDE-Beige-Vorne2_1280x1280.jpg"
// 1;
// "https://www.green-shirts.com/media/image/c3/d0/8c/W-GB1340-PAM-Hemd-aus-Leinen-Nachhaltige-Mode-Frauen-MASVIDE-Beige-Detail2_1280x1280.jpg"
// 2;
// "https://www.green-shirts.com/media/image/12/c7/99/W-GB1340-PAM-Hemd-aus-Leinen-Nachhaltige-Mode-Frauen-MASVIDE-Beige-Vorne_1280x1280.jpg"
// 3;
// "https://www.green-shirts.com/media/image/bb/e5/5f/W-GB1340-PAM-Hemd-aus-Leinen-Nachhaltige-Mode-Frauen-MASVIDE-Beige-Hinten_600x600.jpg"
// 4;
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKN8RODNAqK6CH5GgT0bAgO2TMpkyAnUjxkxQ3oIxPZglyIvX8R7_ZT9tt8f_UFITGmCE&usqp=CAU"

// 5

// 0;
// "https://www.textale.tech/cdn/shop/files/FRESH_Stain-Repel_Tee_Relaxed_Fit__textale_LR.jpg?v=1698207711&width=720"
// 1;
// "https://static.wixstatic.com/media/bf39a3_a7a0f5b26bb14870b1f5e07f8b9dcbcc~mv2.jpg/v1/fill/w_980,h_1225,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/bf39a3_a7a0f5b26bb14870b1f5e07f8b9dcbcc~mv2.jpg"
// 2;
// "https://heyupnow.com/cdn/shop/products/tex_tale_tee_600x.png?v=1679563774"
// 3;
// "https://www.textale.tech/cdn/shop/files/Tee_1efc19c3-e426-46c5-a315-e27b9bd9c241.jpg?v=1714473708&width=1200"
// 4;
// "https://www.textale.tech/cdn/shop/files/Tee_c4a29b07-e4e0-43b1-a20f-98a57d4dbbdb.jpg?v=1714473708&width=1200"

{
  /* <Select defaultValue={defaultSize}>
            <SelectTrigger className="w-full bg-transparent border border-primary rounded-none">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {product.availableSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {sizeLabels[size] || size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */
}

{
  /* <div className="p-10 space-x-5 space-y-4">
        <div className="">Testing - Create Product</div>
        <button
          onClick={createProduct}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Product
        </button>
        <button
          onClick={createOutfit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Outfit
        </button>

        <form onSubmit={createCategory}>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 bg-transparent border-b"
          />
          <input
            type="text"
            name="image"
            placeholder="Enter Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="p-2 bg-transparent border-b"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Category
          </button>
        </form>
        <button
          onClick={showToast}
          className="bg-blue-500 text-white p-2 rounded"
        >
          toast test
        </button>
      </div> */
}
{
  /* <ProductCategorySection limit={1} /> */
}
{
  /* <GridCards /> */
}
//
{
  /* <div className='mb-4 w-full flex items-center '>
                            <input
                                type='checkbox'
                                id='rememberMe'
                                name='rememberMe'
                                checked={rememberMe}
                                onChange={() => setRememberMe(prevState => !prevState)}
                                className='mr-2  '
                            />
                            <label htmlFor='rememberMe' className='text-black text-sm text-nowrap'>
                                Remember Me
                            </label>
                        </div> */
}

//

// warrantyInformation: {
//   type: String,
//   required: false,
// },
// availabilityStatus: {
//   type: String,
//   required: false,
// },
// minimumOrderQuantity: {
//   type: String,
//   required: false,
// },
// stock: {
//   type: String,
//   required: false,
// },
// brand: {
//   type: String,
//   required: false,
// },

//

{
  /* <span>Shervanis</span>
     <span>Kurtis</span>
     <span>Shirts</span> */
}

//

// const Form = () => {
//   const [email, setEmail] = useState<string>("");
//   const [status, setStatus] = useState<FormStatus>({
//     status: "error",
//     message: "",
//   });

//   const validateEmail = (email: string): boolean => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const input = e.target.value.replace(/\s+/g, "");

//     if (input.trim() === "") {
//       setStatus({
//         status: "",
//         message: "",
//       });
//     } else if (!validateEmail(input)) {
//       setStatus({
//         status: "error",
//         message: "Invalid email format...",
//       });
//     } else if (validateEmail(input)) {
//       setStatus({
//         status: "",
//         message: "",
//       });
//     }
//     setEmail(input);
//   };
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (email.trim() === "") {
//       return setStatus({
//         status: "error",
//         message: "Email is required!",
//       });
//     }
//     return setStatus({
//       status: "success",
//       message: "Email sent successfully!",
//     });
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="w-full space-y-1">
//         <div className="w-full flex flex-col md:flex-row gap-2">
//           <input
//             type="email"
//             value={email}
//             onChange={handleEmailChange}
//             placeholder="Email"
//             className="w-full flex-1 border border-primary outline-none rounded-none p-2 px-4"
//           />
//           <Button
//             type="submit"
//             className="bg-primary text-white rounded-none px-6"
//           >
//             Subscribe Now
//           </Button>
//         </div>
//         <div className="w-full h-5 overflow-hidden">
//           {status.message && (
//             <span
//               className={`animate-slide-down ${
//                 status.status === "error" ? "text-red-600" : "text-green-600"
//               }`}
//             >
//               {status.message}
//             </span>
//           )}
//         </div>
//       </form>
//     </>
//   );
// };

// Navbar.tsx

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import { gsap } from "gsap";
// import { useCursor } from "@/context/CursorProvider";
// // import { links } from "@/lib/data";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "../ui/navigation-menu";
// import { CategoryValues } from "@/lib/types";
// import MobileNav from "./MobileNav";
// import Cart from "./CartSheet";
// import ReactCountUp from "../ui/ReactCountUp";
// import { GoHeart } from "react-icons/go";
// import { IoSearchOutline } from "react-icons/io5";
// import { Button } from "../ui/button";

// const profileOption = [
//   { _id: 1, title: "Order History", href: "/profile/order-history" },
//   { _id: 2, title: "Payment Methods", href: "/profile/payment-methods" },
//   { _id: 3, title: "Account Settings", href: "/profile/account-settings" },
//   {
//     _id: 4,
//     title: "Customer Support & Help",
//     href: "/profile/customer-support-&-help",
//   },
// ];

// const Navbar: React.FC<{ appName?: string }> = ({ appName = "LOGO" }) => {
//   const pathname = usePathname();
//   const [isVisible, setIsVisible] = useState<boolean>(false);
//   const { data: session } = useSession();
//   const navbarRef = useRef<HTMLDivElement>(null);
//   const { showLeft, showRight } = useCursor();
//   const visible = showLeft || showRight;

//   const [categories, setCategories] = useState<CategoryValues[]>([]);

//   //
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [suggestions, setSuggestions] = useState<string[]>([]); // To hold search suggestions
//   const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       if (searchQuery.trim()) {
//         try {
//           const response = await fetch(`/api/products/read/get-products-by-name?q=${encodeURIComponent(searchQuery)}`);

//           if (!response.ok) {
//             throw new Error('Failed to fetch products');
//           }

//           const data = await response.json();
//           console.log(data)
//           setSuggestions(data.products);
//           setShowSuggestions(true);
//           // const res = await fetch(`/api/products/search?query=${searchQuery}`);
//           // const data = await res.json();
//           // setSuggestions(data.suggestions); // Assuming API returns a `suggestions` array
//           // setShowSuggestions(true);

//           // console.log(searchQuery);
//           // setSuggestions(["kjahdjf","kjasdjkh","kjdhfkj"]);
//           // setShowSuggestions(true);
//         } catch (error) {
//           console.error("Error fetching suggestions:", error);
//           setShowSuggestions(false);
//         }
//       } else {
//         setShowSuggestions(false);
//       }
//     };

//     fetchSuggestions();
//   }, [searchQuery]);
//   //

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("/api/products/read/get-categories", {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch categories");
//         }

//         const data = await res.json();
//         if (data as CategoryValues[]) {
//           setCategories(data.categories as CategoryValues[]);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     if (categories.length === 0) fetchCategories();
//   }, [categories]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > window.innerHeight * 2.9 && pathname === "/") {
//         setIsVisible(true);
//       } else if (pathname !== "/") {
//         setIsVisible(true);
//       } else if (visible) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [pathname, visible]);

//   useEffect(() => {
//     if (navbarRef.current) {
//       if (isVisible) {
//         gsap.to(navbarRef.current, {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           ease: "power3.out",
//         });
//       } else {
//         gsap.to(navbarRef.current, {
//           y: -100,
//           opacity: 0,
//           duration: 1,
//           ease: "power3.out",
//         });
//       }
//     }
//   }, [isVisible]);

//   return (
//     <div
//       ref={navbarRef}
//       className="fixed top-0 z-[9999] max-h-[60px] w-full select-none flex-between bg-white text-black p-2 px-3 md:p-4 lg:px-12 shadow-lg transition-all"
//       style={{ transform: "translateY(-100px)", opacity: 0 }}
//     >
//       <div className="flex-center gap-4 md:gap-6">
//         <Link
//           href="/"
//           className="flex-between gap-1 text-2xl lg:text-3xl font-black overflow-hidden"
//         >
//           <Image
//             src="/logo.png"
//             alt="LoGo"
//             width={400}
//             height={400}
//             className="w-14 h-14"
//           />
//         </Link>
//         <div>
//           <NavigationMenu className="hidden md:block">
//             <NavigationMenuList className="flex items-center gap-2 lg:gap-4">
//               <NavigationMenuItem>
//                 <NavigationMenuTrigger className="w-full cursor-pointer bg-transparent border-none outline-none p-1">
//                   Categories
//                 </NavigationMenuTrigger>
//                 <NavigationMenuContent className="w-fit space-y-2 p-2 animate-slide-down">
//                   <CategoriesList categories={categories} />
//                 </NavigationMenuContent>
//               </NavigationMenuItem>
//               {categories.slice(0, 3).map((link, index) => {
//                 const isActive = pathname === `/products/${link.slug}`;
//                 return (
//                   <NavigationMenuItem key={index}>
//                     <Link
//                       href={`/products/${link.slug}`}
//                       className={`capitalize cursor-pointer ${isActive
//                           ? "text-primary font-semibold"
//                           : "w-fit hover-underline-lr active:translate-y-0.5"
//                         } ease-in-out duration-200`}
//                     >
//                       {link.title.split(" ")[0]}
//                     </Link>
//                   </NavigationMenuItem>
//                 );
//               })}
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>
//       </div>
//       <MobileNav categories={categories} />

//       <div className="hidden md:flex-center md:gap-4 lg:gap-6 relative">
//         <div className="flex-center relative">
//           <div
//             id="search"
//             className="flex-center lg:bg-zinc-100 rounded-md px-2"
//           >
//             <IoSearchOutline
//               size={20}
//               className="text-zinc-400 scale-150 lg:scale-100"
//             />
//             <input
//               type="text"
//               placeholder="Search for products, categories & more"
//               className="hidden lg:block xl:w-96 bg-transparent border-none outline-none p-2"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onFocus={() => setShowSuggestions(true)}
//               onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Hide dropdown after delay to allow click
//             />
//           </div>

//           {showSuggestions && suggestions.length > 0 && (
//             <ul className="absolute top-full left-0 mt-1 w-full bg-white shadow-md z-10 border rounded-md p-2 space-y-2">
//               {suggestions.map((suggestion, index) => (
//                 <li
//                   key={index}
//                   className="hover:bg-gray-100 p-2 cursor-pointer"
//                   onClick={() => {
//                     setSearchQuery(suggestion);
//                     setShowSuggestions(false);
//                   }}
//                 >
//                   {suggestion}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         {session?.user ? (
//           <>
//             <Link href="/profile/wishlist" className="relative mr-1">
//               <GoHeart
//                 size={25}
//                 color="black"
//                 className="hover:fill-[#FF6464] cursor-pointer ease-in-out duration-300"
//               />
//               <ReactCountUp
//                 className="absolute -top-1.5 -right-1.5 md:-top-2.5 md:-right-2.5 w-5 h-5 flex-center bg-red-500 text-white text-sm md:text-xs rounded-full p-1"
//                 amt={0}
//               />
//             </Link>
//             <Cart />
//             <NavigationMenu className="hidden md:block">
//               {/* Profile dropdown */}
//             </NavigationMenu>
//           </>
//         ) : (
//           <Link
//             href={"/sign-in"}
//             className="bg-zinc-50 border border-gray-300 text-black p-1 rounded-full cursor-pointer text-sm font-semibold hover:bg-gray-100 hover:shadow-sm transition-all duration-300 ease-in-out"
//           >
//             Sign In
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// export interface CategoriesListProps {
//   categories: CategoryValues[];
// }

// const CategoriesList: React.FC<CategoriesListProps> = ({ categories }) => {
//   const pathname = usePathname();
//   // if (categories.length === 0) return;
//   return (
//     <>
//       <div className="w-[40vw] h-fit grid grid-cols-4 gap-2 p-2">
//         {categories.map((category, index) => {
//           const isActive = pathname === `/products/${category.slug}`;

//           return (
//             <Link
//               href={`/products/${category.slug}`}
//               key={category._id}
//               className={`w-fit hover-underline-lr hover:text-primary text-xs ${
//                 isActive && "text-primary"
//               }`}
//             >
//               {category.title}
//             </Link>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// data
// export const carouselItems = [
//   {
//     _id: "1",
//     title: "Black Coat",
//     slug: "/products/Product Black Coat",
//     image:
//       "https://csk-demo.netlify.app/assets/img/media_20240710_190936_2842665475252130661.png",
//   },
//   {
//     _id: "2",
//     title: "Kurta",
//     slug: "/products/Product Kurta",
//     image:
//       "https://csk-demo.netlify.app/assets/img/media_20240710_190937_843411630433170671.png",
//   },
//   {
//     _id: "3",
//     title: "Shirt",
//     slug: "/products/Product Shirt",
//     image:
//       "https://csk-demo.netlify.app/assets/img/media_20240710_190937_9152305180124524051.png",
//   },
//   {
//     _id: "4",
//     title: "Black Coat",
//     slug: "/products/Product Black Coat",
//     image:
//       "https://csk-demo.netlify.app/assets/img/media_20240710_190936_2842665475252130661.png",
//   },
//   {
//     _id: "5",
//     title: "Kurta",
//     slug: "/products/Product Kurta",
//     image:
//       "https://csk-demo.netlify.app/assets/img/media_20240710_190937_843411630433170671.png",
//   },
//   {
//     _id: "6",
//     title: "Shirt",
//     slug: "/products/Product Shirt",
//     image:
//       "https://csk-demo.netlify.app/assets/img/media_20240710_190937_9152305180124524051.png",
//   },
// ];

// const SelectCategoriesAndTypes: React.FC<{
//   setCategories: React.Dispatch<React.SetStateAction<CategoryValue[]>>;
//   setTypes: React.Dispatch<React.SetStateAction<string[]>>;
// }> = ({ setCategories, setTypes }) => {
//   const [categoriesCollection, setCategoriesCollection] = useState<
//     CategoryCollectionValues[]
//   >([]);
//   const [categorySelections, setCategorySelections] = useState<
//     { category: CategoryCollectionValues; type: Type }[]
//   >([]);

//   useEffect(() => {
//     const fetchCategoriesCollection = async () => {
//       try {
//         const res = await fetch(`/api/products/read/get-categories`, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch categories");
//         }

//         const data = await res.json();
//         setCategoriesCollection(data.categories as CategoryCollectionValues[]);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategoriesCollection();
//   }, []);

//   const handleCategoryChange = (index: number, slug: string) => {
//     const selectedCategory = categoriesCollection.find(
//       (category) => category.slug === slug
//     );
//     if (selectedCategory) {
//       const updatedSelections = [...categorySelections];
//       updatedSelections[index] = {
//         category: selectedCategory,
//         type: updatedSelections[index]?.type || { title: "", slug: "" },
//       };
//       setCategorySelections(updatedSelections);

//       // Update selected categories in parent
//       setCategories(
//         updatedSelections.map((sel) => ({
//           title: sel.category.title,
//           slug: sel.category.slug,
//         }))
//       );
//     }
//   };

//   const handleTypeChange = (index: number, slug: string) => {
//     const selectedType = categorySelections[index].category.types.find(
//       (type) => type.slug === slug
//     );
//     if (selectedType) {
//       const updatedSelections = [...categorySelections];
//       updatedSelections[index].type = selectedType;
//       setCategorySelections(updatedSelections);

//       // Update selected types in parent
//       setTypes(updatedSelections.map((sel) => sel.type.slug));
//     }
//   };

//   const handleAddMoreCategory = () => {
//     setCategorySelections([
//       ...categorySelections,
//       {
//         category: {
//           _id: "",
//           image: "",
//           title: "",
//           slug: "",
//           description: "",
//           types: [],
//           createdAt: "",
//         },
//         type: { title: "", slug: "" },
//       },
//     ]);
//   };

//   const handleRemoveSelection = (index: number) => {
//     const updatedSelections = categorySelections.filter((_, i) => i !== index);
//     setCategorySelections(updatedSelections);

//     // Update parent state after removal
//     setCategories(
//       updatedSelections.map((sel) => ({
//         title: sel.category.title,
//         slug: sel.category.slug,
//       }))
//     );
//     setTypes(updatedSelections.map((sel) => sel.type.slug));
//   };

//   const availableCategories = categoriesCollection.filter(
//     (category) =>
//       !categorySelections.some(
//         (selection) => selection.category.slug === category.slug
//       )
//   );

//   const isAddButtonDisabled = categorySelections.some(
//     (selection) => !selection.category.slug || !selection.type.slug
//   );

//   if (categoriesCollection.length === 0)
//     return <h2 className="text-primary">Loading categories...</h2>;

//   return (
//     <div className="col-span-2 grid grid-cols-1 gap-2">
//       <div className="font-semibold">
//         Categories and Types
//         {section === "add" && <span className="text-[red]">*</span>}
//       </div>
//       <div className="col-span-2 grid grid-cols-2 gap-4">
//         {categorySelections.map((selection, index) => (
//           <div key={index} className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Category
//                 {section === "add" && <span className="text-[red]">*</span>}
//               </label>
//               {selection.category.slug ? (
//                 <div className="mt-1 p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-100">
//                   {selection.category.title}
//                 </div>
//               ) : (
//                 <select
//                   value={selection.category.slug || ""}
//                   onChange={(e) => handleCategoryChange(index, e.target.value)}
//                   className="mt-1 block w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
//                 >
//                   <option>Select Category</option>
//                   {availableCategories.map((category) => (
//                     <option key={category.slug} value={category.slug}>
//                       {category.title}
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Type{section === "add" && <span className="text-[red]">*</span>}
//               </label>
//               <div className="flex-between gap-2">
//                 {selection.type.slug ? (
//                   <div className="mt-1 w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-100">
//                     {selection.type.title}
//                   </div>
//                 ) : (
//                   <select
//                     value={selection.type.slug || ""}
//                     onChange={(e) => handleTypeChange(index, e.target.value)}
//                     className="mt-1 block w-full p-2 py-2.5 border border-gray-300 rounded-md shadow-sm bg-[#F8F8F8]"
//                   >
//                     <option>Select Type</option>
//                     {selection.category.types.map((type) => (
//                       <option key={type.slug} value={type.slug}>
//                         {type.title}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveSelection(index)}
//                   className="w-fit h-fit p-2 rounded bg-red-100 hover:bg-red-200 text-red-600"
//                 >
//                   <BsTrash size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="col-span-2">
//           <Button
//             type="button"
//             onClick={handleAddMoreCategory}
//             disabled={isAddButtonDisabled}
//             className="w-full py-2 mt-2 text-white"
//           >
//             Add More Category
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };


// tailwind.config

// import type { Config } from "tailwindcss";

// const config = {
//   darkMode: ["class"],
//   content: [
//     "./pages/**/*.{ts,tsx}",
//     "./components/**/*.{ts,tsx}",
//     "./app/**/*.{ts,tsx}",
//     "./context/**/*.{ts,tsx}",
//   ],
//   prefix: "",
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: {
//           DEFAULT: "var(--primary)",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       keyframes: {
//         "accordion-down": {
//           from: { height: "0" },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: "0" },
//         },
//         "slide-up": {
//           "0%": {
//             opacity: "0",
//             transform: "translateY(100px)",
//           },
//           "100%": {
//             opacity: "1",
//             transform: "translateY(0)",
//           },
//         },
//         "slide-down": {
//           "0%": {
//             opacity: "0",
//             transform: "-translateY(100px)",
//           },
//           "100%": {
//             opacity: "1",
//             transform: "translateY(0)",
//           },
//         },
//         shake: {
//           "0%": { transform: "translateX(0)" },
//           "25%": { transform: "translateX(-15px)" },
//           "50%": { transform: "translateX(10px)" },
//           "75%": { transform: "translateX(-20px)" },
//           "100%": { transform: "translateX(0)" },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//         "slide-up": "slide-up 0.5s ease-in-out",
//         "slide-down": "slide-down 0.5s ease-in-out",
//         shake: "shake 0.3s ease-in-out",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// } satisfies Config;

// export default config;

// hero section
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { Draggable } from "gsap/dist/Draggable";
// import ScrollVideo from "../ui/ScrollVideo";
// import { Button } from "../ui/button";
// import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";
// import ImagePracticles from "../ui/ImagePracticles";
// import { useCursor } from "@/context/CursorProvider";
// import { useRouter } from "next/navigation";

// gsap.registerPlugin(Draggable);

// const GsapHero: React.FC = () => {
//   const router = useRouter();
//   const { showLeft, setShowLeft, showRight, setShowRight } = useCursor();
//   const [containerDraggable, setContainerDraggable] = useState<boolean>(false);
//   const leftSectionRef = useRef<HTMLDivElement>(null);
//   const leftContainerRef = useRef<HTMLDivElement>(null);
//   const leftSlideBackRef = useRef<HTMLDivElement>(null);
//   const rightSectionRef = useRef<HTMLDivElement>(null);
//   const rightContainerRef = useRef<HTMLDivElement>(null);
//   const rightSlideBackRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const updateBounds = () => {
//       const leftContainerWidth = leftContainerRef.current?.offsetWidth ?? 0;
//       const rightContainerWidth = rightContainerRef.current?.offsetWidth ?? 0;

//       if (leftSectionRef.current) {
//         Draggable.create(leftSectionRef.current, {
//           type: "x",
//           bounds: { minX: 0, maxX: leftContainerWidth },
//           onDragEnd() {
//             if (this.x >= leftContainerWidth * 0.1) {
//               gsap.to(leftContainerRef.current, {
//                 x: 0,
//                 duration: 1,
//                 ease: "power2.inOut",
//               });
//               gsap.to(this.target, {
//                 x: 100,
//                 duration: 0.5,
//                 ease: "power2.inOut",
//               });
//               setShowLeft(true);
//             }
//           },
//         });
//       }

//       if (rightSectionRef.current) {
//         Draggable.create(rightSectionRef.current, {
//           type: "x",
//           bounds: { minX: -rightContainerWidth, maxX: 0 },
//           onDragEnd() {
//             if (this.x <= -rightContainerWidth * 0.1) {
//               gsap.to(rightContainerRef.current, {
//                 x: 0,
//                 duration: 1,
//                 ease: "power2.inOut",
//               });
//               gsap.to(this.target, {
//                 x: -100,
//                 duration: 0.5,
//                 ease: "power2.inOut",
//               });
//               setInterval(() => setShowRight(true), 800);
//               router.push("/products/all")
//             }
//           },
//         });
//       }

//       if (leftSlideBackRef.current) {
//         Draggable.create(leftSlideBackRef.current, {
//           type: "x",
//           bounds: { minX: -leftContainerWidth, maxX: 0 },
//           onDragEnd() {
//             if (this.x <= -leftContainerWidth * 0.1) {
//               gsap.to(leftContainerRef.current, {
//                 x: "-100%",
//                 duration: 1,
//                 ease: "power2.inOut",
//               });
//               gsap.to(this.target, {
//                 x: 0,
//                 duration: 0.5,
//                 ease: "power2.inOut",
//               });
//               setShowLeft(false);
//             }
//           },
//         });
//       }

//       if (rightSlideBackRef.current) {
//         Draggable.create(rightSlideBackRef.current, {
//           type: "x",
//           bounds: { minX: 0, maxX: rightContainerWidth },
//           onDragEnd() {
//             if (this.x >= rightContainerWidth * 0.1) {
//               gsap.to(rightContainerRef.current, {
//                 x: "100%",
//                 duration: 1,
//                 ease: "power2.inOut",
//               });
//               gsap.to(this.target, {
//                 x: 0,
//                 duration: 0.5,
//                 ease: "power2.inOut",
//               });
//               setShowRight(false);
//             }
//           },
//         });
//       }
//     };

//     updateBounds();

//     const handleScroll = () => {
//       setContainerDraggable(window.scrollY > window.innerHeight * 2);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [setShowLeft, setShowRight]);

//   return (
//     <>
//       <section className="h-[400vh] bg-white">
//         <div className="w-full h-screen sticky top-0 overflow-hidden">
//           <>
//             {/* left hero section */}
//             <div
//               ref={leftContainerRef}
//               className={`absolute inset-0 z-50 transition-transform duration-300 ${
//                 containerDraggable
//                   ? "-translate-x-full"
//                   : "-translate-x-[115%] md:-translate-x-[110%]"
//               }`}
//             >
//               <div
//                 ref={leftSlideBackRef}
//                 className="absolute right-0 z-50 w-[30vw] h-full bg-transparent cursor-grab active:cursor-grabbing"
//               ></div>
//               <LeftContainer />
//               <div
//                 ref={leftSectionRef}
//                 className="absolute right-0 top-0 w-20 h-full flex items-center justify-center translate-x-20"
//               >
//                 <IoArrowBackSharp size={40} className="text-primary" />
//               </div>
//             </div>

//             {/* right hero section */}
//             <div
//               ref={rightContainerRef}
//               className={`absolute inset-0 z-50 transition-transform duration-300 ${
//                 containerDraggable
//                   ? "translate-x-full"
//                   : "translate-x-[115%] md:translate-x-[110%]"
//               }`}
//             >
//               <div
//                 ref={rightSlideBackRef}
//                 className="absolute left-0 z-50 w-[30vw] h-full bg-transparent cursor-grab active:cursor-grabbing"
//               ></div>
//               <div
//                 ref={rightSectionRef}
//                 className="absolute left-0 w-20 h-full flex items-center justify-center -translate-x-20"
//               >
//                 <IoArrowForwardSharp size={40} className="text-primary" />
//               </div>
//               <RightContainer showRight={showRight} />
//             </div>
//           </>
//           <>
//             <div className="relative w-full h-screen flex-center overflow-hidden">
//               <div
//                 id="bg-section"
//                 className="absolute inset-0 -z-10 h-full w-full"
//               >
//                 <ScrollVideo videoUrl="/videos/homePageHeroVideoTrim.mp4" />
//               </div>
//               <div
//                 id="middle-section"
//                 className="relative lg:h-full bg-[#ffb43320] backdrop-blur-sm flex items-center justify-center w-full md:w-[40vw] lg:w-[30vw] p-6 transition-transform duration-300"
//               >
//                 <MiddleContainer />
//               </div>
//             </div>
//           </>
//         </div>
//       </section>
//     </>
//   );
// };

// export default GsapHero;

// const MiddleContainer: React.FC = () => {
//   // const handleScrollDown = () => {
//   //   window.scrollTo({
//   //     top: window.innerHeight * 3.91,
//   //     behavior: "smooth",
//   //   });
//   // };

//   return (
//     <div className="w-full flex flex-col items-center gap-10 md:gap-16">
//       <div className="w-full flex flex-col gap-2">
//         <div className="relative w-full h-[230px] flex items-end justify-center bg-white/50 text-primary p-4">
//           <div className="absolute md:-left-[6.8rem] top-7 z-10 gap-1 text-[90px] font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
//             <span className="md:text-white">Ex</span>
//             <span>plore</span>
//           </div>
//           <span className="text-6xl lg:text-7xl font-light drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
//             Textiles
//           </span>
//         </div>
//         <span className="w-full text-center text-balance text-[2rem] md:text-2xl lg:text-[2rem] font-light drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] overflow-hidden">
//           Textiles <span className="text-[#AA6C0 font-medium">&</span> Ready
//           made
//         </span>
//       </div>
//       {/* <Button
//         onClick={handleScrollDown}
//         className="w-fit h-fit select-none bg-white text-primary text-xl font-semibold tracking-[6px] p-2 px-3 rounded-none hover:shadow-xl ease-in-out duration-300"
//       >
//         SHOP NOW
//       </Button> */}
//     </div>
//   );
// };

// const LeftContainer = () => {
//   return (
//     <div className="w-full h-full flex-between select-none bg-zinc-400 overflow-hidden"></div>
//   );
// };

// const RightContainer: React.FC<{ showRight: boolean }> = ({ showRight }) => {
//   return (
//     <div className="w-full h-full flex-between flex-col-reverse md:flex-row select-none bg-white overflow-hidden">
//       <div className="h-[calc(100vh-60px)] md:flex-center w-full mt-[60px] p-4 md:p-8 lg:p-10 overflow-hidden">
//         <div className="h-fit w-fit space-y-4">
//           <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold">
//             Welcome
//           </h2>
//           <p className="text-2xl">
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim,
//             odit.
//           </p>
//           <Button>Check Out Now</Button>
//         </div>
//       </div>
//       <div className="h-[calc(100vh-60px)] w-full mt-[60px] overflow-hidden">
//         {showRight && <ImagePracticles img="/assets/rightImage.png" />}
//       </div>
//     </div>
//   );
// };

// product card 
// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { CardDetails } from "@/lib/types";
// import { IoMdStar } from "react-icons/io";
// import { GoHeart, GoHeartFill } from "react-icons/go";
// import { useCart } from "@/context/CartProvider";
// import { Button } from "../ui/button";
// import discount from "@/public/images/discount.png";

// const Card: React.FC<CardDetails> = ({ card, category, loading = false }) => {
//   const [reviews, setReviews] = useState<number>(0);
//   const [avgRating, setAvgRating] = useState<number>(0);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [hovering, setHovering] = useState(false);

//   const {
//     handleAddProductToWhistlist,
//     handleRemoveProductFromWishlist,
//     productExistInWishlist,
//   } = useCart();


//   useEffect(() => {
//     const getReviews = () => {
//       if (!card._id) return;
//       setReviews(card.reviewsNumber ?? 0);
//       setAvgRating(Number(card.ratings?.toFixed(1)) ?? 0);
//     };
//     if (card._id) getReviews();
//   }, [card]);

//   useEffect(() => {
//     let interval: any;
//     // Check if card has at least 2 images
//     if (!card.images || card.images.length < 2) return;

//     if (hovering) {
//       interval = setInterval(() => {
//         setCurrentImageIndex((prevIndex) => {
//           if (!card.images) return 0;
//           return (prevIndex + 1) % card.images.length;
//         });
//       }, 2000); // Change image every 3 seconds
//     }
//     return () => clearInterval(interval);
//   }, [hovering, card.images]);

//   return (
//     <div
//       className="h-fit w-full max-w-[198px] md:max-w-[260px] group bg-white border border-[#E9D7D7] scale-90 hover:scale-95 hover:shadow-lg ease-in-out duration-300 overflow-hidden cursor-pointer rounded"
//       onMouseEnter={() => setHovering(true)}
//       onMouseLeave={() => setHovering(false)}
//     >
//       <Link href={`/products/${category}/${card.slug}`}>
//         <div className="relative h-[240px] sm:h-[240px] md:h-[220px] lg:h-[340px] w-full flex-center select-none overflow-hidden">
//           {!loading && (
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 if (card._id) {
//                   return !productExistInWishlist(card._id)
//                     ? handleAddProductToWhistlist(card._id)
//                     : handleRemoveProductFromWishlist(card._id);
//                 }
//               }}
//               className="absolute group md:hidden top-1 right-1 z-10 cursor-pointer w-8 h-8 flex-center bg-white/50 backdrop-blur-md p-1 rounded-full shadow-[0_0_1.5px_black] ease-in-out duration-300"
//             >
//               {card._id && !productExistInWishlist(card._id) ? (
//                 <GoHeart
//                   size={20}
//                   color="#FF6464"
//                   className="group-hover:scale-110"
//                 />
//               ) : (
//                 <GoHeartFill
//                   size={20}
//                   color="#FF6464"
//                   className="group-hover:scale-110"
//                 />
//               )}
//             </div>
//           )}
//           { !loading &&
//           <div className={`hidden md:block absolute -bottom-12 group-hover:bottom-0 group-hover:animate-slide-up left-0 right-0 z-50 w-full p-1 ease-out duration-300`}>
//             <Button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 if (card._id) {
//                   return !productExistInWishlist(card._id)
//                     ? handleAddProductToWhistlist(card._id)
//                     : handleRemoveProductFromWishlist(card._id);
//                 }
//               }}
//               size="sm"
//               className={`w-full text-lg rounded hover:shadow-md ${
//                 card._id && !productExistInWishlist(card._id)
//                   ? "bg-white backdrop-blur-md border border-[#FF6464] text-[#FF6464]"
//                   : "bg-[#FF6464]"
//               }`}
//             >
//               {card._id && !productExistInWishlist(card._id) ? (
//                 <span className="flex-center gap-1 py-1">
//                   <GoHeart color="#FF6464" className="group-hover:scale-110 mr-1" />
//                   Wishlist
//                 </span>
//               ) : (
//                 <span className="flex-center gap-1 py-1">
//                   <GoHeartFill
//                     color="white"
//                     className="group-hover:scale-110 mr-1"
//                   />
//                   Wishlisted
//                 </span>
//               )}
//             </Button>
//           </div>
//           }
//           <div
//             className={`w-full h-full relative ${
//               loading
//                 ? "bg-gray-300 animate-pulse"
//                 : " ease-in-out duration-300"
//             }`}
//           >
//             {!loading && card.images && card.images.length > 0 && (
//               <div className="relative w-full h-full">
//               <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out group-hover:scale-105"
//               style={{ transform: `translateX(-${currentImageIndex * 100}%)`, width: `100%` }}>
//                 {card.images.map((image, index) => (
//                   <div key={index} className="w-full h-full flex-shrink-0">
//                     <Image
//                       src={image}
//                       alt={card.title}
//                       width={600}
//                       height={600}
//                       loading="lazy"
//                       className="w-full h-full object-cover object-center"
//                     />
//                   </div>
//                 ))}
//                 {/* discount svg overlaying the image */}
               
//               </div>
               
//                { card.oldPrice &&
//               <div className="absolute -top-20 left-1 z-10 duration-300 ease-in-out group-hover:top-2">
//                 <Image
//                   src={discount}
//                   alt="Discount"
//                   width={50}
//                   height={50}
//                   loading="lazy"
//                 />
//                 <div className="absolute top-0 left-0 bottom-0 right-0 z-10 text-white text-xs text-center w-full flex items-center justify-center">
//                   <span>
//                     - {Math.round(((card.oldPrice-card.price)/card.oldPrice)*100)}% <br /> off
//                   </span>
//                   </div>
//               </div>
//               }
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="h-auto w-full flex justify-between flex-col gap-1 p-1.5 md:px-2.5 mb-0.5 md:mb-1 overflow-hidden">
//           <div className="">
//             <div
//               className={`${
//                 loading ? "h-4 md:h-7 bg-slate-200 animate-pulse" : "h-fit"
//               } w-full text-lg md:text-xl font-semibold line-clamp-1`}
//             >
//               {!loading && card.title}
//             </div>
//             <div className="h-fit w-full text-[11px] text-xs font-light text-[#818181] flex gap-1">
//               {loading ? (
//                 <span className="mt-1 w-24 h-2 md:h-3 bg-gray-200 animate-pulse"></span>
//               ) : (
//                 <div className="flex flex-row gap-2">
//                   {reviews ? (
//                     <>
//                       <div className="flex gap-0.5">
//                         {Array.from({ length: 5 }, (_, index) => (
//                           <IoMdStar
//                             key={index}
//                             size={15}
//                             className={
//                               index < Math.floor(avgRating)
//                                 ? "fill-primary"
//                                 : "fill-gray-500"
//                             }
//                           />
//                         ))}
//                       </div>
//                       <span className="text-xs font-semibold">
//                         {avgRating}{" "}
//                       </span>
//                     </>
//                   ) : (
//                     <span className="text-xs font-semibold">No reviews</span>
//                   )}
//                 </div>
//               )}
//               {reviews > 0 && (
//                 <>
//                   |{" "}
//                   <span
//                     className={`line-clamp-1 ${
//                       loading &&
//                       "mt-1 w-20 h-2 md:h-3 bg-gray-200 animate-pulse"
//                     }`}
//                   >
//                     {!loading && reviews + " reviews"}
//                   </span>
//                 </>
//               )}
//             </div>
//             <div
//               className={`w-full text-[11px] md:text-xs text-[#818181] line-clamp-1 ${
//                 loading ? "mt-2 h-7 bg-gray-200 animate-pulse" : "h-fit"
//               }`}
//             >
//               {!loading && card.description}
//             </div>
//           </div>
//           <div className="flex flex-col lg:flex-row lg:gap-2 lg:items-end">
//             <span
//               className={`${
//                 loading && "w-20 h-5 md:h-7 bg-gray-200 animate-pulse"
//               } text-lg md:text-xl font-bold`}
//             >
//               {!loading && "₹" + card.price}
//             </span>
//             {card.oldPrice && (
//               <div className="flex flex-wrap gap-2">
//                 <span
//                   className={`text-xs md:text-md line-through text-gray-400 ${
//                     loading &&
//                     "mt-1 lg:mt-0 w-14 h-3 md:h-5 bg-gray-200 animate-pulse"
//                   }`}
//                 >
//                   {!loading && "₹" + card.oldPrice}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Card;
