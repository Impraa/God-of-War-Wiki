import { registerUserAsync } from "@/redux/features/userSlice";
import { store } from "@/redux/store";
import { User } from "@/utils/types";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === "google") {
        console.log(user);
        const userObj: User = {
          id: user.id,
          username: user.name!,
          email: user.email!,
          profilePicture: user.image!,
          bio: "",
        };
        console.log(userObj);
        //store.dispatch(registerUserAsync(userObj));
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
