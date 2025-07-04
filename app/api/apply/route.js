import JwtVerify from "@/hooks/JwtVerify";
import redis from "@/lib/redis";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
  const { jobId } = await req.json();

  const userId = await JwtVerify();

  if (!jobId || !userId.ok) {
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
  try {
  } catch (error) {}
}
