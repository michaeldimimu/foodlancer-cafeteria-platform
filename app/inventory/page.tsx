import getSession from "@/auth/lib/getSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import fetchCafeteria from "../lib/data/fetchCafeteria";
import Link from "next/link";
import { MenuCategory } from "../types/cafeteria";
import InventoryItem from "../ui/inventory/inventory-item";

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

  return (
    <main className="p-4">
      <div className="sticky top-0 border-b bg-[#fafafa] py-2">
        <h1 className="mb-2 text-3xl font-bold">
          Inventory - {user.cafeteria}
        </h1>

        {cafeteria.menuCategories.length !== 0 && (
          <div className="flex w-full items-center gap-2 overflow-x-scroll">
            {cafeteria.menuCategories.map((menuCategory: MenuCategory) => (
              <a
                key={menuCategory._id.toString()}
                href={`#${menuCategory.name}`}
                className="pb-1 font-medium capitalize hover:border-b hover:border-primary-one hover:text-primary-one"
              >
                {menuCategory.name}
              </a>
            ))}
          </div>
        )}
      </div>

      {cafeteria.menuCategories.length === 0 ? (
        <p className="text-red-500">
          No menu categories found. Please add some to manage your inventory.
        </p>
      ) : (
        cafeteria.menuCategories.map((menuCategory: MenuCategory) => (
          <section
            key={menuCategory._id.toString()}
            id={menuCategory.name}
            className="mb-4"
          >
            <h2 className="mb-2 text-2xl capitalize">{menuCategory.name}</h2>
            {menuCategory.items.map((item) => (
              <InventoryItem
                key={item._id.toString()}
                item={item}
                category={menuCategory.name}
              />
            ))}
          </section>
        ))
      )}
    </main>
  );
};

export default InventoryPage;
