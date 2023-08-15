"use client";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "react-hot-toast";
import Image from 'next/image';
import {useRouter} from 'next/navigation';

const UploadSong = () => {
  const router=useRouter();
  const { startUpload } = useUploadThing("songAndImage");

  const [song, setSong] = useState({ title: "", author: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [songFile, setSongFile] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSong((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.name === "songImage") {
        setImageFile(Array.from(e.target.files));
      } else if (e.target.name === "songFile") {
        setSongFile(Array.from(e.target.files));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const imgUpload = await startUpload(imageFile);
      const songUpload = await startUpload(songFile);
      const imagePath = imgUpload?.[0].url;
      const songPath = songUpload?.[0].url;
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: song.title,
          author: song.author,
          imageurl: imagePath,
          songurl: songPath,
        }),
        cache:'no-cache'
      });
      const data = await response.json();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
    toast.success("Song uploaded successfully");
    router.push('/')
  };
  return (
    <>
      <div className="flex bg-blue-600 h-full items-center justify-center flex-wrap">
        <div className="flex flex-col items-center">
          <Image
            src="/images/enjoyy.webp"
            alt="Image"
            className="object-cover mt-4 w-auto h-auto"
            width={400}
            height={400}
          />
        </div>
        <div>
          <h2 className="text-2xl text-center text-white font-semibold mb-4 mt-3">
            Upload a Song
          </h2>
          <form className="bg-blue-600 rounded-lg p-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="songTitle"
                className="block font-semibold mb-2 text-lg"
              >
                Song Title
              </label>
              <input
                type="text"
                id="songTitle"
                name="title"
                value={song.title}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-full"
                placeholder="Enter the song title"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songAuthor"
                className="block font-semibold mb-2 text-lg"
              >
                Song Author
              </label>
              <input
                type="text"
                id="songAuthor"
                name="author"
                value={song.author}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-full"
                placeholder="Enter the song author"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songFile"
                className="block font-semibold mb-2 text-lg"
              >
                Song File
              </label>
              <input
                type="file"
                id="songFile"
                name="songFile"
                accept="audio/*"
                onChange={handleFileChange}
                className="p-2 w-full bg-white file:rounded-full rounded-full file:cursor-pointer file:font-semibold"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="songImage" className="block font-semibold mb-2">
                Song Image
              </label>
              <input
                type="file"
                id="songImage"
                name="songImage"
                accept="image/*"
                onChange={handleFileChange}
                className="p-2 w-full bg-white file:rounded-full rounded-full file:cursor-pointer file:font-semibold"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full disabled:bg-blue-300"
            >
              {isLoading ? "Uploading" : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadSong;
