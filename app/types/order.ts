import mongoose from "mongoose";
import { DeliveryDetails, User } from "./user";
import { Addon } from "./cafeteria";

export type OrderFoodItem = {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  addons: Addon[];
};

export type Plate = {
  _id: mongoose.Types.ObjectId;
  foodItems: OrderFoodItem[];
  price: number;
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
  charges?: { foodlancerShare: number; agentShare: number };
  processingFee?: number;
  subTotal: number;
  total: number;
  coinsUsed: number;
  fcmTokens?: [string];
  emailNotificationRecepients?: string[];
  deliveryDetails?: DeliveryDetails;
};

export type Order = {
  _id: mongoose.Types.ObjectId;
  orderStatus: OrderStatus;
  confirmationId: string;
  createdAt: Date;
  cafeteria: string;
  plates: Plate[];
  user: mongoose.Types.ObjectId;
  charges?: { foodlancerShare: number; agentShare: number };
  processingFee?: number;
  subTotal: number;
  total: number;
  coinsUsed: number;
  fcmTokens?: [string];
  emailNotificationRecepients?: string[];
  deliveryDetails?: DeliveryDetails;
};
