import mongoose from "mongoose";
import { DeliveryDetailsSchema } from "./User";
const { Schema } = mongoose;

const FoodItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const PlateSchema = new Schema({
  foodItems: [FoodItemSchema],
  price: { type: Number, required: true },
});

const statusSchema = new Schema({
  value: {
    type: String,
    required: true,
    enum: [
      "confirming",
      "confirmed",
      "denied",
      "cancelled",
      "paid",
      "delivering",
      "delivered",
      "claimed",
    ],
  },
  message: { type: String },
});

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cafeteria: { type: String, required: true },
    plates: [PlateSchema],
    subTotal: { type: Number, required: true },
    charges: { type: Number, min: 50, required: true },
    processingFee: { type: Number, min: 50, max: 200 },
    total: { type: Number, required: true },
    coinsUsed: { type: Number, required: true },
    orderStatus: statusSchema,
    confirmationId: { type: Number, required: true, unique: true },
    fcmTokens: [{ type: String }],
    deliveryDetails: DeliveryDetailsSchema,
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
