"use client";

import React from "react";
import Navbar from "@/app/components/Navbar";
import BottomBar from "@/app/components/BottomBar";
import UserCard from "@/app/components/UserCard";
import RestaurantGrid from "@/app/components/RestaurantGrid";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow pt-20">
        
        <div className="container mx-auto p-4">
      <RestaurantGrid/>
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
};

export default Page;
