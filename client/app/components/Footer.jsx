import Link from "next/link";
import { FaLinkedinIn, FaTwitter, FaGithub, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  let year = new Date().getFullYear();

  return (
    <footer className="bg-text-primary text-white text-base flex flex-col-reverse justify-center px-5 py-10 md:flex-row md:justify-between md:px-10">
      <p className="text-center text-white mt-3 md:mt-0">
        &copy; {year} Philip Oyelegbin :: All Right Resevered.
      </p>

      {/* container holding the footer contact links */}
      <div className="flex gap-5 mx-auto md:mx-0">
        <Link
          href="https://wa.me/2348054945601"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="w-6 h-6" />
        </Link>

        <Link
          href="https://linkedin.com/in/PhilipOyelegbin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className="w-6 h-6" />
        </Link>

        <Link
          href="https://mobile.twitter.com/OyelegbinPhilip"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="w-6 h-6" />
        </Link>

        <Link
          href="https://github.com/PhilipOyelegbin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="w-6 h-6" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
