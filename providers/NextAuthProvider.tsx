"use client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
const NextAuthProvider = ({ session, children }: SessionProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default NextAuthProvider;
