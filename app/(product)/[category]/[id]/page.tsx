import ProductDetail from "@/components/ProductDetail";
import { ProductCategoryDetailParams } from "@/lib/types";

export default function ProductDetailPage({
  params,
}: ProductCategoryDetailParams) {
  return <ProductDetail product={sampleProduct} />;
}

const sampleProduct = {
  images: [
    "/assets/card.jpeg",
    "/assets/textlieThreeD.png",
    "/assets/card.jpeg",
    "/assets/textlieThreeD.png",
    "/assets/card.jpeg",
    "/assets/textlieThreeD.png",
    "/assets/card.jpeg",
  ],
  mainImage: "/assets/card.jpeg",
  title: "Bold Red Shirt",
  description:
    "This bold red shirt is made from high-quality cotton and features a classic button-down design with a modern twist.",
  price: 49.99,
  oldPrice: 59.99,
  discount: 20,
  ratings: 4,
  reviews: 42,
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Blue", "Green"],
  material: "100% Cotton",
  fabricType: "Woven",
  careInstructions: "Machine wash cold, tumble dry low",
  origin: "Made in Italy",
  availableSizes: ["S", "M", "L", "XL"],
  colorOptions: ["Red", "Blue", "Green"],
  countryOfManufacture: "Italy",
  faqs: [
    {
      question: "What is the return policy?",
      answer:
        "You can return the product within 10 days for a full refund or exchange.",
    },
    {
      question: "How do I contact customer service?",
      answer:
        "You can reach us via email at support@example.com or call us at 123-456-7890.",
    },
    {
      question: "Are there any warranty options?",
      answer: "Yes, we offer a 1-year warranty on all textile products.",
    },
  ],
};
