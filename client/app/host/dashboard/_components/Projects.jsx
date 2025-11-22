"use client";
import { Skeleton } from "@/app/components/Skeleton";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Projects() {
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const getAllProjects = async () => {
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/project`
      );
      if (!resp.ok) {
        setErrorMsg("Failed to fetch projects");
      }

      const result = await resp.json();
      setProjectData(result.data);
    } catch (error) {
      setErrorMsg("Unable to load projects, try again later");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/project/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (!resp.ok) {
        toast.error("Failed to delete project");
      }
      const result = await resp.json();
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Internal server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, [projectData]);

  return (
    <>
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

        {errorMsg && <p className="text-center text-error">{errorMsg}</p>}

        {/* <!-- Project Grid --> */}
        <div
          id="projects-grid"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {loading
            ? Array(6)
                .fill(0)
                .map((_, idx) => <Skeleton key={idx} className="h-64 w-full" />)
            : projectData &&
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
                          target="_blank"
                          rel="noopener noreferrer"
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
                          target="_blank"
                          rel="noopener noreferrer"
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

                    {/* <!-- Acion Button --> */}
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/host/dashboard/update/project/${project._id}`}
                        className="items-center bg-primary-100 text-primary px-4 py-2 rounded-md"
                      >
                        Edit
                      </Link>
                      <button
                        className="items-center bg-rose-500 px-4 py-2 rounded-md text-white"
                        onClick={() => deleteProject(project._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <ToastContainer
          position="top-right"
          className="-z-20"
          autoClose={2000}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
        />
      </section>
    </>
  );
}

export default Projects;
