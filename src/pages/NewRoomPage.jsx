import React, { useState } from 'react';
import handleSubmit from '../functions/handleSubmit';
import { useNavigate } from 'react-router-dom';
import ModalMessages from '../components/ModalMessages';

export default function NewRoomPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken'); // Get the token from local storage

  const [isModalOpen, setIsModalOpen] = useState(false); // control the visibility of the modal messages
  const [modalMessage, setModalMessage] = useState(''); // control the message displayed in the modal

  const handleSignUp = (data) => {
    handleSubmit(
      'https://sub-club-ce3cc207c2f9.herokuapp.com/rooms',
      data,
      (responseData) => {
        setModalMessage(responseData.message); // set the message to display in the modal
        setIsModalOpen(true); // open the modal

        // navigate to the login page after a delay
        setTimeout(() => {
          navigate('/rooms');
        }, 2000);
      },
      // send messages with Modal if there is any error
      (errorData) => {
        setModalMessage(errorData.message);
        setIsModalOpen(true);
      },
      token
    );
  };
  return (
    <div>
      <div className='flex flex-col '>
        <div className='flex flex-col mt-2 m:mx-auto sm:w-full'>
          <h2 className='mt-10  text-left text-xl font-bold leading-9 tracking-tight text-lightPrimary'>
            Add new room
          </h2>
        </div>
        <div className='flex flex-col mt-10 sm:mx-auto sm:w-full mb-20'>
          <form
            className='space-y-6 w-full'
            action='#'
            method='POST'
            onSubmit={(event) => {
              event.preventDefault();

              const name = event.target.elements.name.value;
              const monthlyRentalPrice =
                event.target.elements.monthlyRentalPrice.value;
              const description = event.target.elements.description.value;
              const content = event.target.elements.content.value;

              handleSignUp({ name, monthlyRentalPrice, description, content });
            }}
          >
            <div className='flex flex-wrap justify-between w-full'>
              <div className='w-full sm:w-1/2 p-2'>
                <label
                  htmlFor='name'
                  className='label-field'
                >
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
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label
                  htmlFor='monthlyRentalPrice'
                  className='label-field'
                >
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
                  />
                </div>
              </div>
              <div className='w-full p-2'>
                <label
                  htmlFor='description'
                  className='label-field'
                >
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
                  />
                </div>
              </div>
              <div className='w-full p-2'>
                <label
                  htmlFor='content'
                  className='label-field'
                >
                  What things come with the room?
                </label>
                <div className='mt-2'>
                  <input
                    id='content'
                    name='content'
                    type='content'
                    autoComplete='content'
                    required
                    className='input-field'
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-center align-middle '>
              <button
                type='submit'
                className='button w-1/2 justify-center'
              >
                Create Room
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
