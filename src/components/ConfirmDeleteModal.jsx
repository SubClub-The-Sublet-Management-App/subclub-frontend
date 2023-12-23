export default function ConfirmDeleteModal({ isOpen, message, onClose, onConfirm }) {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-black/25  h-screen z-1000'>
        <div className='bg-white p-6 rounded-2xl shadow-xl max-w-md w-full'>
          <h2 className='text-lg font-medium leading-6 text-gray-900 mb-4'>
            {message}
          </h2>
          <div className='flex justify-end space-x-4'>
            
            <button
              className='rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className='rounded-md bg-red-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }