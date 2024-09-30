import EditProduct from "@/components/Admin/Products/EditProduct";
import { ProductCategoryDetailParams } from "@/lib/types";

export default function ProductDetailPage({
  params,
}: ProductCategoryDetailParams) {
  return (
    <div className="w-full lg:w-[75%] xl:w-[82%] h-full overflow-hidden">
      <EditProduct
        slug={params.slug}
        //   categorySlug={decodeURIComponent(params.category)}
      />
    </div>
  );
}
