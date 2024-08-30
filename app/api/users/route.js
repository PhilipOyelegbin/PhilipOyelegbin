import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered succesfully", newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error?.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const userData = await User.find();
    return NextResponse.json(
      { message: "All user fetched succesfully", userData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error?.message },
      { status: 500 }
    );
  }
}
