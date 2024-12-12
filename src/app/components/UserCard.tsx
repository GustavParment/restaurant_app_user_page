import { apiService } from "@/service/apiService";
import React, { useEffect, useState } from "react";
import { IUser } from "../types/IUser";
import { FaHeart, FaTimes } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { RiRestaurant2Fill, RiRestaurantFill } from "react-icons/ri";
import { GrRestaurant } from "react-icons/gr";
import { MdRestaurant, MdRestaurantMenu } from "react-icons/md";

const ProfileSection = () => {
  const [user, setUser] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const fetchUsers = async (index: number) => {
      try {
        setLoading(true);
        const response = await apiService.get(`/user/browse?index=${index}`);
        setUser(Array.isArray(response) ? response : [response]);
        console.log("DEBUG USERDATA: ", response);
      } catch (error) {
        console.log("Error while fetching: ", error);
        setError("Failed to fetch users. Please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(1);
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <section className="pt-16 bg-blueGray-50">
      <div className="flex">
        {user.map((user) => {
          const userAvatar =
            user.profile && user.profile.length > 0
              ? user.profile[0].avatar
              : "../images/default-avatar.jpg";

          const userHobbies =
            user.profile && user.profile.length > 0
              ? user.profile[0].hobbies
              : [];

          const userFood =
            user.profile && user.profile.length > 0
              ? user.profile[0].favoriteFood
              : [];

          const getUserAge = user.birthday
            ? calculateAge(user.birthday)
            : "UNKNOWN";

          return (
            <div
              key={user.id}
              className="relative flex flex-col min-w-0 break-words mb-6 rounded-lg"
            >
              <img
                src="/images/alexander.jpg" ///{userAvatar}
                className="mt-10  object-cover rounded-xl"
                alt={`${user.firstName || "User"}'s avatar`}
              />
              <div className="relative">
                    <div className="absolute bottom-10 text-white">
                      <p className="text-3xl px-4 font-bold">
                        {user.firstName} {user.lastName}{" "}
                        <span className="font-normal">{getUserAge}</span>
                      </p>
                    </div>
              <div className="px-6">
               
                  <div className="flex absolute bottom-0 px-10 -m-10 justify-evenly w-full b ">
                    <button className="text-red-400 text-5xl bg-white p-3 rounded-full shadow-md dark:shadow-gray-500">
                      <MdRestaurantMenu />
                    </button>

                    <button className="text-blue-500 text-5xl bg-white p-3 rounded-full shadow-md dark:shadow-gray-500">
                      <FaPhotoFilm />
                    </button>
                    <button className="text-green-500 text-5xl bg-white p-3 rounded-full shadow-md dark:shadow-gray-500">
                      <GrRestaurant />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileSection;
