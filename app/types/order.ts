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

export type User = {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  school: string;
  email: string;
};

export type OrderStatus = {
  value: "preparing" | "ready" | "denied" | "claimed" | "cancelled";
  message: string;
};

export type PopulatedOrder = {
  _id: mongoose.Types.ObjectId;
  orderStatus: OrderStatus;
  confirmationId: string;
  createdAt: string;
  cafeteria: string;
  plates: Plate[];
  user: User;
  processingFee: number;
  processingFeePercentage: number;
  subTotal: number;
  total: number;
  coinsUsed: number;
};

export type Order = {
  _id: mongoose.Types.ObjectId;
  orderStatus: OrderStatus;
  confirmationId: string;
  createdAt: string;
  cafeteria: string;
  plates: Plate[];
  user: mongoose.Types.ObjectId;
  processingFee: number;
  processingFeePercentage: number;
  subTotal: number;
  total: number;
  fcmTokens: [string];
};
