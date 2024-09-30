import CategoryDetail from "@/components/Admin/Products/Category/CategoryDetail";

export default function SubCategorySectionPage({
  params,
}: {
  params: { categoryId: string };
}) {
  return (
    <div className="w-full lg:w-[75%] xl:w-[82%] h-full overflow-hidden">
      <CategoryDetail categoryId={params.categoryId} />
    </div>
  );
}
