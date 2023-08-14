"use client";

import Image from "next/image";
import { Song } from "@prisma/client";
import { FaPlay } from "react-icons/fa";
import useOnPlay from "@/lib/useOnPlay";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SongItemProps {
  song: Song;
  onClick: (song: Song) => void;
}

const SongItem = ({ song, onClick }: SongItemProps) => {
  const router = useRouter();
  const session = useSession();
  const onPlay = useOnPlay(song);

  const handleClick = () => {
    if (session.data) {
      onPlay(song.id);
      onClick(song);
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="w-64 h-64 relative group rounded-md flex items-center justify-center">
      <Image
        fill
        src={song.imageurl}
        alt="SONG"
        className="object-cover opacity-75"
      />
      <div className="flex flex-col absolute bottom-3 left-1">
        <p className="text-white font-bold text-lg">{song.title}</p>
        <p className="font-bold text-white">{song.author}</p>
      </div>
      <button
        className="bg-green-300 hidden group-hover:flex absolute w-12 h-12 justify-center items-center rounded-full hover:scale-110"
        onClick={handleClick}
      >
        <FaPlay className="text-black" size={23} />
      </button>
    </div>
  );
};
export default SongItem;
