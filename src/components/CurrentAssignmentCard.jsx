import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import EditRoomAssignment from '../components/EditRoomAssignment';
import CancelRoomAssignment from '../components/CancelRoomAssignment';
import formatDate from '../functions/formatDate';

const CurrentRoomAssignmentCard = ({
  roomAssignment,
  isEditing,
  setIsEditing,
  editedRoomAssignment,
  setEditedRoomAssignment,
  setIsRoomAssignmentDataVisible,
  isRoomAssignmentDataVisible,
  views,
  setRoomAssignmentView,
  refetch,
}) => {
    // If the roomAssignment._id is not in the views object, add it with a default value of 'assignment'
  if (!views[roomAssignment._id]) {
    setRoomAssignmentView((prevViews) => ({
      ...prevViews,
      [roomAssignment._id]: 'assignment',
    }));
  }
// The component will render if isRoomAssignmentDataVisible is true or if the roomAssignment is currently being edited
  return isRoomAssignmentDataVisible ||
    (isEditing && editedRoomAssignment === roomAssignment) ? (
    <div
      className=' bg-gray-100 p-6 rounded-lg shadow-lg m-8 w-300 h-400'
      key={roomAssignment._id}
    >
      {isEditing && editedRoomAssignment === roomAssignment ? (
        <EditRoomAssignment
          roomAssignment={editedRoomAssignment}
          refetch={refetch}
          setIsEditing={setIsEditing}
          setEditedRoomAssignment={setEditedRoomAssignment}
          setIsRoomAssignmentDataVisible={setIsRoomAssignmentDataVisible}
        />
      ) : (
        <>
          {/* Handle the view of the card show roomAssignment personal information when click the "assignment" button  */}
          {views[roomAssignment._id] === 'assignment' && (
            <div className='p-8 w-300 h-400'>
              <div className='w-full flex justify-between align-middle'>
                <h2 className='text-2xl font-bold mb-2 text-lightPrimary uppercase'>
                  {roomAssignment.room.name}
                </h2>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditedRoomAssignment(roomAssignment);
                    setIsRoomAssignmentDataVisible(false);
                  }}
                  className='self-center mb-4'
                >
                  <AiOutlineEdit className='text-lightPrimary w-6 h-6' />
                </button>
              </div>
{/* Display the occupant's name and the start and end dates of the room assignment */}
              <p className='text-sm font-normal  text-lightSecondary my-2'>
                Room occupant:
              </p>
              <p className='text-md font-bold text-lightSecondary'>
                {roomAssignment.occupant &&
                roomAssignment.occupant.firstName &&
                roomAssignment.occupant.lastName
                  ? `${roomAssignment.occupant.firstName} ${roomAssignment.occupant.lastName}`
                  : 'Deleted occupant'}
              </p>
              <p className='text-sm font-normal  text-lightSecondary my-2'>
                Rent start from:
              </p>
              <p className='text-md font-bold text-lightSecondary'>
                {formatDate(roomAssignment.startDate)}
              </p>
              <p className='text-sm font-normal  text-lightSecondary my-2'>
                Rent end on:
              </p>
              <p className='text-md font-bold text-lightSecondary'>
                {formatDate(roomAssignment.endDate)}
              </p>
            </div>
          )}
          {/* Handle the view of the card show roomAssignment Contacts when click the "Contacts" button  */}
          {views[roomAssignment._id] === 'contacts' && (
            <div className='p-8 w-300 h-500'>
              <div className='flex flex-col items-start text-lightSecondary'>
                <h2 className='text-2xl font-bold mb-2 text-lightPrimary uppercase'>
                  Payment Agreement
                </h2>
                <p className='text-sm font-normal  text-lightSecondary mt-2 my-2'>
                  Rental payment:
                </p>
                <p className='text-md font-bold text-lightSecondary'>
                  $ {roomAssignment.rentalPayment} <span>AUD</span>
                </p>
                <p className='text-sm font-normal  text-lightSecondary mt-2 my-2'>
                  Payment frequency:
                </p>
                <p className='text-md font-bold text-lightSecondary'>
                  {roomAssignment.rentalPaymentFrequency}
                </p>
                <p className='text-sm font-normal  text-lightSecondary mt-2 my-2'>
                  Security Deposit paid:
                </p>
                <p className='text-md font-bold text-lightSecondary'>
                  $ {roomAssignment.securityDeposit} <span>AUD</span>
                </p>
              </div>
            </div>
          )}
          <div className='flex items-center px-8 py-2 bg-gray-100 border-t border-gray-200'>
            <div className='flex justify-between w-2/3 mx-2'>
              {/* Button to handle the state of the card view */}
              <button
                onClick={() =>
                  setRoomAssignmentView(roomAssignment._id, 'assignment')
                }
                className='px-2 mx-2  text-sm font-semibold text-white bg-primary rounded hover:bg-lightPrimary'
              >
                Assignment
              </button>
              <button
                onClick={() =>
                  setRoomAssignmentView(roomAssignment._id, 'contacts')
                }
                className='px-2 mx-2 py-2 text-sm font-semibold text-white bg-primary rounded hover:bg-lightPrimary'
              >
                Agreement
              </button>
            </div>
            {/* Component to handle the deletion of the roomAssignment */}
            <div className='mx-4 flex justify-center h-12 w-12'>
              <CancelRoomAssignment id={roomAssignment._id} refetch={refetch} />
            </div>
          </div>
        </>
      )}
    </div>
  ) : null;
};

export default CurrentRoomAssignmentCard;
