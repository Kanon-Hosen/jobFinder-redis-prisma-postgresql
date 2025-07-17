import JwtVerify from "@/hooks/JwtVerify";
import redis from "@/lib/redis";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();
  const jobId = await data.formData.jobId;
  const formData = data.formData;
  const userId = await JwtVerify();
  if (!jobId || !userId) {
    return NextResponse.json(
      { message: "userID and JobID invalid" },
      { status: 401 }
    );
  }

  // Already applied

  try {
    const exist = await prisma.applications.findFirst({
      where: { jobId, userId },
    });
    if (exist) {
      return NextResponse.json({ message: "Already applied" }, { status: 409 });
    }
    const apply = await prisma.applications.create({
      data: {
        jobId,
        userId,
        fullName: formData.fullName,
        phone: formData.phone,
        location: formData.location,
        resume: formData.resume,
        coverLetter: formData.coverLetter,
        experience: formData.experience,
        skills: formData.skills,
        portfolio: formData.portfolio,
        linkedIn: formData.linkedIn,
        expectedSalary: formData.expectedSalary,
        available: formData.availableFrom, // নাম মেলাতে হবে
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
  if (!userId) {
    return NextResponse.json({ message: "userID invalid" }, { status: 401 });
  }

  try {
    const cached = await redis.get(`apply:${userId}`);
    if (cached) {
      return NextResponse.json(JSON.parse(cached), { status: 201 });
    }

    const applies = await prisma.applications.findMany({
      where: { userId },
      include: { user: true, job: true },
    });

    await redis.set(`apply:${userId}`, JSON.stringify(applies), "EX", 60 * 10);
    return NextResponse.json(applies, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
