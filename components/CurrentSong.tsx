"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Song } from "@prisma/client";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
//@ts-ignore
import useSound from "use-sound";

interface CurrentSongProps {
  song: Song;
}

const CurrentSong: React.FC<CurrentSongProps> = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const Icon = isPlaying ? FaPause : FaPlay;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const [play, { pause, sound }] = useSound(song.songurl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  const handlePlay = () => {
    console.log(isPlaying);
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);
  return (
    <div className="fixed bottom-0 w-full border-solid border-2 border-black bg-black rounded">
      <h2 className="text-center my-1 sm:text-sm font-bold text-green-600 ml-5 mb-1">
        NOW PLAYING
      </h2>
      <div className="flex items-center justify-between mx-5">
        <div className="flex items-center my-1">
          <Image
            src={song.imageurl}
            alt={song.title}
            width={50}
            height={50}
            className="rounded-full h-14 w-14 border-2 border-white"
          />
          <div className="ml-2 sm:ml-4">
            <p className="text-xs sm:text-sm font-bold text-white">
              {song.title}
            </p>
            <p className="text-gray-500 text-xxs sm:text-xs">{song.author}</p>
          </div>
        </div>
        <Icon
          size={24}
          color="#fff"
          className="cursor-pointer"
          onClick={handlePlay}
        />
        <VolumeIcon
          size={24}
          color="#fff"
          onClick={toggleMute}
          className="cursor-pointer ml-8"
        />
      </div>
    </div>
  );
};

export default CurrentSong;
