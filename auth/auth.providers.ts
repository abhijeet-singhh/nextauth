import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsInput } from "./auth.types";
import { verifyUserCredentials } from "@/services/auth.service";
import Google from "next-auth/providers/google";
import { env } from "../env/env.mjs";

export const authProviders: NextAuthOptions["providers"] = [
  // -------------------
  // Credentials
  // -------------------

  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },

    async authorize(credentials) {
      if (!credentials) return null;

      const { email, password } = credentials as CredentialsInput;

      return await verifyUserCredentials({ email, password });
    },
  }),

  // -------------------
  // Google OAuth
  // -------------------

  Google({
    clientId: env.GOOGLE_CLIENT_ID!,
    clientSecret: env.GOOGLE_CLIENT_SECRET!,
  }),
];
