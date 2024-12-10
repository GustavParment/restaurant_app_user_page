"use client";

import { useState } from "react";
import Link from "next/link";
import { apiService } from "@/service/apiService";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await apiService.post("/auth/logout");
      console.log("Successfully logged out!");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-purple-500 bg-gradient-to-t from-red-400 text-white shadow-md z-10">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/pages/dashboard">
          <img src="/images/platedate2.png" alt="Logo" className="w-40 h-20" />
        </Link>
        <button
          onClick={toggleMenu}
          className="block md:hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <div className="hidden md:flex space-x-6">
          <Link href="/pages/dashboard" className="hover:text-blue-500">
            Home
          </Link>
          <Link href="/pages/profile" className="hover:text-blue-500">
            Profile
          </Link>
          <Link href="/pages/settings" className="hover:text-blue-500">
            Settings
          </Link>
          <button onClick={handleLogout} className="hover:text-blue-500">
            Log Out
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/pages/dashboard">
            <img src="/images/platedate2.png" alt="Logo" className="w-40 h-20" />
          </Link>
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-6 px-4 py-8">
          <Link href="/pages/dashboard" className="text-gray-800 hover:text-blue-500">
            Home
          </Link>
          <Link href="/pages/profile" className="text-gray-800 hover:text-blue-500">
            Profile
          </Link>
          <Link href="/pages/settings" className="text-gray-800 hover:text-blue-500">
            Settings
          </Link>
          <Link href="">
            <button
              onClick={handleLogout}
              className="text-gray-800 hover:text-blue-500"
            >
              Log Out
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
