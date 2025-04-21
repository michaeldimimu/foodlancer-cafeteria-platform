import mongoose from "mongoose";

export type Food = {
  _id: mongoose.Types.ObjectId;
  name: string;
  img_url: string;
  type: string;
  subcat?: string;
};

export type MenuItem = {
  _id: mongoose.Types.ObjectId;
  price: number;
  available: boolean;
  food: Food;
};

export type Menu = {
  mains: MenuItem[];
  sides: MenuItem[];
  drinks: MenuItem[];
  swallow: MenuItem[];
  soups: MenuItem[];
};

export type DeliveryFeeBreakdown = {
  locationName: string;
  distance: "long" | "short";
};

export type Cafeteria = {
  _id: mongoose.Types.ObjectId;
  name: string;
  menu: Menu;
  online: boolean;
  fcmTokens?: [string];
  deliveryFeeBreakdown: DeliveryFeeBreakdown[];
};
