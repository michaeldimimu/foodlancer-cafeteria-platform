"use server";

import dbConnect from "@/server/lib/dbConnect";
import Order from "@/server/models/Order";
import { revalidatePath } from "next/cache";

export default async function setOrderStatus(
  confirmationId: string | number,
  value: string,
  message: string,
) {
  await dbConnect();
  try {
    const orderToToggle = await Order.findOne({
      confirmationId: confirmationId,
    }).exec();

    orderToToggle.orderStatus = { value, message };

    await orderToToggle.save();

    revalidatePath("/order/[slug]", "page");

    return { success: true, message: "Success!" };
  } catch (error: any) {
    return { success: false, message: "Couldn't perform this operation" };
  }
}
