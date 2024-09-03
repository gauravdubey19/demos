import { cardList } from "@/lib/data";
import ProductSection from "../product/ProductSection";
import HeroTwo from "./HeroTwo";
import Carousel2 from "../category2/carousel2";

const Home = () => {
  //   const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //       document.body.style.cursor = "default";
  //       window.scrollTo(0, 0);
  //     }, 10000);
  //   }, []);

  //   return <PreLoader />;
  //   return isLoading ? (
  //     <PreLoader />
  return (
    <>
      <HeroTwo />
      <div className="z-50 bg-white">
        <Carousel2/>
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
      </div>
    </>
  );
};

export default Home;
