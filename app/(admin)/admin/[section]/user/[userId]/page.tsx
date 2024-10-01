import CustomersDetail from "@/components/Admin/Customers/CustomersDetail";

export default function SubUserSectionPage({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <div className="w-full md:w-[68%] lg:w-[75%] xl:w-[82%] h-full overflow-hidden">
      <CustomersDetail userId={params.userId} />
    </div>
  );
}
