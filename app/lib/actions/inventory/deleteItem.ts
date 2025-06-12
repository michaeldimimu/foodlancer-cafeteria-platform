"use server";

import { MenuCategory, MenuItem } from "@/app/types/cafeteria";
import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export default async function deleteItem(
  itemId: string | mongoose.Types.ObjectId,
  category: string,
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
      return { success: false, message: "Cafeteria not found" };
    }

    const categoryIndex = cafeteria.menuCategories.findIndex(
      (cat: MenuCategory) => cat.name === category,
    );
    const itemIndex = cafeteria.menuCategories[categoryIndex].items.findIndex(
      (item: MenuItem) => item._id.toString() === itemId.toString(),
    );

    cafeteria.menuCategories[categoryIndex].items.splice(itemIndex, 1);

    await cafeteria.save();
    revalidatePath("/inventory");

    return {
      success: true,
      message: "This item has been removed from your menu",
    };
  } catch (error: any) {
    console.error("Failed to save cafeteria changes:", error);
    return { success: false, message: "Failed to delete food item" };
  }
}
