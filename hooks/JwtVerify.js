import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis";

export default async function JwtVerify() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  console.log(sessionId);
  if (!sessionId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = await redis.get(`session:${sessionId}`);
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const userId = decoded.id;
  return userId;
}
