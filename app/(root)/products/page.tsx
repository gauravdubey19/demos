import Slider from "@/components/HomePage/Slider";
import GridCards from "@/components/HomePage/Grids/GridCards";
import FeaturedSection from "@/components/HomePage/FeaturedSection";

export default function ProductsPage() {
  return (  
    <div className={`relative w-full mt-8 py-4 `}> 
     <Slider />
      <GridCards/>
      <FeaturedSection category="Featured Textiles" categorySlug="sherwani"/>
      <FeaturedSection category="Traditional Wears" categorySlug="dhoti"/>
      <FeaturedSection category="Casual Wears" categorySlug="shirt"/>
    </div>
  )
}
