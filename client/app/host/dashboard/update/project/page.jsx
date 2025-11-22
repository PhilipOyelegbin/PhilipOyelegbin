"use client";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaExclamation } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup
    .string()
    .min(100, "Description must not be less than 100 characters")
    .max(200, "Description must not exceed 200 characters")
    .required("Description is required"),
  tag: yup.string().required("Tag is required"),
  cover_image: yup
    .mixed()
    .required("A file is required")
    .test("type", "Only image file formats are accepted", (value) => {
      return (
        value &&
        (value[0]?.type === "image/jpeg" ||
          value[0]?.type === "image/bmp" ||
          value[0]?.type === "image/jpg" ||
          value[0]?.type === "image/png")
      );
    })
    .test(
      "fileSize",
      "File size must be less than 1MB",
      (value) => value[0]?.size <= 1024 * 1024 // Updated file size check
    )
    .required("A file is required"),
  project_url: yup.string().required("Project link is required"),
  github_url: yup.string(),
});

const Project = () => {
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const onCreate = async (data) => {
    const formData = new FormData();
    formData.append("cover_image", data.cover_image[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tag", data.tag);
    formData.append("project_url", data.project_url);
    formData.append("github_url", data.github_url);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/project`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      ).then(async (res) => await res.json());
      if (!response.error) {
        reset();
        navigate.replace("/host/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-primary-50 via-background to-accent-50 overflow-hidden">
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
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-6">
              Create New <span className="text-gradient">Project</span>
            </h1>

            <div className="card">
              <form
                onSubmit={handleSubmit(onCreate)}
                autoComplete="false"
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="cover_image"
                    className="block text-sm font-semibold text-text-primary mb-2"
                  >
                    Cover Image *
                  </label>
                  <input
                    {...register("cover_image")}
                    id="cover_image"
                    className="input-field"
                    type="file"
                    accept="image/*"
                    placeholder="Upload a cover image"
                  />
                  {errors.cover_image && (
                    <span className="flex items-center text-error text-xs">
                      <FaExclamation /> {errors.cover_image.message}
                    </span>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-semibold text-text-primary mb-2"
                    >
                      Project Title *
                    </label>
                    <input
                      {...register("title")}
                      id="title"
                      className="input-field"
                      type="text"
                      placeholder="Enter your project title"
                    />
                    {errors.title && (
                      <span className="flex items-center text-error text-xs">
                        <FaExclamation /> {errors.title.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="tag"
                      className="block text-sm font-semibold text-text-primary mb-2"
                    >
                      Project Tag *
                    </label>
                    <input
                      {...register("tag")}
                      id="tag"
                      className="input-field"
                      type="text"
                      placeholder="Enter your project tag"
                    />
                    {errors.tag && (
                      <span className="flex items-center text-error text-xs">
                        <FaExclamation /> {errors.tag.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="project_url"
                      className="block text-sm font-semibold text-text-primary mb-2"
                    >
                      Project URL *
                    </label>
                    <input
                      {...register("project_url")}
                      id="project_url"
                      className="input-field"
                      type="url"
                      placeholder="https://projecturl.com"
                    />
                    {errors.project_url && (
                      <span className="flex items-center text-error text-xs">
                        <FaExclamation /> {errors.project_url.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="github_url"
                      className="block text-sm font-semibold text-text-primary mb-2"
                    >
                      Github URL *
                    </label>
                    <input
                      {...register("github_url")}
                      id="github_url"
                      className="input-field"
                      type="url"
                      placeholder="https://github.com/<username>/<repo-name>"
                    />
                    {errors.github_url && (
                      <span className="flex items-center text-error text-xs">
                        <FaExclamation /> {errors.github_url.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-text-primary mb-2"
                  >
                    Project Description *
                  </label>
                  <textarea
                    {...register("description")}
                    id="description"
                    rows="6"
                    className="input-field resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                  {errors.description && (
                    <span className="flex items-center text-error text-xs">
                      <FaExclamation /> {errors.description.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
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
                  <span>{isSubmitting ? "Processing..." : "Send"}</span>
                </button>

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
        </div>
      </div>
    </section>
  );
};

export default Project;
