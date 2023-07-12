import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's db id */
      _id: string;
    } & DefaultSession["user"];
  }
}
