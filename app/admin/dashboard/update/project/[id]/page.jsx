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
  title: yup.string().required("Title is required"),
  description: yup
    .string()
    .min(100, "Description must not be less than 100 characters")
    .max(200, "Description must not exceed 200 characters")
    .required("Description is required"),
  tag: yup.string().required("Tag is required"),
  cover_image: yup.string().required("Cover image is required"),
  project_url: yup.string().required("Project link is required"),
  github_url: yup.string().required("Github link is required"),
});

const ProjectDetail = ({ params }) => {
  const { id } = params;
  const navigate = useRouter();
  const [projects, setProjects] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    values: {
      title: projects?.title,
      description: projects?.description,
      tag: projects?.tag,
      cover_image: projects?.cover_image,
      project_url: projects?.project_url,
      github_url: projects?.github_url,
    },
  });

  const onUpdate = async (data) => {
    await fetch(`/api/projects/${id}`, {
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
    fetch(`/api/projects/${id}`)
      .then((resp) => resp.json())
      .then((data) => setProjects(data.projectData))
      .catch(
        (err) => err && toast.error("Unable to load project, try again later")
      );
  }, [id]);

  return (
    <article className='pt-16 pb-10 lg:h-screen flex flex-col-reverse md:flex-row gap-10 justify-center items-center px-5 lg:px-20'>
      <form onSubmit={handleSubmit(onUpdate)} autoComplete='false'>
        <div className='form-control'>
          <label htmlFor='cover_image'>Cover Image URL:</label>
          <input
            {...register("cover_image")}
            id='cover_image'
            type='url'
            placeholder='Enter your cover image URL'
          />
          {errors.cover_image && (
            <span className='flex items-center text-red-500 text-xs'>
              <FaExclamation /> {errors.cover_image.message}
            </span>
          )}
        </div>

        <div className='flex flex-col lg:flex-row gap-1'>
          <div className='form-control'>
            <label htmlFor='title'>Project Title:</label>
            <input
              {...register("title")}
              id='title'
              type='text'
              placeholder='Enter your project title'
            />
            {errors.title && (
              <span className='flex items-center text-red-500 text-xs'>
                <FaExclamation /> {errors.title.message}
              </span>
            )}
          </div>

          <div className='form-control'>
            <label htmlFor='tag'>Project Tag:</label>
            <input
              {...register("tag")}
              id='tag'
              type='text'
              placeholder='Enter your project tag'
            />
            {errors.tag && (
              <span className='flex items-center text-red-500 text-xs'>
                <FaExclamation /> {errors.tag.message}
              </span>
            )}
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-1'>
          <div className='form-control'>
            <label htmlFor='project_url'>Project URL:</label>
            <input
              {...register("project_url")}
              id='project_url'
              type='url'
              placeholder='Enter your project URL'
            />
            {errors.project_url && (
              <span className='flex items-center text-red-500 text-xs'>
                <FaExclamation /> {errors.project_url.message}
              </span>
            )}
          </div>
          <div className='form-control'>
            <label htmlFor='github_url'>GitHub URL:</label>
            <input
              {...register("github_url")}
              id='github_url'
              type='url'
              placeholder='Enter your project github URL'
            />
            {errors.github_url && (
              <span className='flex items-center text-red-500 text-xs'>
                <FaExclamation /> {errors.github_url.message}
              </span>
            )}
          </div>
        </div>

        <div className='form-control'>
          <label htmlFor='description'>Project Description:</label>
          <textarea
            {...register("description")}
            id='description'
            cols='30'
            rows='5'
            placeholder='Write your message here...'></textarea>
          {errors.description && (
            <span className='flex items-center text-red-500 text-xs'>
              <FaExclamation /> {errors.description.message}
            </span>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type='submit'
          className='btn disabled:bg-opacity-50'>
          {isSubmitting ? "Processing" : "Save"}
        </button>
        <ToastContainer
          position='top-right'
          autoClose={2000}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
        />
      </form>

      <aside className='flex-1 text-center bg-slate-200 p-5'>
        <Image
          src='/hero-bg.jpg'
          className='hidden md:block w-full h-80 object-fill mb-5'
          width={300}
          height={100}
          alt='banner'
        />
        <h2>Administrator</h2>
        <h4>Your are signed in as an admin now.</h4>
        <Link href='/admin/dashboard' className='btn'>
          Go to Dashboard
        </Link>
      </aside>
    </article>
  );
};

export default ProjectDetail;
