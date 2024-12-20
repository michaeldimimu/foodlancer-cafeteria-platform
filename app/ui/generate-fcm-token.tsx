"use client";

import useFCM from "@/app/utils/hooks/useFCM";
import axios from "axios";
import { log } from "console";
import { useEffect } from "react";

const FCMTokenDisplay = () => {
  const { messages, fcmToken } = useFCM();
  console.log(fcmToken);

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

export default FCMTokenDisplay;
