"use client";

import { Cafeteria, MenuItem as MenuItemType } from "@/app/types/cafeteria";
import { useState } from "react";
import InventoryItem from "./inventory-item";

const InventoryWrapper = ({ cafeteria }: { cafeteria: Cafeteria }) => {
  const [category, setCategory] = useState("mains");

  return (
    <>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setCategory("mains")}
          className={`${
            category === "mains"
              ? "bg-primary-one text-white"
              : "bg-primary-one/10 text-primary-three"
          } rounded-lg px-4 py-2 font-medium`}
        >
          Mains
        </button>

        <button
          onClick={() => setCategory("sides")}
          className={`${
            category === "sides"
              ? "bg-primary-one text-white"
              : "bg-primary-one/10 text-primary-three"
          } rounded-lg px-4 py-2 font-medium`}
        >
          Sides
        </button>

        <button
          onClick={() => setCategory("drinks")}
          className={`${
            category === "drinks"
              ? "bg-primary-one text-white"
              : "bg-primary-one/10 text-primary-three"
          } rounded-lg px-4 py-2 font-medium`}
        >
          Drinks
        </button>
      </div>

      {category === "mains"
        ? cafeteria.menu.mains.map((item: MenuItemType) => (
            <InventoryItem
              key={item._id.toString()}
              item={item}
              category="mains"
            />
          ))
        : category === "sides"
          ? cafeteria.menu.sides.map((item: MenuItemType) => (
              <InventoryItem
                key={item._id.toString()}
                item={item}
                category="sides"
              />
            ))
          : cafeteria.menu.drinks.map((item: MenuItemType) => (
              <InventoryItem
                key={item._id.toString()}
                item={item}
                category="drinks"
              />
            ))}
    </>
  );
};

export default InventoryWrapper;
