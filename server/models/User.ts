import mongoose from "mongoose";
const { Schema } = mongoose;

const FoodItemSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, min: 1, max: 5, required: true },
});

const PlateSchema = new Schema({
  foodItems: [FoodItemSchema],
});

const CartSchema = new Schema({
  cafeteria: { type: String },
  plates: {
    type: [PlateSchema],
    validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
  },
  processingFeePercentage: { type: Number, default: 10, required: true },
});

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  school: { type: String, required: true },
  email: { type: String, required: true },
  cart: CartSchema,
});

function arrayLimit(val: any) {
  return val.length <= 5;
}

export default mongoose.models.User || mongoose.model("User", UserSchema);
