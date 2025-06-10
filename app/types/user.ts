import mongoose from "mongoose";
import { Addon } from "./cafeteria";

export type FoodDetails = {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  imgUrl: string;
  available: boolean;
  description: string;
  addons: Addon[];
};

export type CartFoodItem = {
  _id: mongoose.Types.ObjectId;
  food: FoodDetails;
  quantity: number;
  category: string;
};

export type Plate = {
  _id: mongoose.Types.ObjectId;
  foodItems: CartFoodItem[];
};

export type DeliveryLocation = {
  hostel: string;
  block?: string;
  floor?: string;
  room: string;
};

export type DeliveryDetails = {
  deliveryAgent: {
    agentId: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
  };
  deliveryLocation: DeliveryLocation;
};

export type Cart = {
  _id: mongoose.Types.ObjectId;
  cafeteria: string;
  plates: Plate[];
  processingFeePercentage: number;
  isUsingFLCoins: boolean;
  deliveryDetails: DeliveryDetails;
};

export type User = {
  _id: mongoose.Types.ObjectId;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  sex: "male" | "female";
  school: string;
  cart: Cart;
  wantsInAppPayment: boolean;
  coins: number;
  fcmTokens?: [string];
  lastUsedDeliveryLocation?: DeliveryLocation;
};
