"use server";

import { MenuItem } from "@/app/types/cafeteria";
import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export default async function updateMenuItemQuantity(
  itemId: string | mongoose.Types.ObjectId,
  category: string,
  updatedQuantity: number,
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

    if (category === "mains") {
      var matchedItem = cafeteria.menu.mains.find(
        (item: MenuItem) => item.food._id.toString() === itemId.toString(),
      );
    } else if (category === "sides") {
      var matchedItem = cafeteria.menu.sides.find(
        (item: MenuItem) => item.food._id.toString() === itemId.toString(),
      );
    }

    matchedItem.quantity = updatedQuantity;
    await cafeteria.save();
    revalidatePath("/inventory");

    return {
      success: true,
      message: "Item quantity updated successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Could not update the quantity of this item",
    };
  }
}
