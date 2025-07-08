import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import redis from "@/lib/redis";
import JwtVerify from "@/hooks/JwtVerify";

const prisma = new PrismaClient();
export async function DELETE(request, { params }) {
  const { id } = await params;
  const userId = await JwtVerify();
  if (!userId) {
    return NextResponse.json({ message: "user unauthorized" }, { status: 401 });
  }
  try {
    await prisma.applications.delete({
      where: { id },
    });
    await redis.del(`apply:${userId}`);
    return NextResponse.json({ message: "Application deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}
