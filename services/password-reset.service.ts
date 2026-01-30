import { hashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { generateToken, hashToken } from "@/lib/token";

export const createPasswordResetToken = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // do not reveal whether user exists
  if (!user) return;

  await prisma.verificationToken.deleteMany({
    where: {
      identifier: email,
    },
  });

  const rawToken = generateToken();
  const hashedToken = hashToken(rawToken);

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    },
  });

  return rawToken;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const hashedToken = hashToken(token);
  const record = await prisma.verificationToken.findUnique({
    where: { token: hashedToken },
  });

  if (!record || record.expires < new Date())
    throw new Error("Invalid or expired token");

  const passwordHash = await hashPassword(newPassword);

  await prisma.$transaction([
    prisma.user.update({
      where: { email: record.identifier },
      data: { passwordHash },
    }),
    prisma.verificationToken.delete({
      where: { token: hashedToken },
    }),
  ]);
};
