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

export type PopulatedOrder = {
  _id: mongoose.Types.ObjectId;
  status: string;
  confirmationId: string;
  createdAt: Date;
  cafeteria: string;
  plates: Plate[];
  user: User;
  processingFee: number;
  processingFeePercentage: number;
  subTotal: number;
  total: number;
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
