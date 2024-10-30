import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import Food from "@/server/models/Food";

export default async function fetchCafeteria() {
  const session = await getSession();

  if (!session?.user) {
    return;
  }

  await dbConnect();

  try {
    const cafeteria = await Cafeteria.findOne({ name: session.user.cafeteria })
      .populate({
        path: "menu.mains menu.sides menu.drinks menu.swallow menu.soups",
        populate: {
          path: "food",
          model: Food,
        },
      })
      .exec();

    return cafeteria;
  } catch (error: any) {
    throw new Error("An error occurred: " + error.message);
  }
}
