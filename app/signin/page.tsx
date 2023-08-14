"use client";
import React, { useState, useCallback, useEffect } from "react";

import { signIn, useSession } from "next-auth/react";

import Link from "next/link";

import { toast } from "react-hot-toast";

import Input from "@/components/Input";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
  const session = useSession();
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    if (session.data) {
      router.replace("/");
    }
  }, [session]);

  const login = useCallback(async () => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });
      toast.success("Logged in successfully");
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      toast.error("Some error occured. Please try again later!");
      setIsLoading(false);
      console.log(error);
    }
  }, [user]);

  return (
    <div className="h-full w-full overflow-hidden relative bg-[url('/images/music.webp')] bg-cover bg-fixed bg-no-repeat">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-30 px-20 py-20 w-full mt-5 self-center lg:max-w-md rounded-md">
            <h2 className="text-white text-5xl font-semibold mb-8">Sign In</h2>
            <div className="flex flex-col gap-3">
              <Input
                id="email"
                value={user.email}
                type="email"
                onChange={handleChange}
                label="Email"
                name="email"
              />
              <Input
                label="Password"
                onChange={handleChange}
                id="password"
                value={user.password}
                type="password"
                name="password"
              />
            </div>
            <button
              onClick={login}
              disabled={isLoading}
              className="bg-red-700 py-2 text-white rounded-md w-full mt-8 hover:bg-red-800 transition disabled:bg-red-300"
            >
              {isLoading ? "Signing In" : "Sign In"}
            </button>
            <p className="text-neutral-400 my-4 text-center text-xl">OR</p>
            <div className="w-full flex justify-center my-3">
              <div
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={() => signIn("google", { redirect: false })}
              >
                <FcGoogle size={30} />
              </div>
            </div>
            <p className="text-neutral-600 mt-4">
              Don't have an account?
              <Link
                href="/signup"
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                Create a new account
              </Link>
            </p>
            <h2 className="text-green-400 text-center text-sm mt-2">DEMO CREDENTIALS</h2>
            <p className="text-green-600 text-center mt-2"> Email : demo@gmail.com</p>
            <p className="text-green-600 text-center mt-2">Password : 12345678</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signin;
