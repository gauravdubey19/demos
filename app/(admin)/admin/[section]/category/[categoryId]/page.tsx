import CategoryDetail from "@/components/Admin/Products/Category/CategoryDetail";

export default function SubCategorySectionPage({
  params,
}: {
  params: { categoryId: string };
}) {
  return (
    <div className="w-full md:w-[68%] lg:w-[75%] xl:w-[82%] h-full overflow-hidden">
      <CategoryDetail categoryId={params.categoryId} />
    </div>
  );
}
