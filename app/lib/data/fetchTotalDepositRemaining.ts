"use server";

import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";

export default async function fetchTotalDepositRemaining() {
  const session = await getSession();

  if (!session?.user) {
    return;
  }

  await dbConnect();

  try {
    const response = await Cafeteria.find({
      name: session.user.cafeteria,
    })
      .select("totalDepositRemaining")
      .exec();

    return response[0]?.totalDepositRemaining;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
