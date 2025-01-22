"use server";

import dbConnect from "@/server/lib/dbConnect";
import Order from "@/server/models/Order";
import { revalidatePath } from "next/cache";
import sendNotificationToUser from "../sendNotificationToUser";
import User from "@/server/models/User";

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

    const user = await User.findOne({ _id: orderToToggle.user }).exec();

    orderToToggle.orderStatus = { value, message };

    if (value === "claimed") {
      user.coins += 10;
      await user.save();
    }

    await orderToToggle.save();

    // Send a notification to the user about their order's updated status
    let notification = { title: "", body: "" };

    // Dynamically set the value of the notification title
    value === "preparing"
      ? (notification = {
          title: "Preparing your order...",
          body: "Your order was successfully received and is now being prepared",
        })
      : value === "ready"
        ? (notification = {
            title: "Your order is ready for pickup",
            body: `You can now pick up your order from the cafeteria! Don't forget the Confirmation ID of the order: ${confirmationId}`,
          })
        : value === "denied"
          ? (notification = {
              title: "Your order has been denied",
              body: `We're so sorry, but the cafeteria denied your order: ${message}`,
            })
          : (notification = {
              title:
                "Order successfully claimed - You have received 10 FL Coins!",
              body: `You have successfully claimed your order. Thank you for using Foodlancer, and enjoy your meal!`,
            });

    orderToToggle.fcmTokens.forEach(async (fcmToken: string) => {
      await sendNotificationToUser(
        fcmToken,
        notification.title,
        notification.body,
      );
    });

    revalidatePath("/order/[slug]", "page");

    return { success: true, message: "Success!" };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: "Couldn't perform this operation" };
  }
}
