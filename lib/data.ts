import { CardValues, FooterSection, LinkValues } from "./types";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export const links: LinkValues[] = [
  { id: 0, head: "Home", href: "/" },
  { id: 1, head: "About", href: "/about" },
  { id: 2, head: "Contact", href: "/contact" },
];
// { id: 1, head: "3D Textile View", href: "/" },
// { id: 2, head: "Ready Made", href: "/" },

export const footer: FooterSection[] = [
  {
    title: "",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/contact#faqs" },
    ],
  },
  {
    title: "More Links",
    links: [
      // { label: "New Arrivals", href: "/#" },
      // { label: "Shipping & Delivery", href: "/#" },
      // { label: "Returns & Exchanges", href: "/#" },
    ],
  },
  {
    title:
      "Stay Ahead in Fashion – Subscribe to Newsteller for the Latest Textile Trends and Updates!",
    isNewsletter: true,
  },
  {
    isSocialLinks: true,
    title: "Social Links",
    links: [
      {
        label: "Facebook",
        href: "#",
        icon: FaFacebookF,
        color: "hover:text-[blue] hover:fill-[blue] hover:border-[blue]",
      },
      {
        label: "Instagram",
        href: "#",
        icon: FaInstagram,
        color: "hover:text-[pink] hover:fill-[pink] hover:border-[pink]",
      },
      {
        label: "YouTube",
        href: "#",
        icon: FaYoutube,
        color: "hover:text-[red] hover:fill-[red] hover:border-[red]",
      },
    ],
  },
  {
    isCopyRight: true,
    title: "CSK Textile. All rights reserved.",
  },
];

export const cardList: CardValues[] = [
  {
    _id: null,
    image_link: "/assets/card.jpeg",
    title: "Bold Red Shirt",
    slug: "bold-red-shirt",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugalaboriosam nesciunt voluptatibus ad reprehenderit magnivwev evprovident cumque, a cupiditate. Fuga laboriosam nesciuntvoluptatibus",
    price: 19,
    oldPrice: 25,
    discount: 25,
    ratings: 5,
    reviews: [],
    type: [],
    availableSizes: [""],
    colorOptions: [],
    categories: [],
  },
  {
    _id: null,
    image_link:
      "https://image.made-in-china.com/2f0j00hswiAnGJiRoZ/Business-Suit-Men-s-Striped-Stretch-Business-Suit-Color-Textile-OEM-ODM.webp",
    title: "Bold Red Shirt",
    slug: "bold-red-shirt",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugalaboriosam nesciunt voluptatibus ad reprehenderit magnivwev evprovident cumque, a cupiditate. Fuga laboriosam nesciuntvoluptatibus",
    price: 10,
    oldPrice: 10,
    discount: 5,
    ratings: 2,
    reviews: [],
    type: [],
    availableSizes: [""],
    colorOptions: [],
    categories: [],
  },
  {
    _id: null,
    image_link:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/kurta/j/h/f/xl-men-ethnic-premium-kurta-dhar-textile-original-imagy2tcphwu3jzh.jpeg?q=90&crop=false",
    title: "Bold Red Shirt",
    slug: "bold-red-shirt",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugalaboriosam nesciunt voluptatibus ad reprehenderit magnivwev evprovident cumque, a cupiditate. Fuga laboriosam nesciuntvoluptatibus",
    price: 19,
    oldPrice: 25,
    discount: 25,
    ratings: 5,
    reviews: [],
    type: [],
    availableSizes: [""],
    colorOptions: [],
    categories: [],
  },
  {
    _id: null,
    image_link:
      "https://cdn.linenclub.com/media/catalog/product/cache/41d32663a01600992c99bcd3aa36f0e1/l/c/lcsfsp0212930_1.jpg",
    title: "Bold Red Shirt",
    slug: "bold-red-shirt",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugalaboriosam nesciunt voluptatibus ad reprehenderit magnivwev evprovident cumque, a cupiditate. Fuga laboriosam nesciuntvoluptatibus",
    price: 10,
    oldPrice: 10,
    discount: 5,
    ratings: 2,
    reviews: [],
    type: [],
    availableSizes: [""],
    colorOptions: [],
    categories: [],
  },
  {
    _id: null,
    image_link:
      "https://cdn.linenclub.com/media/catalog/product/cache/41d32663a01600992c99bcd3aa36f0e1/l/c/lcjkch3000701_0.jpg",
    title: "Bold Red Shirt",
    slug: "bold-red-shirt",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugalaboriosam nesciunt voluptatibus ad reprehenderit magnivwev evprovident cumque, a cupiditate. Fuga laboriosam nesciuntvoluptatibus",
    price: 19,
    oldPrice: 25,
    discount: 25,
    ratings: 5,
    reviews: [],
    type: [],
    availableSizes: [""],
    colorOptions: [],
    categories: [],
  },
  {
    _id: null,
    image_link:
      "https://5.imimg.com/data5/ANDROID/Default/2021/6/DJ/TP/HU/12881310/product-jpeg.jpg",
    title: "Bold Red Shirt",
    slug: "bold-red-shirt",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugalaboriosam nesciunt voluptatibus ad reprehenderit magnivwev evprovident cumque, a cupiditate. Fuga laboriosam nesciuntvoluptatibus",
    price: 10,
    oldPrice: 10,
    discount: 5,
    ratings: 2,
    reviews: [],
    type: [],
    availableSizes: [""],
    colorOptions: [],
    categories: [],
  },
  {
    _id: null,
    image_link:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEdFaWkG3JgjADdehk3p7PZni3qT4p5-4JBDBKSigPBj-cec8jEzOP2xesN3zf5LEhhG4&usqp=CAU",
    title: "Bold Red Shirt",
    slug: "bold-red-shirt",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugalaboriosam nesciunt voluptatibus ad reprehenderit magnivwev evprovident cumque, a cupiditate. Fuga laboriosam nesciuntvoluptatibus",
    price: 19,
    oldPrice: 25,
    discount: 25,
    ratings: 5,
    reviews: [],
    type: [],
    availableSizes: [""],
    colorOptions: [],
    categories: [],
  },
  {
    _id: null,
    image_link:
      "https://www.mkistore.co.uk/cdn/shop/files/MKI_30_5_240603.jpg?v=1719584934&width=1156",
    title: "Bold Red Shirt",
    slug: "bold-red-shirt",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugalaboriosam nesciunt voluptatibus ad reprehenderit magnivwev evprovident cumque, a cupiditate. Fuga laboriosam nesciuntvoluptatibus",
    price: 10,
    oldPrice: 10,
    discount: 5,
    ratings: 2,
    reviews: [],
    type: [],
    availableSizes: [""],
    colorOptions: [],
    categories: [],
  },
];

export const outfitSampleData = [
  {
    outfitTitle: "Casual Summer Vibes",
    outfitSlug: "casual-summer-vibes",
    outfitImage: "/images/3.png",
    productCollection: [
      { title: "Summer Hat", slug: "summer-hat", image: "/images/1.png" },
      { title: "Sunglasses", slug: "sunglasses", image: "/images/2.png" },
      { title: "Light T-shirt", slug: "light-tshirt", image: "/images/5.png" },
      { title: "Shorts", slug: "shorts", image: "/images/4.png" },
    ],
  },
  {
    outfitTitle: "Weekend Getaway",
    outfitSlug: "weekend-getaway",
    outfitImage: "/images/3.png",
    productCollection: [
      { title: "Travel Bag", slug: "travel-bag", image: "/images/2.png" },
      {
        title: "Comfortable Sweater",
        slug: "comfortable-sweater",
        image: "/images/4.png",
      },
      { title: "Jeans", slug: "jeans", image: "/images/1.png" },
      { title: "Boots", slug: "boots", image: "/images/5.png" },
    ],
  },
  {
    outfitTitle: "Evening Elegance",
    outfitSlug: "evening-elegance",
    outfitImage: "/images/3.png",
    productCollection: [
      { title: "Evening Dress", slug: "evening-dress", image: "/images/5.png" },
      { title: "High Heels", slug: "high-heels", image: "/images/4.png" },
      { title: "Clutch Bag", slug: "clutch-bag", image: "/images/1.png" },
      {
        title: "Statement Necklace",
        slug: "statement-necklace",
        image: "/images/2.png",
      },
    ],
  },
  {
    outfitTitle: "Sporty Adventure",
    outfitSlug: "sporty-adventure",
    outfitImage: "/images/3.png",
    productCollection: [
      { title: "Running Shoes", slug: "running-shoes", image: "/images/4.png" },
      {
        title: "Athletic Shorts",
        slug: "athletic-shorts",
        image: "/images/1.png",
      },
      {
        title: "Performance T-shirt",
        slug: "performance-tshirt",
        image: "/images/5.png",
      },
      { title: "Water Bottle", slug: "water-bottle", image: "/images/2.png" },
    ],
  },
];
