import fetchOrder from "@/app/lib/data/fetchOrder";
import { OrderFoodItem, Plate } from "@/app/types/order";

import BackButton from "@/app/ui/back-button";
import OrderStatusTabs from "@/app/ui/orders/order-status-tabs";
import getSession from "@/auth/lib/getSession";
import { CallOutlined, TollOutlined } from "@mui/icons-material";

import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Order details",
  description: "View the details of an order",
};

const OrderPage = async ({ params }: { params: { slug: string } }) => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  if (!user.cafeteria) {
    redirect("/unauthorised");
  }

  const order = await fetchOrder(params.slug);

  return (
    <main className="p-4">
      <BackButton />
      <h1 className="mb-4 mt-2 text-3xl font-bold">
        Order #{order.confirmationId}
      </h1>

      <div className="mb-2">
        <p className="font-medium text-neutral-dark01">Ordered by</p>
        <p>
          <span className="text-neutral-dark01">Name:</span>{" "}
          {order.user.firstName} {order.user.lastName}
        </p>

        <p>
          <span className="text-neutral-dark01">Email:</span> {order.user.email}
        </p>
      </div>

      {order.user.phoneNumber && (
        <div className="mb-2">
          <a
            href={`tel:${order.user.phoneNumber}`}
            className="flex w-fit items-center gap-1 font-medium text-primary-one"
          >
            <span>Call customer</span>
            <CallOutlined fontSize="inherit" />
          </a>
        </div>
      )}

      <OrderStatusTabs
        status={order.orderStatus.value}
        message={order.orderStatus.message}
        confirmationId={order.confirmationId}
      />

      <div className="mb-2">
        <p className="font-medium text-neutral-dark01">Ordered from</p>
        <p>{order.cafeteria}</p>
      </div>

      <div>
        <p className="font-medium text-neutral-dark01">Date ordered</p>
        <p>{order.createdAt.toDateString()}</p>
        <p>
          {order.createdAt.toLocaleTimeString("en-US", {
            timeZone: "Africa/Lagos",
          })}
        </p>
      </div>

      {order.deliveryDetails?.deliveryLocation?.hostel && (
        <div className="mt-2">
          <p className="font-medium text-neutral-dark01">Deivering to</p>
          <p className="capitalize">
            {order.deliveryDetails.deliveryLocation.hostel}
            {order.deliveryDetails.deliveryLocation.floor &&
              `, ${order.deliveryDetails.deliveryLocation.floor} floor`}
            {order.deliveryDetails.deliveryLocation.block &&
              `, ${order.deliveryDetails.deliveryLocation.block} block`}
            {`, room ${order.deliveryDetails.deliveryLocation.room}`}
          </p>
        </div>
      )}

      <hr className="mt-4" />

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {order.plates.map((plate: Plate, index: number) => (
          <div key={plate._id.toString()}>
            <p className="font-medium text-neutral-dark01">
              Plate #{index + 1}
            </p>
            {plate.foodItems.map((item: OrderFoodItem) => (
              <div key={item._id.toString()}>
                <p className="text-neutral-dark03">
                  {item.name}{" "}
                  {item.addons.length > 0 &&
                    `(with ${item.addons.map((addon) => addon.name).join(", ")})`}{" "}
                  x {item.quantity}
                </p>
                <p className="text-base font-medium text-neutral-dark01">
                  &#8358;{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <hr className="my-2" />

      <div className="mb-2 flex items-center justify-between text-neutral-dark01">
        <p className="text-base font-medium">Total</p>
        {/* It is not necessary to add processing fee/delivery fee here */}
        <p className="text-lg font-medium">&#8358;{order.subTotal}</p>
      </div>
    </main>
  );
};

export default OrderPage;
