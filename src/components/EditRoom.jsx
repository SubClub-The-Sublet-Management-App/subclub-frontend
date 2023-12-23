import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import handleSubmit from '../functions/handleSubmit';
import ModalMessages from './ModalMessages';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
export default function EditRoom({
  room,
  refetch,
  setIsEditing,
  setEditedRoom,
  setIsRoomDataVisible,
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken'); // Get the token from local storage

  const [isModalOpen, setIsModalOpen] = useState(false); // control the visibility of the modal messages
  const [modalMessage, setModalMessage] = useState(''); // control the message displayed in the modal

  // Get the data from Rooms page
  const [name, setName] = useState(room.name);
  const [monthlyRentalPrice, setMonthlyRentalPrice] = useState(
    room.monthlyRentalPrice
  );
  const [description, setDescription] = useState(room.description);
  const [content, setContent] = useState(room.content);

  const handleUpdateRoom = () => {
    const data = {};

    // Check if input field has change
    if (room.name !== name) data.name = name;
    if (room.monthlyRentalPrice !== monthlyRentalPrice)
      data.monthlyRentalPrice = monthlyRentalPrice;
    if (room.description !== description) data.description = description;
    if (room.content !== content) data.content = content;

    handleSubmit(
      `${backendUrl}/rooms/${room._id}`,
      data,
      (responseData) => {
        setModalMessage(responseData.message); // set the message to display in the modal
        setIsModalOpen(true); // open the modal

        // navigate to the rooms page after a delay
        setTimeout(() => {
          navigate('/rooms');
        }, 2000);
        refetch(); // refetch the room data
        setIsEditing(false); // hide the EditRoom component
        setEditedRoom(null); // reset the edited room
        setIsRoomDataVisible(true); // show the room data
      },
      // send messages with Modal if there is any error
      (errorData) => {
        setModalMessage(errorData.message);
        setIsModalOpen(true);
      },
      token,
      'PATCH'
    );
  };

  return (
    <div>
      <h2 className='mt-10  text-left text-xl font-bold leading-9 tracking-tight text-lightPrimary'>
        Update Room
      </h2>
      <div className='flex flex-col '>
        <div className='flex flex-col mt-10 sm:mx-auto sm:w-full mb-20'>
          <form
            className='space-y-6 w-full'
            action='#'
            method='PATCH'
            onSubmit={(event) => {
              event.preventDefault();
              handleUpdateRoom();
            }}
          >
            <div className='flex flex-wrap justify-between w-full'>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='name' className='label-field'>
                  Give your room a name
                </label>
                <div className='mt-2'>
                  <input
                    id='name'
                    name='name'
                    type='name'
                    autoComplete='name'
                    required
                    className='input-field'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='monthlyRentalPrice' className='label-field'>
                  How much will this room cost per month?
                </label>
                <div className='mt-2'>
                  <input
                    id='monthlyRentalPrice'
                    name='monthlyRentalPrice'
                    type='monthlyRentalPrice'
                    autoComplete='monthlyRentalPrice'
                    required
                    className='input-field'
                    value={monthlyRentalPrice}
                    onChange={(e) => setMonthlyRentalPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full p-2'>
                <label htmlFor='description' className='label-field'>
                  What is the best thing about your room?
                </label>
                <div className='mt-2'>
                  <input
                    id='description'
                    name='description'
                    type='description'
                    autoComplete='description'
                    required
                    className='input-field'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full p-2'>
                <label htmlFor='content' className='label-field'>
                  What things come with the room?
                </label>
                <div className='mt-2 list-disc list-inside h-10'>
                  <input
                    id='content'
                    name='content'
                    type='content'
                    autoComplete='content'
                    required
                    className='input-field'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-center align-middle '>
              <button type='submit' className='button w-1/2 justify-center'>
                Update
              </button>
            </div>
          </form>
        </div>
        <ModalMessages
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
