import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectToDB } from "@/utils/db";
import jwt from "jsonwebtoken";
import { AdapterUser } from "next-auth/adapters";
import { toast } from "@/hooks/use-toast";
import { to } from "gsap";

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
          console.log("Decoded: ", decoded);
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
  },
  callbacks: {
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

      // Avoid unnecessary updates to session data
      extendedSession.user.id = token.id as string;
      extendedSession.user.name = token.name as string;
      extendedSession.user.email = token.email as string;
      extendedSession.user.image = token.image as string;
      extendedSession.user.phone_number = token.phone_number as string;
      extendedSession.user.favProducts = token.favProducts as string[];
      extendedSession.user.role = token.role as string;

      if (token.email) {
        try {
          // Fetch user data from the database and only update if necessary
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
    async signIn({ account, profile }) {
      const extendedProfile = profile as ExtendedProfile;

      if (account?.type === "credentials") {
        try {
          await connectToDB();
          const userExists = await User.findById(account.providerAccountId);
          if (!userExists) {
            return false;
          }
          console.log("Returning true from signIn");
          return true;
        } catch (error) {
          console.error("Error checking if user exists:", error);
          return false;
        }
      } else {
        try {
          await connectToDB();

          if (!extendedProfile) {
            return false;
          }
          // check if user already exists

          const userExists = await User.findOne({
            email: extendedProfile.email,
          });

          // if not, create a new document and save user in MongoDB
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
              // Update user profile image
              console.log(
                "Profile was emtpy in google auth: ",
                extendedProfile
              );
              user.profile = extendedProfile.picture;
              try {
                await user.save();
                console.log("Profile updated");
              } catch (error) {
                console.error("Error updating profile image:", error);
              }
            }
            if (!user.firstName) {
              user.firstName = firstName;
              try {
                await user.save();
                console.log("Name updated");
              } catch (error) {
                console.error("Error updating name:", error);
              }
            }
            if (!user.lastName) {
              user.lastName = lastName;
              try {
                await user.save();
                console.log("Last Name updated");
              } catch (error) {
                console.error("Error updating last name:", error);
              }
            }
          }
          console.log("User logged In: ", user);
          return true;
        } catch (error) {
          console.error("Error checking if user exists:", error);
          return false;
        }
      }
    },
  },
});

export { handler as GET, handler as POST };
