"use server";

import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Order from "@/server/models/Order";
import { revalidatePath } from "next/cache";

export default async function fetchActiveOrders(offset: number, limit: number) {
  const session = await getSession();

  if (!session?.user) {
    return;
  }

  await dbConnect();

  try {
    let activeOrders;
    if (session.user.email === "mikedpsycho002@gmail.com") {
      activeOrders = await Order.find({
        "orderStatus.value": {
          $in: ["confirming", "confirmed", "paid", "delivering"],
        },
      })
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();
    } else {
      activeOrders = await Order.find({
        cafeteria: session.user.cafeteria,
        "orderStatus.value": {
          $in: ["confirming", "confirmed", "paid", "delivering"],
        },
      })
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();
    }

    revalidatePath("/");
    return JSON.parse(JSON.stringify(activeOrders));
  } catch (error: any) {
    throw new Error(error.message);
  }
}
