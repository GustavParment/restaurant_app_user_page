"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaHeart, FaUtensils } from "react-icons/fa";
import { MdChat } from "react-icons/md";

const BottomBar = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-purple-500 bg-gradient-to-t from-red-400 p-6">
      <div className="flex justify-between px-10">
        <MdChat
          className="text-white text-2xl hover:cursor-pointer"
          onClick={() => router.push("/pages/chat")}
        />
        <FaHeart
          className="text-white text-2xl hover:cursor-pointer"
          onClick={() => router.push("/pages/browse")}
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
