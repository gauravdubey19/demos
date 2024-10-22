// import GsapHero from "./GsapHero";
import CategorySection from "./CategorySection/CategorySection";
import GridCards from "./Grids/GridCards";
import ProductCategorySection from "./CategorySection/ProductCategorySection";
import TestimonialContainer from "./Testimonials/TestimonialContainer";
import HeroWithDrag from "./HeroWithDrag";
import NewHeroSection from "./NewHeroSection";
import PreLoader from "../ui/PreLoader";

const Home = () => {
  return (
    <>
      <main className="w-full h-full">
        {/* <GsapHero /> */}
        {/* <HeroWithDrag /> */}
        <PreLoader />
        <NewHeroSection />
        <CategorySection />
        {/* <GridCards /> */}
        <ProductCategorySection />
        <TestimonialContainer />
      </main>
    </>
  );
};

export default Home;
