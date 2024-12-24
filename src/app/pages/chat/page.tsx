"use client";

import React from "react";
import Navbar from "@/app/components/Navbar";
import BottomBar from "@/app/components/BottomBar";
import { useRouter } from "next/navigation";
import { FaComment } from "react-icons/fa";
//HÄMTA RIKTIG DATA
const Page = () => {
  const router = useRouter();

  const chats = [
    { id: 1, name: "Alice", bgColor: "bg-green-200" },
    { id: 2, name: "Bob", bgColor: "bg-purple-500" },
    { id: 3, name: "Charlie", bgColor: "bg-slate-400" },
  ];

  const handleChatClick = (chatId) => {
    router.push(`/pages/chatsession`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow pt-20 mt-10">
        <div className="container mx-auto p-4 space-y-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat.id)}
              className="flex items-center justify-between bg-white p-4 shadow-lg border border-slate-300 hover:cursor-pointer rounded-lg"
            >
              <div className="flex flex-col items-center">
                <img
                  src="/images/alexander.jpg"
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <p className="text-black mt-2">{chat.name}</p>
              </div>

              <FaComment className="text-black text-2xl" />
            </div>
          ))}
        </div>
      </div>

      <BottomBar />
    </div>
  );
};

export default Page;
