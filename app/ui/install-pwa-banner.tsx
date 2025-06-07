"use client";

import { FileDownloadOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

const InstallPWABanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="m-2 flex items-center justify-between rounded-xl bg-primary-two/10 px-4 py-2 text-sm text-neutral-dark01 sm:mx-auto sm:w-3/4 lg:w-2/4">
      <span className="font-medium">Install Foodlancer on your device</span>
      <button
        onClick={handleInstallApp}
        className="btn btn-accent flex items-center gap-1 px-4 py-2"
      >
        <span>Install</span>
        <FileDownloadOutlined fontSize="inherit" />
      </button>
    </div>
  );
};

export default InstallPWABanner;
