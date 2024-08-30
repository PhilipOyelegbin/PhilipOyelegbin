import { FaFacebook, FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section id='about' className='about-section'>
      <div className='flex flex-col gap-4 text-center items-center lg:items-start lg:text-left lg:w-1/2'>
        <h2>Hi, I am Philip Oyelegbin</h2>

        <p>
          I am a <strong>Support Specialist, Frontend Developer</strong>, and{" "}
          <strong>Cloud Engineer</strong> with a background in customer support
          and front-end development. I have proven skills in{" "}
          <strong>
            customer service, technical support, JavaScript, HTML5, CSS,
            React.js, cloud services
          </strong>
          , and <strong>Infrastructure as Code (IaC)</strong>. I am experienced
          with <strong>Google Cloud Platform (GCP), Terraform</strong>, and{" "}
          <strong>Ansible</strong>.
        </p>

        <p className='mt-3'>
          I have served as a Robotics Instructor, demonstrating leadership and
          commitment to STEM education. I am adaptable, collaborative,
          innovative, and eager to contribute to a dynamic team.
        </p>

        <Link
          href={process.env.CV_URI || "/"}
          className='btn w-fit'
          target='_blank'
          rel='noopener noreferrer'
        >
          Check Resume
        </Link>
      </div>

      <div className='lg:w-1/2 lg:h-[400px]'>
        <Image
          src='/profile.png'
          className='profile-image'
          width={300}
          height={300}
          alt='profile_picture'
          priority
        />

        <div className='mt-3 flex gap-5 mx-auto w-fit px-4 py-2 rounded-full'>
          <Link
            href='https://linkedin.com/in/PhilipOyelegbin'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaLinkedinIn className='social-icon' />
          </Link>

          <Link
            href='https://mobile.facebook.com/philip.oyelegbin'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaFacebook className='social-icon' />
          </Link>

          <Link
            href='https://mobile.twitter.com/OyelegbinPhilip'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaTwitter className='social-icon' />
          </Link>

          <Link
            href='https://github.com/PhilipOyelegbin'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub className='social-icon' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
