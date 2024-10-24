import CategorySection from "./CategorySection/CategorySection";
import ProductCategorySection from "./CategorySection/ProductCategorySection";
import TestimonialContainer from "./Testimonials/TestimonialContainer";
import NewHeroSection from "./NewHeroSection";
import PreLoader from "../ui/PreLoader";

const Home = () => {
  return (
    <>
      <main className="w-full h-full">
        <PreLoader />
        <NewHeroSection />
        <CategorySection />
        <ProductCategorySection />
        <TestimonialContainer />
      </main>
    </>
  );
};

export default Home;
