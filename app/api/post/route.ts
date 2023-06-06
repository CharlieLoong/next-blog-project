import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(JSON.stringify(request.body));
  // const {data} = request
  // prisma.post.create(
  //   {
  //     data: {
  //       title: data.title,
  //       content: data.content,
  //       author: { connect: { id: 1 } }
  //     }
  //   }
  // )
  return new Response('post created!');
}

export async function GET(request: Request) {
  return NextResponse.json({ message: "post created!" });
}