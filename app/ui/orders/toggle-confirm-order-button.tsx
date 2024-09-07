"use client";

import { toggleConfirmOrder } from "@/app/lib/actions";
// import { toggleConfirmOrder } from "@/app/lib/actions";
import { CheckCircleOutline, HighlightOffOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";

const ToggleConfirmOrderButton = ({
  status,
  confirmationId,
}: {
  status: string;
  confirmationId: string | number;
}) => {
  const handleToggleConfirmationStatus = async () => {
    const id = toast.loading("Please wait...");
    const response = await toggleConfirmOrder(confirmationId);
    if (response) {
      toast.dismiss(id);
      response.success
        ? toast.success(response.message)
        : toast.error(response.message);
    }
  };

  if (status === "confirmed") {
    return (
      <button
        onClick={handleToggleConfirmationStatus}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-700 bg-red-100 p-2 text-red-700"
      >
        <HighlightOffOutlined fontSize="medium" />
        <span>Undo confirmation</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleConfirmationStatus}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-700 bg-green-100 p-2 text-green-700"
    >
      <CheckCircleOutline fontSize="medium" />
      <span>Confirm order</span>
    </button>
  );
};

export default ToggleConfirmOrderButton;
