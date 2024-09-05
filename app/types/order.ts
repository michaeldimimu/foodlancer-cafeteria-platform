import mongoose from "mongoose";

export type OrderFoodItem = {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
};

export type Plate = {
  _id: mongoose.Types.ObjectId;
  foodItems: OrderFoodItem[];
  price: number;
};

export type Order = {
  _id: mongoose.Types.ObjectId;
  status: string;
  confirmationId: string;
  createdAt: Date;
  cafeteria: string;
  plates: Plate[];
  user: mongoose.Types.ObjectId;
  processingFee: number;
  processingFeePercentage: number;
  subTotal: number;
  total: number;
};
