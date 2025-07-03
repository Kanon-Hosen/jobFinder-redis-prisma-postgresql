import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import redis from "@/lib/redis";

const prisma = new PrismaClient();

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(null, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const cacheKey = `user-data:${userId}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, createAt: true },
    });

    if (!user) {
      return NextResponse.json(null, { status: 404 });
    }

    await redis.set(cacheKey, JSON.stringify(user), "EX", 60 * 10); // cache 10 min

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      null,
      { status: 401 }
    );
  }
}
