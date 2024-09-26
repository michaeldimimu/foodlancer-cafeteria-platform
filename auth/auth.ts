import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";
import Resend from "next-auth/providers/resend";
import { Adapter } from "next-auth/adapters";

export const { handlers, auth, signIn, signOut } = NextAuth({
  theme: {
    logo: "/logo.svg",
    colorScheme: "light",
    brandColor: "#b1b1ff",
  },
  trustHost: true,
  adapter: MongoDBAdapter(client) as Adapter,
  providers: [
    Resend({
      from: "no-reply@chotenlabs.com",
    }),
  ],
});
