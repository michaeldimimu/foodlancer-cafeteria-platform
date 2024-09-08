import getSession from "@/auth/lib/getSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Manage foods and availability",
};

const InventoryPage = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  if (!user.cafeteria) {
    redirect("/unauthorised");
  }

  return <div>InventoryPage</div>;
};

export default InventoryPage;
