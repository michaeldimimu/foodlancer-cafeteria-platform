// "use server";

// import getSession from "@/auth/lib/getSession";
// import dbConnect from "@/server/lib/dbConnect";
// import Order from "@/server/models/Order";
// import { revalidatePath } from "next/cache";

// export default async function calculateTotalEarnings() {
//   const session = await getSession();

//   if (!session?.user) {
//     return;
//   }

//   await dbConnect();

//   try {
// //     // const activeOrders = await Order.find({
// //     //   cafeteria: session.user.cafeteria,
// //     //   "orderStatus.value": {
// //     //     $in: ["confirming", "confirmed", "paid", "delivering"],
// //     //   },
// //     // })
// //     //   .skip(offset)
// //     //   .limit(limit)
// //     //   .sort({ createdAt: -1 })
// //     //   .exec();

// //     // revalidatePath("/");
// //     return JSON.parse(JSON.stringify(activeOrders));
// //   } catch (error: any) {
// //     throw new Error(error.message);
// //   }
// }
