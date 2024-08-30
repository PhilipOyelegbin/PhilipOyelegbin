"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

const Project = () => {
  const navigate = useRouter();
  const [projects, setProjects] = useState({
    title: "",
    description: "",
    tag: "",
    cover_image: "",
    project_url: "",
    github_url: "",
  });

  const handleChange = (e) => {
    setProjects({ ...projects, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await fetch(`/api/projects`, {
      method: "POST",
      body: JSON.stringify(projects),
    })
      .then(() => {
        setProjects({
          title: "",
          description: "",
          tag: "",
          cover_image: "",
          project_url: "",
          github_url: "",
        });
        navigate.push("/");
      })
      .catch((error) => {
        error.message && toast.error("An error occured!");
      });
  };

  return (
    <article className='pt-16 pb-10 lg:h-screen flex flex-col-reverse md:flex-row gap-10 justify-center items-center px-5 lg:px-20'>
      <form onSubmit={handleCreate} autoComplete='false'>
        <div className='form-control'>
          <label htmlFor='cover_image'>Cover Image URL:</label>
          <input
            id='cover_image'
            type='url'
            name='cover_image'
            value={projects?.cover_image}
            onChange={handleChange}
            placeholder='Enter your cover image URL'
            required
          />
        </div>
        <div className='flex flex-col lg:flex-row gap-1'>
          <div className='form-control'>
            <label htmlFor='title'>Project Title:</label>
            <input
              id='title'
              type='text'
              name='title'
              value={projects?.title}
              onChange={handleChange}
              placeholder='Enter your project title'
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='tag'>Project Tag:</label>
            <input
              id='tag'
              type='text'
              name='tag'
              value={projects?.tag}
              onChange={handleChange}
              placeholder='Enter your project tag'
              required
            />
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-1'>
          <div className='form-control'>
            <label htmlFor='project_url'>Project URL:</label>
            <input
              id='project_url'
              type='url'
              name='project_url'
              value={projects?.project_url}
              onChange={handleChange}
              placeholder='Enter your project URL'
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='github_url'>GitHub URL:</label>
            <input
              id='github_url'
              type='url'
              name='github_url'
              value={projects?.github_url}
              onChange={handleChange}
              placeholder='Enter your project github URL'
            />
          </div>
        </div>
        <div className='form-control'>
          <label htmlFor='description'>Project Description:</label>
          <textarea
            id='description'
            name='description'
            cols='30'
            rows='5'
            value={projects?.description}
            onChange={handleChange}
            minLength='50'
            maxLength='150'
            placeholder='Write your message here...'
            required
          ></textarea>
        </div>

        <button type='submit' className='btn'>
          Add
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
        <Link href='/login/dashboard' className='btn'>
          Go to Dashboard
        </Link>
      </aside>
    </article>
  );
};

export default Project;
