import { ProductCategoryDetailParams } from "@/lib/types";
import NewEditProduct from "@/components/Admin/Products/NewEditProduct";
// import EditProduct from "@/components/Admin/Products/EditProduct";

export default function ProductDetailPage({
  params,
}: ProductCategoryDetailParams) {
  return (
    <div className="w-full md:w-[68%] lg:w-[75%] xl:w-[82%] h-full overflow-hidden">
      <NewEditProduct
        slug={params.slug}
        //   categorySlug={decodeURIComponent(params.category)}
      />
    </div>
  );
}
