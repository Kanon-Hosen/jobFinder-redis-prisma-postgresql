import JwtVerify from "@/hooks/JwtVerify";
import redis from "@/lib/redis";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
  const { jobId } = await req.json();

  const userId = await JwtVerify();
  console.log(userId);
  if (!jobId || !userId) {
    return NextResponse.json(
      { message: "userID and JobID invalid" },
      { status: 401 }
    );
  }

  const exist = await prisma.applications.findFirst({
    where: { jobId, userId },
  });
  // Already applied
  if (exist) {
    return NextResponse.json({ message: "Already applied" }, { status: 500 });
  }
  try {
    const apply = await prisma.applications.create({
      data: {
        jobId,
        userId,
      },
    });
    await redis.del(`job:${jobId}`);
    return NextResponse.json(apply, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  const userId = await JwtVerify();
  console.log(userId);
  if (!userId) {
    return NextResponse.json({ message: "userID invalid" }, { status: 401 });
  }

  try {
    const cached = await redis.get(`apply:${userId}`);
    if (cached) {
      return NextResponse.json(cached, { status: 201 });
    }

    const applies = await prisma.applications.findMany({
      where: { userId },
      include: { job: true },
    });

    await redis.set(`apply:${userId}`, JSON.stringify(applies), "EX", 60 * 10);
    return NextResponse.json(applies, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
