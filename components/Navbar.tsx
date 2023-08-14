"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Image from 'next/image'

const Navbar = () => {
  const session = useSession();
  return (
    <nav className="flex justify-around items-center bg-gray-800 p-2">
      <Image src="/images/logo.webp" alt="logo" width={90} height={90} />
      <div className="flex items-center">
        <Link href="/" className="text-white mx-2 hover:text-white/70 text-lg font-semibold">
          Home
        </Link>
        <Link href="/uploadsong" className="text-white mx-2 hover:text-white/70 text-lg font-semibold">
          Upload
        </Link>
      </div>
      {session.data ? (
        <button
          className="text-white bg-blue-800 px-4 py-2 rounded-full font-bold hover:bg-blue-900"
          onClick={() => signOut({ redirect: false })}
        >
          Logout
        </button>
      ) : (
        <Link
          href="/signin"
          className="text-white bg-blue-800 px-4 py-2 rounded-full font-bold hover:bg-blue-900"
        >
          Login
        </Link>
      )}
    </nav>
)}
export default Navbar;
