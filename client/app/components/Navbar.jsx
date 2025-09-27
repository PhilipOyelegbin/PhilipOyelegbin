"use client";
import { useState } from "react";
// import { HiOutlineMenuAlt3 } from "react-icons/hi";
// import { FaTimes } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleMenuContent = () => {
    setOpen(!open);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-gradient">PhilipOyelegbin</span>
      </div>

      {/* Desktop Navigation */}
      <div
        className={open ? "hidden" : "hidden md:flex items-center space-x-8"}
      >
        <Link href="/" className="text-primary font-semibold">
          Home
        </Link>
        <Link
          href="/skills"
          className="text-text-secondary hover:text-primary transition-smooth"
        >
          Skills
        </Link>
        <Link
          href="/experience"
          className="text-text-secondary hover:text-primary transition-smooth"
        >
          Experience
        </Link>
        <Link
          href="/portfolio"
          className="text-text-secondary hover:text-primary transition-smooth"
        >
          Portfolio
        </Link>
        <Link href="/contact" className="btn-primary">
          Contact
        </Link>
      </div>

      {/* Mobile Menu Button  */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-surface transition-smooth"
        onClick={handleMenuContent}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile naviagtion */}
      <div
        className={`${
          open ? "right-0" : "-right-full"
        } bg-background nav-container`}
      >
        <Link href="/" className="block text-primary font-semibold">
          Home
        </Link>
        <Link
          href="/skills"
          className="block text-text-secondary hover:text-primary transition-smooth"
        >
          Skills
        </Link>
        <Link
          href="/experience"
          className="block text-text-secondary hover:text-primary transition-smooth"
        >
          Experience
        </Link>
        <Link
          href="/portfolio"
          className="block text-text-secondary hover:text-primary transition-smooth"
        >
          Portfolio
        </Link>
        <Link href="/contact" className="block text-primary font-semibold">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
// <header>
//   {/* logo */}
//   <div className='flex justify-between items-center'>
//     <Link
//       href='/admin/login'
//       className='logo text-xl md:text-2xl font-bold text-slate-200'>
//       {"(Philip Oyelegbin) =>"}
//     </Link>
//   </div>

//   {/* menu button */}
//   <button
//     className='text-4xl cursor-pointer lg:hidden block'
//     onClick={handleMenuContent}>
//     <HiOutlineMenuAlt3 className={`h-6 w-6 ${open ? "hidden" : "block"}`} />
//   </button>

//   {/* menu content */}
//   <nav className={open ? "right-0" : "-right-full"}>
//     <ul>
//       <li>
//         <Link
//           href='#about'
//           className='menuLink'
//           onClick={handleMenuContent}>
//           About
//         </Link>
//       </li>
//       <li>
//         <Link
//           href='#qualifications'
//           className='menuLink'
//           onClick={handleMenuContent}>
//           Qualifications
//         </Link>
//       </li>
//       <li>
//         <Link
//           href='#projects'
//           className='menuLink'
//           onClick={handleMenuContent}>
//           Projects
//         </Link>
//       </li>
//       <li>
//         <Link
//           href='#feedback'
//           className='menuLink'
//           onClick={handleMenuContent}>
//           Feedback
//         </Link>
//       </li>

//       <FaTimes
//         className={`h-6 w-6 mx-auto cursor-pointer lg:hidden ${
//           open ? "block" : "hidden"
//         }`}
//         onClick={handleMenuContent}
//       />
//     </ul>
//   </nav>
// </header>
