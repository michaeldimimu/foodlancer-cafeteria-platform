"use server";

import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import Order from "@/server/models/Order";
import { SupervisorAccount } from "@mui/icons-material";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { MenuItem } from "../types/cafeteria";

export async function toggleConfirmOrder(
  confirmationId: string | number,
  value: string,
) {
  await dbConnect();
  try {
    const orderToToggle = await Order.findOne({
      confirmationId: confirmationId,
    }).exec();

    orderToToggle.status = value;

    await orderToToggle.save();

    revalidatePath("/order/[slug]", "page");

    return { success: true, message: "Success!" };
  } catch (error: any) {
    return { success: false, message: "Couldn't perform this operation" };
  }
}

export async function toggleAvailability(
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

    if (category === "mains") {
      var matchedItem = cafeteria.menu.mains.find(
        (item: MenuItem) => item.food._id.toString() === itemId.toString(),
      );
    } else if (category === "sides") {
      var matchedItem = cafeteria.menu.sides.find(
        (item: MenuItem) => item.food._id.toString() === itemId.toString(),
      );
    }

    matchedItem.available
      ? (matchedItem.available = false)
      : (matchedItem.available = true);
    await cafeteria.save();
    revalidatePath("/inventory");

    return {
      success: true,
      message: `Item set to ${!matchedItem.available ? "not" : ""} available`,
    };
  } catch (error) {
    return {
      success: false,
      message: "Could not change the availability of this item",
    };
  }
}

export async function updateMenuItemQuantity(
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
