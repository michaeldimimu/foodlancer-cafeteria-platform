import getSession from "@/auth/lib/getSession";
import AddItemForm from "../ui/inventory/add-item-form";
import { redirect } from "next/navigation";
import fetchCafeteria from "../lib/data/fetchCafeteria";

const AddItemPage = async () => {
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
      <h1 className="text-3xl font-bold">Add food item</h1>
      <p className="mb-4">
        Fields marked <span className="text-red-500">*</span> are required
      </p>
      <AddItemForm cafeteria={cafeteria} />
    </main>
  );
};

export default AddItemPage;
