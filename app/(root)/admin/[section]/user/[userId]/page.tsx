import CustomersDetail from "@/components/Admin/Customers/CustomersDetail";

export default function SubSectionPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <div className="w-full lg:w-[75%] xl:w-[82%] h-full overflow-hidden">
      <CustomersDetail userId={params.orderId} />
    </div>
  );
}
