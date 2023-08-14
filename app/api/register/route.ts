import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  let success = false;
  try {
    const { email, name, password } = await req.json();
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json({ success, error: "Email taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        emailVerified: new Date(),
      },
    });
    success = true;

    return NextResponse.json({
      success,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success,
      error: "Some error occured. Please try again later!",
    });
  }
}
