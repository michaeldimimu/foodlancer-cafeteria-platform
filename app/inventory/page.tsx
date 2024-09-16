import getSession from "@/auth/lib/getSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import InventoryWrapper from "../ui/inventory/inventory-wrapper";
import fetchCafeteria from "../lib/data/fetchCafeteria";

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

  const cafeteria = await fetchCafeteria();
  const parsedCafeteria = JSON.parse(JSON.stringify(cafeteria));

  return (
    <main className="p-4">
      <h1 className="mb-2 text-3xl font-bold">Inventory - {user.cafeteria}</h1>

      <InventoryWrapper cafeteria={parsedCafeteria} />
    </main>
  );
};

export default InventoryPage;
