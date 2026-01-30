import prisma from "@/lib/prisma";
import { hashToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token: rawToken } = await req.json();

    if (!rawToken) {
      return NextResponse.json(
        {
          error: "Verification token is required",
        },
        { status: 400 },
      );
    }

    const hashedToken = hashToken(rawToken);

    // find verification token
    const record = await prisma.verificationToken.findUnique({
      where: { token: hashedToken },
    });

    if (!record || record.expires < new Date()) {
      return NextResponse.json(
        {
          error: "Invalid or expired verification token",
        },
        { status: 400 },
      );
    }

    // fetch user to check verification state
    const user = await prisma.user.findUnique({
      where: { email: record.identifier },
      select: { emailVerified: true },
    });

    // idempotent: already verified → success
    if (user?.emailVerified) {
      await prisma.verificationToken.delete({
        where: { token: hashedToken },
      });
      return NextResponse.json({ success: true });
    }

    // mark user verified and delete the token
    await prisma.$transaction([
      prisma.user.update({
        where: { email: record.identifier },
        data: { emailVerified: new Date() },
      }),
      prisma.verificationToken.delete({
        where: { token: hashedToken },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Email verification failed" },
      { status: 500 },
    );
  }
}
