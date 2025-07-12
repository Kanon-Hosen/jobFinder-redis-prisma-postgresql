import JwtVerify from "@/hooks/JwtVerify";
import redis from "@/lib/redis";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
  const userId = await JwtVerify();
  if (!userId ) {
    return NextResponse.json({ message: "User Unauthorized" }, { status: 400 });
  }
  try {
    const {
    title,
    description,
    location,
    type,
    workSetting,
    salary,
    company,
    requirements,
    benefits,
    experienceLevel,
    applicationDeadline,
    } = await req.json();

    console.log(benefits, type, salary, userId);

    const postJob = await prisma.jobs.create({
      data: {
        title,
        description,
        location,
        type,
        workSetting,
        salary,
        company,
        requirements,
        benefits,
        experienceLevel,
        applicationDeadline,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    await redis.del("all-jobs");
    return NextResponse.json(postJob, { status: 201 });
  } catch (error) {
    console.error("Error posting job:", error);
    return NextResponse.json(
      { message: "Failed to post job" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const cached = await redis.get("all-jobs");
    if (cached) {
      return NextResponse.json(JSON.parse(cached), { status: 200 });
    }
    const jobs = await prisma.jobs.findMany({
      include: {
        applies: {
          include: {
            job: true,
          },
        },
      },
    });
    await redis.set("all-jobs", JSON.stringify(jobs), "EX", 60 * 1);

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
