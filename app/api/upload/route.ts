import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const POST = async (req: NextRequest) => {
  try {
    const { title, author, imageurl, songurl } = await req.json();
    const song = await prismadb.song.create({
      data: {
        title,
        author,
        imageurl,
        songurl,
      },
    });
    NextResponse.json({ message: "Song uploaded successfully", song });
  } catch (error) {
    console.log(error);
    NextResponse.json({ error: "An error occurred" });
  }
};
