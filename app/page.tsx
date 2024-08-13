import CircleTask from "@/components/Circle";
import HomeTask from "@/components/HomeTask";
import Product from "@/components/Product";
import { cardList } from "@/lib/data";

export default function Home() {
  return (
    <main className="">
      {/* <CircleTask /> */}
      <HomeTask />
      {/* <div className="w-full h-[50vh]"></div> */}
      <Product productName="Product Name" href={"/#"} carousel={cardList} />
      <Product productName="Product Name 2" href={"/#"} carousel={cardList} />
    </main>
  );
}
