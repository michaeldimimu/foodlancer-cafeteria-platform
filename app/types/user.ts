import mongoose from "mongoose";

export type FoodDetails = {
  _id: mongoose.Types.ObjectId;
  name: string;
  img_url: string;
  type: string;
  subcat?: string;
};

export type CartFoodItem = {
  _id: mongoose.Types.ObjectId;
  food: FoodDetails;
  price: number;
  quantity: number;
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
  firstName: string;
  lastName: string;
  sex: "male" | "female";
  school: string;
  cart: Cart;
  wantsInAppPayment: boolean;
  coins: number;
  fcmTokens?: [string];
  lastUsedDeliveryLocation: DeliveryLocation;
};
