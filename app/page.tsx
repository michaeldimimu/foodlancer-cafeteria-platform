import { signOut } from "@/auth/auth";
import getSession from "@/auth/lib/getSession";
import { redirect } from "next/navigation";
import { fetchOrderHistory } from "./lib/data";
import { Order } from "./types/order";

const Home = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const orderHistory = await fetchOrderHistory(user.cafeteria);

  return (
    <main>
      <p>Home {JSON.stringify(user)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>

      {orderHistory.map((order: Order) => (
        <>
          <p>{order.cafeteria}</p>
          <p>{order.confirmationId}</p>
        </>
      ))}
    </main>
  );
};

export default Home;
