// app/api/logout/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis";

export async function POST() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  const token = await redis.get(`session:${sessionId}`);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      // Redis cache delete
      const cacheKey = `user-data:${userId}`;
      await redis.del(cacheKey);
    } catch (err) {
      // ignore invalid token
      console.log(err.message)
    }
  }

  const response = NextResponse.json({ message: "Logged out" });

  // Expire token cookie
  response.cookies.set("sessionId", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
