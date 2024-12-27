import dbConnect from "@/server/lib/dbConnect";
import Order from "@/server/models/Order";
import User from "@/server/models/User";
import mongoose from "mongoose";

export default async function fetchOrder(id: string | mongoose.Types.ObjectId) {
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
