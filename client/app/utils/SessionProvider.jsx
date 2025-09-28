"use client";
import { SessionProvider } from "next-auth/react";

export const AuthProvdier = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
