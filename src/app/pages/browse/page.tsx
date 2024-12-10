"use client";

import React from "react";
import Navbar from "@/app/components/Navbar";
import BottomBar from "@/app/components/BottomBar";
import UserCard from "@/app/components/UserCard";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow pt-20">
        <UserCard/>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-black">Main Content Goes Here</h1>
          <p className="text-black">Add your content in this section.</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
};

export default Page;
