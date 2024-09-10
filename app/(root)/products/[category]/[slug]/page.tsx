import { ProductCategoryDetailParams } from "@/lib/types";
import ProductDetail from "@/components/Product/ProductDetail";

export default function ProductDetailPage({
  params,
}: ProductCategoryDetailParams) {
  return <ProductDetail slug={params.slug} />;
}
