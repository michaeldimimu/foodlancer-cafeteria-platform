import getSession from "@/auth/lib/getSession";
import OrderStreamHeader from "../ui/order-stream-header";
import { redirect } from "next/navigation";
import OrderStream from "../ui/orders/order-stream";
import fetchCompletedOrders from "../lib/data/fetchCompletedOrders";

const CompletedOrdersPage = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  if (!user.cafeteria) {
    redirect("/unauthorised");
  }

  const initialOrders = await fetchCompletedOrders(0, 20);

  return (
    <main className="p-4">
      {/* <FCMTokenDisplay /> */}
      <OrderStreamHeader cafeteria={user.cafeteria} />

      {initialOrders && initialOrders.length > 0 ? (
        <OrderStream
          initialOrders={initialOrders}
          fetchFunction={fetchCompletedOrders}
        />
      ) : (
        <div className="rounded-xl bg-primary-one/5 px-4 py-8 text-center text-neutral-dark02">
          <p className="mx-auto max-w-[30ch]">No completed orders</p>
        </div>
      )}
    </main>
  );
};

export default CompletedOrdersPage;
