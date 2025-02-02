import { Key, useEffect, useState } from "react";
import { apiService } from "@/service/apiService";
import { IRestaurant } from "../types/IRestaurant";
import { IReservation } from "../types/IReservation";

const DeleteModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">Do you really want to delete this reservation? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ReservationsPage = () => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [expandedReservationId, setExpandedReservationId] = useState<string | null>(null);
  const [reservationDetails, setReservationDetails] = useState<Record<string, IRestaurant>>({});
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [reservationToDelete, setReservationToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndReservations = async () => {
      try {
        const user = await apiService.get<{ id: string }>("/auth/current-user");
        setUserId(user.id);

        const fetchedReservations = await apiService.get<IReservation[]>(`/reservation/all/${user.id}`);
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

  const handleDelete = async () => {
    if (!reservationToDelete) return;

    try {
      await apiService.delete(`/reservation/delete/${reservationToDelete}`);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== reservationToDelete)
      );
      setDeleteModalOpen(false);
      setReservationToDelete(null);
    } catch (err) {
      console.error("Failed to delete reservation:", err);
      setError("Failed to delete reservation.");
    }
  };

  const handleOpenDeleteModal = (reservationId: string) => {
    setReservationToDelete(reservationId);
    setDeleteModalOpen(true);
  };

  const handleViewDetails = async (reservationId: string, restaurantId: string) => {
    if (expandedReservationId === reservationId) {
      // Collapse if already expanded
      setExpandedReservationId(null);
      return;
    }

    if (!reservationDetails[reservationId]) {
      // Fetch details only if not already loaded
      try {
        const details = await apiService.get<IRestaurant>(`/restaurant/${restaurantId}`);
        setReservationDetails((prevDetails) => ({
          ...prevDetails,
          [reservationId]: details,
        }));
      } catch (error) {
        console.error("Failed to fetch restaurant details:", error);
      }
    }

    setExpandedReservationId(reservationId);
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
      <h1 className="text-2xl font-bold mb-6 mt-3">Your Reservations</h1>
      {reservationsWithRestaurantNames.length === 0 ? (
        <p>No reservations available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reservationsWithRestaurantNames.map((reservation) => (
            <div key={reservation.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{reservation.restaurantName}</h2>
                <p className="text-gray-600 text-sm mt-1">
                  <strong>Date:</strong> {new Date(reservation.reservationDate).toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  <strong>Guests:</strong> {reservation.guests}
                </p>
              </div>
              <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                <button
                  className="text-sm text-purple-600 hover:underline"
                  onClick={() => handleViewDetails(reservation.id, reservation.restaurantId)}
                >
                  {expandedReservationId === reservation.id ? "Hide Details" : "View Details"}
                </button>
                <button
                  className="text-sm text-red-600 hover:underline"
                  onClick={() => handleOpenDeleteModal(reservation.id)}
                >
                  Delete
                </button>
              </div>
              {expandedReservationId === reservation.id && reservationDetails[reservation.id] && (
                <div className="p-4 bg-gray-50">
                  <p>
                    <strong>Contact:</strong> {reservationDetails[reservation.id].phone || "N/A"}
                  </p>
                  <p>
                    <strong>Description:</strong> {reservationDetails[reservation.id].description}
                  </p>
                  <p>
                    <strong>Rating:</strong> {reservationDetails[reservation.id].rating || "N/A"}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ReservationsPage;
