import Slider from "@/components/HomePage/Slider";
import GridCards from "@/components/HomePage/Grids/GridCards";
import FeaturedSection from "@/components/HomePage/FeaturedSection";

export default function ProductsPage() {
  return (
    <div className={`relative w-full mt-[60px] mb-5`}>
      <Slider category={"all"} />
      <GridCards />
      <FeaturedSection category="Featured Textiles" categorySlug="sherwani" />
      <FeaturedSection category="Traditional Wears" categorySlug="dhoti" />
      <FeaturedSection category="Casual Wears" categorySlug="shirt" />
    </div>
  );
}
