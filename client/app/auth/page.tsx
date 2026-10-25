"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowLeft, KeyRound, LockKeyhole, Mail, Send } from "lucide-react";
import toast from "react-hot-toast";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

function AuthPage() {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      router.replace("/dashboard");
      return;
    }

    const frameId = requestAnimationFrame(() => {
      setIsCheckingSession(false);
    });

    return () => cancelAnimationFrame(frameId);
  }, [router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();

      if (!response.ok || !result.data) {
        throw new Error(result.message || "Invalid email or password");
      }

      sessionStorage.setItem("token", result.data);
      reset();
      toast.success("Welcome back.");
      router.replace("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.",
      );
    }
  };

  if (isCheckingSession) {
    return (
      <div className="flex justify-center py-16" aria-label="Checking session">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#27272e] border-t-[#d2bbff]" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#27272e] bg-[#121215]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur sm:p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#ff8c61]">
            <KeyRound className="h-4 w-4" />
            <span>Secure Console</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#f1f0f5]">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#9d9bb0]">
            Sign in to manage projects, testimonials, and portfolio content.
          </p>
        </div>
        <LockKeyhole className="mt-1 h-5 w-5 shrink-0 text-[#d2bbff]" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-mono text-xs text-[#9d9bb0]">
            Admin Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4a4857]" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="admin@example.com"
              {...register("email")}
              className="w-full rounded-xl border border-[#27272e] bg-[#0e0e11] py-3 pl-10 pr-4 text-sm text-[#f1f0f5] outline-none transition-colors placeholder:text-[#4a4857] focus:border-[#d2bbff]"
            />
          </div>
          {errors.email && (
            <span className="font-mono text-[11px] text-red-400">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="font-mono text-xs text-[#9d9bb0]"
          >
            Password
          </label>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4a4857]" />
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full rounded-xl border border-[#27272e] bg-[#0e0e11] py-3 pl-10 pr-4 text-sm text-[#f1f0f5] outline-none transition-colors placeholder:text-[#4a4857] focus:border-[#d2bbff]"
            />
          </div>
          {errors.password && (
            <span className="font-mono text-[11px] text-red-400">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6b35] px-4 py-3 font-mono text-xs font-medium text-white shadow-[0_0_20px_-3px_rgba(255,107,53,0.45)] transition-all hover:bg-[#ff5517] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{isSubmitting ? "Authenticating..." : "Sign in"}</span>
          <Send className="h-4 w-4" />
        </button>
      </form>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-[#9d9bb0] transition-colors hover:text-[#f1f0f5]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to portfolio
      </Link>
    </div>
  );
}

export default AuthPage;
