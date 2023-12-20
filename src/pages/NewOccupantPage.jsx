import React, { useState } from 'react';
import handleSubmit from '../functions/handleSubmit';
import { useNavigate } from 'react-router-dom';
import ModalMessages from '../components/ModalMessages';

export default function NewOccupantPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken'); // Get the token from local storage

  const [isModalOpen, setIsModalOpen] = useState(false); // control the visibility of the modal messages
  const [modalMessage, setModalMessage] = useState(''); // control the message displayed in the modal

  const handleCreateRoom = (data) => {
    handleSubmit(
      'https://sub-club-ce3cc207c2f9.herokuapp.com/occupants',
      data,
      (responseData) => {
        setModalMessage(responseData.message); // set the message to display in the modal
        setIsModalOpen(true); // open the modal

        // navigate to the rooms page after a delay
        setTimeout(() => {
          navigate('/occupants', { state: { isNewOccupantAdded: true } });
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
            Add new occupant
          </h2>
        </div>
        <div className='flex flex-col mt-10 sm:mx-auto sm:w-full mb-20'>
          <form
            className='space-y-6 w-full'
            action='#'
            method='POST'
            onSubmit={(event) => {
              event.preventDefault();
            
              const firstName = event.target.elements.firstName.value;
              const lastName = event.target.elements.lastName.value;
              const phoneNumber = event.target.elements.phoneNumber.value;
              const email = event.target.elements.email.value;
              const dob = event.target.elements.dob.value;
              const occupation = event.target.elements.occupation.value;
            
              const emergencyContact = {
                firstName: event.target.elements.emergencyContactFirstName.value,
                lastName: event.target.elements.emergencyContactLastName.value,
                phoneNumber: event.target.elements.emergencyContactPhoneNumber.value,
                relationship: event.target.elements.emergencyContactRelationship.value,
                email: event.target.elements.emergencyContactEmail.value,
              };
            
              const reference = {
                firstName: event.target.elements.referenceFirstName.value,
                lastName: event.target.elements.referenceLastName.value,
                phoneNumber: event.target.elements.referencePhoneNumber.value,
                relationship: event.target.elements.referenceRelationship.value,
                email: event.target.elements.referenceEmail.value,
              };
            
              handleCreateRoom({
                firstName,
                lastName,
                phoneNumber,
                email,
                dob,
                occupation,
                emergencyContact,
                reference,
              });
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
                    />
                  </div>
                </div>
                <h3 className='w-full mt-10  text-left text-lg font-bold leading-9 tracking-tight text-lightPrimary'>
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
                    />
                  </div>
                </div>
                <div className='w-full sm:w-1/2 p-2'>
                  <label
                    htmlFor='emergencyContactLastName'
                    className='label-field'
                  >
                    Last Name
                  </label>
                  <div className='mt-2'>
                    <input
                      id='emergencyContactLastName'
                      name='emergencyContactLastName'
                      type='text'
                      autoComplete='emergencyContactLastName'
                      required
                      className='input-field'
                    />
                  </div>
                </div>
                <div className='w-full sm:w-1/2 p-2'>
                  <label
                    htmlFor='emergencyContactEmail'
                    className='label-field'
                  >
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
                    />
                  </div>
                </div>

                <h3 className=' w-full mt-10  text-left text-lg font-bold leading-9 tracking-tight text-lightPrimary'>
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
                    />
                  </div>
                </div>
                <div className='w-full sm:w-1/2 p-2'>
                  <label htmlFor='referenceLastName' className='label-field'>
                    Last Name
                  </label>
                  <div className='mt-2'>
                    <input
                      id='referenceLastName'
                      name='referenceLastName'
                      type='text'
                      autoComplete='referenceLastName'
                      required
                      className='input-field'
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
                    />
                  </div>
                </div>
                <div className='w-full p-2'>
                  <label
                    htmlFor='referenceRelationship'
                    className='label-field'
                  >
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
                    />
                  </div>
                </div>

            </div>
            <div className='flex w-full justify-center align-middle '>
              <button type='submit' className='button w-1/2 justify-center'>
                Create Occupant
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
