"use client";

import toggleConfirmOrder from "@/app/lib/actions/order/toggleConfirmOrder";
import {
  AccessTimeOutlined,
  CheckCircleOutline,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";

const OrderStatusTabs = ({
  status,
  confirmationId,
}: {
  status: string;
  confirmationId: number;
}) => {
  const handleSetOrderStatus = async (value: string) => {
    const id = toast.loading("Please wait...");
    const response = await toggleConfirmOrder(confirmationId, value);
    if (response) {
      toast.dismiss(id);
      response.success
        ? toast.success(response.message)
        : toast.error(response.message);
    }
  };

  return (
    <div className="mb-2">
      <p className="font-medium text-neutral-dark01">Order status</p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleSetOrderStatus("preparing")}
          className={`${status === "preparing" ? "border border-yellow-700 bg-yellow-100 text-yellow-700" : "bg-gray-100 text-neutral-dark03"} flex w-fit items-center gap-1 rounded-full px-4 py-1`}
        >
          <span>Preparing</span>
          <AccessTimeOutlined fontSize="inherit" />
        </button>

        <button
          onClick={() => handleSetOrderStatus("ready")}
          className={`${status === "ready" ? "border border-green-700 bg-green-100 text-green-700" : "bg-gray-100 text-neutral-dark03"} flex w-fit items-center gap-1 rounded-full px-4 py-1`}
        >
          <span>Ready</span>
          <CheckCircleOutline fontSize="inherit" />
        </button>

        <button
          onClick={() => handleSetOrderStatus("claimed")}
          className={`${status === "claimed" ? "bg-gradient-to-r from-primary-one to-primary-two text-white" : "bg-gray-100 text-neutral-dark03"} flex w-fit items-center gap-1 rounded-full px-4 py-1`}
        >
          <span>Claimed</span>
          <ShoppingBagOutlined fontSize="inherit" />
        </button>
      </div>
    </div>
  );
};

export default OrderStatusTabs;
