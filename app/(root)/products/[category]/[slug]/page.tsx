import ProductDetail from "@/components/Product/ProductDetail";
import { ProductCategoryDetailParams } from "@/lib/types";

export default function ProductDetailPage({
  params,
}: ProductCategoryDetailParams) {
  return <ProductDetail slug={params.slug} />;
}
