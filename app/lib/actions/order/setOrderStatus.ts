"use server";

import dbConnect from "@/server/lib/dbConnect";
import Order from "@/server/models/Order";
import { revalidatePath } from "next/cache";
import sendNotificationToUser from "../sendNotificationToUser";

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

    // Send a notification to the user about their order's updated status
    let notification = { title: "", details: "" };

    // Dynamically set the value of the notification title
    value === "preparing"
      ? (notification = {
          title: "Preparing your order...",
          details:
            "Your order was successfully received and is now being prepared",
        })
      : value === "ready"
        ? (notification = {
            title: "Your order is ready for pickup",
            details: `You can now pick up your order from the cafeteria! Don't forget the Confirmation ID of the order: ${confirmationId}`,
          })
        : value === "denied"
          ? (notification = {
              title: "Your order has been denied",
              details: `We're so sorry, but the cafeteria denied your order: ${message}`,
            })
          : (notification = {
              title: "Order successfully claimed",
              details: `You have successfully claimed your order. Thank you for using Foodlancer, and enjoy your meal!`,
            });

    orderToToggle.fcmTokens.forEach(async (fcmToken: string) => {
      await sendNotificationToUser(
        fcmToken,
        notification.title,
        notification.details,
      );
    });

    revalidatePath("/order/[slug]", "page");

    return { success: true, message: "Success!" };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: "Couldn't perform this operation" };
  }
}
