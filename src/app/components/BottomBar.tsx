"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaHeart, FaHome, FaList, FaUtensils } from "react-icons/fa";
import { MdChat } from "react-icons/md";

const BottomBar = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-purple-950 bg-gradient-to-t from-red-400 p-6">
      <div className="flex justify-between px-10">
        <FaList
          className="text-white text-2xl hover:cursor-pointer"
          onClick={() => router.push("/pages/reservations")}
        />
        <FaHome
          className="text-white text-2xl hover:cursor-pointer"
          onClick={() => router.push("/pages/dashboard")}
        />
        <FaUtensils
          className="text-white text-2xl hover:cursor-pointer"
          onClick={() => router.push("/pages/restaurants")}
        />
      </div>
    </div>
  );
};

export default BottomBar;
