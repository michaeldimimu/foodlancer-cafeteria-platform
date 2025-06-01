import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";

export default async function fetchCafeteria() {
  const session = await getSession();

  if (!session?.user) {
    return;
  }

  await dbConnect();

  try {
    const cafeteria = await Cafeteria.findOne({
      name: session.user.cafeteria,
    }).exec();

    return JSON.parse(JSON.stringify(cafeteria));
  } catch (error: any) {
    throw new Error("An error occurred: " + error.message);
  }
}
