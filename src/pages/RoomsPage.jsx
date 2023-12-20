import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import useFetch from '../functions/useFetch';
import { AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import EditRoom from '../components/EditRoom'; // import the EditRoom component

export default function RoomsPage() {
  // Get location to navigate to "add-room" page
  const location = useLocation();
  const navigate = useNavigate();
  const [isNewRoomAdded, setIsNewRoomAdded] = useState(false);
  const { data: rooms, isLoading, error, refetch } = useFetch('https://sub-club-ce3cc207c2f9.herokuapp.com/rooms');

  useEffect(() => {
    if (location.state?.isNewRoomAdded) {
      setIsNewRoomAdded(true);
    }
  }, [location]);

  useEffect(() => {
    if (isNewRoomAdded) {
      refetch();
      setIsNewRoomAdded(false);
    }
  }, [isNewRoomAdded, refetch]);
  
  // To hide data from the get request when rooms is being updating
  const [setIsRoomDataVisible] = useState(true);

  // Set the state for edit room
  const [isEditing, setIsEditing] = useState(false);
  const [editedRoom, setEditedRoom] = useState(null);

  // Loading handling
  if (isLoading) return <div>Loading...</div>;
  // Error handling
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className='m-2 py-2 text-left text-3xl font-bold leading-9 tracking-tight text-gray-900 border-b-2 border-gray-300'>
        Rooms
      </h1>
      {location.pathname !== '/rooms/add-room' ? (
        <>
          {/* Button to navigate to add rooms page */}

          <div className='py-2 flex justify-end w-full'>
            <button
              className='button items-center'
              onClick={() => navigate('/rooms/add-room')}
            >
              <AiOutlinePlus className='mr-2' />
              Add Room
            </button>
          </div>
          {/* Display room: name, rental price, description and content */}
          {rooms.data.map((room) => (
            <div
              className=' bg-gray-100 p-6 rounded-lg shadow-lg m-8'
              key={room._id}
            >
              {isEditing && editedRoom === room ? (
                <EditRoom
                  room={editedRoom}
                  refetch={refetch}
                  setIsEditing={setIsEditing}
                  setEditedRoom={setEditedRoom}
                  setIsRoomDataVisible={setIsRoomDataVisible}
                />
              ) : (
                <>
                  <div className='flex flex-col sm:flex-row justify-between w-full p-2'>
                    <h2 className='text-md font-bold text-primary uppercase'>
                      {room.name}
                    </h2>
                    <h2 className='text-md font-bold text-lightPrimary'>
                      $ {room.monthlyRentalPrice} AUD
                    </h2>
                  </div>
                  <p className='p-2 text-sm font-light text-gray-600'>
                    {room.description}
                  </p>
                  <div className='p-2' key={room.id}>
                    <p className='pb-4 text-sm font-semibold  text-gray-600'>
                      What this place offers:
                    </p>
                    <ul className='list-disc list-inside text-sm font-light text-gray-600'>
                      {room.content.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditedRoom(room);
                      setIsRoomDataVisible(false); // hide the room data
                    }}
                    className='w-full flex justify-end'
                  >
                    <AiOutlineEdit className='text-lightPrimary w-6 h-6' />
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
