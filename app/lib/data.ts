import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import Order from "@/server/models/Order";

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

export async function fetchOrderHistory(cafeteriaName: string) {
  await dbConnect();

  try {
    const orderHistory = await Order.find({ cafeteria: cafeteriaName });
    console.log(orderHistory);
    return orderHistory;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
