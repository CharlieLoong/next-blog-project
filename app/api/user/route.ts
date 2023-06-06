import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const users = await prisma.user.findMany({
    where: {}
  })
  console.log(users)
  return NextResponse.json(users);
}
