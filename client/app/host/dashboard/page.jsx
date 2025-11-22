"use client";
import { useEffect } from "react";
import Hero from "./_components/Hero";
import Projects from "./_components/Projects";
import Testimonial from "./_components/Testimonial";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const session = sessionStorage.getItem("token");

  useEffect(() => {
    if (!session || session === "undefined") {
      redirect("/host/login");
    }
  }, [session]);

  return (
    <>
      <Hero />
      <Projects />
      <Testimonial />
    </>
  );
};

export default Dashboard;
