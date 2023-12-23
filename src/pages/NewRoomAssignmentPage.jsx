import React, { useState } from 'react';
import handleSubmit from '../functions/handleSubmit';
import { useNavigate } from 'react-router-dom';
import ModalMessages from '../components/ModalMessages';
import RoomListBox from '../components/RoomListBox';
import OccupantListBox from '../components/OccupantListBox';
import PaymentFrequencyListBox from '../components/PaymentFrequencyListBox';

export default function RoomAssignmentPage() {
  const navigate = useNavigate();
  // Get the token from local storage
  const token = localStorage.getItem('userToken');

  //initialis visibility of the modal messages
  const [isModalOpen, setIsModalOpen] = useState(false);

  // initialise the message displayed in the modal
  const [modalMessage, setModalMessage] = useState('');

  // initialise the status of the selected room, occupant and payment frequency
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedOccupant, setSelectedOccupant] = useState(null);
  const [frequencySelected, setFrequencySelected] = useState('');

  // initialise the rent inclution field
  const [rentInclusions, setRentInclusions] = useState('');

  // Handle changes on the rent inclusion input
  const handleRentInclusionsChange = (event) => {
    setRentInclusions(event.target.value);
  };

  // function to handle the occupant and room selection
  const handleOccupantSelect = (occupant) => {
    setSelectedOccupant(occupant);
  };
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  // Function to send the post request through handle submit function
  const handleCreateRoom = (data) => {
    handleSubmit(
      'https://sub-club-ce3cc207c2f9.herokuapp.com/room-assignments',
      data,
      (responseData) => {
        // set the message to display in the modal
        setModalMessage(responseData.message);
        setIsModalOpen(true);

        // navigate to the rooms page after a delay only if the request was successful
        setTimeout(() => {
          navigate('/room-assignments', {
            state: { isNewRoomAssignmentAdded: true },
          });
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
        {/* Button to create new room assignment */}
        <div className='flex flex-col mt-2 m:mx-auto sm:w-full'>
          <h2 className='mt-10  text-left text-xl font-bold leading-9 tracking-tight text-lightPrimary'>
            Add new room assignment
          </h2>
        </div>

        {/* Display form  and get data to be send to the post request*/}
        <div className='flex flex-col mt-10 sm:mx-auto sm:w-full mb-20'>
          <form
            className='space-y-6 w-full'
            action='#'
            method='POST'
            onSubmit={(event) => {
              event.preventDefault();

              const room = selectedRoom;
              const occupant = selectedOccupant._id;
              const startDate = event.target.elements.startDate.value;
              const endDate = event.target.elements.endDate.value;
              const securityDeposit =
                event.target.elements.securityDeposit.value;
              const rentInclusionsList = rentInclusions
                .split(/[\n,]+/)
                .map((item) => item.trim())
                .filter((item) => item);
              const rentalPayment = event.target.elements.rentalPayment.value;
              const frequency = frequencySelected;

              handleCreateRoom({
                room,
                occupant,
                startDate,
                endDate,
                rentInclusions: rentInclusionsList,
                rentalPayment,
                rentalPaymentFrequency: frequency,
                securityDeposit,
              });
            }}
          >
            <div className='flex flex-wrap justify-between w-full'>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='room' className='label-field'>
                  Room
                </label>
                <div className='mt-2 relative z-10'>
                  <RoomListBox onRoomSelect={handleRoomSelect} />
                </div>
              </div>

              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='occupant' className='label-field'>
                  Occupant
                </label>
                <div className='mt-2 relative z-0'>
                  <OccupantListBox onOccupantSelect={handleOccupantSelect} />
                </div>
              </div>

              <h2 className='w-full mt-10  text-left text-md font-bold leading-9 tracking-tight text-lightPrimary border-b-2 border-gray-300'>
                Rental Agreement
              </h2>

              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='startDate' className='label-field'>
                  Initial date
                </label>
                <div className='mt-2'>
                  <input
                    id='startDate'
                    name='startDate'
                    type='date'
                    autoComplete='startDate'
                    required
                    className='input-field'
                  />
                </div>
              </div>

              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='endDate' className='label-field'>
                  End date
                </label>
                <div className='mt-2'>
                  <input
                    id='endDate'
                    name='endDate'
                    type='date'
                    autoComplete='endDate'
                    required
                    className='input-field'
                  />
                </div>
              </div>

              <div className='w-full p-2'>
                <label htmlFor='rentInclusions' className='label-field'>
                  What does this rent include?
                </label>
                <div className='mt-2'>
                  <textarea
                    id='rentInclusions'
                    name='rentInclusions'
                    autoComplete='rentInclusions'
                    required
                    className='input-field h-24'
                    value={rentInclusions}
                    onChange={handleRentInclusionsChange}
                  />
                </div>
              </div>

              <div className='w-full sm:w-1/2 p-2 relative'>
                <label htmlFor='rentalPayment' className='label-field'>
                  Payment
                </label>
                <div className='mt-2'>
                  <input
                    id='rentalPayment'
                    name='rentalPayment'
                    type='text'
                    autoComplete='rentalPayment'
                    required
                    className='input-field pl-4'
                  />
                </div>
              </div>

              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='rentalPaymentFrequency' className='label-field'>
                  Payment Frequency
                </label>
                <div className='mt-2'>
                  <PaymentFrequencyListBox
                    value={frequencySelected}
                    onChange={(value) =>
                      setFrequencySelected(value.frequency.toLowerCase())
                    }
                  />
                </div>
              </div>

              <div className='w-full p-2'>
                <label htmlFor='securityDeposit' className='label-field'>
                  Security Deposit
                </label>
                <div className='mt-2'>
                  <input
                    id='securityDeposit'
                    name='securityDeposit'
                    type='text'
                    autoComplete='securityDeposit'
                    required
                    className='input-field pl-4'
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-center align-middle '>
              <button type='submit' className='button w-1/2 justify-center'>
                Create Room
              </button>
            </div>
          </form>
        </div>
        {/* Componet that handle error or success messages*/}
        <ModalMessages
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
