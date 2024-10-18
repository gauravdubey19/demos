import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { connectToDB } from "../../../../utils/db";

const googleClientId = process.env.GOOGLE_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error("Missing Google OAuth environment variables");
}

export const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        // store the user id from MongoDB to session
        if (!session.user) {
          return session;
        }
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (!profile) {
        return false;
      }
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        let user = userExists;
        if (!userExists) {
          user = await User.create({
            email: profile.email,
            name: profile.name && profile.name, //.replace(/\s+/g, "").toLowerCase()
            password: "",
          });
        }
        console.log("User logged In: ", user);
        return true;
      } catch (error) {
        console.error("Error checking if user exists:", error);
        return false;
      }
    },
  },
});
