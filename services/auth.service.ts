import { AuthUser, CredentialsInput } from "@/auth/auth.types";
import { verifyPassword } from "@/lib/password";
import prisma from "@/lib/prisma";

export const verifyUserCredentials = async ({
  email,
  password,
}: CredentialsInput) => {
  // find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.passwordHash) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // email must be verified
  if (!user.emailVerified) {
    throw new Error("EMAIL_NOT_VERIFIED");
  }

  // verify password
  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    throw new Error("INVALID_CREDENTIALS");
  }
  // return minimal auth-safe user
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
};
