import { AuthUser, CredentialsInput } from "@/auth/auth.types";
import { verifyPassword } from "@/lib/password";
import prisma from "@/lib/prisma";

interface VerifyUserCredentialsInput extends CredentialsInput {}

export const verifyUserCredentials = async (
  input: VerifyUserCredentialsInput,
): Promise<AuthUser | null> => {
  const { email, password } = input;

  // find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  // user must have a password (credentials user)
  if (!user.passwordHash) return null;

  // email must be verified
  if (!user.emailVerified) return null;

  // verify password
  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) return null;

  // return minimal auth-safe user
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
};
