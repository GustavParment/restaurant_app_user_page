import { useEffect, useState } from "react";
import { apiService } from "@/service/apiService";
import ReservationComponent from "../components/ReservationComponent ";
import { IRestaurant } from "../types/IRestaurant";

const ResponsiveCardList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    string | null
  >(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const fetchedRestaurants = await apiService.get<IRestaurant[]>(
          "/restaurant/all"
        );
        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    const fetchUserId = async () => {
      try {
        const user = await apiService.get<{ id: string }>("/auth/current-user");
        setUserId(user.id);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchRestaurants();
    fetchUserId();
  }, []);

  const handleBookClick = (restaurantId: string) => {
    setSelectedRestaurantId(restaurantId);
    setModalOpen(true);
  };

  const handleReservationSubmit = async (reservationData: {
    restaurantId: string;
    userId: string;
    reservationDate: string;
    guests: number;
  }) => {
    try {
      const response = await apiService.post(
        "/reservation/create",
        reservationData
      );
      console.log("Reservation created:", response.data);
    } catch (error) {
      console.error("Failed to create reservation:", error);
    }
  };

  return (
    <section className="py-10 px-12">
      <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="my-8 rounded shadow-md shadow-gray-200 dark:shadow-gray-800 bg-white duration-300 hover:-translate-y-1"
          >
            <figure>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="rounded-t h-72 w-full object-cover"
              />
              <figcaption className="p-4">
                <p className="text-lg mb-4 font-bold leading-relaxed text-gray-800">
                  {restaurant.name}
                </p>
                <small className="leading-5 text-gray-500 dark:text-gray-400">
                  {restaurant.description}
                </small>
              </figcaption>
            </figure>
            <div className="flex justify-around p-4">
              <button
                onClick={() => handleBookClick(restaurant.id)}
                className="bg-purple-950 bg-gradient-to-t from-red-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
      <ReservationComponent
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleReservationSubmit}
        restaurantId={selectedRestaurantId}
        userId={userId}
      />
    </section>
  );
};

export default ResponsiveCardList;
