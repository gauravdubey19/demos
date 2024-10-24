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
