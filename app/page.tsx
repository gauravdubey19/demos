import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import ScrollVideo from "@/components/ScrollVideo";
import { ScrollProvider } from "@/context/SectionScrollCntext";
import { cardList } from "@/lib/data";

export default function Home() {
  return (
    <main className="">
      {/* <ScrollProvider> */}
      <Hero />
      <ProductSection
        category="Product Category 1"
        href={"/Product Category 1"}
        carousel={cardList}
      />
      <ProductSection
        category="Product Category 2"
        href={"/Product Category 2"}
        carousel={cardList}
      />
      <ProductSection
        category="Product Category 3"
        href={"/Product Category 3"}
        carousel={cardList}
      />
      {/* </ScrollProvider> */}
    </main>
  );
}

/* <div className="w-full h-[50vh]"></div> */
