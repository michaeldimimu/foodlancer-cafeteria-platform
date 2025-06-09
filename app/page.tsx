import getSession from "@/auth/lib/getSession";
import { redirect } from "next/navigation";
import OrderStream from "./ui/orders/order-stream";
import { Metadata } from "next";
import OrderStreamHeader from "./ui/order-stream-header";
import fetchActiveOrders from "./lib/data/fetchActiveOrders";

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

  const initialOrders = await fetchActiveOrders(0, 20);

  return (
    <main className="p-4">
      {/* <FCMTokenDisplay /> */}
      <OrderStreamHeader cafeteria={user.cafeteria} />

      {initialOrders && initialOrders.length > 0 ? (
        <OrderStream
          initialOrders={initialOrders}
          fetchFunction={fetchActiveOrders}
        />
      ) : (
        <div className="rounded-xl bg-primary-one/5 px-4 py-8 text-center text-neutral-dark02">
          <p className="mx-auto max-w-[30ch]">No active orders</p>
        </div>
      )}
    </main>
  );
};

export default Home;
