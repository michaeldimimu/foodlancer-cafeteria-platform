import mongoose from "mongoose";
const { Schema } = mongoose;

const MenuItemSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true },
});

const DeliveryFeeBreakdownSchema = new Schema({
  locationName: { type: String, required: true },
  distance: { type: String, enum: ["long", "short"], required: true },
});

const CafeteriaSchema = new Schema(
  {
    name: { type: String, required: true },
    menu: {
      mains: [MenuItemSchema],
      sides: [MenuItemSchema],
      drinks: [MenuItemSchema],
      swallow: [MenuItemSchema],
      soups: [MenuItemSchema],
    },
    online: { type: Boolean, required: true },
    deliveryFeeBreakdown: [DeliveryFeeBreakdownSchema],
    fcmTokens: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.models.Cafeteria ||
  mongoose.model("Cafeteria", CafeteriaSchema);
