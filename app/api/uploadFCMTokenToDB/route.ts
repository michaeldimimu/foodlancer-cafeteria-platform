import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    const { fcmToken } = await request.json();

    // Update the FCM token in the database
    await dbConnect();

    const cafeteria = await Cafeteria.findOne({
      name: session?.user.cafeteria,
    });

    // Do not push duplicate tokens to the database
    if (cafeteria.fcmTokens.includes(fcmToken))
      return Response.json({
        success: true,
        message: "This token already exists on the database",
      });

    cafeteria.fcmTokens.push(fcmToken);
    await cafeteria.save();

    return Response.json({ success: true, message: "FCM Tokens updated" });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Could not update FCM Tokens",
    });
  }
}
