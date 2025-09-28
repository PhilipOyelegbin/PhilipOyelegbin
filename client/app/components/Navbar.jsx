"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCode } from "react-icons/fa";

const menuContent = [
  { id: 1, label: "Home", link: "/" },
  { id: 2, label: "Skills", link: "/skills" },
  { id: 3, label: "Experience", link: "/experience" },
  { id: 4, label: "Portfolio", link: "/portfolio" },
  { id: 5, label: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleMenuContent = () => {
    setOpen(!open);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border flex items-center justify-between h-16 px-5 md:px-10">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <FaCode className="w-8 h-8 text-primary" />
        <span className="text-xl font-bold text-gradient">PhilipOyelegbin</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {menuContent.map((menu, idx) => (
          <Link
            key={idx}
            className={
              pathname == menu.link
                ? "text-primary font-semibold"
                : "text-text-secondary hover:text-primary transition-smooth"
            }
            href={menu.link}
          >
            {menu.label}
          </Link>
        ))}
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
        {menuContent.map((menu, idx) => (
          <Link
            key={idx}
            className={
              pathname == menu.link
                ? "block text-primary font-semibold"
                : "block text-text-secondary hover:text-primary transition-smooth"
            }
            href={menu.link}
            onClick={handleMenuContent}
          >
            {menu.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
