import { FaExclamation, FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  full_name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  comment: yup
    .string()
    .min(100, "Comment must not be less than 100 characters")
    .max(200, "Comment must not exceed 200 characters")
    .required("Comment is required"),
  rating: yup
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must not exceed 5")
    .required("Rating is required"),
  approved: yup.boolean().default(false),
});

const Feedback = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/feedbacks", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Feedback sent!");
        reset();
      } else {
        toast.error("Unable to send feedback.");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className='my-12 px-5 py-10 lg:px-20' id='feedback'>
      <div className={`feedback-bg`}>
        {/* container holding the contact form */}
        <div className='lg:w-2/5 w-full bg-purple-950 bg-opacity-80 rounded-2xl text-white p-5'>
          <h3 className='text-2xl font-extrabold mb-3'>
            I will love to hear your feedback
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete='false'>
            <div className='form-control'>
              <label htmlFor='rating' className='flex items-center gap-1'>
                Rate my service: {getValues("rating")}
                <FaStar className='text-base text-yellow-500' />
              </label>
              <input
                {...register("rating")}
                type='range'
                id='rating'
                min='0'
                max='5'
                defaultValue={5}
              />
            </div>

            <div className='form-control'>
              <label htmlFor='full_name'>Full name:</label>
              <input
                {...register("full_name")}
                id='full_name'
                type='text'
                placeholder='Enter your full name'
              />
              {errors.full_name && (
                <span className='flex items-center text-red-500 text-xs'>
                  <FaExclamation /> {errors.full_name.message}
                </span>
              )}
            </div>

            <div className='form-control'>
              <label htmlFor='email'>Email:</label>
              <input
                {...register("email")}
                id='email'
                type='email'
                placeholder='Enter your email'
              />
              {errors.email && (
                <span className='flex items-center text-red-500 text-xs'>
                  <FaExclamation /> {errors.email.message}
                </span>
              )}
            </div>

            <div className='form-control'>
              <label htmlFor='comment'>Comment:</label>
              <textarea
                {...register("comment")}
                id='comment'
                cols='30'
                rows='5'
                placeholder='Write your message here...'></textarea>
              {errors.comment && (
                <span className='flex items-center text-red-500 text-xs'>
                  <FaExclamation /> {errors.comment.message}
                </span>
              )}
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-white disabled:bg-gray-500 text-slate-700 px-4 py-2 rounded-lg ease-linear duration-300'>
              {isSubmitting ? "Processing..." : "Send"}
            </button>
            <ToastContainer
              position='top-right'
              autoClose={2000}
              closeOnClick
              pauseOnFocusLoss
              pauseOnHover
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
