import { createPasswordResetToken } from "@/services/password-reset.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          error: "Email is required",
        },
        { status: 400 },
      );
    }

    await createPasswordResetToken(email);

    // always return success
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
