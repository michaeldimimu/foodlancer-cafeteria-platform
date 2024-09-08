import getSession from "@/auth/lib/getSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import FindOrderForm from "../ui/confirm-order/find-order-form";

export const metadata: Metadata = {
  title: "Confirm order",
  description: "Confirm a user's order by entering the Confirmation ID.",
};

const ConfirmOrderPage = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  if (!user.cafeteria) {
    redirect("/unauthorised");
  }

  return (
    <main className="p-4">
      <h1 className="mb-2 text-3xl font-bold">
        Confirm order - {user.cafeteria}
      </h1>
      <p className="mb-8">
        Ask the customer to provide the unique 4-digit confirmation ID generated
        when they placed their order.
      </p>

      <FindOrderForm />
    </main>
  );
};

export default ConfirmOrderPage;
