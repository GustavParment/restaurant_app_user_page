"use client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { IUser } from "./types/IUser";

export default function Home() {
  const[user, setUser] = useState<IUser>({username: "", password: ""});
  const [errorResponse, setErrorResponse] = useState<string>("");

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setUser((prevData)=>({...prevData, [name]: value}));

  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!user.username || !user.password) {
      setErrorResponse("Username and password are required");
      return;
    }

  }
  return (
    <>
      <div
        className="flex h-screen w-full items-center 
                  justify-center bg-gray-900 bg-cover bg-no-repeat
                  bg-[url('/images/restaurant-bg-2.jpg')]"
      >
        <div className="rounded-xl bg-wihte-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img
                src="../images/platedate2.png"
                width="250"
                alt=""
                srcSet=""
              />

              <span className="text-white text-sm">Enter Login Details</span>
            </div>
            <form action="#">
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-blue-200 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="name"
                  placeholder="Username"
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-blue-200  bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="name"
                  placeholder="*********"
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-blue-200 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Login
                </button>

                <div className="absolute py-12">
                  <p className="text-white underline hover:cursor-pointer">
                    register
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
