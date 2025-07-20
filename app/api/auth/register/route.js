import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import redis from "@/lib/redis";

const prisma = new PrismaClient();

export async function POST(req) {
  const sessionId = uuidv4();
  const body = await req.json();
  const { name, email, password, role, companyName } = body;

  if (!email || !password || !name || !role) {
    return NextResponse.json(
      { message: "Name, email, password, and role are required." },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    if (role === "EMPLOYER") {
      userData.companyName = companyName || null;
    }

    const newUser = await prisma.user.create({ data: userData });
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    await redis.set(`session:${sessionId}`, token, "EX", 60 * 60 * 24 * 7);
    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    await redis.del("users");

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
