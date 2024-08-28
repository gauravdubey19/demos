import { cardList } from "@/lib/data";
import { ProductCategoryDetailParams } from "@/lib/types";
import ProductCategory from "@/components/product/ProductCategory";

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
