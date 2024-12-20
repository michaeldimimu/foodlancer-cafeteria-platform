import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    const { fcmToken } = await request.json();
    console.log("Request body: " + fcmToken);

    // Update the FCM token in the database
    await dbConnect();
    const cafeteria = await Cafeteria.findOne({
      name: session?.user.cafeteria,
    });
    cafeteria.fcmToken = fcmToken;
    await cafeteria.save();

    return Response.json({ success: true, message: "FCM Token updated" });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Could not update FCM Token",
    });
  }
}
