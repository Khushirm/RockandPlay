import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const POST = async (req: NextRequest) => {
  let success=false;
  try {
    const { title, author, imageurl, songurl } = await req.json();
    await prismadb.song.create({
      data: {
        title,
        author,
        imageurl,
        songurl,
      },
    });
    success=true;
    NextResponse.json({ success,message: "Song uploaded successfully" });
  } catch (error) {
    NextResponse.json({ success,error: "Some error occured. Please try again later!" });
  }
};
