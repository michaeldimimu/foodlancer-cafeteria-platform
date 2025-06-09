"use server";

import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Order from "@/server/models/Order";
import { revalidatePath } from "next/cache";

export default async function fetchCompletedOrders(
  offset: number,
  limit: number,
) {
  const session = await getSession();

  if (!session?.user) {
    return;
  }

  await dbConnect();

  try {
    const completedOrders = await Order.find({
      cafeteria: session.user.cafeteria,
      "orderStatus.value": { $in: ["delivered", "claimed"] },
    })
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    revalidatePath("/");
    return JSON.parse(JSON.stringify(completedOrders));
  } catch (error: any) {
    throw new Error(error.message);
  }
}
