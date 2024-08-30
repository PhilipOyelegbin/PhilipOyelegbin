import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/app/(models)/User";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with the provided email");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (err) {
          throw new Error("Authorization failed");
        }
      },
    }),
    // ...add more providers here
  ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
