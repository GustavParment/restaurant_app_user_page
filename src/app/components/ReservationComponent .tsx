import React, { useState } from 'react';

interface ReservationComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reservationData: { restaurantId: string; userId: string; reservationDate: string; guests: number }) => void;
  restaurantId: string | null;
  userId: string;
}

const ReservationComponent: React.FC<ReservationComponentProps> = ({
  isOpen,
  onClose,
  onSubmit,
  restaurantId,
  userId,
}) => {
  const [reservationDate, setReservationDate] = useState<string>('');
  const [guests, setGuests] = useState<number>(1);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!restaurantId) return;

    onSubmit({
      restaurantId,
      userId,
      reservationDate: new Date(reservationDate).toISOString(), 
      guests,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Book a Reservation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="datetime-local" // Ensure proper date and time format
              id="date"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guests">
              Number of Guests
            </label>
            <input
              type="number"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              min={1}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-purple-950 bg-gradient-to-t from-red-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationComponent;
