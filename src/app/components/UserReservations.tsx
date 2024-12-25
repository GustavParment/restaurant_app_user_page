import { useEffect, useState } from "react";
import { apiService } from "@/service/apiService";
import { IRestaurant } from "../types/IRestaurant";
import { IReservation } from "../types/IReservation";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndReservations = async () => {
      try {
        const user = await apiService.get<{ id: string }>("/auth/current-user");
        setUserId(user.id);

        const fetchedReservations = await apiService.get<IReservation[]>(
          `/reservation/all/${user.id}`
        );
        setReservations(fetchedReservations);

        const fetchedRestaurants = await apiService.get<IRestaurant[]>("/restaurant/all");
        setRestaurants(fetchedRestaurants);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch reservations or user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndReservations();
  }, []);

  const handleDelete = async (reservationId: string) => {
    try {
      await apiService.delete(`/reservation/delete/${reservationId}`);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== reservationId)
      );
    } catch (err) {
      console.error("Failed to delete reservation:", err);
      setError("Failed to delete reservation.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const reservationsWithRestaurantNames = reservations.map((reservation) => {
    const restaurant = restaurants.find((r) => r.id === reservation.restaurantId);
    return {
      ...reservation,
      restaurantName: restaurant?.name || "Unknown Restaurant",
    };
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Reservations</h1>
      {reservationsWithRestaurantNames.length === 0 ? (
        <p>No reservations available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reservationsWithRestaurantNames.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {reservation.restaurantName}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  <strong>Date:</strong>{" "}
                  {new Date(reservation.reservationDate).toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  <strong>Guests:</strong> {reservation.guests}
                </p>
              </div>
              <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => console.log(`View reservation ID: ${reservation.id}`)}
                >
                  View Details
                </button>
                <button
                  className="text-sm text-red-600 hover:underline"
                  onClick={() => handleDelete(reservation.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;
