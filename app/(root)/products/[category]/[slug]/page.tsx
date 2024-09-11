import { ProductCategoryDetailParams } from "@/lib/types";
import ProductDetail from "@/components/Products/ProductDetail";

export default function ProductDetailPage({
  params,
}: ProductCategoryDetailParams) {
  return <ProductDetail slug={params.slug} />;
}
