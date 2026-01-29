import { NextAuthOptions } from "next-auth";

export const authCallbacks: NextAuthOptions["callbacks"] = {
  // runs on signIn - decides whether user is allowed to login
  async signIn({ user, account }) {
    if (account?.provider !== "credentials") {
      return true;
    }

    return true;
  },

  // runs whenever a jwt is created or updated
  async jwt({ token, user }) {
    if (user) {
      ((token.userId = user.id), (token.role = (user as any).role));
    }
    return token;
  },

  // shapes what the client can see
  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.userId as string;
      session.user.role = token.role as "USER" | "ADMIN";
    }
    return session;
  },
};
