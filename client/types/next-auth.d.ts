import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    userid: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
  }
}
