import mongoose from "mongoose";
const { Schema } = mongoose;

const MenuItemSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true },
  quantity: { type: Number, min: 0, required: true },
});

const CafeteriaSchema = new Schema(
  {
    name: { type: String, required: true },
    menu: {
      mains: [MenuItemSchema],
      sides: [MenuItemSchema],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Cafeteria ||
  mongoose.model("Cafeteria", CafeteriaSchema);
