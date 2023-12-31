import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/connect";
import User from "@/db/models/users";
import { compare } from "bcryptjs";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        await dbConnect();
        if (!dbConnect) return new Error({ error: "No connection" });

        //check user existence
        const loggedUser = await User.findOne({ mail: credentials.mail });
        if (!loggedUser) {
          throw new Error("No User found with this Email! Please sign up!");
        }
        // check pw

        const checkPassword = await compare(
          credentials.password,
          loggedUser.password
        );

        //incorrect pw
        if (!checkPassword || loggedUser.mail !== credentials.mail) {
          throw new Error("Username or Password doesn't match!");
        }
        return Promise.resolve(loggedUser);
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const { name, mail, favorites, settings } = token.user;
      const user = { name, mail, favorites, settings };
      session.user = user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
