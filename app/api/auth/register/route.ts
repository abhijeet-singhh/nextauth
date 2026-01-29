import { NextResponse } from "next/server";
import { registerUser } from "@/services/register.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const result = await registerUser({ email, password, name });

    return NextResponse.json({
      success: true,
      userId: result.userId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
