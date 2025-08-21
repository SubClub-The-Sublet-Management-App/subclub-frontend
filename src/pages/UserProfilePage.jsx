import React, { useState } from 'react';
import handleSubmit from '../functions/handleSubmit';
import { useNavigate } from 'react-router-dom';
import ModalMessages from '../components/ModalMessages';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function UserProfilePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>\"'&]/g, '');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (formData) => {
    const errors = [];

    // Only validate if fields are provided (allow empty fields)
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

  const handleUpdateProfile = (data) => {
    const errors = validateForm(data);
    if (errors.length > 0) {
      setModalMessage('Validation errors: ' + errors.join(', '));
      setIsModalOpen(true);
      return;
    }

    // Check if we have any data to send
    if (Object.keys(data).length === 0) {
      setModalMessage('Please fill in at least one field to update your profile.');
      setIsModalOpen(true);
      return;
    }

    handleSubmit(
      `${backendUrl}/users/profile`,
      data,
      (responseData) => {
        setModalMessage(responseData.message || 'Profile updated successfully!');
        setIsModalOpen(true);
        setTimeout(() => {
          navigate('/profile', { state: { isProfileUpdated: true } });
        }, 2000);
      },
      (errorData) => {
        const errorMessage = errorData?.message || 'An error occurred while updating profile. Please try again.';
        setModalMessage(errorMessage);
        setIsModalOpen(true);
        
        // If it's an authentication error, optionally redirect to login
        if (errorMessage.includes('Session expired') || errorMessage.includes('log in again')) {
          setTimeout(() => {
            localStorage.removeItem('userToken');
            // navigate('/login'); // Uncomment if you want automatic redirect
          }, 3000);
        }
      },
      token,
      'PATCH'
    );
  };

  return (
    <div>
      <h1 className='m-2 py-2 text-left text-3xl font-bold leading-9 tracking-tight text-gray-900 border-b-2 border-gray-300'>
        Profile
      </h1>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">

        <form
          className="px-6 py-8 space-y-8"
          onSubmit={(event) => {
            event.preventDefault();

            const rawData = {
              firstName: event.target.elements.firstName.value,
              lastName: event.target.elements.lastName.value,
              phoneNumber: event.target.elements.phoneNumber.value,
              dob: event.target.elements.dob.value,
              email: event.target.elements.email.value,
              address: {
                street: event.target.elements.street.value,
                number: event.target.elements.number.value,
                city: event.target.elements.city.value,
                postCode: event.target.elements.postCode.value,
                state: event.target.elements.state.value,
              },
            };

            // Sanitize all string inputs, only include non-empty values
            const sanitizedData = {};
            
            if (rawData.firstName) sanitizedData.firstName = sanitizeInput(rawData.firstName);
            if (rawData.lastName) sanitizedData.lastName = sanitizeInput(rawData.lastName);
            if (rawData.phoneNumber) sanitizedData.phoneNumber = sanitizeInput(rawData.phoneNumber);
            if (rawData.dob) sanitizedData.dob = rawData.dob;
            if (rawData.email) sanitizedData.email = sanitizeInput(rawData.email).toLowerCase();
            
            // Only include address if at least one field is provided
            const addressFields = {};
            if (rawData.address.street) addressFields.street = sanitizeInput(rawData.address.street);
            if (rawData.address.number) addressFields.number = parseInt(rawData.address.number);
            if (rawData.address.city) addressFields.city = sanitizeInput(rawData.address.city);
            if (rawData.address.postCode) addressFields.postCode = sanitizeInput(rawData.address.postCode);
            if (rawData.address.state) addressFields.state = sanitizeInput(rawData.address.state);
            
            if (Object.keys(addressFields).length > 0) {
              sanitizedData.address = addressFields;
            }

            handleUpdateProfile(sanitizedData);
          }}
        >
          {/* Personal Information Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
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
                  pattern="[\+]?[0-9\s\-\(\)]+"
                  className="placeholder-text"
                  placeholder="Enter your phone number"
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
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Address</h2>
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
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Profile
              </button>
            </div>
          </div>
        </form>
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
