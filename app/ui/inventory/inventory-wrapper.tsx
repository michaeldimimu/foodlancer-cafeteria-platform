"use client";

import { Cafeteria, MenuItem as MenuItemType } from "@/app/types/cafeteria";
import { useState } from "react";
import InventoryItem from "./inventory-item";

const InventoryWrapper = ({ cafeteria }: { cafeteria: Cafeteria }) => {
  const [category, setCategory] = useState("mains");

  return (
    <>
      <div className="mb-4 flex gap-2 overflow-x-scroll">
        <button
          onClick={() => setCategory("mains")}
          className={`${
            category === "mains"
              ? "bg-primary-one text-white"
              : "bg-primary-one/10 text-primary-three"
          } rounded-xl px-4 py-2 font-medium`}
        >
          Mains
        </button>

        <button
          onClick={() => setCategory("sides")}
          className={`${
            category === "sides"
              ? "bg-primary-one text-white"
              : "bg-primary-one/10 text-primary-three"
          } rounded-xl px-4 py-2 font-medium`}
        >
          Sides
        </button>

        <button
          onClick={() => setCategory("drinks")}
          className={`${
            category === "drinks"
              ? "bg-primary-one text-white"
              : "bg-primary-one/10 text-primary-three"
          } rounded-xl px-4 py-2 font-medium`}
        >
          Drinks
        </button>

        <button
          onClick={() => setCategory("swallow")}
          className={`${
            category === "swallow"
              ? "bg-primary-one text-white"
              : "bg-primary-one/10 text-primary-three"
          } rounded-xl px-4 py-2 font-medium`}
        >
          Swallow
        </button>

        <button
          onClick={() => setCategory("soups")}
          className={`${
            category === "soups"
              ? "bg-primary-one text-white"
              : "bg-primary-one/10 text-primary-three"
          } rounded-xl px-4 py-2 font-medium`}
        >
          Soups
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
          : category === "drinks"
            ? cafeteria.menu.drinks.map((item: MenuItemType) => (
                <InventoryItem
                  key={item._id.toString()}
                  item={item}
                  category="drinks"
                />
              ))
            : category === "swallow"
              ? cafeteria.menu.swallow.map((item: MenuItemType) => (
                  <InventoryItem
                    key={item._id.toString()}
                    item={item}
                    category="swallow"
                  />
                ))
              : cafeteria.menu.soups.map((item: MenuItemType) => (
                  <InventoryItem
                    key={item._id.toString()}
                    item={item}
                    category="soups"
                  />
                ))}
    </>
  );
};

export default InventoryWrapper;
