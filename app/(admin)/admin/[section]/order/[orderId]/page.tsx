import CustomersDetail from "@/components/Admin/Customers/CustomersDetail";
import OrderDetails from "@/components/Admin/Orders/OrderDetails";

export default function SubOrderSectionPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <div className="w-full md:w-[68%] lg:w-[75%] xl:w-[82%] h-full overflow-hidden">
      <OrderDetails orderId={params.orderId} />
    </div>
  );
}
