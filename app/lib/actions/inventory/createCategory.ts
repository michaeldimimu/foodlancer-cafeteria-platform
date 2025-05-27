"use server";

import getSession from "@/auth/lib/getSession";
import dbConnect from "@/server/lib/dbConnect";
import Cafeteria from "@/server/models/Cafeteria";
import { revalidatePath } from "next/cache";

export default async function createCategory(categoryName: string) {
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
    const newCategory = {
      name: categoryName,
      items: [],
    };
    cafeteria.menuCategories.push(newCategory);
    await cafeteria.save();

    revalidatePath("/add-item");

    return { success: true, message: "Category created successfully!" };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating a new category",
    };
  }
}
