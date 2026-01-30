import { hashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { generateToken, hashToken } from "@/lib/token";

interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export const registerUser = async ({
  email,
  password,
  name,
}: RegisterInput) => {
  // check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) throw new Error("User already exists");

  // hash password
  const passwordHash = await hashPassword(password);

  // create user (email not verified)
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
    },
  });

  // invalidate existing verification tokens
  await prisma.verificationToken.deleteMany({
    where: {
      identifier: email,
    },
  });

  // create email verification token
  const rawToken = generateToken();
  const hashedToken = hashToken(rawToken);

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
    },
  });

  return {
    userId: user.id,
    email: user.email,
    token: rawToken,
  };
};
