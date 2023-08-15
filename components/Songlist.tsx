"use client";
import { Song } from "@prisma/client";
import React, { useState, useEffect } from "react";
import SongItem from "./SongItem";
import CurrentSong from "./CurrentSong";
import { toast } from "react-hot-toast";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const SongList = () => {
  const { signal } = new AbortController()
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await fetch("/api/getSongs",{
          cache:'no-store',
          signal,
          next: { revalidate: 0 }
        });
        const data = await response.json();
        if (data.success) {
          setSongs(data.songs);
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchSongs();
  }, []);

  function onSongClick(song: Song) {
    setCurrentSong(song);
  }
  return (
    <>
      <h2 className="text-2xl text-center font-bold my-2 text-pink-600 ">
        Play And Slay🎧
      </h2>

      <ul className="flex justify-center flex-wrap space-x-5 space-y-3 my-3 mx-4">
        {songs.length!==0?(songs.map((song) => {
          return (
            <li key={song.id}>
              <SongItem song={song} onClick={onSongClick} />
            </li>
          );
        })):(
          <p className="text-red-500 text-2xl text-center my-4">Loading...</p>
        )}
      </ul>
      
      {currentSong && (
        <CurrentSong song={currentSong} key={currentSong.songurl} />
      )}
    </>
  );
};
export default SongList;
