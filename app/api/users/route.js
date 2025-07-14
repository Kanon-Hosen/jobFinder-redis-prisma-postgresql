import redis from "@/lib/redis";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const cached = await redis.get("user");
    if (cached) {
      return NextResponse.json(JSON.parse(cached), { status: 200 });
    }
    const users = await prisma.user.findMany({
        select: {
          role: true,
      },
    });
    await redis.set("users", JSON.stringify(users), "EX", 60 * 10);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
