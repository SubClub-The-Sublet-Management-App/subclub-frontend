import { useState } from 'react';
import ModalMessages from './ModalMessages';
import { FaTrash } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

export default function DeleteRoom({ id, refetch }) {
  // include token as a prop
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const token = localStorage.getItem('userToken');

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://sub-club-ce3cc207c2f9.herokuapp.com/rooms/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete room');
      }
      setModalMessage('Room deleted successfully');
      setIsModalOpen(true);
      refetch();
    } catch (error) {
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mx-4'>
      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? (
          <ClipLoader color='#7E49F2' size={15} />
        ) : (
          <FaTrash className='text-lightPrimary h-6 align-middle self-center m-0' />
        )}
      </button>
      <ModalMessages
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
