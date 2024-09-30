import EditProduct from "@/components/Admin/Products/EditProduct";
import { ProductCategoryDetailParams } from "@/lib/types";

export default function ProductDetailPage({
  params,
}: ProductCategoryDetailParams) {
  return (
    <EditProduct
      slug={params.slug}
      //   categorySlug={decodeURIComponent(params.category)}
    />
  );
}
