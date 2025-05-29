"use server";

import { DeliveryFeeBreakdown } from "@/app/types/cafeteria";
import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import { revalidatePath } from "next/cache";

export default async function editDeliveryLocation(
  location: string,
  distance: string,
) {
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

    const existingLocation = cafeteria.deliveryFeeBreakdown.find(
      (loc: DeliveryFeeBreakdown) => loc.locationName === location,
    );

    if (existingLocation) {
      existingLocation.distance = distance;
    } else {
      cafeteria.deliveryFeeBreakdown.push({
        locationName: location,
        distance: distance,
      });
    }

    await cafeteria.save();
    revalidatePath("/delivery");

    return { success: true, message: "Delivery location updated successfully" };
  } catch (error: any) {
    console.error("Failed to save cafeteria changes:", error);
    return { success: false, message: "Failed to update delivery location" };
  }
}
