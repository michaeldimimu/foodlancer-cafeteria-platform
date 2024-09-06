import { signOut } from "@/auth/auth";
import getSession from "@/auth/lib/getSession";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import OrderStreamSkeleton from "./ui/skeletons/order-stream-skeleton";
import OrderStream from "./ui/orders/order-stream";

const Home = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <main className="p-4">
      <div className="sticky top-0 border-b bg-neutral-light py-4">
        <h1 className="text-3xl font-bold">Order stream - {user.cafeteria}</h1>
      </div>

      <Suspense fallback={<OrderStreamSkeleton />}>
        <OrderStream cafeteriaName={user.cafeteria} />
      </Suspense>
    </main>
  );
};

export default Home;
