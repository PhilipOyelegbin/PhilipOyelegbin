"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaPenAlt,
  FaPlusCircle,
  FaTrash,
} from "react-icons/fa";
import { Skeleton } from "@/app/components/Skeleton";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  // function to control the slide to the next slide
  function NextArrow({ onClick }) {
    return (
      <FaChevronCircleRight
        className='text-3xl text-purple-700 absolute top-1/2 right-0 cursor-pointer -translate-y-1/2 z-10 hover:text-purple-950'
        onClick={onClick}
      />
    );
  }

  // function to control the slide to the previous slide
  function PrevArrow({ onClick }) {
    return (
      <FaChevronCircleLeft
        className='text-3xl text-purple-700 absolute top-1/2 left-0 cursor-pointer -translate-y-1/2 z-10 hover:text-purple-950'
        onClick={onClick}
      />
    );
  }

  const handleDelete = async (id) => {
    await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      body: JSON.stringify(project),
    })
      .then(() => {
        toast.success("Deleted successfully");
      })
      .catch((error) => {
        error.message && toast.error("An error occured!");
      });
  };

  useEffect(() => {
    fetch("/api/projects")
      .then((resp) => resp.json())
      .then((data) => setProject(data.projectData))
      .catch((err) => setErrorMsg("Unable to load projects, try again later"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className='p-5 lg:px-20'>
      <div className='flex flex-wrap justify-between'>
        <h2 className='text-center'>Projects</h2>
        <Link
          href='/login/dashboard/update/project'
          className='text-2xl text-lime-500'
        >
          <FaPlusCircle />
        </Link>
      </div>
      <div className='mx-auto mt-3'>
        {loading ? (
          Array(1)
            .fill(0)
            .map((d, index) => <Skeleton key={index} />)
        ) : errorMsg ? (
          <p className='text-2xl text-center'>{errorMsg}</p>
        ) : project?.length < 1 ? (
          <p className='text-2xl text-center'>No testimonial yet...</p>
        ) : (
          project && (
            <Slider {...settings}>
              {project &&
                project?.map((project) => {
                  return (
                    <figure
                      className='card bg-slate-700 bg-opacity-30 hover:shadow-md hover:shadow-slate-700 h-[490px]'
                      key={project._id}
                    >
                      <Image
                        src={project.cover_image || "Unavailable"}
                        className='w-full rounded-t-lg h-56'
                        width={300}
                        height={300}
                        alt='project background'
                      />
                      <figcaption className='p-3'>
                        <h3 className='text-xl'>
                          {project.title || "Unavailable"}
                        </h3>
                        <p className='text-sm'>
                          {project.description || "Unavailable"}
                        </p>
                        <div className='flex gap-5 justify-center items-center text-2xl mt-3'>
                          <Link
                            href={`/login/dashboard/update/project/${project._id}`}
                          >
                            <FaPenAlt className='text-blue-500' />
                          </Link>
                          <FaTrash
                            className='text-rose-500 cursor-pointer'
                            onClick={() => handleDelete(project._id)}
                          />
                        </div>
                      </figcaption>
                    </figure>
                  );
                })}
            </Slider>
          )
        )}
      </div>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </section>
  );
};

export default Projects;
