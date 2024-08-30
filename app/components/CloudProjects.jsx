"use client";
import Slider from "react-slick";
import {
  FaGithub,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaYoutube,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Skeleton } from "./Skeleton";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CloudProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState();
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

  useEffect(() => {
    fetch("/api/projects")
      .then((resp) => resp.json())
      .then((data) => setProjects(data.projectData))
      .catch((err) => setErrorMsg("Unable to load projects, try again later"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className='text-center px-5 py-5 lg:px-20'>
      <p className='lg:text-center'>
        Here is a selection of my cloud/devops work,{" "}
        <strong>
          view others on{" "}
          <Link
            href='https://github.com/PhilipOyelegbin'
            className='text-purple-700'
          >
            GitHub
          </Link>
          .
        </strong>
      </p>

      {loading ? (
        <Skeleton />
      ) : (
        errorMsg && (
          <h3 className='text-2xl text-center'>Unable to fetch data</h3>
        )
      )}

      {projects && (
        <Slider {...settings}>
          {projects &&
            projects
              ?.filter((item) => item.tag === "Cloud")
              .map((project) => {
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
                      <div className='flex gap-5 items-center text-2xl mt-3'>
                        <Link
                          href={project.project_url}
                          className='hover:text-purple-700'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <FaYoutube />
                        </Link>
                        {project.github_url && (
                          <Link
                            href={project.github_url}
                            className='hover:text-purple-700'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <FaGithub />
                          </Link>
                        )}
                      </div>
                    </figcaption>
                  </figure>
                );
              })}
        </Slider>
      )}
    </section>
  );
};

export default CloudProjects;
