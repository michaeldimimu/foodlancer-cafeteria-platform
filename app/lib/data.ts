import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import Order from "@/server/models/Order";
import User from "@/server/models/User";
import mongoose from "mongoose";

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
