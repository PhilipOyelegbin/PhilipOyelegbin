"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

const FeedbackDetail = ({ params }) => {
  const { id } = params;
  const navigate = useRouter();
  const [testimonials, setTestimonials] = useState({
    full_name: "",
    email: "",
    comment: "",
    rating: "",
    approved: "",
  });

  const handleChange = (e) => {
    setTestimonials({ ...testimonials, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/feedbacks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(testimonials),
    })
      .then(() => {
        setTestimonials({
          full_name: "",
          email: "",
          comment: "",
          rating: "",
          approved: "",
        });
        navigate.push("/");
      })
      .catch((error) => {
        error.message && toast.error("An error occured!");
      });
  };

  useEffect(() => {
    fetch(`/api/feedbacks/${id}`)
      .then((resp) => resp.json())
      .then((data) => setTestimonials(data.feedbackData))
      .catch(
        (err) =>
          err && toast.error("Unable to load testimonial, try again later")
      );
  }, [id]);

  return (
    <article className='pt-16 pb-10 lg:h-screen flex flex-col-reverse md:flex-row gap-10 justify-center items-center px-5 lg:px-20'>
      <form onSubmit={handleUpdate} autoComplete='false'>
        <div className='form-control'>
          <label htmlFor='full_name'>Full name:</label>
          <input
            id='full_name'
            type='text'
            name='full_name'
            value={testimonials.full_name}
            onChange={handleChange}
            minLength='4'
            maxLength='50'
            placeholder='Enter your full name'
            required
            readOnly
          />
        </div>
        <div className='form-control'>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            name='email'
            value={testimonials.email}
            onChange={handleChange}
            placeholder='Enter your email'
            required
            readOnly
          />
        </div>
        <div className='form-control'>
          <label htmlFor='approved'>Approved:</label>
          <input
            id='approved'
            type='text'
            name='approved'
            value={testimonials.approved}
            onChange={handleChange}
            minLength='4'
            maxLength='50'
            placeholder='Enter feedback status'
            required
          />
        </div>
        <div className='form-control'>
          <label htmlFor='comment'>Comment:</label>
          <textarea
            id='comment'
            name='comment'
            cols='30'
            rows='5'
            value={testimonials.comment}
            onChange={handleChange}
            minLength='50'
            maxLength='150'
            placeholder='Write your message here...'
            required
            readOnly
          ></textarea>
        </div>

        <button type='submit' className='btn'>
          SEND
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

export default FeedbackDetail;
