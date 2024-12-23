import { useEffect, useState } from "react";
import { Skeleton } from "./Skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const Testimonial = () => {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState();
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
    fetch("/api/feedbacks")
      .then((resp) => resp.json())
      .then((data) => setTestimonials(data.feedbackData))
      .catch((err) =>
        setErrorMsg("Unable to load testimonials, try again later")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className='my-12 px-5 py-10 lg:px-20'>
      <h2 className='text-center'>TESTIMONIAL</h2>
      <div className='mx-auto mt-3'>
        {loading ? (
          Array(1)
            .fill(0)
            .map((d, index) => <Skeleton key={index} />)
        ) : errorMsg ? (
          <p className='text-2xl text-center'>{errorMsg}</p>
        ) : testimonials?.length < 1 ? (
          <p className='text-2xl text-center'>No testimonial yet...</p>
        ) : (
          testimonials && (
            <Slider {...settings}>
              {testimonials &&
                testimonials
                  ?.filter((item) => item.approved === true)
                  ?.map((testimony) => (
                    <div
                      className='flex flex-col items-center bg-slate-700 bg-opacity-30 rounded-md p-5 overflow-y-scroll'
                      key={testimony.email}>
                      <h3 className='text-2xl text-center mb-2'>
                        {testimony.full_name}
                      </h3>
                      <p className='h-32'>{testimony.comment}</p>
                      <p className='mt-2 font-bold text-purple-700 text-center'>
                        Rated: {testimony.rating}.0
                      </p>
                    </div>
                  ))}
            </Slider>
          )
        )}
      </div>
    </section>
  );
};

export default Testimonial;
