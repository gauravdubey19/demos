import GsapHero from "./GsapHero";
import CategorySection from "./CategorySection/CategorySection";
import GridCards from "./Grids/GridCards";
import ProductCategorySection from "./CategorySection/ProductCategorySection";
import TestimonialContainer from "./Testimonials/TestimonialContainer";

const Home = () => {
  return (
    <>
      <main className="w-full h-full">
        <GsapHero />
        <CategorySection />
        <GridCards />
        <ProductCategorySection />
        <TestimonialContainer />
      </main>
    </>
  );
};

export default Home;
