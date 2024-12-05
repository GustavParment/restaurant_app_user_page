"use client";

import { IUser } from "@/app/types/IUser";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

const RegistrationPage = () => {
  const [user, setUser] = useState<IUser>({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    birthday: "",
  });

  const router = useRouter();
  const [creationError, setCreationError] = useState<string | null>(null);
  const [creationSuccess, setCreationSuccess] = useState<string | null>(null);

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setCreationError(null);
    setCreationSuccess(null);

    
    const { username, password, email, firstName, lastName, birthday } = user;
    if (!username || !password || !email || !firstName || !lastName || !birthday) {
      setCreationError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("https://localhost:8443/api/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setCreationSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => router.push("/pages/login"), 2000);
      } else {
        const errorData = await response.json();
        setCreationError(errorData.message || "An error occurred during registration.");
      }
    } catch (error) {
      setCreationError("Failed to connect to the server. Please try again later.");
    }
  };

  const navigateToSignIn = () => {
    router.push("/pages/login");
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center 
     bg-[url('/images/restaurant-bg-3.jpg')] bg-cover"
    >
      <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border backdrop-blur-md text-gray-700 shadow-none bg-gray-950 bg-opacity-50 p-6">
        
        <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-white antialiased">
          Sign Up
        </h4>
        <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-white antialiased">
          Enter your details to register.
        </p>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={onSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            {["username", "password", "email", "firstName", "lastName", "birthday"].map(
              (field, index) => (
                <div className="relative h-11 w-full min-w-[200px]" key={index}>
                  <input
                    className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    type={field === "password" ? "password" : field === "birthday" ? "date" : "text"}
                    name={field}
                    value={(user as any)[field]} 
                    onChange={handleUserChange}
                  />
                  <label
                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </div>
              )
            )}
          </div>
          {creationError && (
            <p className="text-red-500 text-sm mb-4">{creationError}</p>
          )}
          {creationSuccess && (
            <p className="text-green-500 text-sm mb-4">{creationSuccess}</p>
          )}
          <button
            className="mt-6 block w-full select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            data-ripple-light="true"
          >
            Register
          </button>
          <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-white antialiased">
            Already have an account?
            <a
              className="font-semibold text-pink-500 transition-colors hover:text-blue-700"
              href="#"
              onClick={navigateToSignIn}
            >
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
