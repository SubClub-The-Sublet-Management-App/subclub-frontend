import React, { useState } from 'react';
import handleSubmit from '../functions/handleSubmit';
import ModalMessages from '../components/ModalMessages';
import useFetch from '../functions/useFetch';
import { ClipLoader } from 'react-spinners';
import { AiOutlineEdit } from 'react-icons/ai';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function UserProfilePage() {
  const token = localStorage.getItem('userToken');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  // Fetch user profile data
  const {
    data: profileData,
    isLoading,
    error,
    refetch,
  } = useFetch(`${backendUrl}/users/profile`);

  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>"'&]/g, '');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (formData) => {
    const errors = [];

    if (formData.firstName && formData.firstName.length < 2) {
      errors.push('First name must be at least 2 characters if provided');
    }
    if (formData.lastName && formData.lastName.length < 2) {
      errors.push('Last name must be at least 2 characters if provided');
    }
    if (formData.email && !validateEmail(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      errors.push('Please enter a valid phone number');
    }
    if (formData.address?.number && (isNaN(formData.address.number) || formData.address.number <= 0)) {
      errors.push('Street number must be a valid positive number');
    }

    return errors;
  };

  const handleUpdatePersonalInfo = (data) => {
    const errors = validateForm(data);
    if (errors.length > 0) {
      setModalMessage('Validation errors: ' + errors.join(', '));
      setIsModalOpen(true);
      return;
    }

    if (Object.keys(data).length === 0) {
      setModalMessage('Please fill in at least one field to update personal information.');
      setIsModalOpen(true);
      return;
    }

    handleSubmit(
      `${backendUrl}/users/profile`,
      data,
      (responseData) => {
        setModalMessage(responseData.message || 'Personal information updated successfully!');
        setIsModalOpen(true);
        setEditPersonalInfo(false);
        refetch();
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
      },
      (errorData) => {
        const errorMessage = errorData?.message || 'An error occurred while updating personal information. Please try again.';
        setModalMessage(errorMessage);
        setIsModalOpen(true);
      },
      token,
      'PATCH'
    );
  };

  const handleUpdateAddress = (data) => {
    const errors = validateForm(data);
    if (errors.length > 0) {
      setModalMessage('Validation errors: ' + errors.join(', '));
      setIsModalOpen(true);
      return;
    }

    if (Object.keys(data).length === 0) {
      setModalMessage('Please fill in at least one field to update address.');
      setIsModalOpen(true);
      return;
    }

    handleSubmit(
      `${backendUrl}/users/profile`,
      data,
      (responseData) => {
        setModalMessage(responseData.message || 'Address updated successfully!');
        setIsModalOpen(true);
        setEditAddress(false);
        refetch();
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
      },
      (errorData) => {
        const errorMessage = errorData?.message || 'An error occurred while updating address. Please try again.';
        setModalMessage(errorMessage);
        setIsModalOpen(true);
      },
      token,
      'PATCH'
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ClipLoader color='#7E49F2' size={150} />
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-600 text-lg">Error loading profile: {error}</p>
        <button 
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
        >
          Try Again
        </button>
      </div>
    );
  }

  const profile = profileData?.data || {};

  return (
    <div>
      <h1 className='m-2 py-2 text-left text-3xl font-bold leading-9 tracking-tight text-gray-900 border-b-2 border-gray-300'>
        Profile
      </h1>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 space-y-8">
            {/* Personal Information Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                {!editPersonalInfo ? (
                  <button
                    onClick={() => setEditPersonalInfo(true)}
                    className="p-2 text-primary hover:text-secondary hover:bg-gray-100 rounded transition-colors"
                    title="Edit Personal Information"
                  >
                    <AiOutlineEdit className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditPersonalInfo(false)}
                    className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {!editPersonalInfo ? (
                // Personal Info Display Mode
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-md">
                      {profile.firstName || ''}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-md">
                      {profile.lastName || ''}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-md">
                      {profile.phoneNumber || ''}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-md">
                      {profile.dob ? new Date(profile.dob).toLocaleDateString() : ''}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-md">
                      {profile.email || ''}
                    </p>
                  </div>
                </div>
              ) : (
                // Personal Info Edit Mode
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const rawData = {
                      firstName: event.target.elements.firstName.value,
                      lastName: event.target.elements.lastName.value,
                      phoneNumber: event.target.elements.phoneNumber.value,
                      dob: event.target.elements.dob.value,
                      email: event.target.elements.email.value,
                    };

                    const sanitizedData = {};
                    if (rawData.firstName) sanitizedData.firstName = sanitizeInput(rawData.firstName);
                    if (rawData.lastName) sanitizedData.lastName = sanitizeInput(rawData.lastName);
                    if (rawData.phoneNumber) sanitizedData.phoneNumber = sanitizeInput(rawData.phoneNumber);
                    if (rawData.dob) sanitizedData.dob = rawData.dob;
                    if (rawData.email) sanitizedData.email = sanitizeInput(rawData.email).toLowerCase();

                    handleUpdatePersonalInfo(sanitizedData);
                  }}
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        minLength="2"
                        maxLength="50"
                        pattern="[A-Za-z\s]+"
                        className="placeholder-text"
                        placeholder="Enter your first name"
                        defaultValue={profile.firstName || ''}
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        minLength="2"
                        maxLength="50"
                        pattern="[A-Za-z\s]+"
                        className="placeholder-text"
                        placeholder="Enter your last name"
                        defaultValue={profile.lastName || ''}
                      />
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        maxLength="20"
                        pattern="[+]?[0-9\s\-\(\)]+"
                        className="placeholder-text"
                        placeholder="Enter your phone number"
                        defaultValue={profile.phoneNumber || ''}
                      />
                    </div>

                    <div>
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        className="placeholder-text"
                        defaultValue={profile.dob ? profile.dob.split('T')[0] : ''}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        maxLength="100"
                        className="placeholder-text"
                        placeholder="Enter your email address"
                        defaultValue={profile.email || ''}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors"
                    >
                      Save Personal Information
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Address Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Address</h2>
                {!editAddress ? (
                  <button
                    onClick={() => setEditAddress(true)}
                    className="p-2 text-primary hover:text-secondary hover:bg-gray-100 rounded transition-colors"
                    title="Edit Address"
                  >
                    <AiOutlineEdit className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditAddress(false)}
                    className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {!editAddress ? (
                // Address Display Mode
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                      <p className="text-gray-900 p-3 bg-gray-50 rounded-md">
                        {profile.address?.street || ''}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                      <p className="text-gray-900 p-3 bg-gray-50 rounded-md">
                        {profile.address?.number || ''}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <p className="text-gray-900 p-3 bg-gray-50 rounded-md">
                        {profile.address?.city || ''}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Post Code</label>
                      <p className="text-gray-900 p-3 bg-gray-50 rounded-md">
                        {profile.address?.postCode || ''}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <p className="text-gray-900 p-3 bg-gray-50 rounded-md">
                        {profile.address?.state || ''}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Address Edit Mode
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const rawData = {
                      street: event.target.elements.street.value,
                      number: event.target.elements.number.value,
                      city: event.target.elements.city.value,
                      postCode: event.target.elements.postCode.value,
                      state: event.target.elements.state.value,
                    };

                    const addressFields = {};
                    if (rawData.street) addressFields.street = sanitizeInput(rawData.street);
                    if (rawData.number) addressFields.number = parseInt(rawData.number);
                    if (rawData.city) addressFields.city = sanitizeInput(rawData.city);
                    if (rawData.postCode) addressFields.postCode = sanitizeInput(rawData.postCode);
                    if (rawData.state) addressFields.state = sanitizeInput(rawData.state);

                    const sanitizedData = {};
                    if (Object.keys(addressFields).length > 0) {
                      sanitizedData.address = addressFields;
                    }

                    handleUpdateAddress(sanitizedData);
                  }}
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                          Street
                        </label>
                        <input
                          type="text"
                          name="street"
                          id="street"
                          className="placeholder-text"
                          placeholder="Enter your street"
                          defaultValue={profile.address?.street || ''}
                        />
                      </div>

                      <div>
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
                          Number
                        </label>
                        <input
                          type="number"
                          name="number"
                          id="number"
                          min="1"
                          max="999999"
                          className="placeholder-text"
                          placeholder="Enter your street number"
                          defaultValue={profile.address?.number || ''}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          className="placeholder-text"
                          placeholder="Enter your city"
                          defaultValue={profile.address?.city || ''}
                        />
                      </div>

                      <div>
                        <label htmlFor="postCode" className="block text-sm font-medium text-gray-700 mb-2">
                          Post Code
                        </label>
                        <input
                          type="text"
                          name="postCode"
                          id="postCode"
                          className="placeholder-text"
                          placeholder="Enter your post code"
                          defaultValue={profile.address?.postCode || ''}
                        />
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          className="placeholder-text"
                          placeholder="Enter your state"
                          defaultValue={profile.address?.state || ''}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ModalMessages
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}