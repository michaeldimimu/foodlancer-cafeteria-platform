"use client";

import removeDeliveryLocation from "@/app/lib/actions/delivery/removeDeliveryLocation";
import { toast } from "react-toastify";

const RemoveLocationButton = ({ locationName }: { locationName: string }) => {
  const handleRemoveLocation = async () => {
    const removingLocation = toast.loading("Removing delivery location...");
    const response = await removeDeliveryLocation(locationName);
    if (response) {
      toast.dismiss(removingLocation);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } else {
      toast.dismiss(removingLocation);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <button onClick={handleRemoveLocation} className="font-medium text-red-500">
      Remove
    </button>
  );
};

export default RemoveLocationButton;
