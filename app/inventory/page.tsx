import getSession from "@/auth/lib/getSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Search from "../ui/inventory/search";
import Results from "../ui/inventory/results";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Manage foods and availability",
};

const InventoryPage = async ({
  searchParams,
}: {
  searchParams?: {
    term?: string;
    type?: string;
  };
}) => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  if (!user.cafeteria) {
    redirect("/unauthorised");
  }

  const term = searchParams?.term || "";
  const type = searchParams?.type || "mains";

  return (
    <main className="p-4">
      <h1 className="mb-2 text-3xl font-bold">Inventory - {user.cafeteria}</h1>

      <Search />

      <Results term={term} type={type} />
    </main>
  );
};

export default InventoryPage;
