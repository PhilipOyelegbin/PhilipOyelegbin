"use client";
import { signOut } from "next-auth/react";

export default function Logout() {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <section className='px-5 md:px-20 my-10 text-center'>
      <h4
        onClick={handleLogout}
        className='cursor-pointer ease-linear duration-300 hover:text-red-500'
      >
        Logout
      </h4>
    </section>
  );
}
