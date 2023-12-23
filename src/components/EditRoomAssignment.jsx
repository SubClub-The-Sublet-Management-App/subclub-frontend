import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import handleSubmit from '../functions/handleSubmit';
import ModalMessages from './ModalMessages';
import RoomListBox from './RoomListBox';
import OccupantListBox from './OccupantListBox';
import PaymentFrequencyListBox from './PaymentFrequencyListBox';
import formattedDateForBackend from '../functions/formatDOB';

export default function EditRoomAssignment({
  roomAssignment,
  refetch,
  setIsEditing,
  setEditedRoomAssignment,
  setIsRoomAssignmentDataVisible,
}) {
  // To navigate back to the '/roomAssigments' page
  const navigate = useNavigate();

  // Get user auth to send patch request
  const token = localStorage.getItem('userToken');

  // To handle successfull and error messages to user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // initialise the status of the selected room, occupant and payment frequency
  const [selectedRoom, setSelectedRoom] = useState(roomAssignment.room._id);
  const [selectedOccupant, setSelectedOccupant] = useState(
    roomAssignment.occupant._id
  );
  const [frequencySelected, setFrequencySelected] = useState(
    roomAssignment.rentalPaymentFrequency
  );

  // function to handle the occupant and room selection
  const handleOccupantSelect = (occupant) => {
    setSelectedOccupant(occupant);
  };
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  // Handle changes on the rent inclusion input
  const handleRentInclusionsChange = (event) => {
    setRentInclusions(event.target.value);
  };

  // Get the data from room assignment page
  const [room] = useState(roomAssignment.room);
  const [occupant] = useState(roomAssignment.occupant);
  const [startDate, setStartDate] = useState(
    formattedDateForBackend(roomAssignment.startDate)
  );
  const [endDate, setEndDate] = useState(
    formattedDateForBackend(roomAssignment.endDate)
  );
  const [securityDeposit, setSecurityDeposit] = useState(
    roomAssignment.securityDeposit
  );
  const [rentInclusions, setRentInclusions] = useState(
    roomAssignment.rentInclusions
  );
  const [rentalPayment, setRentalPayment] = useState(
    roomAssignment.rentalPayment
  );
  const [rentalPaymentFrequency] = useState(roomAssignment.rentalPaymentFrequency);

  // Check if input field has change otherwise keep current information
  const handleUpdateRoomAssignment = () => {
    let rentInclusionsList = [];
    if (typeof rentInclusions === 'string') {
      rentInclusionsList = rentInclusions
        .split(/[\n,]+/)
        .map((item) => item.trim())
        .filter((item) => item);
    }

    const data = {
      room: selectedRoom ? selectedRoom : roomAssignment.room._id,
      occupant: selectedOccupant
        ? selectedOccupant._id
        : roomAssignment.occupant._id,
      startDate,
      endDate,
      rentInclusions: rentInclusionsList,
      rentalPayment,
      rentalPaymentFrequency: frequencySelected,
      securityDeposit,
    };

    handleSubmit(
      `https://sub-club-ce3cc207c2f9.herokuapp.com/room-assignments/${roomAssignment._id}`,
      data,
      (responseData) => {
        setModalMessage(responseData.message);
        setIsModalOpen(true);
        setTimeout(() => {
          navigate('/room-assignments');
        }, 2000);
        refetch();
        setIsEditing(false);
        setEditedRoomAssignment(null);
        setIsRoomAssignmentDataVisible(true);
      },
      (errorData) => {
        setModalMessage(errorData.message);
        setIsModalOpen(true);
      },
      token,
      'PATCH'
    );
    console.log(data);
    console.log('room asisgnment id:', roomAssignment._id);

  };

  return (
    <div>
      <h2 className='mt-10  text-left text-xl font-bold leading-9 tracking-tight text-lightPrimary'>
        Update room assignment
      </h2>
      <div className='flex flex-col '>
        <div className='flex flex-col mt-10 sm:mx-auto sm:w-full mb-20'>
          <form
            className='space-y-6 w-full'
            action='#'
            method='PATCH'
            onSubmit={(event) => {
              event.preventDefault();
              handleUpdateRoomAssignment();
            }}
          >
            <div className='flex flex-wrap justify-between w-full'>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='room' className='label-field'>
                  Room
                </label>
                <div className='mt-2'>
                  <div className='mt-2 relative z-10'>
                    <RoomListBox value={room} onRoomSelect={handleRoomSelect} />
                  </div>
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='lastName' className='label-field'>
                  Occupant
                </label>
                <div className='mt-2'>
                  <div className='mt-2 relative z-0'>
                    <OccupantListBox
                      value={occupant}
                      onOccupantSelect={handleOccupantSelect}
                    />
                  </div>
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='startDate' className='label-field'>
                  Start Date
                </label>
                <div className='mt-2'>
                  <input
                    id='startDate'
                    name='startDate'
                    type='date'
                    autoComplete='startDate'
                    required
                    className='input-field'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='endDate' className='label-field'>
                  End Date
                </label>
                <div className='mt-2'>
                  <input
                    id='endDate'
                    name='endDate'
                    type='date'
                    autoComplete='endDate'
                    required
                    className='input-field'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full p-2'>
                <label htmlFor='referenceFirstName' className='label-field'>
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
              <div className='w-full sm:w-1/2 p-2'>
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
                    className='input-field'
                    value={rentalPayment}
                    onChange={(e) => setRentalPayment(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='rentalPaymentFrequency' className='label-field'>
                  Payment Frequency
                </label>
                <div className='mt-2'>
                  <PaymentFrequencyListBox
                    value={rentalPaymentFrequency}
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
                    type='number'
                    autoComplete='securityDeposit'
                    required
                    className='input-field'
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(e.target.value)}
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
