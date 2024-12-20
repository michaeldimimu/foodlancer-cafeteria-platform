import getSession from "@/auth/lib/getSession";
import { redirect } from "next/navigation";
import OrderStream from "./ui/orders/order-stream";
import { Metadata } from "next";
import fetchOrderStream from "./lib/data/fetchOrderStream";
import FCMTokenDisplay from "./ui/generate-fcm-token";

export const metadata: Metadata = {
  title: "Order stream",
  description: "View orders for your cafeteria as they come in.",
};

const Home = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  if (!user.cafeteria) {
    redirect("/unauthorised");
  }

  const initialOrders = await fetchOrderStream(0, 20);

  if (initialOrders?.length === 0) {
    return (
      <p className="mx-auto mt-16 max-w-[30ch] text-center text-xl">
        No orders yet! When a student places an order you should see it here.
      </p>
    );
  }

  return (
    <main className="p-4">
      <FCMTokenDisplay />
      <div className="sticky top-0 border-b bg-neutral-light py-4">
        <h1 className="text-3xl font-bold">Order stream - {user.cafeteria}</h1>
      </div>
      {initialOrders && initialOrders.length > 0 ? (
        <OrderStream initialOrders={initialOrders} />
      ) : (
        <div className="rounded-xl bg-primary-one/5 px-4 py-8 text-center text-neutral-dark02">
          <p className="mx-auto max-w-[30ch]">No recent orders</p>
        </div>
      )}
    </main>
  );
};

export default Home;
