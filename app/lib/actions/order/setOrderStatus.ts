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
    value === "claimed"
      ? (notification = {
          title: "Order successfully claimed - You have received 10 FL Coins!",
          body: `You have successfully claimed your order. Thank you for using Foodlancer, and enjoy your meal!`,
        })
      : value === "confirmed"
        ? (notification = {
            title: "All requested items are available!",
            body: `You can now proceed to make payment. Your food will only be prepared once payment is confirmed.`,
          })
        : value === "denied" &&
          (notification = {
            title: "Your order has been denied",
            body: `We're so sorry, but the cafeteria denied your order: ${message}`,
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
