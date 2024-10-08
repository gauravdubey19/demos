import Slider from "@/components/HomePage/Slider";
import GridCards from "@/components/HomePage/Grids/GridCards";

export default function ProductsPage() {
  return (  
    <div className={`relative w-full   py-4 `}> 
     <Slider />
        <GridCards/>
    </div>
  )
}
