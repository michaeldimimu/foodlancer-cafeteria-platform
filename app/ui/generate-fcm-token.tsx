"use client";

import useFCM from "@/app/utils/hooks/useFCM";
import axios from "axios";
import { useEffect } from "react";

const GenerateFCMToken = () => {
  const { messages, fcmToken } = useFCM();

  useEffect(() => {
    if (fcmToken !== null) {
      axios
        .post("/api/uploadFCMTokenToDB", { fcmToken })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, [fcmToken]);
  return null;
};

export default GenerateFCMToken;
