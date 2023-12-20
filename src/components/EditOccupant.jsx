import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import handleSubmit from '../functions/handleSubmit';
import ModalMessages from './ModalMessages';

export default function EditOccupant({
  occupant,
  refetch,
  setIsEditing,
  setEditedOccupant,
  setIsOccupantDataVisible,
}) {
  // To navigate back to the '/occupants' page
  const navigate = useNavigate();

  // Get user auth to send patch request
  const token = localStorage.getItem('userToken'); 

  // To handle successfull and error messages to user
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  // Get the data from occupants page
  const [firstName, setFirstName] = useState(occupant.firstName);
  const [lastName, setLastName] = useState(occupant.lastName);
  const [phoneNumber, setPhoneNumber] = useState(occupant.phoneNumber);
  const [email, setEmail] = useState(occupant.email);
  const [dob, setDob] = useState(occupant.dob);
  const [occupation, setOccupation] = useState(occupant.occupation);
  const [emergencyContactFirstName, setEmergencyContactFirstName] = useState(
    occupant.emergencyContact.firstName
  );
  const [emergencyContactLastName, setEmergencyContactLastName] = useState(
    occupant.emergencyContact.lastName
  );
  const [emergencyContactPhoneNumber, setEmergencyContactPhoneNumber] =
    useState(occupant.emergencyContact.phoneNumber);
  const [emergencyContactRelationship, setEmergencyContactRelationship] =
    useState(occupant.emergencyContact.relationship);
  const [emergencyContactEmail, setEmergencyContactEmail] = useState(
    occupant.emergencyContact.email
  );
  const [referenceFirstName, setReferenceFirstName] = useState(
    occupant.reference.firstName
  );
  const [referenceLastName, setReferenceLastName] = useState(
    occupant.reference.lastName
  );
  const [referencePhoneNumber, setReferencePhoneNumber] = useState(
    occupant.reference.phoneNumber
  );
  const [referenceRelationship, setReferenceRelationship] = useState(
    occupant.reference.relationship
  );
  const [referenceEmail, setReferenceEmail] = useState(
    occupant.reference.email
  );

  const handleUpdateOccupant = () => {
    const data = {};

    // Check if input field has change otherwise keep current information
    if (
      occupant.emergencyContact.firstName !== emergencyContactFirstName ||
      occupant.emergencyContact.lastName !== emergencyContactLastName ||
      occupant.emergencyContact.relationship !== emergencyContactRelationship ||
      occupant.emergencyContact.phoneNumber !== emergencyContactPhoneNumber ||
      occupant.emergencyContact.email !== emergencyContactEmail
    ) {
      data.emergencyContact = {
        firstName: emergencyContactFirstName,
        lastName: emergencyContactLastName,
        relationship: emergencyContactRelationship,
        phoneNumber: emergencyContactPhoneNumber,
        email: emergencyContactEmail,
      };
    }

    if (
      occupant.reference.firstName !== referenceFirstName ||
      occupant.reference.lastName !== referenceLastName ||
      occupant.reference.relationship !== referenceRelationship ||
      occupant.reference.phoneNumber !== referencePhoneNumber ||
      occupant.reference.email !== referenceEmail
    ) {
      data.reference = {
        firstName: referenceFirstName,
        lastName: referenceLastName,
        relationship: referenceRelationship,
        phoneNumber: referencePhoneNumber,
        email: referenceEmail,
      };
    }

    handleSubmit(
      `https://sub-club-ce3cc207c2f9.herokuapp.com/occupants/${occupant._id}`,
      data,
      (responseData) => {
        setModalMessage(responseData.message); 
        setIsModalOpen(true); 
        // navigate to the occupants page after a delay
        setTimeout(() => {
          navigate('/occupants');
        }, 2000);
        refetch(); // refetch the occupant data
        setIsEditing(false); // hide the Editoccupant component
        setEditedOccupant(null); // reset the edited occupant
        setIsOccupantDataVisible(true); // show the occupant data
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
        Update occupant
      </h2>
      <div className='flex flex-col '>
        <div className='flex flex-col mt-10 sm:mx-auto sm:w-full mb-20'>
          <form
            className='space-y-6 w-full'
            action='#'
            method='PATCH'
            onSubmit={(event) => {
              event.preventDefault();
              handleUpdateOccupant();
            }}
          >
            <div className='flex flex-wrap justify-between w-full'>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='firstName' className='label-field'>
                  First Name
                </label>
                <div className='mt-2'>
                  <input
                    id='firstName'
                    name='firstName'
                    type='text'
                    autoComplete='firstName'
                    required
                    className='input-field'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='lastName' className='label-field'>
                  Last Name
                </label>
                <div className='mt-2'>
                  <input
                    id='lastName'
                    name='lastName'
                    type='text'
                    autoComplete='lastName'
                    required
                    className='input-field'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full p-2'>
                <label htmlFor='dob' className='label-field'>
                  Date of birth
                </label>
                <div className='mt-2'>
                  <input
                    id='dob'
                    name='dob'
                    type='date'
                    autoComplete='dob'
                    required
                    className='input-field'
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='email' className='label-field'>
                  Email
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='text'
                    autoComplete='email'
                    required
                    className='input-field'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='phoneNumber' className='label-field'>
                  Phone Number
                </label>
                <div className='mt-2'>
                  <input
                    id='phoneNumber'
                    name='phoneNumber'
                    type='text'
                    autoComplete='phoneNumber'
                    required
                    className='input-field'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full p-2'>
                <label htmlFor='occupation' className='label-field'>
                  Occupation
                </label>
                <div className='mt-2'>
                  <input
                    id='occupation'
                    name='occupation'
                    type='text'
                    autoComplete='occupation'
                    required
                    className='input-field'
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </div>
              </div>
              <h3 className='mt-10 w-full text-left text-lg font-bold leading-9 tracking-tight text-lightPrimary'>
                Emergency Contact
              </h3>
              <div className='w-full sm:w-1/2 p-2'>
                <label
                  htmlFor='emergencyContactFirstName'
                  className='label-field'
                >
                  First Name
                </label>
                <div className='mt-2'>
                  <input
                    id='emergencyContactFirstName'
                    name='emergencyContactFirstName'
                    type='text'
                    autoComplete='emergencyContactFirstName'
                    required
                    className='input-field'
                    value={emergencyContactFirstName}
                    onChange={(e) =>
                      setEmergencyContactFirstName(e.target.value)
                    }
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label
                  htmlFor='emergencyContactLastName'
                  className='label-field'
                >
                  First Name
                </label>
                <div className='mt-2'>
                  <input
                    id='emergencyContactLastName'
                    name='emergencyContactLastName'
                    type='text'
                    autoComplete='emergencyContactLastName'
                    required
                    className='input-field'
                    value={emergencyContactLastName}
                    onChange={(e) =>
                      setEmergencyContactLastName(e.target.value)
                    }
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='emergencyContactEmail' className='label-field'>
                  Email
                </label>
                <div className='mt-2'>
                  <input
                    id='emergencyContactEmail'
                    name='emergencyContactEmail'
                    type='text'
                    autoComplete='emergencyContactEmail'
                    required
                    className='input-field'
                    value={emergencyContactEmail}
                    onChange={(e) => setEmergencyContactEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label
                  htmlFor='emergencyContactPhoneNumber'
                  className='label-field'
                >
                  Phone Number
                </label>
                <div className='mt-2'>
                  <input
                    id='emergencyContactPhoneNumber'
                    name='emergencyContactPhoneNumber'
                    type='text'
                    autoComplete='emergencyContactPhoneNumber'
                    required
                    className='input-field'
                    value={emergencyContactPhoneNumber}
                    onChange={(e) =>
                      setEmergencyContactPhoneNumber(e.target.value)
                    }
                  />
                </div>
              </div>
              <div className='w-full p-2'>
                <label
                  htmlFor='emergencyContactRelationship'
                  className='label-field'
                >
                  Relationship
                </label>
                <div className='mt-2'>
                  <input
                    id='emergencyContactRelationship'
                    name='emergencyContactRelationship'
                    type='text'
                    autoComplete='emergencyContactRelationship'
                    required
                    className='input-field'
                    value={emergencyContactRelationship}
                    onChange={(e) =>
                      setEmergencyContactRelationship(e.target.value)
                    }
                  />
                </div>
              </div>
              <h3 className='mt-10 w-full text-left text-lg font-bold leading-9 tracking-tight text-lightPrimary'>
                Reference
              </h3>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='referenceFirstName' className='label-field'>
                  First Name
                </label>
                <div className='mt-2'>
                  <input
                    id='referenceFirstName'
                    name='referenceFirstName'
                    type='text'
                    autoComplete='referenceFirstName'
                    required
                    className='input-field'
                    value={referenceFirstName}
                    onChange={(e) => setReferenceFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='referenceLastName' className='label-field'>
                  First Name
                </label>
                <div className='mt-2'>
                  <input
                    id='referenceLastName'
                    name='referenceLastName'
                    type='text'
                    autoComplete='referenceLastName'
                    required
                    className='input-field'
                    value={referenceLastName}
                    onChange={(e) => setReferenceLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='referenceEmail' className='label-field'>
                  Email
                </label>
                <div className='mt-2'>
                  <input
                    id='referenceEmail'
                    name='referenceEmail'
                    type='text'
                    autoComplete='referenceEmail'
                    required
                    className='input-field'
                    value={referenceEmail}
                    onChange={(e) => setReferenceEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 p-2'>
                <label htmlFor='referencePhoneNumber' className='label-field'>
                  Phone Number
                </label>
                <div className='mt-2'>
                  <input
                    id='referencePhoneNumber'
                    name='referencePhoneNumber'
                    type='text'
                    autoComplete='referencePhoneNumber'
                    required
                    className='input-field'
                    value={referencePhoneNumber}
                    onChange={(e) => setReferencePhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full p-2'>
                <label htmlFor='referenceRelationship' className='label-field'>
                  Relationship
                </label>
                <div className='mt-2'>
                  <input
                    id='referenceRelationship'
                    name='referenceRelationship'
                    type='text'
                    autoComplete='referenceRelationship'
                    required
                    className='input-field'
                    value={referenceRelationship}
                    onChange={(e) => setReferenceRelationship(e.target.value)}
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
