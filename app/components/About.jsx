import { FaFacebook, FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Flow from "./Flow";

const About = () => {
  return (
    <section id='about' className='about-section'>
      <div className='text-white flex flex-col gap-4 text-center justify-center items-center md:w-1/2 mx-auto'>
        <h2 className='text-inherit lg:text-4xl'>Hello! I'm Philip 👋</h2>

        <p className='lg:text-xl font-light'>
          Highly skilled and versatile professional with expertise in{" "}
          <strong>Frontend</strong>, <strong>Backend</strong>, and{" "}
          <strong>Cloud Engineering</strong>. Currently working as a Customer
          Support Officer, utilizing technical knowledge to provide top-notch
          support and resolve complex issues.
        </p>

        <Link
          href={process.env.CV_URI || "/"}
          className='btn w-fit'
          target='_blank'
          rel='noopener noreferrer'>
          Check Resume
        </Link>
      </div>

      {/* <div className='lg:w-1/2 lg:h-[400px]'>
        <div className='w-full aspect-video'>
          <Image
            src='/profile.png'
            className='profile-image'
            width={100}
            height={100}
          />
        </div>

        <div className='mt-3 flex gap-5 mx-auto w-fit px-4 py-2 rounded-full'>
          <Link
            href='https://linkedin.com/in/PhilipOyelegbin'
            target='_blank'
            rel='noopener noreferrer'>
            <FaLinkedinIn className='social-icon' />
          </Link>

          <Link
            href='https://mobile.facebook.com/philip.oyelegbin'
            target='_blank'
            rel='noopener noreferrer'>
            <FaFacebook className='social-icon' />
          </Link>

          <Link
            href='https://mobile.twitter.com/OyelegbinPhilip'
            target='_blank'
            rel='noopener noreferrer'>
            <FaTwitter className='social-icon' />
          </Link>

          <Link
            href='https://github.com/PhilipOyelegbin'
            target='_blank'
            rel='noopener noreferrer'>
            <FaGithub className='social-icon' />
          </Link>
        </div>
      </div> */}
    </section>
  );
};

export default About;
