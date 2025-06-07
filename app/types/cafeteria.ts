import mongoose from "mongoose";

export type DeliveryFeeBreakdown = {
  locationName: string;
  distance: "long" | "short";
};

export type Addon = {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: string;
};

export type MenuItem = {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  imgUrl: string;
  available: boolean;
  description: string;
  addons: [Addon];
};

export type MenuCategory = {
  _id: mongoose.Types.ObjectId;
  name: string;
  items: MenuItem[];
};

export type Cafeteria = {
  _id: mongoose.Types.ObjectId;
  name: string;
  menuCategories: MenuCategory[];
  online: boolean;
  fcmTokens?: [string];
  deliveryFeeBreakdown: DeliveryFeeBreakdown[];
  emailNotificationRecepients?: string[];
};
