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
    async session({ session }) {
      return session;
    },
    async signIn({ user, profile }) {
      try {
        const { name, image, email, id } = user;
        const newUser = {
          _id: id,
          _type: "user",
          userName: name,
          image: image,
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
