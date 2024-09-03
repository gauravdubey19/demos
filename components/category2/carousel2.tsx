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




"use client"
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";
// import pic2 from '@/public/demo/pic2.png'
// import pic3 from '@/public/demo/pic3.png'
// import pic1 from '@/public/images/pic1.png'
import Image from "next/image";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Cards from "./Cards";


const Carousel2 = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        focusOnSelect: true,
        className: "center",
        autoplay: true,
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 3,
        speed: 500,
        nextArrow: <ChevronRight height={60} width={60} color="#ffb433" />,
        prevArrow: <ChevronLeft height={60} width={60} color="#ffb433" />,
        beforeChange: (current: any, next: any) => setActiveSlide(next),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "60px",
                }
            }
        ]
    };

    const carouselItems = [
        { id: 1, imageUrl: 'https://csk-demo.netlify.app/assets/img/media_20240710_190936_2842665475252130661.png' },
        { id: 2, imageUrl: "https://csk-demo.netlify.app/assets/img/media_20240710_190937_843411630433170671.png" },
        { id: 3, imageUrl: "https://csk-demo.netlify.app/assets/img/media_20240710_190937_9152305180124524051.png" },
        { id: 4, imageUrl: "https://csk-demo.netlify.app/assets/img/media_20240710_190936_2842665475252130661.png" },
        { id: 5, imageUrl: "https://csk-demo.netlify.app/assets/img/media_20240710_190937_843411630433170671.png" },
        { id: 6, imageUrl: "https://csk-demo.netlify.app/assets/img/media_20240710_190937_9152305180124524051.png" },
    ];

    return (
        <div className="flex h-screen items-center justify-center gap-6 flex-col">
            <div className="h-[2px] w-[80vw] bg-black"/>
            <h1 className="text-3xl pt-5 font-semibold">
                Choose your style
            </h1>
        <div className=" flex items-center justify-center ">
            <div className="slider-container max-w-6xl  w-full">
                <Slider {...settings} className="h-max" >
                    {carouselItems.map((item, index) => (
                        <Cards item={item} activeSlide={activeSlide} index={index}/>
                    ))}
                </Slider>
            </div>
        </div>
        </div>
    );
};

export default Carousel2;