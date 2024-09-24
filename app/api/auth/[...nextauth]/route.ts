import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { connectToDB } from "@/utils/db";

const googleClientId = process.env.GOOGLE_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error("Missing Google OAuth environment variables");
}
interface ExtendedProfile extends Record<string, any> {
  phone_number?: string;
  birthday?: string;
  gender?: string;
}
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.gender.read",
        },
      },
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
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser._id) {
          session.user.id = sessionUser._id.toString();
          session.user.favProducts = sessionUser.favProducts;
          session.user.role = sessionUser.role;
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
      return session;
    },
    async signIn({ account, profile }) {
      const extendedProfile = profile as ExtendedProfile;
      if (!extendedProfile) {
        return false;
      }
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: extendedProfile.email });

        // if not, create a new document and save user in MongoDB
        let user = userExists;
        if (!userExists) {
          console.log("Profile extracted is: ", extendedProfile);
          let [firstName, ...lastNameParts] = extendedProfile.name.split(" ");
          let lastName = lastNameParts.join(" ");

          user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: extendedProfile.email,
            profile: extendedProfile.image,
            phone: extendedProfile.phone_number,
            dob: extendedProfile.birthday,
            gender: extendedProfile.gender,
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

export { handler as GET, handler as POST };
