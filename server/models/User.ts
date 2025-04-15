import mongoose from "mongoose";
const { Schema } = mongoose;

const FoodItemSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, min: 1, required: true },
});

const PlateSchema = new Schema({
  foodItems: [FoodItemSchema],
});

const DeliveryAgentSchema = new Schema({
  agentId: { type: Schema.Types.ObjectId },
  firstName: { type: String },
  lastName: { type: String },
});

const DeliveryLocationSchema = new Schema({
  hostel: { type: String },
  block: { type: String },
  floor: { type: String },
  room: { type: String },
});

export const DeliveryDetailsSchema = new Schema({
  deliveryAgent: DeliveryAgentSchema,
  deliveryLocation: DeliveryLocationSchema,
});

const CartSchema = new Schema({
  cafeteria: { type: String },
  plates: {
    type: [PlateSchema],
    validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
  },
  processingFeePercentage: { type: Number, default: 12, required: true },
  isUsingFLCoins: { type: Boolean, default: false, required: true },
  deliveryDetails: DeliveryDetailsSchema,
});

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    sex: { type: String, required: true, enum: ["male", "female"] },
    school: { type: String, required: true },
    email: { type: String, required: true },
    discoverySource: { type: String, required: true },
    cart: CartSchema,
    wantsInAppPayment: { type: Boolean },
    coins: { type: Number, required: true },
    fcmTokens: [{ type: String }],
    lastUsedDeliveryLocation: { type: DeliveryLocationSchema },
    createdAt: { type: Date, required: true },
  },
  { timestamps: true },
);

function arrayLimit(val: any) {
  return val.length <= 5;
}

export default mongoose.models.User || mongoose.model("User", UserSchema);
