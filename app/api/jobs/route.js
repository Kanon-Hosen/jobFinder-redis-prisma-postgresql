import redis from "@/lib/redis";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const {
      title,
      description,
      jobType,
      location,
      userId,
      benefits,
      salary,
      requirements,
      company,
    } = await req.json();

    console.log(benefits,salary,requirements)

    const postJob = await prisma.jobs.create({
      data: {
        title,
        description,
        type: jobType,
        company,
        requirements,
        salary,
        benefits, // String array, e.g., ['Health Insurance', 'Remote Work']
        location,
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
    const jobs = await prisma.jobs.findMany();
    await redis.set("all-jobs", JSON.stringify(jobs), "EX", 60 * 10);

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
