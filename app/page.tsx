import HomeTask from "@/components/HomeTask";
import Product from "@/components/Product";
import ScrollVideo from "@/components/ScrollVideo";
import { cardList } from "@/lib/data";

export default function Home() {
  return (
    <main className="">
      {/* <ScrollVideo videoUrl="/macpro.mp4" /> */}
      <HomeTask />
      <section className="">
        <Product
          productName="Product Category"
          href={"/#"}
          carousel={cardList}
        />
        <Product
          productName="Product Category 2"
          href={"/#"}
          carousel={cardList}
        />
        <Product
          productName="Product Category 3"
          href={"/#"}
          carousel={cardList}
        />
      </section>
    </main>
  );
}

/* <div className="w-full h-[50vh]"></div> */
