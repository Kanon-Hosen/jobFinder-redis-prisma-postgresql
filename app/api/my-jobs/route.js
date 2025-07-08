import JwtVerify from "@/hooks/JwtVerify";
import redis from "@/lib/redis";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req) {
    const userId = await JwtVerify();
    console.log(userId)
  if (!userId) {
    return NextResponse.json({ message: "user not found" }, { status: 400 });
  }

  try {
    const cached = await redis.get(`my-jobs:${userId}`);

    if (cached) {
      return NextResponse.json(JSON.parse(cached), { status: 200 });
    }
      
    const myJobs = await prisma.jobs.findMany({
      where: {
        userId,
      },
      include: {
        applies: {
          include: {
            user: true,
          },
        },
      },
    });

      await redis.set(`my-jobs:${userId}`, JSON.stringify(myJobs), "EX", 60 * 10);
      
      return NextResponse.json(myJobs,{status:200})
  } catch (error) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
}
