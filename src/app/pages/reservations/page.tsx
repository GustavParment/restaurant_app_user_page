"use client";

import React from "react";
import Navbar from "@/app/components/Navbar";
import BottomBar from "@/app/components/BottomBar";
import UserCard from "@/app/components/UserCard";
import EditProfileForm from "@/app/components/EditProfileForm";
import ReservationsPage from "@/app/components/UserReservations";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow pt-20">
    
    <ReservationsPage/>
    </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
};

export default Page;
