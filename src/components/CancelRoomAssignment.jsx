import React, { useState, useEffect } from 'react';
import handleSubmit from '../functions/handleSubmit';
import ModalMessages from '../components/ModalMessages';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

export default function CancelRoomAssignment({ roomAssignmentId, refetch }) {
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleCancel = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    const token = localStorage.getItem('userToken');
    const data = { isActive: false };

    handleSubmit(
      `https://sub-club-ce3cc207c2f9.herokuapp.com/room-assignments/${roomAssignmentId}`,
      data,
      (responseData) => {
        setModalMessage(responseData.message);
        setIsModalOpen(true);
      },
      (errorData) => {
        setModalMessage(errorData.message);
        setIsModalOpen(true);
      },
      token,
      'PATCH'
    );
    setIsConfirmOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        refetch();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, refetch]);

  return (
    <div>
      <button className='flex rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ' onClick={handleCancel}>Cancel</button>
      <ModalMessages
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        message="Are you sure you want to cancel this room assignment?"
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmCancel}
        noActionText="No, go back"
        actionText="Yes, cancel it"
      />
    </div>
  );
}