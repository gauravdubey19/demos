import { cardList } from "@/lib/data";
import ProductSection from "../product/ProductSection";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
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
    </>
  );
};

export default Home;
