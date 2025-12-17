import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { UserModel } from "@/models/user";

import { generateToken, hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const {
      fullName,
      gender,
      dob,
      passport,
      email,
      password,
    } = await request.json();

    if (!fullName || !gender || !dob || !passport || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }


    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }


    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({
      name: fullName,
      gender,
      dob,
      passport,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // ---------- JWT TOKEN ----------
    const token = await generateToken({
      userId: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });

    const response = NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );

    (response as any).cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60, 
    });

    return response;
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
