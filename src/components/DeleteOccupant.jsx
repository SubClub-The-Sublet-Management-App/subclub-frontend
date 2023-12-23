import { useState, useEffect } from 'react';
import ModalMessages from './ModalMessages';
import { FaTrash } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function DeleteOccupant({ id, refetch }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const token = localStorage.getItem('userToken');

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmOpen(false);
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/occupants/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete occupant');
      }
      const responseData = await response.json();
      setModalMessage(responseData.message || 'Occupant deleted successfully');
      setIsModalOpen(true);
    } catch (error) {
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
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
    <div className='mx-4'>
      <button
        className='flex h-7 w-7 align-middle mt-2'
        onClick={handleDelete}
        disabled={isLoading}
      >
        {isLoading ? (
          <ClipLoader color='#7E49F2' size={15} />
        ) : (
          <FaTrash className='text-lightPrimary h-full m-0 w-full hover:text-red-600' />
        )}
      </button>
      <ModalMessages
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        message='Are you sure you want to delete this occupant?'
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
