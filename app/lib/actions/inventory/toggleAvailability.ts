"use server";

import { MenuCategory, MenuItem } from "@/app/types/cafeteria";
import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export default async function toggleAvailability(
  itemId: string | mongoose.Types.ObjectId,
  category: string,
) {
  const session = await getSession();
  const user = session?.user;

  if (!user?.cafeteria) {
    return {
      success: false,
      message: "You are unauthorised to perform this action",
    };
  }

  await dbConnect();

  try {
    const cafeteria = await Cafeteria.findOne({ name: user.cafeteria });
    const categoryIndex = cafeteria.menuCategories.findIndex(
      (cat: MenuCategory) => cat.name === category,
    );
    const itemIndex = cafeteria.menuCategories[categoryIndex].items.findIndex(
      (item: MenuItem) => item._id.toString() === itemId.toString(),
    );

    cafeteria.menuCategories[categoryIndex].items[itemIndex].available =
      !cafeteria.menuCategories[categoryIndex].items[itemIndex].available;

    await cafeteria.save();
    revalidatePath("/inventory");

    return {
      success: true,
      message: "Item availability updated",
    };
  } catch {
    return {
      success: false,
      message: "Could not change the availability of this item",
    };
  }
}
