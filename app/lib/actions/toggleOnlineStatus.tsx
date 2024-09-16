"use server";

import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import { revalidatePath } from "next/cache";

export default async function toggleOnlineStatus() {
  const session = await getSession();

  if (!session?.user || !session.user.cafeteria) {
    return { success: false, message: "Unauthorised action!" };
  }

  await dbConnect();

  try {
    const cafeteria = await Cafeteria.findOne({ name: session.user.cafeteria });

    cafeteria.online ? (cafeteria.online = false) : (cafeteria.online = true);
    await cafeteria.save();
    revalidatePath("/account");

    return {
      success: true,
      message: `Cafeteria set to ${!cafeteria.online ? "offline" : "online"}`,
    };
  } catch {
    return {
      success: false,
      message: "Could not change your cafeteria's online status",
    };
  }
}
