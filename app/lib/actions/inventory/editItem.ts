"use server";

import { MenuCategory, MenuItem } from "@/app/types/cafeteria";
import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import { revalidatePath } from "next/cache";

export default async function editItem(
  itemId: string,
  category: string,
  name: string,
  price: number,
) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  await dbConnect();

  try {
    const cafeteria = await Cafeteria.findOne({
      name: session.user.cafeteria,
    }).exec();

    if (!cafeteria) {
      throw new Error("Cafeteria not found");
    }

    const categoryIndex = cafeteria.menuCategories.findIndex(
      (cat: MenuCategory) => cat.name === category,
    );
    const itemIndex = cafeteria.menuCategories[categoryIndex].items.findIndex(
      (item: MenuItem) => item._id.toString() === itemId.toString(),
    );

    cafeteria.menuCategories[categoryIndex].items[itemIndex].name = name;
    cafeteria.menuCategories[categoryIndex].items[itemIndex].price = price;

    await cafeteria.save();
    revalidatePath("/inventory");

    return { success: true, message: "Food item updated successfully" };
  } catch (error: any) {
    console.error("Failed to save cafeteria changes:", error);
    return { success: false, message: "Failed to update food item" };
  }
}
