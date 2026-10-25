"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import toast from "react-hot-toast";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  LogOut,
  MessageSquareQuote,
  Pencil,
  Plus,
  Server,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";

type Project = {
  _id: string;
  title: string;
  description: string;
  tag: string;
  tools: string[];
  project_url?: string;
  github_url?: string;
  cover_image: string;
};

type Testimonial = {
  _id: string;
  full_name: string;
  email: string;
  comment: string;
  rating: number;
  approved: boolean;
};

type ProjectForm = {
  title: string;
  description: string;
  tag: string;
  tools: string;
  project_url: string;
  github_url: string;
  cover_image: File | null;
};

const emptyProjectForm: ProjectForm = {
  title: "",
  description: "",
  tag: "Web",
  tools: "",
  project_url: "",
  github_url: "",
  cover_image: null,
};

function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [projectForm, setProjectForm] = useState<ProjectForm>(emptyProjectForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProjectForm, setEditingProjectForm] =
    useState<ProjectForm>(emptyProjectForm);
  const [projectsEmblaRef, projectsEmblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [testimonialsEmblaRef, testimonialsEmblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canScrollProjectsPrev, setCanScrollProjectsPrev] = useState(false);
  const [canScrollProjectsNext, setCanScrollProjectsNext] = useState(false);
  const [canScrollTestimonialsPrev, setCanScrollTestimonialsPrev] =
    useState(false);
  const [canScrollTestimonialsNext, setCanScrollTestimonialsNext] =
    useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const request = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const response = await fetch(`${apiUrl}${path}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        sessionStorage.removeItem("token");
        router.replace("/auth");
        throw new Error("Your session has expired");
      }

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.message || "Request failed");
      }

      return result;
    },
    [apiUrl, router, token],
  );

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    try {
      const [projectResult, testimonialResult] = await Promise.all([
        request("/project"),
        request("/testimonial"),
      ]);
      setProjects(projectResult.data || []);
      setTestimonials(testimonialResult.data || []);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message !== "Your session has expired"
      ) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [request]);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken) {
      router.replace("/auth");
      return;
    }

    const frameId = requestAnimationFrame(() => {
      setToken(storedToken);
    });

    return () => cancelAnimationFrame(frameId);
  }, [router]);

  useEffect(() => {
    if (token) {
      const frameId = requestAnimationFrame(() => {
        void loadDashboard();
      });

      return () => cancelAnimationFrame(frameId);
    }
  }, [loadDashboard, token]);

  const updateProjectsScrollState = useCallback(() => {
    if (!projectsEmblaApi) {
      return;
    }

    setCanScrollProjectsPrev(projectsEmblaApi.canScrollPrev());
    setCanScrollProjectsNext(projectsEmblaApi.canScrollNext());
  }, [projectsEmblaApi]);

  const updateTestimonialsScrollState = useCallback(() => {
    if (!testimonialsEmblaApi) {
      return;
    }

    setCanScrollTestimonialsPrev(testimonialsEmblaApi.canScrollPrev());
    setCanScrollTestimonialsNext(testimonialsEmblaApi.canScrollNext());
  }, [testimonialsEmblaApi]);

  useEffect(() => {
    if (!projectsEmblaApi) {
      return;
    }

    const frameId = requestAnimationFrame(updateProjectsScrollState);
    projectsEmblaApi.on("select", updateProjectsScrollState);
    projectsEmblaApi.on("reInit", updateProjectsScrollState);

    return () => {
      cancelAnimationFrame(frameId);
      projectsEmblaApi.off("select", updateProjectsScrollState);
      projectsEmblaApi.off("reInit", updateProjectsScrollState);
    };
  }, [projectsEmblaApi, updateProjectsScrollState]);

  useEffect(() => {
    if (!testimonialsEmblaApi) {
      return;
    }

    const frameId = requestAnimationFrame(updateTestimonialsScrollState);
    testimonialsEmblaApi.on("select", updateTestimonialsScrollState);
    testimonialsEmblaApi.on("reInit", updateTestimonialsScrollState);

    return () => {
      cancelAnimationFrame(frameId);
      testimonialsEmblaApi.off("select", updateTestimonialsScrollState);
      testimonialsEmblaApi.off("reInit", updateTestimonialsScrollState);
    };
  }, [testimonialsEmblaApi, updateTestimonialsScrollState]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    router.replace("/auth");
  };

  const handleCreateProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectForm.cover_image) {
      toast.error("A project cover image is required");
      return;
    }

    setIsCreatingProject(true);
    try {
      const body = new FormData();
      body.append("title", projectForm.title);
      body.append("description", projectForm.description);
      body.append("tag", projectForm.tag);
      projectForm.tools
        .split(",")
        .map((tool) => tool.trim())
        .filter(Boolean)
        .forEach((tool) => body.append("tools", tool));
      body.append("project_url", projectForm.project_url);
      body.append("github_url", projectForm.github_url);
      body.append("cover_image", projectForm.cover_image);

      await request("/project", { method: "POST", body });
      setProjectForm(emptyProjectForm);
      setShowProjectForm(false);
      toast.success("Project created successfully");
      await loadDashboard();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to create project",
      );
    } finally {
      setIsCreatingProject(false);
    }
  };

  const startEditingProject = (project: Project) => {
    setEditingProjectId(project._id);
    setEditingProjectForm({
      title: project.title,
      description: project.description,
      tag: project.tag,
      tools: project?.tools?.join(", "),
      project_url: project.project_url || "",
      github_url: project.github_url || "",
      cover_image: null,
    });
  };

  const cancelEditingProject = () => {
    setEditingProjectId(null);
    setEditingProjectForm(emptyProjectForm);
  };

  const handleUpdateProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingProjectId) {
      return;
    }

    try {
      const detailsPayload = {
        title: editingProjectForm.title,
        description: editingProjectForm.description,
        tag: editingProjectForm.tag,
        tools: editingProjectForm.tools
          .split(",")
          .map((tool) => tool.trim())
          .filter(Boolean),
        project_url: editingProjectForm.project_url,
        github_url: editingProjectForm.github_url,
      };

      await request(`/project/details/${editingProjectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detailsPayload),
      });

      if (editingProjectForm.cover_image) {
        const imageFormData = new FormData();
        imageFormData.append("cover_image", editingProjectForm.cover_image);
        await request(`/project/image/${editingProjectId}`, {
          method: "PATCH",
          body: imageFormData,
        });
      }

      toast.success("Project updated successfully");
      cancelEditingProject();
      await loadDashboard();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update project",
      );
    }
  };

  const handleDelete = async (type: "project" | "testimonial", id: string) => {
    if (!window.confirm(`Delete this ${type}? This action cannot be undone.`)) {
      return;
    }

    try {
      await request(`/${type}/${id}`, { method: "DELETE" });
      toast.success(
        `${type === "project" ? "Project" : "Testimonial"} deleted`,
      );
      if (type === "project") {
        setProjects((current) => current.filter((item) => item._id !== id));
      } else {
        setTestimonials((current) => current.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : `Unable to delete ${type}`,
      );
    }
  };

  const approveTestimonial = async (id: string) => {
    try {
      await request(`/testimonial/${id}`, { method: "PATCH" });
      setTestimonials((current) =>
        current.map((item) =>
          item._id === id ? { ...item, approved: true } : item,
        ),
      );
      toast.success("Testimonial approved");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to approve testimonial",
      );
    }
  };

  if (!token || isLoading) {
    return (
      <main className="flex min-h-screen flex-1 items-center justify-center bg-[#0a0a0c]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#27272e] border-t-[#d2bbff]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex-1 bg-[#0a0a0c] px-6 py-12 text-[#f1f0f5] lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-5 border-b border-[#27272e] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#ff8c61]">
              <ShieldCheck className="h-4 w-4" />
              Private Console
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Portfolio Dashboard
            </h1>
            <p className="mt-2 text-sm text-[#9d9bb0]">
              Manage production systems and incoming client feedback.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#27272e] bg-[#121215] px-4 py-2.5 font-mono text-xs text-[#9d9bb0] transition-colors hover:border-[#ff8c61] hover:text-[#f1f0f5] sm:self-auto"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#27272e] bg-[#121215] p-5">
            <Server className="mb-4 h-5 w-5 text-[#d2bbff]" />
            <p className="font-mono text-xs uppercase text-[#9d9bb0]">
              Projects
            </p>
            <p className="mt-1 text-3xl font-semibold">{projects.length}</p>
          </div>
          <div className="rounded-2xl border border-[#27272e] bg-[#121215] p-5">
            <MessageSquareQuote className="mb-4 h-5 w-5 text-[#ff8c61]" />
            <p className="font-mono text-xs uppercase text-[#9d9bb0]">
              Testimonials
            </p>
            <p className="mt-1 text-3xl font-semibold">{testimonials.length}</p>
          </div>
        </div>

        <section className="mb-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Projects</h2>
              <p className="mt-1 text-sm text-[#9d9bb0]">
                Add or remove projects shown on your portfolio.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowProjectForm((current) => !current)}
              className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#ff6b35] px-4 py-2.5 font-mono text-xs text-white transition-colors hover:bg-[#ff5517]"
            >
              {showProjectForm ? (
                <X className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {showProjectForm ? "Close" : "Add project"}
            </button>
          </div>

          {showProjectForm && (
            <form
              onSubmit={handleCreateProject}
              className="mb-6 grid gap-4 rounded-2xl border border-[#27272e] bg-[#121215] p-6 md:grid-cols-2"
            >
              <input
                required
                placeholder="Project title"
                value={projectForm.title}
                onChange={(event) =>
                  setProjectForm({ ...projectForm, title: event.target.value })
                }
                className="dashboard-input"
              />
              <select
                value={projectForm.tag}
                onChange={(event) =>
                  setProjectForm({ ...projectForm, tag: event.target.value })
                }
                className="dashboard-input"
              >
                <option value="Web">Web</option>
                <option value="Cloud">Cloud</option>
              </select>
              <textarea
                required
                placeholder="Project description"
                value={projectForm.description}
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    description: event.target.value,
                  })
                }
                className="dashboard-input min-h-28 md:col-span-2"
              />
              <input
                required
                placeholder="Tools, comma separated"
                value={projectForm.tools}
                onChange={(event) =>
                  setProjectForm({ ...projectForm, tools: event.target.value })
                }
                className="dashboard-input"
              />
              <input
                required
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    cover_image: event.target.files?.[0] || null,
                  })
                }
                className="dashboard-input file:text-[#d2bbff]"
              />
              <input
                required
                type="url"
                placeholder="Live project URL"
                value={projectForm.project_url}
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    project_url: event.target.value,
                  })
                }
                className="dashboard-input"
              />
              <input
                type="url"
                placeholder="GitHub URL (optional)"
                value={projectForm.github_url}
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    github_url: event.target.value,
                  })
                }
                className="dashboard-input"
              />
              <button
                type="submit"
                disabled={isCreatingProject}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-[#7c3aed] px-4 py-3 font-mono text-xs text-white disabled:opacity-50 md:col-span-2"
              >
                <Plus className="h-4 w-4" />
                {isCreatingProject ? "Creating..." : "Create project"}
              </button>
            </form>
          )}

          <div>
            <div className="mb-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => projectsEmblaApi?.scrollPrev()}
                disabled={!canScrollProjectsPrev}
                aria-label="Previous projects"
                className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-xl border border-[#27272e] bg-[#121215] text-[#d2bbff] transition-colors hover:border-[#d2bbff] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => projectsEmblaApi?.scrollNext()}
                disabled={!canScrollProjectsNext}
                aria-label="Next projects"
                className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-xl border border-[#27272e] bg-[#121215] text-[#d2bbff] transition-colors hover:border-[#d2bbff] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-hidden" ref={projectsEmblaRef}>
              <div className="flex -ml-5">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="min-w-0 flex-[0_0_100%] pl-5 md:flex-[0_0_50%]"
                  >
                    <article className="h-full rounded-2xl border border-[#27272e] bg-[#121215] p-6">
                      {project.cover_image && (
                        <Image
                          src={project.cover_image}
                          alt={project.title}
                          width={300}
                          height={300}
                          className="mb-4 h-40 w-full rounded-xl border border-[#202026] object-cover"
                        />
                      )}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="font-mono text-[11px] uppercase text-[#d2bbff]">
                            {project.tag}
                          </span>
                          <h3 className="mt-1 text-lg font-semibold">
                            {project.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startEditingProject(project)}
                            aria-label={`Edit ${project.title}`}
                            className="cursor-pointer text-[#9d9bb0] transition-colors hover:text-[#d2bbff]"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              void handleDelete("project", project._id)
                            }
                            aria-label={`Delete ${project.title}`}
                            className="cursor-pointer text-[#9d9bb0] transition-colors hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#9d9bb0]">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project?.tools?.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-md bg-[#202026] px-2.5 py-1 font-mono text-xs text-[#f1f0f5]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {editingProjectId === project._id && (
                        <form
                          onSubmit={handleUpdateProject}
                          className="mt-5 grid gap-3 rounded-xl border border-[#27272e] bg-[#0e0e11] p-4"
                        >
                          <input
                            required
                            placeholder="Project title"
                            value={editingProjectForm.title}
                            onChange={(event) =>
                              setEditingProjectForm({
                                ...editingProjectForm,
                                title: event.target.value,
                              })
                            }
                            className="dashboard-input"
                          />
                          <select
                            value={editingProjectForm.tag}
                            onChange={(event) =>
                              setEditingProjectForm({
                                ...editingProjectForm,
                                tag: event.target.value,
                              })
                            }
                            className="dashboard-input"
                          >
                            <option value="Web">Web</option>
                            <option value="Cloud">Cloud</option>
                          </select>
                          <textarea
                            required
                            placeholder="Project description"
                            value={editingProjectForm.description}
                            onChange={(event) =>
                              setEditingProjectForm({
                                ...editingProjectForm,
                                description: event.target.value,
                              })
                            }
                            className="dashboard-input min-h-24"
                          />
                          <input
                            placeholder="Tools, comma separated"
                            value={editingProjectForm.tools}
                            onChange={(event) =>
                              setEditingProjectForm({
                                ...editingProjectForm,
                                tools: event.target.value,
                              })
                            }
                            className="dashboard-input"
                          />
                          <input
                            type="url"
                            placeholder="Live project URL"
                            value={editingProjectForm.project_url}
                            onChange={(event) =>
                              setEditingProjectForm({
                                ...editingProjectForm,
                                project_url: event.target.value,
                              })
                            }
                            className="dashboard-input"
                          />
                          <input
                            type="url"
                            placeholder="GitHub URL"
                            value={editingProjectForm.github_url}
                            onChange={(event) =>
                              setEditingProjectForm({
                                ...editingProjectForm,
                                github_url: event.target.value,
                              })
                            }
                            className="dashboard-input"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) =>
                              setEditingProjectForm({
                                ...editingProjectForm,
                                cover_image: event.target.files?.[0] || null,
                              })
                            }
                            className="dashboard-input file:text-[#d2bbff]"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="submit"
                              className="cursor-pointer rounded-lg bg-[#7c3aed] px-3 py-2 font-mono text-[11px] text-white"
                            >
                              Save changes
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditingProject}
                              className="cursor-pointer rounded-lg border border-[#27272e] px-3 py-2 font-mono text-[11px] text-[#9d9bb0]"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-semibold">Testimonials</h2>
            <p className="mt-1 text-sm text-[#9d9bb0]">
              Approve feedback before it appears publicly, or remove it.
            </p>
          </div>
          <div>
            <div className="mb-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => testimonialsEmblaApi?.scrollPrev()}
                disabled={!canScrollTestimonialsPrev}
                aria-label="Previous testimonials"
                className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-xl border border-[#27272e] bg-[#121215] text-[#d2bbff] transition-colors hover:border-[#d2bbff] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => testimonialsEmblaApi?.scrollNext()}
                disabled={!canScrollTestimonialsNext}
                aria-label="Next testimonials"
                className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-xl border border-[#27272e] bg-[#121215] text-[#d2bbff] transition-colors hover:border-[#d2bbff] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-hidden" ref={testimonialsEmblaRef}>
              <div className="flex -ml-5">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial._id}
                    className="min-w-0 flex-[0_0_100%] pl-5 md:flex-[0_0_50%]"
                  >
                    <article className="h-full rounded-2xl border border-[#27272e] bg-[#121215] p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold">
                            {testimonial.full_name}
                          </h3>
                          <p className="mt-1 font-mono text-xs text-[#9d9bb0]">
                            {testimonial.email}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            void handleDelete("testimonial", testimonial._id)
                          }
                          aria-label={`Delete testimonial from ${testimonial.full_name}`}
                          className="cursor-pointer text-[#9d9bb0] transition-colors hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div
                        className="mt-3 text-[#ff8c61]"
                        aria-label={`${testimonial.rating} out of 5 stars`}
                      >
                        {"★".repeat(testimonial.rating)}
                        <span className="text-[#4a4857]">
                          {"★".repeat(5 - testimonial.rating)}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#9d9bb0]">
                        {testimonial.comment}
                      </p>
                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#27272e]/60 pt-4">
                        <span
                          className={`font-mono text-xs ${
                            testimonial.approved
                              ? "text-emerald-400"
                              : "text-[#9d9bb0]"
                          }`}
                        >
                          {testimonial.approved ? "Approved" : "Pending review"}
                        </span>
                        {!testimonial.approved && (
                          <button
                            type="button"
                            onClick={() =>
                              void approveTestimonial(testimonial._id)
                            }
                            className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-2 font-mono text-xs text-emerald-400 transition-colors hover:bg-emerald-500/20"
                          >
                            <Check className="h-3.5 w-3.5" />
                            Approve
                          </button>
                        )}
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
