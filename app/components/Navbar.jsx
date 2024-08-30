"use client";
import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleMenuContent = () => {
    setOpen(!open);
  };

  return (
    <header>
      {/* logo */}
      <div className='flex justify-between items-center'>
        <Link
          href='/login/dashboard'
          className='logo text-xl md:text-2xl font-bold text-slate-200'
        >
          {"(Philip Oyelegbin) =>"}
        </Link>
      </div>

      {/* menu button */}
      <button
        className='text-4xl cursor-pointer lg:hidden block'
        onClick={handleMenuContent}
      >
        <HiOutlineMenuAlt3 className={`h-6 w-6 ${open ? "hidden" : "block"}`} />
      </button>

      {/* menu content */}
      <nav className={open ? "right-0" : "-right-full"}>
        <ul>
          <li>
            <Link
              href='#about'
              className='menuLink'
              onClick={handleMenuContent}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href='#qualifications'
              className='menuLink'
              onClick={handleMenuContent}
            >
              Qualifications
            </Link>
          </li>
          <li>
            <Link
              href='#projects'
              className='menuLink'
              onClick={handleMenuContent}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href='#feedback'
              className='menuLink'
              onClick={handleMenuContent}
            >
              Feedback
            </Link>
          </li>

          <FaTimes
            className={`h-6 w-6 mx-auto cursor-pointer lg:hidden ${
              open ? "block" : "hidden"
            }`}
            onClick={handleMenuContent}
          />
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
