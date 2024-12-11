import { apiService } from "@/service/apiService";
import React, { useEffect, useState } from "react";
import { IUser } from "../types/IUser";

const ProfileSection = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await apiService.get("/user/all");
        setUsers(response); // Response-data är redan ett IUser[]
        console.log("DEBUG USERDATA: ", response);
      } catch (error) {
        console.log("Error while fetching: ", error);
        setError("Failed to fetch users. Please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <section className="pt-16 bg-blueGray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {users.map((user) => {
          const userAvatar =
            user.profile && user.profile.length > 0
              ? user.profile[0].avatar // Hämta den första profilens avatar
              : "../images/default-avatar.jpg"; // Fallback-bild om ingen profil finns

          return (
            <div
              key={user.id} // Använd `user.id` som unikt nyckelvärde
              className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg"
            >
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative">
                      <img
                        src={userAvatar}
                        className="mt-10 w-40 h-40 rounded-full object-cover"
                        alt={`${user.firstName || "User"}'s avatar`}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-xl font-semibold leading-normal mb-2 text-black">
                    {user.firstName || "First Name"} {user.lastName || "Last Name"}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-black font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-black"></i>
                    {user.username || "Unknown Username"}
                  </div>
                  <div className="mb-2 text-black mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-black"></i>
                    {user.role || "No Role Provided"}
                  </div>
                  <div className="mb-2 text-black">
                    <i className="fas fa-university mr-2 text-lg text-black"></i>
                    {user.education || "No Education Info"}
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
