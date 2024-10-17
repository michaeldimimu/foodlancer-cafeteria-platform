import { MenuItem as MenuItemType } from "@/app/types/cafeteria";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import toggleAvailability from "@/app/lib/actions/inventory/toggleAvailability";

const InventoryItem = ({
  item,
  category,
}: {
  item: MenuItemType;
  category: string;
}) => {
  const handleToggleAvailability = async () => {
    const id = toast.loading("Please wait...");
    const response = await toggleAvailability(item.food._id, category);
    if (response) {
      toast.dismiss(id);
      response.success
        ? toast.success(response.message)
        : toast.error(response.message);
    }
  };

  return (
    <div className="mb-2 flex justify-between gap-2 rounded-xl border border-gray-300 bg-white">
      <div className="flex gap-2">
        <Image
          src={item.food.img_url}
          height="84"
          width="84"
          alt={item.food.name}
          className="rounded-l-lg border-b border-gray-300 object-cover"
        />

        <div className="py-2">
          <p className="font-medium text-neutral-dark02">{item.food.name}</p>
          <p className="font-semibold text-neutral-dark01">
            &#8358;{item.price}
          </p>
          <div className="flex items-center gap-2">
            <p>Available</p>
            {/* custom toggle button */}
            <button
              onClick={handleToggleAvailability}
              className={`${item.available ? "bg-primary-one/20" : "bg-gray-200"} w-10 rounded-full p-1`}
            >
              <div
                className={`${item.available ? "ml-auto bg-primary-one" : "mr-auto bg-gray-400"} h-4 w-4 rounded-full shadow-md`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
