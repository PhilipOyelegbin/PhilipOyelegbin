"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/Skeleton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Testimonial = () => {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const getAllTestimonials = async () => {
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonial`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (!resp.ok) {
        toast.error("Failed to fetch testimonials");
      }
      const result = await resp.json();
      setTestimonials(result.data);
    } catch (error) {
      setErrorMsg("Unable to load testimonials, try again later");
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonial/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (!resp.ok) {
        toast.error("Failed to delete testimonial");
      }
      const result = await resp.json();
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      toast.error("Internal server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTestimonials();
  }, [testimonials]);

  return (
    <section className="py-10 px-5 md:px-10 bg-surface">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          What People Say About Working With Me
        </h2>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Real feedback from real projects and colleagues. See why clients
          choose to work with me again and again.
        </p>
      </div>

      {errorMsg && <p className="text-center text-error">{errorMsg}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array(3)
              .fill(0)
              .map((_, idx) => <Skeleton key={idx} className="h-64 w-full" />)
          : testimonials &&
            testimonials.length > 0 &&
            testimonials.map((testimonial) => (
              <div key={testimonial._id} className="card">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-text-primary">
                    {testimonial.full_name}
                  </h4>

                  <button
                    className="items-center bg-rose-500 px-4 py-2 rounded-md text-white"
                    onClick={() => deleteTestimonial(testimonial._id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="flex my-3">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, idx) => (
                      <svg
                        key={idx}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </div>
                <p className="text-text-secondary">"{testimonial.comment}"</p>
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
  );
};

export default Testimonial;
