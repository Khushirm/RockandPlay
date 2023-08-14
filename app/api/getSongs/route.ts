import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const GET = async (req: NextRequest) => {
  let success = false;
  try {
    const songs = await prismadb.song.findMany();
    success = true;
    return NextResponse.json({ success, songs });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success,
      error: "Some error occured. Please try again later!",
    });
  }
};
