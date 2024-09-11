import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import Food from "@/server/models/Food";
import Order from "@/server/models/Order";
import User from "@/server/models/User";
import mongoose from "mongoose";
import { MenuItem } from "../types/cafeteria";

// export async function fetchCafeteria(cafeteriaName: string) {
//   await dbConnect();

//   try {
//     const cafeteria = await Cafeteria.findOne({ name: cafeteriaName }).exec();
//     console.log(cafeteria);
//     return cafeteria;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }

export async function fetchOrderStream(cafeteriaName: string) {
  await dbConnect();

  try {
    const orderHistory = await Order.find({ cafeteria: cafeteriaName })
      .sort({ createdAt: -1 })
      .exec();
    return orderHistory;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchOrder(id: string | mongoose.Types.ObjectId) {
  await dbConnect();

  try {
    const objId = typeof id === "string" ? new mongoose.Types.ObjectId(id) : id;
    const order = await Order.findById(objId)
      .populate({ path: "user", model: User })
      .exec();
    return order;
  } catch (error) {
    throw new Error("Error fetching order" + error);
  }
}

export async function fetchCafeteria(cafeteriaName: string) {
  await dbConnect();

  try {
    const cafeteria = await Cafeteria.findOne({ name: cafeteriaName })
      .populate({
        path: "menu.mains menu.sides",
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

export async function fetchCafeteriaInventory(term: string, type: string) {
  const session = await getSession();
  const user = session?.user;

  await dbConnect();
  try {
    const cafeteria = await Cafeteria.findOne({ name: user?.cafeteria })
      .populate({
        path: "menu.mains menu.sides",
        populate: {
          path: "food",
          model: Food,
        },
      })
      .select("menu") // Select the entire menu field
      .exec();

    if (!cafeteria) {
      return { success: false, message: "Cafeteria not found!" };
    }

    if (type === "mains") {
      const mains = cafeteria.menu.mains;
      const filteredMains = mains.filter((item: MenuItem) => {
        const foodNameToLowerCase = item.food.name.toLowerCase();
        if (foodNameToLowerCase.includes(term.toLowerCase())) {
          return item;
        }
      });

      if (filteredMains.length === 0) {
        return { success: false, message: "No item matches your search!" };
      }

      return { success: true, data: filteredMains };
    } else if (type === "sides") {
      const sides = cafeteria.menu.sides;
      const filteredSides = sides.filter((item: MenuItem) => {
        const foodNameToLowerCase = item.food.name.toLowerCase();
        if (foodNameToLowerCase.includes(term.toLowerCase())) {
          return item;
        }
      });

      if (filteredSides.length === 0) {
        return { success: false, messaage: "No item matches your search!" };
      }

      return { success: true, data: filteredSides };
    }
  } catch {
    return { success: false, message: "An error occurred!" };
  }
}
