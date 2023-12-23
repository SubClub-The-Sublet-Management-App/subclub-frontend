import React from 'react';

const ConfirmDeleteModal = ({ isOpen, message, onClose, onConfirm, noActionText = 'Cancel', actionText = 'Delete' }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/25  h-screen z-1000'>
      <div className='bg-white p-6 rounded-2xl shadow-xl max-w-md w-full'>
        <h2 className='text-lg font-medium leading-6 text-gray-900 mb-4'>
          Confirmation
        </h2>
        <p className='text-sm text-gray-500 mb-4'>{message}</p>
        <div className='flex justify-end space-x-4'>
          <button
            className='rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            onClick={onClose}
          >
            {noActionText}
          </button>
          <button
            className='rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
            onClick={onConfirm}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;