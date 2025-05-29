"use server";

import { DeliveryFeeBreakdown } from "@/app/types/cafeteria";
import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import { revalidatePath } from "next/cache";

export default async function removeDeliveryLocation(locationName: string) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  await dbConnect();

  try {
    const cafeteria = await Cafeteria.findOne({
      name: session.user.cafeteria,
    }).exec();

    if (!cafeteria) {
      throw new Error("Cafeteria not found");
    }

    cafeteria.deliveryFeeBreakdown = cafeteria.deliveryFeeBreakdown.filter(
      (location: DeliveryFeeBreakdown) =>
        location.locationName !== locationName,
    );

    await cafeteria.save();
    revalidatePath("/delivery");

    return { success: true, message: "Delivery location removed successfully" };
  } catch (error: any) {
    console.error("Failed to save cafeteria changes:", error);
    return { success: false, message: "Failed to remove delivery location" };
  }
}
