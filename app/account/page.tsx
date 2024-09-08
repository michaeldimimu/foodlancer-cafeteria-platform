import { Metadata } from "next";
import { redirect } from "next/navigation";

import getSession from "@/auth/lib/getSession";

import BackButton from "../ui/back-button";
import LogoutButton from "../ui/account/login-button";

import { WhatsApp } from "@mui/icons-material";

export const metadata: Metadata = {
  title: "Account",
  description: "View details about your cafeteria, including key metrics.",
};

const AccountPage = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="p-4">
      <BackButton />
      <h1 className="mb-4 mt-2 text-3xl font-bold">Account</h1>

      <div className="mb-2">
        <p className="font-medium text-neutral-dark01">Email</p>
        <p>{user?.email}</p>
      </div>

      <div className="mb-4">
        <p className="font-medium text-neutral-dark01">Cafeteria</p>
        <p>{user?.cafeteria}</p>
      </div>

      <a
        href="https://chat.whatsapp.com/LZNSvmT7WQ91DEvHrhNT4r"
        className="mb-2 flex items-center justify-between gap-4 rounded-xl border border-primary-three bg-primary-one/10 px-4 py-2 font-medium text-primary-three"
      >
        <span>Support</span>
        <WhatsApp />
      </a>

      <LogoutButton />
    </main>
  );
};

export default AccountPage;
