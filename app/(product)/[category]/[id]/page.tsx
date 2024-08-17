import ProductDetail from "@/components/ProductDetail";
import { ProductCategoryDetailParams } from "@/lib/types";

export default function ProductDetailPage({
  params,
}: ProductCategoryDetailParams) {
  return <ProductDetail />;
}
