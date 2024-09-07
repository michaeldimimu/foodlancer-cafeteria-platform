"use server";

import dbConnect from "@/server/lib/dbConnect";
import Order from "@/server/models/Order";
import { revalidatePath } from "next/cache";

export async function toggleConfirmOrder(confirmationId: string | number) {
  await dbConnect();
  try {
    const orderToToggle = await Order.findOne({
      confirmationId: confirmationId,
    }).exec();
    orderToToggle.status === "confirmed"
      ? (orderToToggle.status = "pending")
      : (orderToToggle.status = "confirmed");
    await orderToToggle.save();
    revalidatePath("/order/[slug]", "page");

    return { success: true, message: "Success!" };
  } catch (error: any) {
    return { success: false, message: "Couldn't perform this operation" };
  }
}
