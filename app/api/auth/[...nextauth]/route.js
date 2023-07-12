import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { client } from "@utils/client";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, user, token }) {
      session.user._id = token.sub;

      return session;
    },
    async signIn({ user, profile }) {
      try {
        const { name, image, email } = user;
        const { sub } = profile;

        const newUser = {
          _id: sub,
          _type: "user",
          id: sub,
          userName: name,
          profilePicture: image,
          email: email,
        };

        await client.createIfNotExists(newUser);
      } catch (error) {
        console.log(error);
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
