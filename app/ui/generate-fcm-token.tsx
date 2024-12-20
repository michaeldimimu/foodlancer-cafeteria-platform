"use client";

import useFCM from "@/app/utils/hooks/useFCM";

const FCMTokenDisplay = () => {
  const { messages, fcmToken } = useFCM();
  console.log(fcmToken);
  return null;
};

export default FCMTokenDisplay;
