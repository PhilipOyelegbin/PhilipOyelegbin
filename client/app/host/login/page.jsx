"use client";
import { useEffect } from "react";
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
  const session = sessionStorage.getItem("token");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const onSend = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => await res.json());

      if (res.error) {
        console.log(res);
        toast.error(res.message);
      } else {
        reset();
        sessionStorage.setItem("token", res.data);
        route.replace("/host/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (session) {
      route.replace("/host/dashboard");
    }
  }, [session, route]);

  return (
    <section className="relative py-10 px-5 md:px-10 md:h-screen flex justify-center items-center md:overflow-hidden inset-0 bg-gradient-to-br from-primary-50 via-background to-accent-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse-slow"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-pulse-slow"
        style={{ animationDelay: 1 + "s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-secondary-300/20 rounded-full animate-pulse-slow"
        style={{ animationDelay: 2 + "s" }}
      ></div>

      {/* Login Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-16">
        <div className="card">
          <form
            onSubmit={handleSubmit(onSend)}
            autoComplete="false"
            id="contact-form"
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Login to the dashboard
            </h2>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-text-primary mb-2"
              >
                Email *
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="input-field"
                placeholder="jd@xample.com"
              />
              {errors.email && (
                <span className="flex items-center text-error text-xs">
                  <FaExclamation /> {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-text-primary mb-2"
              >
                Pass phrase *
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className="input-field"
                placeholder="XXXXXXXXXX"
              />
              {errors.password && (
                <span className="flex items-center text-error text-xs">
                  <FaExclamation /> {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mt-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span>{isSubmitting ? "Processing..." : "Sign In"}</span>
              </button>
              <a href="/" className="text-2xl block">
                <FaBackward />
              </a>
            </div>

            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              closeOnClick
              pauseOnFocusLoss
              pauseOnHover
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
