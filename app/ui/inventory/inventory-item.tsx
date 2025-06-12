"use client";

import { MenuItem as MenuItemType } from "@/app/types/cafeteria";
import Image from "next/image";
import { toast } from "react-toastify";
import toggleAvailability from "@/app/lib/actions/inventory/toggleAvailability";
import EditItemDrawer from "./edit-item-drawer";
import { useState } from "react";
import deleteItem from "@/app/lib/actions/inventory/deleteItem";
import ConfirmActionPopup from "../confirm-action-popup";
import { DeleteOutlineOutlined } from "@mui/icons-material";

const InventoryItem = ({
  item,
  category,
}: {
  item: MenuItemType;
  category: string;
}) => {
  const [confirmActionPopupState, setConfirmActionPopupState] = useState({
    isShowing: false,
    description: "",
  });

  const handleToggleAvailability = async () => {
    const id = toast.loading("Please wait...");
    const response = await toggleAvailability(item._id, category);
    if (response) {
      toast.dismiss(id);
      response.success
        ? toast.success(response.message)
        : toast.error(response.message);
    }
  };

  const handleDeleteItem = async () => {
    const deletingItem = toast.loading(`Deleting ${item.name}`);
    const response = await deleteItem(item._id, category);
    if (response) {
      toast.dismiss(deletingItem);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } else {
      toast.dismiss(deletingItem);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {confirmActionPopupState.isShowing && (
        <ConfirmActionPopup
          description={confirmActionPopupState.description}
          setConfirmActionPopupState={setConfirmActionPopupState}
          handler={handleDeleteItem}
        />
      )}

      <div className="mb-2 flex gap-2 rounded-xl border border-gray-300 bg-white">
        <div className="flex w-full justify-between gap-2">
          <Image
            src={item.imgUrl}
            height="84"
            width="84"
            alt={item.name}
            className="rounded-l-lg border-b border-gray-300 object-cover"
          />

          <div className="flex w-full items-start justify-between py-2 pr-4">
            <div>
              <p className="font-medium text-neutral-dark02">{item.name}</p>
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

            <div className="flex h-full flex-col justify-between align-baseline">
              <button
                onClick={() =>
                  setConfirmActionPopupState({
                    isShowing: true,
                    description: "delete this item",
                  })
                }
              >
                <DeleteOutlineOutlined color="error" />
              </button>

              <EditItemDrawer
                itemId={item._id.toString()}
                category={category}
                name={item.name}
                price={item.price}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryItem;
