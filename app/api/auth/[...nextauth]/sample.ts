// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectDB from "@/utils/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import { CustomToken, CustomUser, UserSession } from "@/lib/types";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "credentials",
//       credentials: {
//         email: { label: "E-mail", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(
//         credentials: Record<"email" | "password", string> | undefined
//       ) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid credentials");
//         }

//         await connectDB();

//         try {
//           const user = await User.findOne({ email: credentials?.email });
//           if (
//             user &&
//             credentials?.password &&
//             (await bcrypt.compare(credentials.password, user.password))
//           ) {
//             return { email: user.email } as any; // Returning user email to token
//           }
//           return null;
//         } catch (error) {
//           throw new Error(
//             error instanceof Error ? error.message : "Unknown error"
//           );
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET || "",
//   callbacks: {
//     async signIn({ account }) {
//       if (account?.provider === "credentials") return true;
//       return false;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user as CustomUser;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if ((token as CustomToken).user) {
//         const userExists = await User.findOne({
//           email: (token as CustomToken).user?.email,
//         });
//         if (userExists) {
//           session.user = userExists;
//         }
//       }
//       return session as UserSession;
//     },
//   },
// };