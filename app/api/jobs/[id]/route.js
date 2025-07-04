import redis from "@/lib/redis";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import JwtVerify from "@/hooks/JwtVerify";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Job id is required" }, { status: 400 });
  }
  try {
    const cached = await redis.get(`job:${id}`);

    if (cached) {
      return NextResponse.json(JSON.parse(cached), { status: 200 });
    }

    // If not cached, fetch from DB
    const job = await prisma.jobs.findUnique({
      where: {
        id: id,
      },
      include: {
        applies: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    // Cache the job for 10 minutes
    await redis.set(`job:${id}`, JSON.stringify(job), "EX", 60 * 10);
    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
