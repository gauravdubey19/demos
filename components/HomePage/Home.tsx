import { cardList } from "@/lib/data";
import ProductSection from "../product/ProductSection";
import CategorySection from "./CategorySection/CategorySection";
import GsapHero from "./GsapHero";
// import Hero from "./Hero";
import GridCards from "../Grids/GridCards";
import TestimonialContainer from "../Testimonials/TestimonialContainer";

const Home = () => {
  return (
    <>
      <main>
        <GsapHero />
        <CategorySection />
        <GridCards />
        <ProductSection
          category="Product Category 1"
          href={"/products/Product Category 1"}
          carousel={cardList}
        />
        <ProductSection
          category="Product Category 2"
          href={"/products/Product Category 2"}
          carousel={cardList}
        />
        <ProductSection
          category="Product Category 3"
          href={"/products/Product Category 3"}
          carousel={cardList}
        />
        <TestimonialContainer />
      </main>
    </>
  );
};

export default Home;
