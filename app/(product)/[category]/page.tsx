import ProductCategory from "@/components/ProductCategory";
import { ProductCategoryDetailParams } from "@/lib/types";
import { cardList } from "@/lib/data";

export default function ProductCategoryPage({
  params,
}: ProductCategoryDetailParams) {
  return (
    <ProductCategory
      category={decodeURIComponent(params.category)}
      products={cardList}
    />
  );
}
