"use server";

import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Order from "@/server/models/Order";
import { revalidatePath } from "next/cache";

export default async function fetchUnsuccessfulOrders(
  offset: number,
  limit: number,
) {
  const session = await getSession();

  if (!session?.user) {
    return;
  }

  await dbConnect();

  try {
    let unsuccessfulOrders;
    if (session.user.email === "mikedpsycho002@gmail.com") {
      unsuccessfulOrders = await Order.find({
        "orderStatus.value": { $in: ["cancelled", "denied"] },
      })
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();
    } else {
      unsuccessfulOrders = await Order.find({
        cafeteria: session.user.cafeteria,
        "orderStatus.value": { $in: ["cancelled", "denied"] },
      })
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();
    }

    revalidatePath("/unsuccessful-orders");
    return JSON.parse(JSON.stringify(unsuccessfulOrders));
  } catch (error: any) {
    throw new Error(error.message);
  }
}
