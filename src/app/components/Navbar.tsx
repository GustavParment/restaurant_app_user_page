"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-gray-800">
          PlateDate
        </Link>
        <button
          onClick={toggleMenu}
          className="block md:hidden text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-800 hover:text-blue-500">
            Home
          </Link>
          <Link href="/about" className="text-gray-800 hover:text-blue-500">
            About
          </Link>
          <Link href="/services" className="text-gray-800 hover:text-blue-500">
            Services
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-blue-500">
            Contact
          </Link>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-xl font-bold text-gray-800">
            PlateDate
          </Link>
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-6 px-4 py-8">
          <Link href="/" className="text-gray-800 hover:text-blue-500">
            Home
          </Link>
          <Link href="/about" className="text-gray-800 hover:text-blue-500">
            About
          </Link>
          <Link href="/services" className="text-gray-800 hover:text-blue-500">
            Services
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-blue-500">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
