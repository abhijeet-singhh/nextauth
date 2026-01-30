import { resetPassword } from "@/services/password-reset.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        {
          error: "Token and password are required",
        },
        { status: 400 },
      );
    }

    await resetPassword(token, password);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
