import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirmation</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-purple-950 bg-gradient-to-t from-red-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
