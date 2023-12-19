import { useLocation, Outlet, useMatch, useNavigate } from 'react-router-dom';
import useFetch from '../functions/useFetch';
import { AiOutlinePlus } from 'react-icons/ai';

export default function RoomsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch data from the backend
  const { data, error, isLoading, refetch } = useFetch(
    'https://sub-club-ce3cc207c2f9.herokuapp.com/rooms'
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className='text-left text-3xl font-bold leading-9 tracking-tight text-gray-900'>
        Rooms
      </h1>
      {location.pathname !== '/rooms/add-room' ? (
        <>
          <div className='flex justify-end w-full'>
            <button
              className='button items-center'
              onClick={() => navigate('/rooms/add-room')}
            >
              <AiOutlinePlus className='mr-2' />
              Add Room
            </button>
          </div>
          {data &&
            data.data.map((room) => (
              <div
                className=' bg-white p-6 rounded-lg shadow-lg m-8'
                key={room.id}
              >
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
              </div>
            ))}
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
