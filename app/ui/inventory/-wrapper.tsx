"use client";

import { Cafeteria, MenuItem as MenuItemType } from "@/app/types/cafeteria";
import { useState } from "react";
import MenuItem from "./menu-item";

const MenuWrapper = (cafeteria: Cafeteria) => {
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
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {category === "mains"
          ? cafeteria.menu.mains.map((item: MenuItemType) => (
              <MenuItem
                key={item._id.toString()}
                item={item}
                cafeteriaName={cafeteria.name}
              />
            ))
          : cafeteria.menu.sides.map((item: MenuItemType) => (
              <MenuItem
                key={item._id.toString()}
                item={item}
                cafeteriaName={cafeteria.name}
              />
            ))}
      </div>
    </>
  );
};

export default MenuWrapper;
