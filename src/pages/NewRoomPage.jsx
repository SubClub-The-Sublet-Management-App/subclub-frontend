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
                  className='block text-sm font-medium leading-6 text-gray-900'
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
                    className='px-2 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label
                  htmlFor='monthlyRentalPrice'
                  className='block text-sm font-medium leading-6 text-gray-900'
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
                    className='px-2 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='w-full p-2'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium leading-6 text-gray-900'
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
                    className='px-2 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='w-full p-2'>
                <label
                  htmlFor='content'
                  className='block text-sm font-medium leading-6 text-gray-900'
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
                    className='px-2 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-center align-middle '>
              <button
                type='submit'
                className='flex w-1/2 justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
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
