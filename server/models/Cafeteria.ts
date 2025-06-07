import mongoose from "mongoose";
const { Schema } = mongoose;

const DeliveryFeeBreakdownSchema = new Schema({
  locationName: { type: String, required: true },
  distance: { type: String, enum: ["long", "short"], required: true },
});

const AddonSchema = new Schema({
  name: { type: String },
  price: { type: Number },
});

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  available: { type: Boolean, default: true },
  description: { type: String },
  addons: [AddonSchema],
});

const MenuCategorySchema = new Schema({
  name: { type: String, required: true },
  items: [MenuItemSchema],
});

const CafeteriaSchema = new Schema(
  {
    name: { type: String, required: true },
    menuCategories: [MenuCategorySchema],
    online: { type: Boolean, required: true },
    deliveryFeeBreakdown: [DeliveryFeeBreakdownSchema],
    emailNotificationRecepients: [{ type: String }],
    fcmTokens: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.models.Cafeteria ||
  mongoose.model("Cafeteria", CafeteriaSchema);
