import type { Metadata, Viewport } from "next";
import { Poppins, Darker_Grotesque } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/ReactToastify.css";
import Navigation from "./ui/navigation";
import NextTopLoader from "nextjs-toploader";
import InstallPWABanner from "./ui/install-pwa-banner";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  variable: "--font-darker-grotesque",
});

const APP_NAME = "Foodlancer for Cafeterias";
const APP_DEFAULT_TITLE = "Foodlancer for Cafeterias";
const APP_TITLE_TEMPLATE = "%s - Foodlancer for Cafeterias";
const APP_DESCRIPTION = "Foodlancer cafeteria management system";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${darkerGrotesque.variable}`}
    >
      <SessionProvider>
        <body className="mb-12">
          <InstallPWABanner />
          <ToastContainer />
          <NextTopLoader color="#8383ff" showSpinner={false} />
          {children}
          <Navigation />
        </body>
      </SessionProvider>
    </html>
  );
}
