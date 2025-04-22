import mongoose from "mongoose";
import { DeliveryDetails } from "./user";

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
  value:
    | "confirming"
    | "confirmed"
    | "denied"
    | "cancelled"
    | "paid"
    | "delivering"
    | "delivered"
    | "claimed";
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
  charges?: number;
  processingFee?: number;
  subTotal: number;
  total: number;
  coinsUsed: number;
};

export type Order = {
  _id: mongoose.Types.ObjectId;
  orderStatus: OrderStatus;
  confirmationId: string;
  createdAt: Date;
  cafeteria: string;
  plates: Plate[];
  user: mongoose.Types.ObjectId;
  charges?: number;
  processingFee?: number;
  subTotal: number;
  total: number;
  coinsUsed: number;
  fcmTokens?: [string];
  deliveryDetails?: DeliveryDetails;
};
