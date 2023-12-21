import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import useFetch from '../functions/useFetch';
import { AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import EditOccupant from '../components/EditOccupant';
import DeleteOccupant from '../components/DeleteOccupant';
import { ClipLoader } from 'react-spinners';
import calculateAge from '../functions/calculateAge';

export default function OccupantsPage() {
  // Get location to navigate to "add-occupant" page
  const location = useLocation();
  const navigate = useNavigate();
  const [isNewOccupantAdded, setIsNewOccupantAdded] = useState(false);

  const [views, setViews] = useState({});

  const setOccupantView = (id, newView) => {
    setViews((prevViews) => ({ ...prevViews, [id]: newView }));
  };

  const {
    data: occupants,
    isLoading,
    error,
    refetch,
  } = useFetch('https://sub-club-ce3cc207c2f9.herokuapp.com/occupants');

  useEffect(() => {
    if (location.state?.isNewOccupantAdded) {
      setIsNewOccupantAdded(true);
    }
  }, [location]);

  useEffect(() => {
    if (isNewOccupantAdded) {
      refetch();
      setIsNewOccupantAdded(false);
    }
  }, [isNewOccupantAdded, refetch]);

  // To hide data from the get request when occupants is being updating
  const [isOccupantDataVisible, setIsOccupantDataVisible] = useState(true);

  // Set the state for edit Occupant
  const [isEditing, setIsEditing] = useState(false);
  const [editedOccupant, setEditedOccupant] = useState(null);

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
        Occupants
      </h1>
      {location.pathname !== '/occupants/add-occupant' ? (
        <>
          {/* Button to navigate to add occupants page */}
          <div className='py-2 flex justify-end w-full'>
            <button
              className='button items-center'
              onClick={() => navigate('/occupants/add-occupant')}
            >
              <AiOutlinePlus className='mr-2' />
              Add Occupant
            </button>
          </div>
          {/* Display occupant: profile, emergency contact and reference information*/}

          <div className='flex flex-wrap justify-center'>
            {occupants.data.map((occupant) => {
              if (!views[occupant._id]) {
                setViews((prevViews) => ({
                  ...prevViews,
                  [occupant._id]: 'personal',
                }));
              }
              // Show th update occupant form component when click the edit button
              return isOccupantDataVisible ||
                (isEditing && editedOccupant === occupant) ? (
                <div
                  className=' bg-gray-100 p-6 rounded-lg shadow-lg m-8 w-300 h-400'
                  key={occupant._id}
                >
                  {isEditing && editedOccupant === occupant ? (
                    <EditOccupant
                      occupant={editedOccupant}
                      refetch={refetch}
                      setIsEditing={setIsEditing}
                      setEditedOccupant={setEditedOccupant}
                      setIsOccupantDataVisible={setIsOccupantDataVisible}
                    />
                  ) : (
                    <>
                      {/* Handle the view of the card show occupant personal information when click the "Profile" button  */}
                      {views[occupant._id] === 'personal' && (
                        <div className='p-8 w-300 h-400'>
                          <div className='w-full flex justify-between align-middle'>
                            <h2 className='text-2xl font-bold mb-2 text-lightPrimary'>
                              {occupant.firstName} {occupant.lastName}
                            </h2>
                            <button
                              onClick={() => {
                                setIsEditing(true);
                                setEditedOccupant(occupant);
                                setIsOccupantDataVisible(false);
                              }}
                              className='self-center mb-4'
                            >
                              <AiOutlineEdit className='text-lightPrimary w-6 h-6' />
                            </button>
                          </div>

                          <p className='text-sm font-normal  text-lightSecondary my-2'>
                            Occupation:{' '}
                          </p>
                          <p className='text-md font-bold text-lightSecondary'>
                            {occupant.occupation}
                          </p>
                          <p className='text-sm font-normal  text-lightSecondary my-2'>
                            Age:
                          </p>
                          <p className='text-md font-bold text-lightSecondary'>
                            {calculateAge(occupant.dob)} years old
                          </p>

                          <p className='text-sm font-normal  text-lightSecondary mt-4 my-2'>
                            Phone number:
                          </p>
                          <p className='text-md font-bold text-lightSecondary'>
                            {occupant.phoneNumber}
                          </p>
                          <p className='text-sm font-normal  text-lightSecondary mt-4 my-2'>
                            email:
                          </p>
                          <p className='text-md font-bold text-lightSecondary hover:text-primary'>
                            <a href={`mailto:${occupant.email}`}>
                              {occupant.email}
                            </a>
                          </p>
                        </div>
                      )}
                      {/* Handle the view of the card show occupant Contacts when click the "Contacts" button  */}
                      {views[occupant._id] === 'contacts' && (
                        <div className='p-8 w-300 h-500'>
                          <div className='flex flex-col items-start text-lightSecondary'>
                            <h2 className='text-lg font-semibold mb-2 text-lightPrimary'>
                              Emergency Contact
                            </h2>
                            <h2 className=' text-sm '>
                              {occupant.emergencyContact.firstName}{' '}
                              {occupant.emergencyContact.lastName}
                            </h2>
                            <p className='text-sm mt-2'>
                              {occupant.emergencyContact.phoneNumber}
                            </p>
                            <p className='text-sm mt-2  hover:text-primary hover:font-bold'>
                              <a
                                href={`mailto:${occupant.emergencyContact.email}`}
                              >
                                {occupant.emergencyContact.email}
                              </a>
                            </p>
                            <p className='text-sm mt-2'>
                              {occupant.emergencyContact.relationship}
                            </p>
                          </div>
                          <div className='flex flex-col items-start mt-4 text-lightSecondary'>
                            <h2 className='text-lg font-semibold mb-2 text-lightPrimary'>
                              Reference
                            </h2>
                            <h2 className='text-sm'>
                              {occupant.reference.firstName}{' '}
                              {occupant.reference.lastName}
                            </h2>
                            <p className='text-sm mt-2 '>
                              {occupant.reference.phoneNumber}
                            </p>
                            <p className='text-sm mt-2  hover:text-primary hover:font-bold'>
                              <a href={`mailto:${occupant.reference.email}`}>
                                {occupant.reference.email}
                              </a>
                            </p>
                            <p className='text-sm mt-2'>
                              {occupant.reference.relationship}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className='flex items-center px-8 py-2 bg-gray-100 border-t border-gray-200'>
                        <div className='flex justify-between w-2/3 mx-2'>
                          {/* Button to handle the state of the card view */}
                          <button
                            onClick={() =>
                              setOccupantView(occupant._id, 'personal')
                            }
                            className='px-2 mx-2  text-sm font-semibold text-white bg-primary rounded hover:bg-lightPrimary'
                          >
                            Profile
                          </button>
                          <button
                            onClick={() =>
                              setOccupantView(occupant._id, 'contacts')
                            }
                            className='px-2 mx-2 py-2 text-sm font-semibold text-white bg-primary rounded hover:bg-lightPrimary'
                          >
                            Contacts
                          </button>
                        </div>
                        {/* Component to handle the deletion of the occupant */}
                        <div className='mx-4 flex justify-center h-12 w-12'>
                          <DeleteOccupant id={occupant._id} refetch={refetch} />
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
