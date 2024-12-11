"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/service/apiService";

export default function page() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [errorResponse, setErrorResponse] = useState<string>("");
  const router = useRouter();

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user.username || !user.password) {
      setErrorResponse("Username and password are required");
      return;
    }

    try {
      const data = await apiService.post("/auth/login", user);
      console.log("LOGIN DATA DEBUG------:",data )
      router.push("/pages/dashboard");
    } catch (error) {
      setErrorResponse("A network error occurred. Please try again.");
    }
  };

  const navigateToRegister = () => router.push("/pages/register");

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-[url('/images/restaurant-bg-2.jpg')] bg-cover ">
        <div className="relative flex flex-col rounded-xl bg-gray-950 bg-opacity-50 p-8 backdrop-blur-sm shadow-lg max-w-sm w-full">
          <img className="w-80" src="/images/platedate.png" alt="" />
          <p className="mt-1 text-sm text-gray-300 flex justify-center">
            Enter your details to login
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <input
                name="username"
                type="text"
                placeholder=""
                onChange={handleUserChange}
                className="peer w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white placeholder-gray-400 outline-none focus:border-pink-500"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                Username
              </label>
            </div>

            <div className="relative">
              <input
                name="password"
                type="password"
                placeholder=""
                onChange={handleUserChange}
                className="peer w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white placeholder-gray-400 outline-none focus:border-pink-500"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                Password
              </label>
            </div>

            {errorResponse && (
              <p className="text-sm text-red-500">{errorResponse}</p>
            )}
            <button
              type="submit"
              className="w-full rounded-md bg-pink-500 py-2 text-sm font-semibold text-white hover:bg-pink-600"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-300 text-center">
            Don't have an account?{" "}
            <span
              onClick={navigateToRegister}
              className="cursor-pointer font-semibold text-pink-500 hover:text-blue-700"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
