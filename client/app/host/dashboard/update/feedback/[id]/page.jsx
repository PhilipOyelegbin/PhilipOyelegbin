"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaExclamation } from "react-icons/fa";

const schema = yup.object().shape({
  full_name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  approved: yup.boolean().required("Approved is required"),
  comment: yup
    .string()
    .min(100, "Comment must not be less than 100 characters")
    .max(200, "Comment must not exceed 200 characters")
    .required("Comment is required"),
});

const FeedbackDetail = ({ params }) => {
  const { id } = params;
  const navigate = useRouter();
  const [testimonials, setTestimonials] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    values: {
      full_name: testimonials?.full_name,
      email: testimonials?.email,
      comment: testimonials?.comment,
      approved: testimonials?.approved,
    },
  });

  const onUpdate = async (data) => {
    await fetch(`/api/feedbacks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then(() => {
        reset();
        navigate.replace("/");
      })
      .catch((error) => {
        error.message && toast.error("An error occured!");
      });
  };

  useEffect(() => {
    fetch(`/api/feedbacks/${id}`)
      .then((resp) => resp.json())
      .then((data) => setTestimonials(data.feedbackData))
      .catch(
        (err) =>
          err && toast.error("Unable to load testimonial, try again later")
      );
  }, [id]);

  return (
    <article className="pt-16 pb-10 lg:h-screen flex flex-col-reverse md:flex-row gap-10 justify-center items-center px-5 lg:px-20">
      <form onSubmit={handleSubmit(onUpdate)} autoComplete="false">
        <div className="form-control">
          <label htmlFor="full_name">Full name:</label>
          <input
            {...register("full_name")}
            id="full_name"
            type="text"
            placeholder="Enter your full name"
            readOnly
          />
          {errors.full_name && (
            <span className="flex items-center text-red-500 text-xs">
              <FaExclamation /> {errors.full_name.message}
            </span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Enter your email"
            readOnly
          />
          {errors.email && (
            <span className="flex items-center text-red-500 text-xs">
              <FaExclamation /> {errors.email.message}
            </span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="approved">Approved:</label>
          <input
            {...register("approved")}
            id="approved"
            type="text"
            placeholder="Enter feedback status"
          />
          {errors.approved && (
            <span className="flex items-center text-red-500 text-xs">
              <FaExclamation /> {errors.approved.message}
            </span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="comment">Comment:</label>
          <textarea
            {...register("comment")}
            id="comment"
            cols="30"
            rows="5"
            placeholder="Write your message here..."
          ></textarea>
          {errors.comment && (
            <span className="flex items-center text-red-500 text-xs">
              <FaExclamation /> {errors.comment.message}
            </span>
          )}
        </div>

        <button type="submit" className="btn disabled:bg-opacity-50">
          {isSubmitting ? "Processing" : "Send"}
        </button>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
        />
      </form>

      <aside className="flex-1 text-center bg-slate-200 p-5">
        <Image
          src="/hero-bg.jpg"
          className="hidden md:block w-full h-80 object-fill mb-5"
          width={300}
          height={100}
          alt="banner"
        />
        <h2>Administrator</h2>
        <h4>Your are signed in as an admin now.</h4>
        <Link href="/admin/dashboard" className="btn">
          Go to Dashboard
        </Link>
      </aside>
    </article>
  );
};

export default FeedbackDetail;
