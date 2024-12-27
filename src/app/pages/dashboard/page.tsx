"use client";

import React from "react";
import Navbar from "@/app/components/Navbar";
import BottomBar from "@/app/components/BottomBar";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow pt-20">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-black mb-4 mt-4">
            Welcome to PlateDate
          </h1>
          <p className="text-gray-700 mb-6">
            PlateDate is a unique platform designed to bring people together
            over their love for food and exploration. Swipe, connect, and
            discover your next favorite restaurant with friends or someone
            special.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Feature Card */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-black mb-2">
                Discover Restaurants
              </h2>
              <p className="text-gray-600">
                Browse a curated list of the best restaurants in your area. Find
                new favorites with user reviews and personalized
                recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
};

export default Page;
