"use client";

import { toast } from "react-toastify";
import toggleOnlineStatus from "../lib/actions/toggleOnlineStatus";

const OnlineStatusToggle = ({ online }: { online: boolean }) => {
  const handleToggleOnlineStatus = async () => {
    const id = toast.loading("Please wait...");
    const response = await toggleOnlineStatus();
    if (response) {
      toast.dismiss(id);
      response.success
        ? toast.success(response.message)
        : toast.error(response.message);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p className="font-medium text-neutral-dark01">Online</p>
      {/* custom toggle button */}
      <button
        onClick={handleToggleOnlineStatus}
        className={`${online ? "bg-green-500/20" : "bg-gray-200"} w-10 rounded-full p-1`}
      >
        <div
          className={`${online ? "ml-auto bg-green-500" : "mr-auto bg-gray-400"} h-4 w-4 rounded-full shadow-md`}
        />
      </button>
    </div>
  );
};

export default OnlineStatusToggle;
