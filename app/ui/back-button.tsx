"use client";

import { ArrowBackOutlined } from "@mui/icons-material";

const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="text-primary-three"
    >
      <ArrowBackOutlined />
    </button>
  );
};

export default BackButton;
