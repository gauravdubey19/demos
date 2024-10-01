import OrderDetails from "@/components/Admin/Orders/OrderDetails";

export default function SubOrderSectionPage({
  params,
}: {
  params: { userId: string; orderId: string };
}) {
  return (
    <div className="w-full md:w-[68%] lg:w-[75%] xl:w-[82%] h-full overflow-hidden">
      <OrderDetails userId={params.userId} orderId={params.orderId} />
    </div>
  );
}
