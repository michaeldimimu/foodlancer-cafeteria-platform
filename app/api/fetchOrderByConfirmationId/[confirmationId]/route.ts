import dbConnect from "@/server/lib/dbConnect";
import Order from "@/server/models/Order";

export async function GET(
  request: Request,
  { params }: { params: { confirmationId: string } },
) {
  await dbConnect();

  try {
    const order = await Order.findOne(
      { confirmationId: params.confirmationId },
      "_id",
    ).exec();

    return Response.json(order);
  } catch (error) {
    throw new Error("An error occurred");
  }
}
