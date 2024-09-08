"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogoutOutlined } from "@mui/icons-material";
import ConfirmActionPopup from "../confirm-action-popup";

const LogoutButton = () => {
  const [confirmActionPopupState, setConfirmActionPopupState] = useState({
    isShowing: false,
    description: "",
  });

  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      {confirmActionPopupState.isShowing && (
        <ConfirmActionPopup
          description={confirmActionPopupState.description}
          setConfirmActionPopupState={setConfirmActionPopupState}
          handler={handleLogout}
        />
      )}
      <button
        onClick={() =>
          setConfirmActionPopupState({
            isShowing: true,
            description: "log out",
          })
        }
        className="mb-8 flex w-full items-center justify-between gap-4 rounded-xl border border-red-700 bg-red-700/10 px-4 py-2 font-medium text-red-700"
      >
        <span>Logout</span>
        <LogoutOutlined />
      </button>
    </>
  );
};

export default LogoutButton;
