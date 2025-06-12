"use server";

import { MenuCategory } from "@/app/types/cafeteria";
import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";

export default async function addItemToMenu(formData: {
  name: string;
  category: string;
  price: string;
  imgUrl: string;
  description: string;
  available: boolean;
}) {
  const session = await getSession();
  const user = session?.user;

  if (!user?.cafeteria) {
    return {
      success: false,
      message: "You are unauthorised to perform this action",
    };
  }

  await dbConnect();

  try {
    const cafeteria = await Cafeteria.findOne({ name: user.cafeteria });
    const categoryIndex = cafeteria.menuCategories.findIndex(
      (cat: MenuCategory) => cat.name === formData.category,
    );

    const newItem = {
      name: formData.name,
      price: formData.price,
      imgUrl: formData.imgUrl,
      description: formData.description,
      available: formData.available,
    };

    cafeteria.menuCategories[categoryIndex].items.push(newItem);
    await cafeteria.save();

    return {
      success: true,
      message: `Item added successfully to ${formData.category}`,
    };
  } catch (error) {
    console.log("AN ERROR OCCURRED", error);

    return { success: false, message: "An error occurred adding this item" };
  }
}
