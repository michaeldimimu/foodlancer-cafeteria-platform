import mongoose from "mongoose";

export type Food = {
  _id: mongoose.Types.ObjectId;
  name: string;
  img_url: string;
  type: string;
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

export type Cafeteria = {
  name: string;
  menu: Menu;
  online: boolean;
};
