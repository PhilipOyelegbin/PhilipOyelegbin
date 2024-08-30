"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { FaBackward, FaExclamation } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const route = useRouter();
  const session = useSession();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const errorMessage = {
    email: "Required and must be a valid email address",
    password: "Required and minimum be valid",
  };

  const disabledState =
    user.email === "" || !user.email.includes("@") || user.password === "";

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: user.password,
      });

      if (res?.error) {
        toast.error("Invalid details!");
      } else if (res?.url) {
        route.replace("/login/dashboard");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      route.replace("/login/dashboard");
    }
  }, [session, route]);

  return (
    <section className='bg-purple-700 bg-opacity-30 flex justify-center items-center px-5 py-10 lg:px-20 h-svh'>
      <form
        onSubmit={handleSend}
        autoComplete='false'
        className='md:w-2/3 xl:w-2/5 bg-slate-200 rounded-2xl text-slate-700 p-5'
      >
        <h3>Login to the dashboard</h3>
        <div className='form-control'>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            name='email'
            value={user.email}
            onChange={handleChange}
            placeholder='Enter your email'
            required
          />
          {(user.email === "" || !user.email.includes("@")) && (
            <p className='flex items-center text-red-500 text-xs'>
              <FaExclamation /> {errorMessage.email}
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Pass phrase:</label>
          <input
            id='password'
            type='password'
            name='password'
            value={user.password}
            onChange={handleChange}
            placeholder='XXXXXXXXXX'
            required
          />
          {user.password === "" && (
            <p className='flex items-center text-red-500 text-xs'>
              <FaExclamation /> {errorMessage.password}
            </p>
          )}
        </div>

        <div className='flex items-center justify-between mt-5'>
          <button
            type='submit'
            disabled={disabledState}
            className='bg-purple-700 text-slate-200 px-4 py-2 rounded-lg ease-linear duration-300 disabled:bg-gray-300 '
          >
            Sign In
          </button>
          <a href='/' className='text-2xl block'>
            <FaBackward />
          </a>
        </div>
        <ToastContainer
          position='top-right'
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
