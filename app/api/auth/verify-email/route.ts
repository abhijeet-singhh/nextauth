import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        {
          error: "Verification token is required",
        },
        { status: 400 },
      );
    }

    // find verification token
    const record = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!record) {
      return NextResponse.json(
        {
          error: "Invalid verification token",
        },
        { status: 400 },
      );
    }

    // check expiration
    if (record.expires < new Date()) {
      return NextResponse.json(
        {
          error: "Verification token has expired",
        },
        { status: 400 },
      );
    }

    // mark user verified and delete the token
    await prisma.$transaction([
      prisma.user.update({
        where: { email: record.identifier },
        data: { emailVerified: new Date() },
      }),
      prisma.verificationToken.delete({
        where: { token },
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
