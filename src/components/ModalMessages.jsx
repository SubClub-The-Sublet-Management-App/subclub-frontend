import React from 'react';

const ModalMessages = ({ isOpen, message, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/25  h-screen z-1000'>
      <div className='bg-white p-6 rounded-2xl shadow-xl max-w-md w-full'>
        <h2 className='text-lg font-medium leading-6 text-gray-900 mb-4'>
          Message
        </h2>
        <p className='text-sm text-gray-500 mb-4'>{message}</p>
        <button
          className='rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalMessages;

