"use client";
import { Skeleton } from "@/app/components/Skeleton";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Projects() {
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const getAllProjects = async () => {
    setLoading(true);
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/project`);
    if (!resp.ok) {
      setLoading(false);
      setErrorMsg("Failed to fetch projects");
      setProjectData({});
      return;
    }

    const result = await resp.json();
    setLoading(false);
    setProjectData(result.data);
    setErrorMsg("");
  };

  const getWebProjects = async () => {
    setLoading(true);
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/project/web`
    );
    if (!resp.ok) {
      setLoading(false);
      setErrorMsg("Failed to fetch projects");
      setProjectData({});
      return;
    }

    const result = await resp.json();
    setLoading(false);
    setProjectData(result.data);
    setErrorMsg("");
  };

  const getCloudProjects = async () => {
    setLoading(true);
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/project/cloud`
    );
    if (!resp.ok) {
      setLoading(false);
      setErrorMsg("Failed to fetch projects");
      setProjectData({});
      return;
    }

    const result = await resp.json();
    setLoading(false);
    setProjectData(result.data);
    setErrorMsg("");
  };

  const getAiProjects = async () => {
    setLoading(true);
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/project/ai`
    );
    if (!resp.ok) {
      setLoading(false);
      setErrorMsg("Failed to fetch projects");
      setProjectData({});
      return;
    }

    const result = await resp.json();
    setLoading(false);
    setProjectData(result.data);
    setErrorMsg("");
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      {/* <!-- Project Filters --> */}
      <section className="py-10 px-5 md:px-10 bg-surface">
        {/* <!-- Filter Buttons --> */}
        <div className="flex flex-wrap md:justify-center gap-3 font-semibold mb-12">
          <button
            className="flex items-center bg-primary px-4 py-2 rounded-md text-white active"
            data-filter="all"
            onClick={() => getAllProjects()}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            All Projects
          </button>
          <button
            className="flex items-center px-4 py-2 border border-slate-300 rounded-md text-text-primary hover:bg-slate-100 transition-all ease-linear duration-300"
            data-filter="web"
            onClick={() => getWebProjects()}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            Web Development
          </button>
          <button
            className="flex items-center px-4 py-2 border border-slate-300 rounded-md text-text-primary hover:bg-slate-100 transition-all ease-linear duration-300"
            data-filter="cloud"
            onClick={() => getCloudProjects()}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
            Cloud & DevOps
          </button>
          {/* <button
            className="flex items-center px-4 py-2 border border-slate-300 rounded-md text-text-primary hover:bg-slate-100 transition-all ease-linear duration-300"
            data-filter="ai"
            onClick={() => getAiProjects()}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            AI Automation
          </button> */}
        </div>
      </section>

      {/* <!-- Featured Projects --> */}
      <section className="py-10 px-5 md:px-10 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Showcasing innovative solutions that drive business growth and
            technical excellence
          </p>
        </div>

        {/* Error state */}
        {errorMsg && (
          <p className="text-2xl text-center text-rose-500">{errorMsg}</p>
        )}

        {/* <!-- Project Grid --> */}
        <div
          id="projects-grid"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {/* Loading state */}
          {loading &&
            Array(6)
              .fill(0)
              .map((d, idx) => <Skeleton key={idx} />)}

          {/* Data received */}
          {projectData &&
            projectData.length > 1 &&
            projectData.map((project) => (
              <div
                className="project-card card group hover:shadow-card-hover transition-all duration-400"
                data-category={project.tag}
                key={project._id}
                data-tech="react node aws"
              >
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <Image
                    src={project.cover_image}
                    width={100}
                    height={100}
                    alt={project.title + " cover image"}
                    className="w-full h-64 object-fill group-hover:scale-105 transition-transform duration-400"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {project.tag}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-text-primary">
                      {project.title}
                    </h3>
                    <div className="flex space-x-2">
                      <Link
                        href={project.github_url}
                        className="text-text-secondary hover:text-primary transition-smooth"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </Link>
                      <Link
                        href={project.project_url}
                        className="text-text-secondary hover:text-primary transition-smooth"
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
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  <p className="text-text-secondary leading-relaxed">
                    {project.description}
                  </p>

                  {/* <!-- Tech Stack --> */}
                  {/* <div className="flex flex-wrap gap-2">
                    <span className="bg-primary-100 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {project.tools[0]}
                    </span>
                    <span className="bg-accent-100 text-accent px-3 py-1 rounded-full text-sm font-medium">
                      {project.tools[1]}
                    </span>
                    <span className="bg-secondary-200 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {project.tools[2]}
                    </span>
                    <span className="bg-primary-100 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {project.tools[3]}
                    </span>
                    <span className="bg-accent-100 text-accent px-3 py-1 rounded-full text-sm font-medium">
                      {project.tools[4]}
                    </span>
                  </div> */}
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default Projects;
