import fetchOrderStream from "@/app/lib/data/fetchOrderStream";
import OrderItem from "./order-item";
import { Order } from "@/app/types/order";

const OrderStream = async () => {
  const orderStream = await fetchOrderStream();

  if (orderStream?.length === 0) {
    return (
      <p className="mx-auto mt-16 max-w-[30ch] text-center text-xl">
        No orders yet! When a student places an order you should see it here.
      </p>
    );
  }

  return orderStream?.map((order: Order) => (
    <OrderItem key={order._id.toString()} order={order} />
  ));
};

export default OrderStream;
