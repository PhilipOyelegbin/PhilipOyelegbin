import { useState } from "react";
import { FaExclamation, FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feedback = () => {
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    comment: "",
    rating: 5,
    approved: false,
  });

  const errorMessage = {
    full_name: "Required and must be minimum of 4 characters",
    email: "Required and must be a valid email address",
    comment: "Required and minimum of 50 characters",
  };

  const disabledState =
    user.full_name === "" ||
    user.full_name.length < 4 ||
    user.email === "" ||
    !user.email.includes("@") ||
    user.comment === "" ||
    user.comment.length < 50;

  const handleSend = async (e) => {
    e.preventDefault();
    await fetch("/api/feedbacks", {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then(() => {
        toast.success("Feedback sent!");
        setUser({ full_name: "", email: "", comment: "", rating: 5 });
      })
      .catch((error) => {
        error.message && toast.error("Unable to send feedback.");
      });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <section className='px-5 py-10 lg:px-20' id='feedback'>
      <div className={`feedback-bg`}>
        {/* container holding the contact form */}
        <div className='lg:w-2/5 w-full bg-purple-950 bg-opacity-80 rounded-2xl text-white p-5'>
          <h3 className='text-2xl font-extrabold mb-3'>
            I will love to hear your feedback
          </h3>
          <form onSubmit={handleSend} autoComplete='false'>
            <input
              type='hidden'
              name='approved'
              value={user.approved}
              onChange={handleChange}
            />
            <div className='form-control'>
              <label htmlFor='rating' className='flex items-center gap-1'>
                Rate my service: {user.rating}
                <FaStar className='text-base text-yellow-500' />
              </label>
              <input
                type='range'
                name='rating'
                min={0}
                max={5}
                value={user.rating}
                onChange={handleChange}
              />
            </div>
            <div className='form-control'>
              <label htmlFor='full_name'>Full name:</label>
              <input
                id='full_name'
                type='text'
                name='full_name'
                value={user.full_name}
                onChange={handleChange}
                minLength='4'
                maxLength='50'
                placeholder='Enter your full name'
                required
              />
              {(user.full_name === "" || user.full_name.length < 4) && (
                <p className='flex items-center text-red-500 text-xs'>
                  <FaExclamation /> {errorMessage.full_name}
                </p>
              )}
            </div>
            <div className='form-control'>
              <label htmlFor='email'>Email:</label>
              <input
                id='email'
                type='email'
                name='email'
                value={user.email}
                onChange={handleChange}
                placeholder='Enter your email'
                required
              />
              {(user.email === "" || !user.email.includes("@")) && (
                <p className='flex items-center text-red-500 text-xs'>
                  <FaExclamation /> {errorMessage.email}
                </p>
              )}
            </div>
            <div className='form-control'>
              <label htmlFor='comment'>Comment:</label>
              <textarea
                id='comment'
                name='comment'
                cols='30'
                rows='5'
                value={user.comment}
                onChange={handleChange}
                minLength='50'
                maxLength='150'
                placeholder='Write your message here...'
                required
              ></textarea>
              {(user.comment === "" || user.comment.length < 50) && (
                <p className='flex items-center text-red-500 text-xs'>
                  <FaExclamation /> {errorMessage.comment}
                </p>
              )}
            </div>

            <button
              type='submit'
              disabled={disabledState}
              className='bg-white text-slate-700 px-4 py-2 rounded-lg ease-linear duration-300 disabled:bg-gray-500 disabled:bg-opacity-50'
            >
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
        </div>
      </div>
    </section>
  );
};

export default Feedback;
