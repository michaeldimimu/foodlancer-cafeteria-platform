import mongoose from "mongoose";
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

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cafeteria: { type: String, required: true },
    plates: [PlateSchema],
    subTotal: { type: Number, required: true },
    processingFeePercentage: { type: Number, required: true, default: 10 },
    processingFee: { type: Number, min: 50, max: 200, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "cancelled"],
    },
    confirmationId: { type: Number, required: true, unique: true },
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
