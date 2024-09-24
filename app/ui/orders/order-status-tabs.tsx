"use client";

import {
  AccessTimeOutlined,
  CheckCircleOutline,
  HighlightOffOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";
import SelectReasonForDenial from "./select-reason-for-denial";
import setOrderStatus from "@/app/lib/actions/order/setOrderStatus";

const OrderStatusTabs = ({
  status,
  confirmationId,
}: {
  status: string;
  confirmationId: number;
}) => {
  const [isShowingDenialPopup, setIsShowingDenialPopup] = useState(false);

  const handleSetOrderStatus = async ({
    value,
    message,
  }: {
    value: string;
    message: string;
  }) => {
    const id = toast.loading("Please wait...");
    const response = await setOrderStatus(confirmationId, value, message);
    if (response) {
      toast.dismiss(id);
      response.success
        ? toast.success(response.message)
        : toast.error(response.message);
    }
  };

  return (
    <>
      {isShowingDenialPopup && (
        <SelectReasonForDenial
          setIsShowingDenialPopup={setIsShowingDenialPopup}
          handleSetOrderStatus={handleSetOrderStatus}
          value="denied"
        />
      )}

      <div className="mb-2">
        <p className="font-medium text-neutral-dark01">Order status</p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            disabled={status === "preparing"}
            onClick={() =>
              handleSetOrderStatus({ value: "preparing", message: "" })
            }
            className={`${status === "preparing" ? "not-opaque border border-yellow-700 bg-yellow-100 text-yellow-700" : "bg-gray-100 text-neutral-dark03"} flex w-fit items-center gap-1 rounded-full px-4 py-1`}
          >
            <span>Preparing</span>
            <AccessTimeOutlined fontSize="inherit" />
          </button>

          <button
            disabled={status === "denied"}
            onClick={() => setIsShowingDenialPopup(true)}
            className={`${status === "denied" ? "not-opaque border border-red-700 bg-red-100 text-red-700" : "bg-gray-100 text-neutral-dark03"} flex w-fit items-center gap-1 rounded-full px-4 py-1`}
          >
            <span>Denied</span>
            <HighlightOffOutlined fontSize="inherit" />
          </button>

          <button
            disabled={status === "ready"}
            onClick={() =>
              handleSetOrderStatus({ value: "ready", message: "" })
            }
            className={`${status === "ready" ? "not-opaque border border-green-700 bg-green-100 text-green-700" : "bg-gray-100 text-neutral-dark03"} flex w-fit items-center gap-1 rounded-full px-4 py-1`}
          >
            <span>Ready</span>
            <CheckCircleOutline fontSize="inherit" />
          </button>

          <button
            disabled={status === "claimed"}
            onClick={() =>
              handleSetOrderStatus({ value: "claimed", message: "" })
            }
            className={`${status === "claimed" ? "not-opaque bg-gradient-to-r from-primary-one to-primary-two text-white" : "bg-gray-100 text-neutral-dark03"} flex w-fit items-center gap-1 rounded-full px-4 py-1`}
          >
            <span>Claimed</span>
            <ShoppingBagOutlined fontSize="inherit" />
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderStatusTabs;
