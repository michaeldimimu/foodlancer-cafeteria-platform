import mongoose from "mongoose";
const { Schema } = mongoose;

const FoodSchema = new Schema({
  name: { type: String, required: true },
  img_url: { type: String, required: true },
  type: { type: String, required: true },
});

export default mongoose.models.Food || mongoose.model("Food", FoodSchema);
