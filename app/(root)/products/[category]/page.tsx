import { ProductCategoryDetailParams } from "@/lib/types";
import ProductCategory from "@/components/Products/ProductCategory";

export default function ProductCategoryPage({
  params,
  searchParams,
}: ProductCategoryDetailParams) {
  return (
    <ProductCategory
      category={decodeURIComponent(params.category)}
      type={searchParams?.type}
    />
  );
}
