"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { FaBackward, FaExclamation } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Pass phrase is required"),
});

const Login = () => {
  const route = useRouter();
  const session = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const onSend = async (data) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        toast.error("Invalid details!");
      } else if (res?.url) {
        reset();
        route.replace("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      route.replace("/admin/dashboard");
    }
  }, [session, route]);

  return (
    <section className="bg-purple-700 bg-opacity-30 flex justify-center items-center px-5 py-10 lg:px-20 h-svh">
      <form
        onSubmit={handleSubmit(onSend)}
        autoComplete="false"
        className="md:w-2/3 xl:w-2/5 bg-slate-200 rounded-2xl text-slate-700 p-5"
      >
        <h3>Login to the dashboard</h3>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="flex items-center text-red-500 text-xs">
              <FaExclamation /> {errors.email.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="password">Pass phrase:</label>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="XXXXXXXXXX"
          />
          {errors.password && (
            <span className="flex items-center text-red-500 text-xs">
              <FaExclamation /> {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-700 text-slate-200 px-4 py-2 rounded-lg ease-linear duration-300 disabled:bg-gray-300 "
          >
            {isSubmitting ? "Processing" : "Sign In"}
          </button>
          <a href="/" className="text-2xl block">
            <FaBackward />
          </a>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
        />
      </form>
    </section>
  );
};

export default Login;
