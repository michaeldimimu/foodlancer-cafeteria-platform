import { fetchOrderStream } from "@/app/lib/data";
import OrderItem from "./order-item";
import { Order } from "@/app/types/order";

const OrderStream = async ({ cafeteriaName }: { cafeteriaName: string }) => {
  const orderStream = await fetchOrderStream(cafeteriaName);
  return orderStream?.map((order: Order) => (
    <OrderItem key={order._id.toString()} order={order} />
  ));
};

export default OrderStream;
