import { cardList } from "@/lib/data";
import ProductSection from "../product/ProductSection";
import HeroTwo from "./HeroTwo";

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
