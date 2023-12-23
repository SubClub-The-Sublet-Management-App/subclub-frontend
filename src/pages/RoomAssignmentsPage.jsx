import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import useFetch from '../functions/useFetch';
import { AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import EditRoomAssignment from '../components/EditRoomAssignment';
import CancelRoomAssignment from '../components/CancelRoomAssignment';
import formatDate from '../functions/formatDate';

export default function RoomAssignmentPage() {
  // Get location to navigate to "add-room assignment" page when click button: "add room assignment"
  const location = useLocation();
  const navigate = useNavigate();

  // If new room assignent is added go back to "/room-assigments"
  useEffect(() => {
    if (location.state?.isNewRoomAssignmentAdded) {
      setIsNewRoomAssignmentAdded(true);
    }
  }, [location]);

  // Fetch room assignments
  const {
    data: roomAssignments,
    isLoading,
    error,
    refetch,
  } = useFetch('https://sub-club-ce3cc207c2f9.herokuapp.com/room-assignments');

  // If room assignment is added refetch to get changes on "/room-assignments"
  const [isNewRoomAssignmentAdded, setIsNewRoomAssignmentAdded] =
    useState(false);

  useEffect(() => {
    if (isNewRoomAssignmentAdded) {
      refetch();
      setIsNewRoomAssignmentAdded(false);
    }
  }, [isNewRoomAssignmentAdded, refetch]);

  // Handle room assignment views
  const [views, setViews] = useState({});
  const setRoomAssignmentView = (id, newView) => {
    setViews((prevViews) => ({ ...prevViews, [id]: newView }));
  };

  // Hide data from the get request when occupants is being updating
  const [isRoomAssignmentDataVisible, setIsRoomAssignmentDataVisible] =
    useState(true);

  // Set the state for edit Occupant
  const [isEditing, setIsEditing] = useState(false);
  const [editedRoomAssignment, setEditedRoomAssignment] = useState(null);

  // Loading handling
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <ClipLoader color='#8F82F8' size={150} />
      </div>
    );
  }
  // Error handling
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className='m-2 py-2 text-left text-3xl font-bold leading-9 tracking-tight text-gray-900 border-b-2 border-gray-300'>
        Room Assignments
      </h1>
      {location.pathname !== '/room-assignments/add-room-assignment' ? (
        <>
          {/* Button to navigate to add occupants page */}
          <div className='py-2 flex justify-end w-full'>
            <button
              className='button items-center'
              onClick={() => navigate('/room-assignments/add-room-assignment')}
            >
              <AiOutlinePlus className='mr-2' />
              Assign Room
            </button>
          </div>

          {/* Display room assignment information*/}
          <div className='flex flex-wrap justify-center'>
            {roomAssignments &&
              roomAssignments.data.map((roomAssignment) => {
                if (!views[roomAssignment._id]) {
                  setViews((prevViews) => ({
                    ...prevViews,
                    [roomAssignment._id]: 'assignment',
                  }));
                }
                // Show th update roomAssignment form component when click the edit button
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
                        setIsRoomAssignmentDataVisible={
                          setIsRoomAssignmentDataVisible
                        }
                      />
                    ) : (
                      <>
                        {/* Handle the view of the card, Show room assignment information  */}
                        {views[roomAssignment._id] === 'assignment' && (
                          <div className='p-8 w-300 h-400'>
                            <div className='w-full flex justify-between align-middle'>
                              <h2 className='text-2xl font-bold mb-2 text-lightPrimary uppercase'>
                                {roomAssignment.room &&
                                  roomAssignment.room.name}
                              </h2>
                              {/* Edit room assignment button */}
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
                            {/* Show "anonymous occupant if occupant gets deleted" */}
                            <p className='text-sm font-normal  text-lightSecondary my-2'>
                              Room occupant:
                            </p>
                            <p className='text-md font-bold text-lightSecondary'>
                              {roomAssignment.occupant &&
                              roomAssignment.occupant.firstName &&
                              roomAssignment.occupant.lastName
                                ? `${roomAssignment.occupant.firstName} ${roomAssignment.occupant.lastName}`
                                : 'Anonymous Occupant'}
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
                            <p className='text-sm font-normal  text-lightSecondary my-2'>
                              Assignment status:
                            </p>
                            <p
                              className={`text-md font-bold ${
                                roomAssignment.isActive
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }`}
                            >
                              {roomAssignment.isActive ? 'Active' : 'Cancelled'}
                            </p>
                          </div>
                        )}

                        {/* Show Room Assignment payment agreement */}
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
                                $ {roomAssignment.rentalPayment}{' '}
                                <span>AUD</span>
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
                                $ {roomAssignment.securityDeposit}{' '}
                                <span>AUD</span>
                              </p>
                            </div>
                          </div>
                        )}
                        {/* Buttons section */}
                        <div className='flex items-center  px-8 py-2 bg-gray-100 border-t border-gray-200'>
                          <div className='flex justify-between gap-3 mx-2'>
                            {/* Button to handle the state of the card view */}
                            <button
                              onClick={() =>
                                setRoomAssignmentView(
                                  roomAssignment._id,
                                  'assignment'
                                )
                              }
                              className='button'
                            >
                              Assignment
                            </button>
                            <button
                              onClick={() =>
                                setRoomAssignmentView(
                                  roomAssignment._id,
                                  'contacts'
                                )
                              }
                              className='button'
                            >
                              Agreement
                            </button>
                            {/* Component to handle the deletion of the roomAssignment */}
                            <CancelRoomAssignment
                              roomAssignmentId={roomAssignment._id}
                              refetch={refetch}
                              isDisabled={!roomAssignment.isActive}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : null;
              })}
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
