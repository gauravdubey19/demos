import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectToDB } from "@/utils/db";
import jwt from "jsonwebtoken";
import { AdapterUser } from "next-auth/adapters";

const googleClientId = process.env.GOOGLE_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const jwtSecret = process.env.JWT_SECRET;

if (!googleClientId || !googleClientSecret || !jwtSecret) {
  throw new Error("Missing environment variables");
}

export interface SessionExtended extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    phone_number?: string | null;
    favProducts?: string[];
    role?: string;
  };
}

interface ExtendedProfile extends Record<string, any> {
  phone_number?: string;
  birthday?: string;
  gender?: string;
  email?: string;
}

interface ExtendedUser extends AdapterUser {
  phone_number?: string;
  favProducts?: string[];
  role?: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { token } = credentials;
        try {
          const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
          await connectToDB();
          const user = await User.findById(decoded.id);
          if (user) {
            return {
              id: user._id.toString(),
              phone_number: user.phone_number,
              role: user.role,
              favProducts: user.favProducts,
            };
          }
          return null;
        } catch (error) {
          console.error("Error verifying JWT:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async signIn({ account, profile }) {
      const extendedProfile = profile as ExtendedProfile;
      console.log("account: ", account);
      if (account?.provider === "credentials") {
        try {
          await connectToDB();
          const userExists = await User.findById(account.providerAccountId);
          if (!userExists) {
            return false;
          }
          return true;
        } catch (error) {
          console.error("Error checking if user exists:", error);
          return false;
        }
      } else if(account?.provider === "google") {
        try {
          await connectToDB();

          if (!extendedProfile) {
            return false;
          }

          const userExists = await User.findOne({
            email: extendedProfile.email,
          });

          let user = userExists;
          let [firstName, ...lastNameParts] = extendedProfile.name.split(" ");
          let lastName = lastNameParts.join(" ");
          if (!userExists) {
            user = await User.create({
              firstName: firstName,
              lastName: lastName,
              email: extendedProfile.email,
              profile: extendedProfile.picture,
              phone_number: extendedProfile.phone_number,
            });
          } else {
            if (!user.profile) {
              user.profile = extendedProfile.picture;
              await user.save();
            }
            if (!user.firstName) {
              user.firstName = firstName;
              await user.save();
            }
            if (!user.lastName) {
              user.lastName = lastName;
              await user.save();
            }
          }
          return true;
        } catch (error) {
          console.error("Error handling sign-in:", error);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, user }) {
      const extendedUser = user as ExtendedUser;
      if (extendedUser) {
        token.id = extendedUser.id;
        token.name = extendedUser.name;
        token.email = extendedUser.email;
        token.image = extendedUser.image;
        token.phone_number = extendedUser.phone_number;
        token.role = extendedUser.role;
        token.favProducts = extendedUser.favProducts;
      }
      return token;
    },
    async session({ session, token }) {
      const extendedSession = session as SessionExtended;

      extendedSession.user.id = token.id as string;
      extendedSession.user.name = token.name as string;
      extendedSession.user.email = token.email as string;
      extendedSession.user.image = token.image as string;
      extendedSession.user.phone_number = token.phone_number as string;
      extendedSession.user.favProducts = token.favProducts as string[];
      extendedSession.user.role = token.role as string;

      if (token.email) {
        try {
          await connectToDB();
          const sessionUser = await User.findOne({ email: token.email });

          if (sessionUser) {
            extendedSession.user.id = sessionUser._id.toString();
            extendedSession.user.favProducts = sessionUser.favProducts;
            extendedSession.user.role = sessionUser.role;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      return extendedSession;
    },
    
  },
  pages: {
    error: '/auth/error', // Custom error page
  },
});

export { handler as GET, handler as POST };